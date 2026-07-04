// ---------------------------------------------------------------------------
// Content schema — the single set of types all curriculum data conforms to.
// Authoring errors (a typo'd activity type, a missing field) become compile
// errors, and the decodability test suite enforces that practice text only uses
// phonics patterns already taught. See src/lib/decodability.ts.
// ---------------------------------------------------------------------------

/** A grapheme–phoneme correspondence: a letter (or letter group) and its sound. */
export interface Phoneme {
  /** Stable id, usually equal to the grapheme, e.g. "s", "sh", "a_e". */
  id: string;
  /** How it is written, e.g. "s", "sh", "a_e" (split digraph, "_" = a consonant). */
  grapheme: string;
  /** A crafted string TTS can say to approximate the pure sound, e.g. "sss". */
  say: string;
  /** A key word that starts with / contains the sound, e.g. "snake". */
  example: string;
  /** Emoji shown alongside the example word. */
  exampleEmoji: string;
  /** true for multi-letter graphemes that make ONE sound (sh, ch, ck, ai, ...). */
  digraph?: boolean;
  /** true for split digraphs like a_e (magic-e); handled specially when decoding. */
  split?: boolean;
}

export interface Creature {
  id: string;
  name: string;
  kind: "pocketling" | "dino";
  /** Emoji sprite used until original art is generated. */
  emoji: string;
  /** Read aloud when unlocked (dinos get a real fun fact). */
  funFact?: string;
}

export interface StoryPage {
  /** Decodable sentence(s). Validated against the cumulative phonics set. */
  text: string;
  /** Emoji illustration for the page. */
  emoji: string;
}

export interface Story {
  id: string;
  title: string;
  pages: StoryPage[];
}

export interface MCChoice {
  /** Answer label (kept short + decodable when possible). */
  text: string;
  emoji?: string;
  correct: boolean;
}

export interface MCQuestion {
  prompt: string;
  choices: MCChoice[];
}

// --- Activities: a discriminated union keyed by `type` ----------------------

export interface SoundTapActivity {
  type: "soundTap";
  /** Phoneme id to teach, e.g. "m". */
  graphemeId: string;
}

export interface PictureSoundActivity {
  type: "pictureSound";
  /** The target initial sound (phoneme id). */
  graphemeId: string;
  /** Candidate picture words; exactly one starts with the target sound. */
  choices: { word: string; emoji: string; correct: boolean }[];
}

export interface BlendActivity {
  type: "blend";
  /** The word to blend, e.g. "cat". */
  word: string;
  emoji: string;
  /** Two distractor words with emojis. */
  distractors: { word: string; emoji: string }[];
}

export interface WordBuildActivity {
  type: "wordBuild";
  /** Target word to spell with grapheme tiles. */
  word: string;
  emoji: string;
}

export interface WordTapActivity {
  type: "wordTap";
  /** Decodable words the child taps to hear. */
  words: string[];
}

export interface MinimalPairActivity {
  type: "minimalPair";
  /** [shortVowelWord, longVowelWord] e.g. ["tap","tape"]. */
  pair: [string, string];
  emojis: [string, string];
}

export interface SightFlashActivity {
  type: "sightFlash";
  /** High-frequency / heart words to flash. */
  words: string[];
}

export interface SentenceReadActivity {
  type: "sentenceRead";
  storyId: string;
}

export interface StoryReadActivity {
  type: "storyRead";
  storyId: string;
}

export interface ComprehendMCActivity {
  type: "comprehendMC";
  storyId: string;
  questions: MCQuestion[];
}

export interface MatchPairsActivity {
  type: "matchPairs";
  /** Word ↔ picture pairs to match, memory-style. */
  pairs: { word: string; emoji: string }[];
}

export type Activity =
  | SoundTapActivity
  | PictureSoundActivity
  | BlendActivity
  | WordBuildActivity
  | WordTapActivity
  | MinimalPairActivity
  | SightFlashActivity
  | SentenceReadActivity
  | StoryReadActivity
  | ComprehendMCActivity
  | MatchPairsActivity;

export type ActivityType = Activity["type"];

export interface Lesson {
  /** e.g. "L1-U2-01". */
  id: string;
  levelId: string;
  unitId: string;
  /** Kid-facing title, e.g. "Meet Magmit!". */
  title: string;
  /** Grapheme ids introduced in THIS lesson. */
  newGraphemes: string[];
  /** Grapheme ids reviewed (already taught earlier). */
  reviewGraphemes: string[];
  /** Heart words introduced in THIS lesson. */
  newHeartWords: string[];
  /** Decodable words practiced here (validated in tests). */
  targetWords: string[];
  activities: Activity[];
  /** Creature unlocked on completion. */
  rewardCreatureId: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  /** Dinosaur that hatches when the whole unit is finished. */
  rewardDinoId?: string;
}

export interface Level {
  id: string;
  /** Themed region name, e.g. "Ember Cave". */
  title: string;
  /** Short kid-facing blurb. */
  blurb: string;
  /** Emoji scene icon for the map. */
  emoji: string;
  /** Background gradient classes for the region. */
  color: string;
  units: Unit[];
  /** Boss creature unlocked when the region is completed. */
  bossCreatureId: string;
}
