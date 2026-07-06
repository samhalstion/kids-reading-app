import type { Level } from "../types";

// Level 8 — Ancient Ruins. Multisyllable words (syllable division), inflections
// -s / -ing / -ed, and longer decodable stories for fluency + comprehension.
// No new graphemes — the child now reads longer words with everything learned.
export const level8: Level = {
  id: "ancient-ruins",
  title: "Ancient Ruins",
  blurb: "Read big words and long stories like a pro!",
  emoji: "🏛️",
  color: "from-stone-300 to-amber-700",
  bossCreatureId: "titanor",
  units: [
    {
      id: "crumbling-halls",
      title: "Crumbling Halls",
      rewardDinoId: "brachio",
      lessons: [
        {
          id: "L8-U1-36",
          levelId: "ancient-ruins",
          unitId: "crumbling-halls",
          title: "Two-Part Words",
          newGraphemes: [],
          reviewGraphemes: ["s", "u", "n", "e", "t", "p", "i", "c", "r", "a", "b", "m", "g", "k"],
          newHeartWords: ["put"],
          targetWords: ["sunset", "picnic", "rabbit", "napkin", "magnet", "basket", "muffin", "tennis"],
          rewardCreatureId: "runeling",
          activities: [
            { type: "wordTap", words: ["sunset", "picnic", "rabbit", "napkin", "magnet", "basket"] },
            { type: "wordBuild", word: "sunset", emoji: "🌇" },
            { type: "wordBuild", word: "picnic", emoji: "🧺" },
            { type: "sightFlash", words: ["put"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "sunset", emoji: "🌇" },
                { word: "rabbit", emoji: "🐰" },
                { word: "basket", emoji: "🧺" },
                { word: "magnet", emoji: "🧲" },
              ],
            },
          ],
        },
        {
          id: "L8-U1-37",
          levelId: "ancient-ruins",
          unitId: "crumbling-halls",
          title: "Endings: -s and -ing",
          newGraphemes: [],
          reviewGraphemes: ["r", "u", "n", "s", "j", "m", "p", "l", "a", "y", "i", "g", "e", "d"],
          newHeartWords: ["people"],
          targetWords: ["runs", "jumps", "plays", "sings", "running", "jumping", "playing", "reading"],
          rewardCreatureId: "fossilit",
          activities: [
            { type: "wordTap", words: ["runs", "jumps", "plays", "sings", "running", "jumping"] },
            { type: "wordBuild", word: "jumping", emoji: "🤸" },
            { type: "sightFlash", words: ["people"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "running", emoji: "🏃" },
                { word: "jumping", emoji: "🤸" },
                { word: "singing", emoji: "🎤" },
                { word: "reading", emoji: "📖" },
              ],
            },
          ],
        },
        {
          id: "L8-U1-38",
          levelId: "ancient-ruins",
          unitId: "crumbling-halls",
          title: "Endings: -ed",
          newGraphemes: [],
          reviewGraphemes: ["j", "u", "m", "p", "e", "d", "l", "a", "y", "n", "t", "w", "r", "c"],
          newHeartWords: ["many"],
          targetWords: ["jumped", "played", "landed", "rained", "napped", "hopped", "packed", "kicked"],
          rewardCreatureId: "glyphmun",
          activities: [
            { type: "wordTap", words: ["jumped", "played", "landed", "rained", "napped", "hopped"] },
            { type: "wordBuild", word: "jumped", emoji: "🤸" },
            { type: "sightFlash", words: ["many"] },
            { type: "storyRead", storyId: "story-rabbit" },
            {
              type: "comprehendMC",
              storyId: "story-rabbit",
              questions: [
                {
                  prompt: "What did the rabbit eat?",
                  choices: [
                    { text: "a carrot", emoji: "🥕", correct: true },
                    { text: "a fish", emoji: "🐟", correct: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "great-chamber",
      title: "The Great Chamber",
      rewardDinoId: "giganto",
      lessons: [
        {
          id: "L8-U2-39",
          levelId: "ancient-ruins",
          unitId: "great-chamber",
          title: "Long Words",
          newGraphemes: [],
          reviewGraphemes: ["t", "i", "g", "e", "r", "o", "b", "m", "u", "s", "c", "p", "a", "d"],
          newHeartWords: ["only"],
          targetWords: ["tiger", "robot", "music", "paper", "zero", "open", "pilot", "spider"],
          rewardCreatureId: "relicto",
          activities: [
            { type: "wordTap", words: ["tiger", "robot", "music", "paper", "open", "spider"] },
            { type: "wordBuild", word: "robot", emoji: "🤖" },
            { type: "wordBuild", word: "tiger", emoji: "🐯" },
            { type: "sightFlash", words: ["only"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "tiger", emoji: "🐯" },
                { word: "robot", emoji: "🤖" },
                { word: "spider", emoji: "🕷️" },
                { word: "music", emoji: "🎵" },
              ],
            },
          ],
        },
        {
          id: "L8-U2-40",
          levelId: "ancient-ruins",
          unitId: "great-chamber",
          title: "The Lost Dino Egg",
          newGraphemes: [],
          reviewGraphemes: ["d", "i", "n", "o", "f", "s", "l", "r", "c", "k", "t", "m", "g", "p"],
          newHeartWords: ["again"],
          targetWords: ["dino", "fossil", "rocket", "magnet", "planet", "garden", "thunder", "monster"],
          rewardCreatureId: "chronox",
          activities: [
            { type: "wordTap", words: ["dino", "fossil", "rocket", "planet", "garden", "monster"] },
            { type: "sightFlash", words: ["again"] },
            { type: "storyRead", storyId: "story-dino-ruins" },
            {
              type: "comprehendMC",
              storyId: "story-dino-ruins",
              questions: [
                {
                  prompt: "What was hidden in the ruins?",
                  choices: [
                    { text: "a dino egg", emoji: "🥚", correct: true },
                    { text: "a coin", emoji: "🪙", correct: false },
                  ],
                },
                {
                  prompt: "What came out of the egg?",
                  choices: [
                    { text: "a baby dino", emoji: "🦕", correct: true },
                    { text: "a bird", emoji: "🐦", correct: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
