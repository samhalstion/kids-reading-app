// ---------------------------------------------------------------------------
// Recorded phoneme audio (the real fix for smooth, accurate sounds).
//
// Drop clips into src/assets/audio/phonemes/ named by grapheme id — `s.wav`,
// `a.wav`, `sh.wav`, `a_e.wav`, etc. Vite's import.meta.glob picks them up
// automatically at build time; no code change needed to activate them.
// speakPhoneme() (src/lib/speech.ts) prefers these and falls back to the
// text-to-speech approximation whenever a clip is missing.
// ---------------------------------------------------------------------------

const modules = import.meta.glob("../assets/audio/phonemes/*.{mp3,wav}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const BY_ID: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const file = path.split("/").pop() ?? "";
  const id = file.replace(/\.(mp3|wav)$/, "");
  BY_ID[id] = url;
}

// Graphemes that make the SAME sound reuse one clip (e.g. `ss` uses `s`), so
// only ~30 recordings are needed to cover the full ~40-grapheme catalog.
const ALIAS: Record<string, string> = {
  ss: "s",
  ff: "f",
  ll: "l",
  zz: "z",
  c: "k",
  ck: "k",
  wh: "w",
  ai: "a_e",
  ay: "a_e",
  igh: "i_e",
  oa: "o_e",
  ow: "o_e",
  ee: "e_e",
  ea: "e_e",
  ir: "er",
  ur: "er",
  oy: "oi",
};

/** URL of the recorded clip for a grapheme, or null if none is bundled yet. */
export function getPhonemeAudioUrl(id: string): string | null {
  if (BY_ID[id]) return BY_ID[id];
  const alias = ALIAS[id];
  return alias ? (BY_ID[alias] ?? null) : null;
}

export const RECORDED_PHONEME_COUNT = Object.keys(BY_ID).length;
