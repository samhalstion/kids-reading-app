import { useCallback } from "react";
import { PHONEME_BY_ID } from "../content/phonemes";
import { useProgress } from "../store/progress";

// ---------------------------------------------------------------------------
// Text-to-speech via the Web Speech API. No external service, works offline.
// Mobile Safari requires a user gesture before speech works, so we `prime()`
// on the first tap (see App.tsx).
// ---------------------------------------------------------------------------

let primed = false;
let cachedVoice: SpeechSynthesisVoice | null = null;

function supported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Pick a clear en-US voice, preferring friendlier-sounding ones. */
function pickVoice(): SpeechSynthesisVoice | null {
  if (!supported()) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferredNames = ["Samantha", "Google US English", "Karen", "Moira", "Aaron"];
  const byName = voices.find((v) => preferredNames.some((n) => v.name.includes(n)));
  const enUS = voices.find((v) => v.lang === "en-US");
  const anyEn = voices.find((v) => v.lang.startsWith("en"));
  cachedVoice = byName ?? enUS ?? anyEn ?? voices[0];
  return cachedVoice;
}

if (supported()) {
  // Voices load asynchronously in most browsers.
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}

/** Unlock speech on the first user interaction (iOS requirement). */
export function primeSpeech(): void {
  if (primed || !supported()) return;
  primed = true;
  const u = new SpeechSynthesisUtterance("");
  u.volume = 0;
  window.speechSynthesis.speak(u);
  pickVoice();
}

export function stopSpeaking(): void {
  if (supported()) window.speechSynthesis.cancel();
}

interface SpeakOptions {
  rate?: number;
  /** Fired as each word begins, with its index in the whitespace split. */
  onWord?: (wordIndex: number) => void;
  onEnd?: () => void;
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  const { settings } = useProgress.getState();
  if (!supported() || settings.muted || !text.trim()) {
    opts.onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) u.voice = voice;
  u.rate = opts.rate ?? settings.ttsRate;
  u.pitch = 1.05;
  u.lang = voice?.lang ?? "en-US";

  if (opts.onWord) {
    // Map character offsets from boundary events to word indices.
    const starts: number[] = [];
    let i = 0;
    for (const w of text.split(/(\s+)/)) {
      if (w.trim()) starts.push(i);
      i += w.length;
    }
    u.onboundary = (e) => {
      if (e.name && e.name !== "word") return;
      let idx = 0;
      for (let k = 0; k < starts.length; k++) {
        if (e.charIndex >= starts[k]) idx = k;
      }
      opts.onWord?.(idx);
    };
  }
  u.onend = () => opts.onEnd?.();
  window.speechSynthesis.speak(u);
}

/** Speak a single word a touch slower than sentence rate. */
export function speakWord(word: string): void {
  speak(word, { rate: Math.min(useProgress.getState().settings.ttsRate, 0.8) });
}

/** Speak the pure-ish sound of a grapheme (e.g. "sss"), stretched out. */
export function speakPhoneme(graphemeId: string): void {
  const p = PHONEME_BY_ID[graphemeId];
  if (!p) return;
  speak(p.say, { rate: 0.7 });
}

/** Speak the sound, then the key word: "/mmm/ ... moon". */
export function speakPhonemeWithExample(graphemeId: string): void {
  const p = PHONEME_BY_ID[graphemeId];
  if (!p) return;
  speak(`${p.say}. ${p.example}.`, { rate: 0.75 });
}

/** React hook exposing the speech helpers (stable references). */
export function useSpeech() {
  return {
    speak: useCallback((text: string, opts?: SpeakOptions) => speak(text, opts), []),
    speakWord: useCallback(speakWord, []),
    speakPhoneme: useCallback(speakPhoneme, []),
    speakPhonemeWithExample: useCallback(speakPhonemeWithExample, []),
    stop: useCallback(stopSpeaking, []),
  };
}
