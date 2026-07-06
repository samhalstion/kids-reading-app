import type { Level } from "../types";

// Level 5 — Sunbeam Meadow. Silent-e / magic-e: a_e i_e o_e u_e e_e.
// The vowel says its name. Heart: come, some, there, where, were.
export const level5: Level = {
  id: "sunbeam-meadow",
  title: "Sunbeam Meadow",
  blurb: "Magic-e makes the vowel say its name!",
  emoji: "🌻",
  color: "from-amber-200 to-yellow-400",
  bossCreatureId: "solaris",
  units: [
    {
      id: "magic-e-hills",
      title: "Magic-e Hills",
      rewardDinoId: "diplo",
      lessons: [
        {
          id: "L5-U1-21",
          levelId: "sunbeam-meadow",
          unitId: "magic-e-hills",
          title: "Magic a_e",
          newGraphemes: ["a_e"],
          reviewGraphemes: ["a", "t", "p", "c", "k", "n", "m", "g", "v", "w"],
          newHeartWords: ["come"],
          targetWords: ["cake", "name", "game", "late", "made", "gate", "cane", "wave"],
          rewardCreatureId: "beamkit",
          activities: [
            { type: "soundTap", graphemeId: "a_e" },
            { type: "minimalPair", pair: ["tap", "tape"], emojis: ["👆", "📼"] },
            {
              type: "blend",
              word: "cake",
              emoji: "🎂",
              distractors: [
                { word: "cane", emoji: "🍬" },
                { word: "gate", emoji: "🚪" },
              ],
            },
            { type: "wordBuild", word: "gate", emoji: "🚪" },
            { type: "wordTap", words: ["cake", "name", "game", "late", "made", "gate"] },
            { type: "sightFlash", words: ["come"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "cake", emoji: "🎂" },
                { word: "gate", emoji: "🚪" },
                { word: "cane", emoji: "🍬" },
                { word: "wave", emoji: "👋" },
              ],
            },
          ],
        },
        {
          id: "L5-U1-22",
          levelId: "sunbeam-meadow",
          unitId: "magic-e-hills",
          title: "Magic i_e",
          newGraphemes: ["i_e"],
          reviewGraphemes: ["a_e", "b", "k", "t", "m", "r", "d", "f", "h", "l", "n"],
          newHeartWords: ["some"],
          targetWords: ["bike", "kite", "time", "ride", "five", "hide", "line", "mice"],
          rewardCreatureId: "petalpop",
          activities: [
            { type: "soundTap", graphemeId: "i_e" },
            { type: "minimalPair", pair: ["kit", "kite"], emojis: ["🧰", "🪁"] },
            {
              type: "blend",
              word: "kite",
              emoji: "🪁",
              distractors: [
                { word: "bike", emoji: "🚲" },
                { word: "five", emoji: "✋" },
              ],
            },
            { type: "wordBuild", word: "bike", emoji: "🚲" },
            { type: "wordTap", words: ["bike", "kite", "time", "ride", "five", "hide"] },
            { type: "sightFlash", words: ["some"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "kite", emoji: "🪁" },
                { word: "bike", emoji: "🚲" },
                { word: "five", emoji: "✋" },
                { word: "mice", emoji: "🐭" },
              ],
            },
          ],
        },
        {
          id: "L5-U1-23",
          levelId: "sunbeam-meadow",
          unitId: "magic-e-hills",
          title: "Magic o_e",
          newGraphemes: ["o_e"],
          reviewGraphemes: ["a_e", "i_e", "b", "n", "r", "s", "h", "l", "t", "p", "m"],
          newHeartWords: ["there"],
          targetWords: ["bone", "home", "rose", "nose", "hole", "note", "rope", "stone"],
          rewardCreatureId: "sunbud",
          activities: [
            { type: "soundTap", graphemeId: "o_e" },
            { type: "minimalPair", pair: ["hop", "hope"], emojis: ["🐇", "🙏"] },
            {
              type: "blend",
              word: "bone",
              emoji: "🦴",
              distractors: [
                { word: "rose", emoji: "🌹" },
                { word: "nose", emoji: "👃" },
              ],
            },
            { type: "wordBuild", word: "rose", emoji: "🌹" },
            { type: "wordTap", words: ["bone", "home", "rose", "nose", "hole", "rope"] },
            { type: "sightFlash", words: ["there"] },
            { type: "storyRead", storyId: "story-cake" },
            {
              type: "comprehendMC",
              storyId: "story-cake",
              questions: [
                {
                  prompt: "What did Jake make?",
                  choices: [
                    { text: "a cake", emoji: "🎂", correct: true },
                    { text: "a bone", emoji: "🦴", correct: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sunny-slopes",
      title: "Sunny Slopes",
      rewardDinoId: "iguan",
      lessons: [
        {
          id: "L5-U2-24",
          levelId: "sunbeam-meadow",
          unitId: "sunny-slopes",
          title: "Magic u_e and e_e",
          newGraphemes: ["u_e", "e_e"],
          reviewGraphemes: ["a_e", "i_e", "o_e", "c", "b", "t", "m", "l", "n", "j", "p"],
          newHeartWords: ["where"],
          targetWords: ["cube", "tube", "mule", "cute", "June", "Pete", "these", "tune"],
          rewardCreatureId: "rayling",
          activities: [
            { type: "soundTap", graphemeId: "u_e" },
            { type: "soundTap", graphemeId: "e_e" },
            { type: "minimalPair", pair: ["cub", "cube"], emojis: ["🐻", "🧊"] },
            {
              type: "blend",
              word: "cube",
              emoji: "🧊",
              distractors: [
                { word: "tube", emoji: "🧪" },
                { word: "mule", emoji: "🫏" },
              ],
            },
            { type: "wordBuild", word: "cube", emoji: "🧊" },
            { type: "wordTap", words: ["cube", "tube", "mule", "cute", "June", "tune"] },
            { type: "sightFlash", words: ["where"] },
          ],
        },
        {
          id: "L5-U2-25",
          levelId: "sunbeam-meadow",
          unitId: "sunny-slopes",
          title: "Magic-e Mix",
          newGraphemes: [],
          reviewGraphemes: ["a_e", "i_e", "o_e", "u_e", "e_e"],
          newHeartWords: ["were"],
          targetWords: ["cake", "bike", "bone", "cube", "name", "ride", "home", "cute"],
          rewardCreatureId: "glimflit",
          activities: [
            { type: "minimalPair", pair: ["cap", "cape"], emojis: ["🧢", "🦸"] },
            { type: "wordTap", words: ["cake", "bike", "bone", "cube", "name", "ride", "home", "cute"] },
            { type: "wordBuild", word: "home", emoji: "🏠" },
            { type: "sightFlash", words: ["were"] },
            { type: "storyRead", storyId: "story-bike" },
            {
              type: "comprehendMC",
              storyId: "story-bike",
              questions: [
                {
                  prompt: "What did Pete ride?",
                  choices: [
                    { text: "a bike", emoji: "🚲", correct: true },
                    { text: "a car", emoji: "🚗", correct: false },
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
