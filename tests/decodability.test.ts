import { describe, expect, it } from "vitest";
import { isDecodable, undecodableWords } from "../src/lib/decodability";
import {
  LESSON_REFS,
  cumulativeGraphemes,
  cumulativeHeartWords,
  decodableStringsOf,
} from "../src/lib/curriculum";
import { STORY_BY_ID } from "../src/content/stories";
import { CREATURE_BY_ID } from "../src/content/creatures";

// ---------------------------------------------------------------------------
// The core guarantee: no lesson ever asks the child to READ a word built from
// a phonics pattern (or heart word) that has not been taught yet. If this test
// fails, an author sneaked an un-decodable word into practice content.
// ---------------------------------------------------------------------------

describe("decodability engine", () => {
  const g = (...ids: string[]) => new Set(ids);

  it("accepts CVC words from taught single letters", () => {
    expect(isDecodable("sat", g("s", "a", "t"), [])).toBe(true);
    expect(isDecodable("pin", g("p", "i", "n"), [])).toBe(true);
  });

  it("rejects words needing an untaught grapheme", () => {
    expect(isDecodable("map", g("s", "a", "t"), [])).toBe(false); // no m, p
    expect(isDecodable("ship", g("s", "h", "i", "p"), [])).toBe(true); // s+h ok as singles
    expect(isDecodable("ship", g("sh", "i", "p"), [])).toBe(true); // sh digraph
  });

  it("treats heart words as allowed even if irregular", () => {
    expect(isDecodable("the", g("t"), ["the"])).toBe(true);
    expect(isDecodable("said", g("s", "d"), [])).toBe(false);
    expect(isDecodable("said", g("s", "d"), ["said"])).toBe(true);
  });

  it("handles digraphs and the floss rule", () => {
    expect(isDecodable("duck", g("d", "u", "ck"), [])).toBe(true);
    expect(isDecodable("bell", g("b", "e", "ll"), [])).toBe(true);
    expect(isDecodable("fish", g("f", "i", "sh"), [])).toBe(true);
  });

  it("handles split digraphs (magic-e)", () => {
    expect(isDecodable("cake", g("c", "k", "a_e"), [])).toBe(true);
    expect(isDecodable("bike", g("b", "k", "i_e"), [])).toBe(true);
  });

  it("flags every undecodable word in a passage", () => {
    expect(undecodableWords("the cat ran", g("c", "a", "t"), ["the"])).toEqual(["ran"]);
  });
});

describe("curriculum content is fully decodable in sequence", () => {
  for (const ref of LESSON_REFS) {
    it(`${ref.lesson.id} — ${ref.lesson.title}`, () => {
      const graphemes = cumulativeGraphemes(ref.index);
      const heart = cumulativeHeartWords(ref.index);
      const strings = decodableStringsOf(ref.lesson.activities, ref.lesson.targetWords);

      const failures: string[] = [];
      for (const s of strings) {
        const bad = undecodableWords(s, graphemes, heart);
        if (bad.length) failures.push(`"${s}" -> [${bad.join(", ")}]`);
      }
      expect(failures, `Undecodable content in ${ref.lesson.id}:\n${failures.join("\n")}`).toEqual(
        [],
      );
    });
  }
});

describe("content integrity", () => {
  it("every lesson references a real reward creature", () => {
    for (const ref of LESSON_REFS) {
      expect(CREATURE_BY_ID[ref.lesson.rewardCreatureId], ref.lesson.id).toBeDefined();
    }
  });

  it("every story/comprehension references an existing story", () => {
    for (const ref of LESSON_REFS) {
      for (const a of ref.lesson.activities) {
        if (a.type === "storyRead" || a.type === "sentenceRead" || a.type === "comprehendMC") {
          expect(STORY_BY_ID[a.storyId], `${ref.lesson.id} -> ${a.storyId}`).toBeDefined();
        }
      }
    }
  });

  it("every comprehension question has exactly one correct choice", () => {
    for (const ref of LESSON_REFS) {
      for (const a of ref.lesson.activities) {
        if (a.type === "comprehendMC") {
          for (const q of a.questions) {
            expect(q.choices.filter((c) => c.correct).length, q.prompt).toBe(1);
          }
        }
      }
    }
  });

  it("every pictureSound has exactly one correct picture", () => {
    for (const ref of LESSON_REFS) {
      for (const a of ref.lesson.activities) {
        if (a.type === "pictureSound") {
          expect(a.choices.filter((c) => c.correct).length, ref.lesson.id).toBe(1);
        }
      }
    }
  });
});
