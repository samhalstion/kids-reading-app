import { LEVELS } from "../content/levels";
import { STORY_BY_ID } from "../content/stories";
import type { Activity, Lesson, Level, Unit } from "../content/types";

// ---------------------------------------------------------------------------
// Curriculum helpers: flatten the level/unit/lesson tree, compute what has been
// taught up to a point, and drive "resume where you left off" navigation.
// ---------------------------------------------------------------------------

export interface LessonRef {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  /** 0-based index across the entire flattened curriculum. */
  index: number;
}

/** Every lesson in teaching order, with its unit/level context. */
export const LESSON_REFS: LessonRef[] = (() => {
  const refs: LessonRef[] = [];
  let index = 0;
  for (const level of LEVELS) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        refs.push({ lesson, unit, level, index: index++ });
      }
    }
  }
  return refs;
})();

export const LESSON_REF_BY_ID: Record<string, LessonRef> = Object.fromEntries(
  LESSON_REFS.map((r) => [r.lesson.id, r]),
);

export const TOTAL_LESSONS = LESSON_REFS.length;

/**
 * Graphemes taught at or before the given lesson index (cumulative).
 * This is the allow-list the decodability engine checks against.
 */
export function cumulativeGraphemes(uptoIndex: number): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i <= uptoIndex && i < LESSON_REFS.length; i++) {
    for (const g of LESSON_REFS[i].lesson.newGraphemes) set.add(g);
  }
  return set;
}

/** Heart words taught at or before the given lesson index (cumulative). */
export function cumulativeHeartWords(uptoIndex: number): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i <= uptoIndex && i < LESSON_REFS.length; i++) {
    for (const w of LESSON_REFS[i].lesson.newHeartWords) set.add(w);
  }
  return set;
}

/**
 * All strings in a lesson that must be decodable at that lesson's position
 * (i.e. text the child is expected to READ). Deliberately excludes soundTap,
 * pictureSound picture-labels, and sightFlash heart words — those are taught by
 * sound/sight, not decoded. Used by the decodability test suite.
 */
export function decodableStringsOf(activities: Activity[], targetWords: string[]): string[] {
  const out: string[] = [...targetWords];
  for (const a of activities) {
    switch (a.type) {
      case "blend":
        out.push(a.word, ...a.distractors.map((d) => d.word));
        break;
      case "wordBuild":
        out.push(a.word);
        break;
      case "wordTap":
        out.push(...a.words);
        break;
      case "minimalPair":
        out.push(a.pair[0], a.pair[1]);
        break;
      case "matchPairs":
        out.push(...a.pairs.map((p) => p.word));
        break;
      case "sentenceRead":
      case "storyRead": {
        const story = STORY_BY_ID[a.storyId];
        if (story) for (const p of story.pages) out.push(p.text);
        break;
      }
      case "comprehendMC":
        for (const q of a.questions) out.push(...q.choices.map((c) => c.text));
        break;
      // soundTap / pictureSound / sightFlash: not decoded reading text.
    }
  }
  return out;
}

/** First lesson index the learner has not completed yet (their "next" lesson). */
export function nextLessonIndex(completed: Set<string>): number {
  for (const ref of LESSON_REFS) {
    if (!completed.has(ref.lesson.id)) return ref.index;
  }
  return LESSON_REFS.length - 1; // all done → stay on the last
}

/** Is a lesson unlocked? Lesson N unlocks when lesson N-1 is complete. */
export function isLessonUnlocked(index: number, completed: Set<string>): boolean {
  if (index <= 0) return true;
  const prev = LESSON_REFS[index - 1];
  return completed.has(prev.lesson.id);
}
