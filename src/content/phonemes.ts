import type { Phoneme } from "./types";

// ---------------------------------------------------------------------------
// The grapheme–phoneme catalog, in TEACHING ORDER (high-utility first, NOT
// alphabetical). This is the source of truth for decodability: a word is only
// "decodable" at a given lesson if it can be built from graphemes at or before
// that point in this list.
//
// NOTE ON `say`: these strings feed browser text-to-speech as a STOPGAP. TTS
// cannot render clean isolated phonemes — stop consonants carry a light schwa
// ("tuh" for /t/) and short vowels are approximate. This is deliberately better
// than bare letters (which TTS voices as letter NAMES, e.g. "tee"), but the real
// fix is recorded human phoneme audio; do not treat `say` as accurate.
// ---------------------------------------------------------------------------

export const PHONEMES: Phoneme[] = [
  // --- Set 1: s a t p i n -> instant CVC words (sat, pin, tap...) ----------
  { id: "s", grapheme: "s", say: "sss", example: "snake", exampleEmoji: "🐍" },
  { id: "a", grapheme: "a", say: "aa", example: "apple", exampleEmoji: "🍎" },
  { id: "t", grapheme: "t", say: "tuh", example: "top", exampleEmoji: "🔝" },
  { id: "p", grapheme: "p", say: "puh", example: "pig", exampleEmoji: "🐷" },
  { id: "i", grapheme: "i", say: "ih", example: "insect", exampleEmoji: "🐛" },
  { id: "n", grapheme: "n", say: "nnn", example: "net", exampleEmoji: "🥅" },

  // --- Set 2: m d g o c k (+ ck) -------------------------------------------
  { id: "m", grapheme: "m", say: "mmm", example: "moon", exampleEmoji: "🌙" },
  { id: "d", grapheme: "d", say: "duh", example: "dog", exampleEmoji: "🐶" },
  { id: "g", grapheme: "g", say: "guh", example: "goat", exampleEmoji: "🐐" },
  { id: "o", grapheme: "o", say: "ah", example: "octopus", exampleEmoji: "🐙" },
  { id: "c", grapheme: "c", say: "kuh", example: "cat", exampleEmoji: "🐱" },
  { id: "k", grapheme: "k", say: "kuh", example: "kite", exampleEmoji: "🪁" },
  { id: "ck", grapheme: "ck", say: "kuh", example: "duck", exampleEmoji: "🦆", digraph: true },

  // --- Set 3: e u r h b f l (+ ff ll ss) -----------------------------------
  { id: "e", grapheme: "e", say: "eh", example: "egg", exampleEmoji: "🥚" },
  { id: "u", grapheme: "u", say: "uh", example: "umbrella", exampleEmoji: "☂️" },
  { id: "r", grapheme: "r", say: "rrr", example: "rat", exampleEmoji: "🐀" },
  { id: "h", grapheme: "h", say: "huh", example: "hat", exampleEmoji: "🎩" },
  { id: "b", grapheme: "b", say: "buh", example: "ball", exampleEmoji: "⚽" },
  { id: "f", grapheme: "f", say: "fff", example: "fish", exampleEmoji: "🐟" },
  { id: "l", grapheme: "l", say: "lll", example: "leaf", exampleEmoji: "🍃" },
  { id: "ff", grapheme: "ff", say: "fff", example: "cliff", exampleEmoji: "⛰️", digraph: true },
  { id: "ll", grapheme: "ll", say: "lll", example: "bell", exampleEmoji: "🔔", digraph: true },
  { id: "ss", grapheme: "ss", say: "sss", example: "grass", exampleEmoji: "🌱", digraph: true },

  // --- Set 4: j v w x y z (+ qu zz) ----------------------------------------
  { id: "j", grapheme: "j", say: "juh", example: "jam", exampleEmoji: "🍯" },
  { id: "v", grapheme: "v", say: "vvv", example: "van", exampleEmoji: "🚐" },
  { id: "w", grapheme: "w", say: "wuh", example: "web", exampleEmoji: "🕸️" },
  { id: "x", grapheme: "x", say: "ks", example: "fox", exampleEmoji: "🦊" },
  { id: "y", grapheme: "y", say: "yuh", example: "yo-yo", exampleEmoji: "🪀" },
  { id: "z", grapheme: "z", say: "zzz", example: "zebra", exampleEmoji: "🦓" },
  { id: "qu", grapheme: "qu", say: "kwuh", example: "queen", exampleEmoji: "👑", digraph: true },
  { id: "zz", grapheme: "zz", say: "zzz", example: "buzz", exampleEmoji: "🐝", digraph: true },

  // --- Set 5: consonant digraphs -------------------------------------------
  { id: "sh", grapheme: "sh", say: "shh", example: "ship", exampleEmoji: "🚢", digraph: true },
  { id: "ch", grapheme: "ch", say: "chuh", example: "chick", exampleEmoji: "🐤", digraph: true },
  { id: "th", grapheme: "th", say: "thuh", example: "thumb", exampleEmoji: "👍", digraph: true },
  { id: "wh", grapheme: "wh", say: "wuh", example: "whale", exampleEmoji: "🐋", digraph: true },
  { id: "ng", grapheme: "ng", say: "ung", example: "ring", exampleEmoji: "💍", digraph: true },

  // --- Sets 6–8: previewed for authoring (Levels 5–8, later build) ---------
  { id: "a_e", grapheme: "a_e", say: "ay", example: "cake", exampleEmoji: "🎂", split: true },
  { id: "i_e", grapheme: "i_e", say: "eye", example: "bike", exampleEmoji: "🚲", split: true },
  { id: "o_e", grapheme: "o_e", say: "oh", example: "bone", exampleEmoji: "🦴", split: true },
  { id: "u_e", grapheme: "u_e", say: "you", example: "cube", exampleEmoji: "🧊", split: true },
  { id: "e_e", grapheme: "e_e", say: "ee", example: "Pete", exampleEmoji: "🧑", split: true },
  { id: "ai", grapheme: "ai", say: "ay", example: "rain", exampleEmoji: "🌧️", digraph: true },
  { id: "ay", grapheme: "ay", say: "ay", example: "hay", exampleEmoji: "🌾", digraph: true },
  { id: "ee", grapheme: "ee", say: "ee", example: "bee", exampleEmoji: "🐝", digraph: true },
  { id: "ea", grapheme: "ea", say: "ee", example: "leaf", exampleEmoji: "🍃", digraph: true },
  { id: "oa", grapheme: "oa", say: "oh", example: "boat", exampleEmoji: "⛵", digraph: true },
  { id: "ow", grapheme: "ow", say: "oh", example: "snow", exampleEmoji: "❄️", digraph: true },
  { id: "oo", grapheme: "oo", say: "ooo", example: "moon", exampleEmoji: "🌕", digraph: true },
  { id: "igh", grapheme: "igh", say: "eye", example: "night", exampleEmoji: "🌃", digraph: true },
  { id: "ar", grapheme: "ar", say: "ar", example: "car", exampleEmoji: "🚗", digraph: true },
  { id: "or", grapheme: "or", say: "or", example: "corn", exampleEmoji: "🌽", digraph: true },
  { id: "er", grapheme: "er", say: "er", example: "hammer", exampleEmoji: "🔨", digraph: true },
  { id: "ir", grapheme: "ir", say: "er", example: "bird", exampleEmoji: "🐦", digraph: true },
  { id: "ur", grapheme: "ur", say: "er", example: "nurse", exampleEmoji: "👩‍⚕️", digraph: true },
  { id: "oi", grapheme: "oi", say: "oy", example: "coin", exampleEmoji: "🪙", digraph: true },
  { id: "oy", grapheme: "oy", say: "oy", example: "boy", exampleEmoji: "👦", digraph: true },
  { id: "ou", grapheme: "ou", say: "ow", example: "cloud", exampleEmoji: "☁️", digraph: true },
  { id: "aw", grapheme: "aw", say: "aw", example: "paw", exampleEmoji: "🐾", digraph: true },
];

/** Fast lookup by id. */
export const PHONEME_BY_ID: Record<string, Phoneme> = Object.fromEntries(
  PHONEMES.map((p) => [p.id, p]),
);

/** Position of a grapheme in teaching order (for "is it taught yet?" checks). */
export const PHONEME_ORDER: Record<string, number> = Object.fromEntries(
  PHONEMES.map((p, i) => [p.id, i]),
);
