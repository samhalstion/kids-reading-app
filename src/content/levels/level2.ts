import type { Level } from "../types";

// Level 2 — Mossy Woods. Graphemes: e u r h b f l. Heart: and, to, said, you, was.
// CVC mastery across all five short vowels.
export const level2: Level = {
  id: "mossy-woods",
  title: "Mossy Woods",
  blurb: "Read short words with every vowel and grow the forest!",
  emoji: "🌲",
  color: "from-green-300 to-emerald-500",
  bossCreatureId: "treemunch",
  units: [
    {
      id: "forest-floor",
      title: "Forest Floor",
      rewardDinoId: "steggo",
      lessons: [
        {
          id: "L2-U1-06",
          levelId: "mossy-woods",
          unitId: "forest-floor",
          title: "Egg Sound: e",
          newGraphemes: ["e"],
          reviewGraphemes: ["s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k"],
          newHeartWords: ["and"],
          targetWords: ["pet", "pen", "ten", "net", "met", "get", "set", "den", "peg", "neck", "deck", "peck"],
          rewardCreatureId: "mosslet",
          activities: [
            { type: "soundTap", graphemeId: "e" },
            {
              type: "pictureSound",
              graphemeId: "e",
              choices: [
                { word: "egg", emoji: "🥚", correct: true },
                { word: "moon", emoji: "🌙", correct: false },
                { word: "cat", emoji: "🐱", correct: false },
              ],
            },
            {
              type: "blend",
              word: "pen",
              emoji: "🖊️",
              distractors: [
                { word: "net", emoji: "🥅" },
                { word: "ten", emoji: "🔟" },
              ],
            },
            { type: "wordBuild", word: "net", emoji: "🥅" },
            { type: "wordTap", words: ["pet", "pen", "ten", "net", "get", "neck"] },
            { type: "sightFlash", words: ["and"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "pen", emoji: "🖊️" },
                { word: "net", emoji: "🥅" },
                { word: "egg", emoji: "🥚" },
                { word: "sock", emoji: "🧦" },
              ],
            },
          ],
        },
        {
          id: "L2-U1-07",
          levelId: "mossy-woods",
          unitId: "forest-floor",
          title: "Roar Sound: r",
          newGraphemes: ["r"],
          reviewGraphemes: ["e", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k"],
          newHeartWords: ["to"],
          targetWords: ["rat", "ram", "rag", "rap", "rip", "rid", "rot", "red", "rim", "rack", "rock", "ran"],
          rewardCreatureId: "barkub",
          activities: [
            { type: "soundTap", graphemeId: "r" },
            {
              type: "pictureSound",
              graphemeId: "r",
              choices: [
                { word: "rat", emoji: "🐀", correct: true },
                { word: "egg", emoji: "🥚", correct: false },
                { word: "cat", emoji: "🐱", correct: false },
              ],
            },
            {
              type: "blend",
              word: "rat",
              emoji: "🐀",
              distractors: [
                { word: "red", emoji: "🟥" },
                { word: "rock", emoji: "🪨" },
              ],
            },
            { type: "wordBuild", word: "rock", emoji: "🪨" },
            { type: "wordTap", words: ["rat", "ram", "rip", "red", "rock", "ran"] },
            { type: "sightFlash", words: ["to"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "rat", emoji: "🐀" },
                { word: "rock", emoji: "🪨" },
                { word: "net", emoji: "🥅" },
                { word: "dog", emoji: "🐶" },
              ],
            },
          ],
        },
        {
          id: "L2-U1-08",
          levelId: "mossy-woods",
          unitId: "forest-floor",
          title: "Hop and Buzz: h, b",
          newGraphemes: ["h", "b"],
          reviewGraphemes: ["r", "e", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k"],
          newHeartWords: ["said"],
          targetWords: ["hat", "ham", "had", "hit", "hen", "hop", "hot", "bat", "bad", "bag", "bed", "bet", "bin", "big"],
          rewardCreatureId: "fernfly",
          activities: [
            { type: "soundTap", graphemeId: "h" },
            { type: "soundTap", graphemeId: "b" },
            {
              type: "pictureSound",
              graphemeId: "b",
              choices: [
                { word: "ball", emoji: "⚽", correct: true },
                { word: "hat", emoji: "🎩", correct: false },
                { word: "egg", emoji: "🥚", correct: false },
              ],
            },
            {
              type: "blend",
              word: "hen",
              emoji: "🐔",
              distractors: [
                { word: "bat", emoji: "🦇" },
                { word: "bed", emoji: "🛏️" },
              ],
            },
            { type: "wordBuild", word: "bed", emoji: "🛏️" },
            { type: "wordTap", words: ["hat", "hen", "hop", "bat", "bed", "big"] },
            { type: "sightFlash", words: ["said"] },
            { type: "storyRead", storyId: "story-hen" },
            {
              type: "comprehendMC",
              storyId: "story-hen",
              questions: [
                {
                  prompt: "What color is the hen?",
                  choices: [
                    { text: "red", emoji: "🟥", correct: true },
                    { text: "tan", emoji: "🟫", correct: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "tall-trees",
      title: "Tall Trees",
      rewardDinoId: "ptera",
      lessons: [
        {
          id: "L2-U2-09",
          levelId: "mossy-woods",
          unitId: "tall-trees",
          title: "Flap and Leap: f, l",
          newGraphemes: ["f", "l"],
          reviewGraphemes: ["h", "b", "r", "e", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k"],
          newHeartWords: ["you"],
          targetWords: ["fan", "fat", "fin", "fit", "fig", "fed", "leg", "let", "log", "lot", "lip", "lap", "lad", "lab"],
          rewardCreatureId: "spriggo",
          activities: [
            { type: "soundTap", graphemeId: "f" },
            { type: "soundTap", graphemeId: "l" },
            {
              type: "pictureSound",
              graphemeId: "f",
              choices: [
                { word: "fan", emoji: "🪭", correct: true },
                { word: "leg", emoji: "🦵", correct: false },
                { word: "egg", emoji: "🥚", correct: false },
              ],
            },
            {
              type: "blend",
              word: "log",
              emoji: "🪵",
              distractors: [
                { word: "leg", emoji: "🦵" },
                { word: "fan", emoji: "🪭" },
              ],
            },
            { type: "wordBuild", word: "leg", emoji: "🦵" },
            { type: "wordTap", words: ["fan", "fit", "fig", "leg", "log", "lip"] },
            { type: "sightFlash", words: ["you"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "fan", emoji: "🪭" },
                { word: "leg", emoji: "🦵" },
                { word: "log", emoji: "🪵" },
                { word: "bed", emoji: "🛏️" },
              ],
            },
          ],
        },
        {
          id: "L2-U2-10",
          levelId: "mossy-woods",
          unitId: "tall-trees",
          title: "Up Sound: u",
          newGraphemes: ["u"],
          reviewGraphemes: ["f", "l", "h", "b", "r", "e", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k"],
          newHeartWords: ["was"],
          targetWords: ["sun", "run", "bug", "hug", "mug", "rug", "cup", "cut", "but", "nut", "hut", "mud", "fun", "bun", "cub", "tub"],
          rewardCreatureId: "dewdrop",
          activities: [
            { type: "soundTap", graphemeId: "u" },
            {
              type: "pictureSound",
              graphemeId: "u",
              choices: [
                { word: "umbrella", emoji: "☂️", correct: true },
                { word: "sun", emoji: "🌞", correct: false },
                { word: "cat", emoji: "🐱", correct: false },
              ],
            },
            {
              type: "blend",
              word: "bug",
              emoji: "🐛",
              distractors: [
                { word: "sun", emoji: "🌞" },
                { word: "cup", emoji: "☕" },
              ],
            },
            { type: "wordBuild", word: "sun", emoji: "🌞" },
            { type: "wordTap", words: ["sun", "run", "bug", "cup", "mud", "fun"] },
            { type: "sightFlash", words: ["was"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "sun", emoji: "🌞" },
                { word: "bug", emoji: "🐛" },
                { word: "cup", emoji: "☕" },
                { word: "rug", emoji: "🧶" },
              ],
            },
            { type: "storyRead", storyId: "story-bug" },
            {
              type: "comprehendMC",
              storyId: "story-bug",
              questions: [
                {
                  prompt: "Where did the bug sit?",
                  choices: [
                    { text: "in the mud", emoji: "🟤", correct: true },
                    { text: "on a bed", emoji: "🛏️", correct: false },
                  ],
                },
              ],
            },
            { type: "storyRead", storyId: "story-sun-fun" },
          ],
        },
      ],
    },
  ],
};
