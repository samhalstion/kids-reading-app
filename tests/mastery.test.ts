import { beforeEach, describe, expect, it } from "vitest";
import {
  MASTERY_THRESHOLD,
  FLUENCY_GOAL,
  fluencyStats,
  useProgress,
} from "../src/store/progress";
import { LESSON_REFS } from "../src/lib/curriculum";

// ---------------------------------------------------------------------------
// Assessment / mastery guarantees. The core launch-review blocker was that a
// lesson could be "completed" with no reading ability. These tests lock in that
// completion is now SCORED: only genuine first-try accuracy earns mastery, and
// misses are captured for the weak-skills report.
// ---------------------------------------------------------------------------

const firstLesson = LESSON_REFS[0].lesson.id;

beforeEach(() => {
  useProgress.getState().resetProgress();
});

describe("mastery scoring", () => {
  it("a perfect first-try run is mastered with 3 stars", () => {
    const r = useProgress
      .getState()
      .completeLesson(firstLesson, { items: 5, firstTryCorrect: 5, misses: [] });
    expect(r.accuracy).toBe(1);
    expect(r.mastered).toBe(true);
    expect(r.stars).toBe(3);
    expect(useProgress.getState().lessonScores[firstLesson].mastered).toBe(true);
  });

  it("a low-accuracy run (random tapping) is NOT mastered", () => {
    const r = useProgress.getState().completeLesson(firstLesson, {
      items: 5,
      firstTryCorrect: 1,
      misses: ["a", "t", "p", "n"],
    });
    expect(r.accuracy).toBeLessThan(MASTERY_THRESHOLD);
    expect(r.mastered).toBe(false);
    expect(r.stars).toBe(1);
    expect(useProgress.getState().lessonScores[firstLesson].mastered).toBe(false);
  });

  it("tallies missed graphemes for the weak-skills report", () => {
    useProgress
      .getState()
      .completeLesson(firstLesson, { items: 3, firstTryCorrect: 1, misses: ["s", "s", "m"] });
    const missed = useProgress.getState().missedGraphemes;
    expect(missed["s"]).toBe(2);
    expect(missed["m"]).toBe(1);
  });

  it("keeps the best accuracy across replays", () => {
    const st = useProgress.getState();
    st.completeLesson(firstLesson, { items: 4, firstTryCorrect: 1, misses: [] }); // 0.25
    st.completeLesson(firstLesson, { items: 4, firstTryCorrect: 4, misses: [] }); // 1.0
    expect(useProgress.getState().lessonScores[firstLesson].accuracy).toBe(1);
    expect(useProgress.getState().lessonScores[firstLesson].mastered).toBe(true);
  });

  it("an all-exploratory lesson (no graded items) counts as mastered", () => {
    const r = useProgress
      .getState()
      .completeLesson(firstLesson, { items: 0, firstTryCorrect: 0, misses: [] });
    expect(r.accuracy).toBe(1);
    expect(r.mastered).toBe(true);
  });
});

describe("reading-fluency tally", () => {
  it("counts read-throughs per story and reports lifetime counts", () => {
    const st = useProgress.getState();
    expect(st.recordStoryRead("story-sam")).toBe(1);
    expect(st.recordStoryRead("story-sam")).toBe(2);
    expect(useProgress.getState().storyReads["story-sam"]).toBe(2);
  });

  it("a story is 'fluent' only once re-read to the goal", () => {
    const st = useProgress.getState();
    st.recordStoryRead("story-dog"); // 1 read — not yet fluent
    st.recordStoryRead("story-sam");
    st.recordStoryRead("story-sam"); // 2 reads — fluent
    const f = fluencyStats(useProgress.getState().storyReads);
    expect(f.totalReads).toBe(3);
    expect(f.storiesRead).toBe(2);
    expect(f.fluentStories).toBe(1);
    expect(FLUENCY_GOAL).toBe(2);
  });

  it("resetProgress clears the fluency tally", () => {
    useProgress.getState().recordStoryRead("story-sam");
    useProgress.getState().resetProgress();
    expect(useProgress.getState().storyReads).toEqual({});
  });
});
