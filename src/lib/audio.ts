import { useProgress } from "../store/progress";

// ---------------------------------------------------------------------------
// Lightweight sound effects synthesized with the Web Audio API — no asset files
// needed for the MVP. Real recorded SFX can replace these in the polish phase.
// ---------------------------------------------------------------------------

let ctx: AudioContext | null = null;

function audioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

function tone(freqs: number[], duration: number, type: OscillatorType = "sine"): void {
  if (useProgress.getState().settings.muted) return;
  const ac = audioCtx();
  if (!ac) return;
  const now = ac.currentTime;
  freqs.forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const start = now + i * (duration * 0.6);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(ac.destination);
    osc.start(start);
    osc.stop(start + duration);
  });
}

export const sfx = {
  /** Cheerful rising arpeggio for correct answers. */
  correct: () => tone([523, 659, 784], 0.18, "triangle"),
  /** Soft, non-punishing "try again" — no harsh buzzer. */
  gentle: () => tone([392, 330], 0.2, "sine"),
  /** Sparkle for unlocking a creature. */
  unlock: () => tone([659, 784, 988, 1319], 0.16, "triangle"),
  /** Big fanfare for hatching a dino. */
  hatch: () => tone([523, 659, 784, 1047, 1319], 0.2, "triangle"),
  /** Tap tick. */
  tap: () => tone([880], 0.06, "sine"),
};
