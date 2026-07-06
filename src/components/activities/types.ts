import type { Activity } from "../../content/types";

/**
 * What an activity reports when it finishes. For GRADED activities this captures
 * first-try accuracy (the real signal — a child who taps three times before
 * getting it right did not "know" it) and the specific graphemes/words missed,
 * so weak skills can be surfaced and re-practiced. Exploratory activities
 * (listen-and-tap models, story reading) are ungraded.
 */
export interface ActivityResult {
  graded: boolean;
  /** Number of graded items in this activity. */
  items: number;
  /** Items answered correctly on the FIRST attempt (no prior wrong tap). */
  firstTryCorrect: number;
  /** grapheme ids / words the child missed, for review + resurfacing. */
  misses: string[];
}

/** Result for an exploratory (ungraded) activity. */
export const EXPLORATORY: ActivityResult = {
  graded: false,
  items: 0,
  firstTryCorrect: 0,
  misses: [],
};

/** Every activity component receives its typed data and reports its result. */
export interface ActivityProps<A extends Activity = Activity> {
  activity: A;
  /** Call when finished; the result drives scoring, mastery, and advancement. */
  onComplete: (result: ActivityResult) => void;
}
