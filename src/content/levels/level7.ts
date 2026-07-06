import type { Level } from "../types";

// Level 7 — Storm Coast. R-controlled vowels ar or er ir ur and
// diphthongs oi oy ou aw. Heart: water, over, because, about.
export const level7: Level = {
  id: "storm-coast",
  title: "Storm Coast",
  blurb: "Bossy r and noisy vowels make new sounds!",
  emoji: "🌩️",
  color: "from-slate-300 to-blue-600",
  bossCreatureId: "cyclorag",
  units: [
    {
      id: "rocky-shore",
      title: "Rocky Shore",
      rewardDinoId: "allo",
      lessons: [
        {
          id: "L7-U1-31",
          levelId: "storm-coast",
          unitId: "rocky-shore",
          title: "Bossy ar",
          newGraphemes: ["ar"],
          reviewGraphemes: ["c", "s", "t", "j", "r", "m", "f", "p", "k", "h", "d"],
          newHeartWords: ["water"],
          targetWords: ["car", "star", "jar", "arm", "farm", "park", "hard", "dark"],
          rewardCreatureId: "gustling",
          activities: [
            { type: "soundTap", graphemeId: "ar" },
            {
              type: "blend",
              word: "star",
              emoji: "⭐",
              distractors: [
                { word: "car", emoji: "🚗" },
                { word: "jar", emoji: "🫙" },
              ],
            },
            { type: "wordBuild", word: "car", emoji: "🚗" },
            { type: "wordTap", words: ["car", "star", "jar", "arm", "farm", "park"] },
            { type: "sightFlash", words: ["water"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "car", emoji: "🚗" },
                { word: "star", emoji: "⭐" },
                { word: "jar", emoji: "🫙" },
                { word: "farm", emoji: "🚜" },
              ],
            },
          ],
        },
        {
          id: "L7-U1-32",
          levelId: "storm-coast",
          unitId: "rocky-shore",
          title: "Bossy or",
          newGraphemes: ["or"],
          reviewGraphemes: ["ar", "c", "f", "h", "b", "t", "n", "s", "p", "r", "m"],
          newHeartWords: ["over"],
          targetWords: ["corn", "fork", "horn", "born", "torn", "sort", "port", "storm"],
          rewardCreatureId: "boulderk",
          activities: [
            { type: "soundTap", graphemeId: "or" },
            {
              type: "blend",
              word: "corn",
              emoji: "🌽",
              distractors: [
                { word: "fork", emoji: "🍴" },
                { word: "horn", emoji: "📯" },
              ],
            },
            { type: "wordBuild", word: "fork", emoji: "🍴" },
            { type: "wordTap", words: ["corn", "fork", "horn", "born", "sort", "storm"] },
            { type: "sightFlash", words: ["over"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "corn", emoji: "🌽" },
                { word: "fork", emoji: "🍴" },
                { word: "horn", emoji: "📯" },
                { word: "star", emoji: "⭐" },
              ],
            },
          ],
        },
        {
          id: "L7-U1-33",
          levelId: "storm-coast",
          unitId: "rocky-shore",
          title: "er, ir, ur",
          newGraphemes: ["er", "ir", "ur"],
          reviewGraphemes: ["ar", "or", "b", "d", "g", "l", "f", "n", "h", "t", "s"],
          newHeartWords: ["because"],
          targetWords: ["bird", "girl", "fern", "her", "turn", "burn", "surf", "dirt"],
          rewardCreatureId: "sparkfin",
          activities: [
            { type: "soundTap", graphemeId: "er" },
            { type: "soundTap", graphemeId: "ir" },
            { type: "soundTap", graphemeId: "ur" },
            {
              type: "blend",
              word: "bird",
              emoji: "🐦",
              distractors: [
                { word: "fern", emoji: "🌿" },
                { word: "turn", emoji: "↩️" },
              ],
            },
            { type: "wordBuild", word: "bird", emoji: "🐦" },
            { type: "wordTap", words: ["bird", "girl", "fern", "her", "turn", "surf"] },
            { type: "sightFlash", words: ["because"] },
            { type: "storyRead", storyId: "story-park" },
            {
              type: "comprehendMC",
              storyId: "story-park",
              questions: [
                {
                  prompt: "What did they eat for lunch?",
                  choices: [
                    { text: "corn", emoji: "🌽", correct: true },
                    { text: "a bird", emoji: "🐦", correct: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "thunder-bay",
      title: "Thunder Bay",
      rewardDinoId: "cerato",
      lessons: [
        {
          id: "L7-U2-34",
          levelId: "storm-coast",
          unitId: "thunder-bay",
          title: "Noisy Vowels: oi, oy, ou, aw",
          newGraphemes: ["oi", "oy", "ou", "aw"],
          reviewGraphemes: ["ar", "or", "er", "c", "n", "b", "t", "l", "d", "p", "s"],
          newHeartWords: ["about"],
          targetWords: ["coin", "boy", "toy", "oil", "out", "loud", "cloud", "paw", "saw", "claw"],
          rewardCreatureId: "cragple",
          activities: [
            { type: "soundTap", graphemeId: "oi" },
            { type: "soundTap", graphemeId: "oy" },
            { type: "soundTap", graphemeId: "ou" },
            { type: "soundTap", graphemeId: "aw" },
            {
              type: "blend",
              word: "coin",
              emoji: "🪙",
              distractors: [
                { word: "boy", emoji: "👦" },
                { word: "cloud", emoji: "☁️" },
              ],
            },
            { type: "wordBuild", word: "coin", emoji: "🪙" },
            { type: "wordTap", words: ["coin", "boy", "toy", "out", "cloud", "paw", "saw", "claw"] },
            { type: "sightFlash", words: ["about"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "coin", emoji: "🪙" },
                { word: "boy", emoji: "👦" },
                { word: "cloud", emoji: "☁️" },
                { word: "paw", emoji: "🐾" },
              ],
            },
          ],
        },
        {
          id: "L7-U2-35",
          levelId: "storm-coast",
          unitId: "thunder-bay",
          title: "Storm Sounds Mix",
          newGraphemes: [],
          reviewGraphemes: ["ar", "or", "er", "ir", "ur", "oi", "oy", "ou", "aw"],
          newHeartWords: [],
          targetWords: ["car", "corn", "bird", "coin", "boy", "cloud", "paw", "star"],
          rewardCreatureId: "windwhorl",
          activities: [
            { type: "wordTap", words: ["car", "corn", "bird", "coin", "boy", "cloud", "paw", "star"] },
            { type: "wordBuild", word: "star", emoji: "⭐" },
            { type: "storyRead", storyId: "story-coin" },
            {
              type: "comprehendMC",
              storyId: "story-coin",
              questions: [
                {
                  prompt: "What did the boy find?",
                  choices: [
                    { text: "a coin", emoji: "🪙", correct: true },
                    { text: "a toy", emoji: "🧸", correct: false },
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
