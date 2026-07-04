/* eslint-disable no-console */
import { isDecodable } from "../src/lib/decodability";
import {
  LESSON_REFS,
  LESSON_REF_BY_ID,
  cumulativeGraphemes,
  cumulativeHeartWords,
} from "../src/lib/curriculum";

// Dev helper for authoring: shows what's been taught by a lesson and checks
// whether candidate words are decodable at that point.
//
//   npm run wordbank -- L2-U1-08 helmet frog splash the
//
// Prints the taught graphemes + heart words, then a decodable/undecodable
// verdict for each candidate word, so new practice content stays in-sequence.

const [lessonId, ...words] = process.argv.slice(2);

if (!lessonId) {
  console.log("Lessons:", LESSON_REFS.map((r) => r.lesson.id).join(", "));
  console.log("\nUsage: npm run wordbank -- <lessonId> [word ...]");
  process.exit(0);
}

const ref = LESSON_REF_BY_ID[lessonId];
if (!ref) {
  console.error(`Unknown lesson "${lessonId}".`);
  process.exit(1);
}

const graphemes = cumulativeGraphemes(ref.index);
const heart = cumulativeHeartWords(ref.index);

console.log(`\n${ref.lesson.id} — ${ref.lesson.title}`);
console.log("Taught graphemes:", [...graphemes].join(" "));
console.log("Heart words:", [...heart].join(" ") || "(none)");

if (words.length) {
  console.log("\nWord check:");
  for (const w of words) {
    const ok = isDecodable(w, graphemes, heart);
    console.log(`  ${ok ? "✅" : "❌"} ${w}`);
  }
}
