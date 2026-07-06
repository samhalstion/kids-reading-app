import { PHONEMES, PHONEME_BY_ID } from "../content/phonemes";
import type { Phoneme } from "../content/types";

// ---------------------------------------------------------------------------
// Decodability engine.
//
// A word is "decodable" at a point in the curriculum if it can be fully built
// out of grapheme–phoneme correspondences taught at or before that point (plus
// an explicit whitelist of "heart words" — high-frequency words with an
// irregular part, like "the" or "said", that are taught by sight).
//
// We use backtracking segmentation (not greedy) so ambiguous letter runs are
// judged correctly: a word passes if ANY valid segmentation into taught
// graphemes exists.
// ---------------------------------------------------------------------------

const SINGLE_VOWELS = new Set(["a", "e", "i", "o", "u"]);

function startsWith(word: string, frag: string, at: number): boolean {
  return word.startsWith(frag, at);
}

function isVowelGrapheme(p: Phoneme): boolean {
  return SINGLE_VOWELS.has(p.grapheme);
}

/** Normalize to lowercase letters only (strips punctuation, spaces, apostrophes). */
export function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/[^a-z]/g, "");
}

/**
 * Can `word` be decoded from position `i` using the given phoneme list?
 * Handles contiguous graphemes (s, sh, ck, ai...) and split digraphs (a_e):
 * a split "V_e" matches its vowel, then exactly one consonant grapheme, then e.
 */
function decodeFrom(word: string, i: number, allowed: Phoneme[]): boolean {
  if (i === word.length) return true;
  for (const g of allowed) {
    if (g.split) {
      const [head, tail] = g.grapheme.split("_"); // e.g. "a" and "e"
      if (!startsWith(word, head, i)) continue;
      const mid = i + head.length;
      for (const c of allowed) {
        if (c.split || isVowelGrapheme(c)) continue;
        if (!startsWith(word, c.grapheme, mid)) continue;
        const afterC = mid + c.grapheme.length;
        if (
          startsWith(word, tail, afterC) &&
          decodeFrom(word, afterC + tail.length, allowed)
        ) {
          return true;
        }
      }
    } else if (
      startsWith(word, g.grapheme, i) &&
      decodeFrom(word, i + g.grapheme.length, allowed)
    ) {
      return true;
    }
  }
  return false;
}

function allowedPhonemes(graphemeIds: Iterable<string>): Phoneme[] {
  const list: Phoneme[] = [];
  for (const id of graphemeIds) {
    const p = PHONEME_BY_ID[id];
    if (p) list.push(p);
  }
  // Longer graphemes first is a helpful ordering for the backtracker.
  return list.sort((a, b) => b.grapheme.length - a.grapheme.length);
}

/** Is a single word decodable given the taught graphemes + heart words? */
export function isDecodable(
  word: string,
  graphemeIds: Iterable<string>,
  heartWords: Iterable<string>,
): boolean {
  const norm = normalizeWord(word);
  if (norm.length === 0) return true;
  const heart = new Set(Array.from(heartWords, (w) => normalizeWord(w)));
  if (heart.has(norm)) return true;
  return decodeFrom(norm, 0, allowedPhonemes(graphemeIds));
}

/** Split a run of text into word tokens (keeps only word content). */
export function tokenizeWords(text: string): string[] {
  return text.split(/[^A-Za-z]+/).filter(Boolean);
}

/**
 * Check a whole passage. Returns the list of words that are NOT decodable given
 * the taught graphemes + heart words. Empty array === fully decodable.
 */
export function undecodableWords(
  text: string,
  graphemeIds: Iterable<string>,
  heartWords: Iterable<string>,
): string[] {
  const allowed = allowedPhonemes(graphemeIds);
  const heart = new Set(Array.from(heartWords, (w) => normalizeWord(w)));
  const bad: string[] = [];
  for (const raw of tokenizeWords(text)) {
    const norm = normalizeWord(raw);
    if (norm.length === 0 || heart.has(norm)) continue;
    if (!decodeFrom(norm, 0, allowed)) bad.push(raw);
  }
  return bad;
}

/**
 * Break a word into its grapheme tiles for display (WordBuild / letter tiles).
 * Uses only contiguous graphemes from the catalog; falls back to single letters
 * if no clean segmentation exists. `restrictTo` optionally limits the graphemes.
 */
export function segmentIntoTiles(word: string, restrictTo?: Set<string>): string[] {
  const norm = normalizeWord(word);
  const pool = PHONEMES.filter(
    (p) => !p.split && (!restrictTo || restrictTo.has(p.id)),
  ).sort((a, b) => b.grapheme.length - a.grapheme.length);

  function walk(i: number): string[] | null {
    if (i === norm.length) return [];
    for (const g of pool) {
      if (startsWith(norm, g.grapheme, i)) {
        const rest = walk(i + g.grapheme.length);
        if (rest) return [g.grapheme, ...rest];
      }
    }
    return null;
  }

  return walk(0) ?? norm.split("");
}
