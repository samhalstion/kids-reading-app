// ---------------------------------------------------------------------------
// High-frequency word reference (Dolch + Fry). "Heart words" are the subset
// with an irregular part that must be learned by sight before the child can
// decode them; these are declared per-lesson in `newHeartWords` and are the
// ONLY non-decodable words allowed in practice text at that point.
// Kept here as the authoring reference / source for sightFlash activities.
// ---------------------------------------------------------------------------

export const DOLCH_PRE_PRIMER = [
  "a", "and", "away", "big", "blue", "can", "come", "down", "find", "for",
  "funny", "go", "help", "here", "I", "in", "is", "it", "jump", "little",
  "look", "make", "me", "my", "not", "one", "play", "red", "run", "said",
  "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you",
];

export const DOLCH_PRIMER = [
  "all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came",
  "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like",
  "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran",
  "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this",
  "too", "under", "want", "was", "well", "went", "what", "white", "who",
  "will", "with", "yes",
];

export const DOLCH_GRADE_1 = [
  "after", "again", "an", "any", "as", "ask", "by", "could", "every", "fly",
  "from", "give", "going", "had", "has", "her", "him", "his", "how", "just",
  "know", "let", "live", "may", "of", "old", "once", "open", "over", "put",
  "round", "some", "stop", "take", "thank", "them", "then", "think", "walk",
  "were", "when",
];

/** Every heart word introduced across Levels 1–4, in teaching order. */
export const HEART_WORDS_ORDER = [
  "the", "a", "I", "is", // L1
  "and", "to", "said", "you", "was", // L2
  "of", "are", "they", "have", "do", // L3
  "for", "what", "from", "one", // L4
];
