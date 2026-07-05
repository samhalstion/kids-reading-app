import type { Level } from "../types";

// Level 4 — Thunder Peak. Consonant digraphs: sh ch th wh ng.
// Heart: for, what, from, one.
export const level4: Level = {
  id: "thunder-peak",
  title: "Thunder Peak",
  blurb: "Two letters, one sound — read bigger words!",
  emoji: "⛰️",
  color: "from-indigo-300 to-purple-500",
  bossCreatureId: "galestrike",
  units: [
    {
      id: "storm-climb",
      title: "Storm Climb",
      rewardDinoId: "ankylo",
      lessons: [
        {
          id: "L4-U1-16",
          levelId: "thunder-peak",
          unitId: "storm-climb",
          title: "Shh! The sh Sound",
          newGraphemes: ["sh"],
          reviewGraphemes: ["s", "h", "i", "p", "f", "o", "e", "d", "n", "a", "c", "k", "l", "r", "u", "g", "t", "m", "b", "w"],
          newHeartWords: ["for"],
          targetWords: ["ship", "shop", "shut", "shed", "shin", "dash", "cash", "dish", "fish", "wish", "rush", "hush", "gash", "shell"],
          rewardCreatureId: "thundo",
          activities: [
            { type: "soundTap", graphemeId: "sh" },
            {
              type: "pictureSound",
              graphemeId: "sh",
              choices: [
                { word: "ship", emoji: "🚢", correct: true },
                { word: "fox", emoji: "🦊", correct: false },
                { word: "jam", emoji: "🍯", correct: false },
              ],
            },
            {
              type: "blend",
              word: "fish",
              emoji: "🐟",
              distractors: [
                { word: "ship", emoji: "🚢" },
                { word: "shell", emoji: "🐚" },
              ],
            },
            { type: "wordBuild", word: "ship", emoji: "🚢" },
            { type: "wordTap", words: ["ship", "shop", "shed", "fish", "dish", "wish"] },
            { type: "sightFlash", words: ["for"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "ship", emoji: "🚢" },
                { word: "fish", emoji: "🐟" },
                { word: "shell", emoji: "🐚" },
                { word: "shop", emoji: "🏬" },
              ],
            },
          ],
        },
        {
          id: "L4-U1-17",
          levelId: "thunder-peak",
          unitId: "storm-climb",
          title: "Choo Choo: the ch Sound",
          newGraphemes: ["ch"],
          reviewGraphemes: ["sh", "c", "h", "i", "n", "p", "o", "a", "t", "u", "g", "k", "e", "s", "r", "l", "m", "b"],
          newHeartWords: [],
          targetWords: ["chin", "chip", "chop", "chat", "chug", "chick", "chest", "rich", "much", "such", "inch", "lunch", "bench", "munch"],
          rewardCreatureId: "voltip",
          activities: [
            { type: "soundTap", graphemeId: "ch" },
            {
              type: "pictureSound",
              graphemeId: "ch",
              choices: [
                { word: "chick", emoji: "🐤", correct: true },
                { word: "ship", emoji: "🚢", correct: false },
                { word: "fox", emoji: "🦊", correct: false },
              ],
            },
            {
              type: "blend",
              word: "chin",
              emoji: "😀",
              distractors: [
                { word: "chip", emoji: "🍟" },
                { word: "chick", emoji: "🐤" },
              ],
            },
            { type: "wordBuild", word: "chop", emoji: "🪓" },
            { type: "wordTap", words: ["chin", "chip", "chop", "chick", "rich", "lunch"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "chick", emoji: "🐤" },
                { word: "chip", emoji: "🍟" },
                { word: "ship", emoji: "🚢" },
                { word: "fish", emoji: "🐟" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "summit",
      title: "The Summit",
      rewardDinoId: "spinno",
      lessons: [
        {
          id: "L4-U2-18",
          levelId: "thunder-peak",
          unitId: "summit",
          title: "Think: the th Sound",
          newGraphemes: ["th"],
          reviewGraphemes: ["ch", "sh", "t", "h", "i", "s", "a", "e", "n", "m", "o", "b", "p", "c", "k", "l", "r", "g", "u"],
          newHeartWords: ["from"],
          targetWords: ["this", "that", "then", "them", "thin", "thick", "thud", "moth", "bath", "path", "math", "with"],
          rewardCreatureId: "zephyr",
          activities: [
            { type: "soundTap", graphemeId: "th" },
            {
              type: "pictureSound",
              graphemeId: "th",
              choices: [
                { word: "thumb", emoji: "👍", correct: true },
                { word: "moth", emoji: "🦋", correct: false },
                { word: "ship", emoji: "🚢", correct: false },
              ],
            },
            {
              type: "blend",
              word: "moth",
              emoji: "🦋",
              distractors: [
                { word: "bath", emoji: "🛁" },
                { word: "path", emoji: "🛤️" },
              ],
            },
            { type: "wordBuild", word: "bath", emoji: "🛁" },
            { type: "wordTap", words: ["this", "that", "then", "thin", "moth", "bath"] },
            { type: "sightFlash", words: ["from"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "moth", emoji: "🦋" },
                { word: "bath", emoji: "🛁" },
                { word: "chick", emoji: "🐤" },
                { word: "fish", emoji: "🐟" },
              ],
            },
          ],
        },
        {
          id: "L4-U2-19",
          levelId: "thunder-peak",
          unitId: "summit",
          title: "Whoosh and Ring: wh, ng",
          newGraphemes: ["wh", "ng"],
          reviewGraphemes: ["th", "ch", "sh", "w", "h", "e", "n", "i", "p", "k", "g", "r", "s", "o", "l", "a", "b"],
          newHeartWords: ["what"],
          targetWords: ["when", "whip", "whiz", "king", "ring", "sing", "song", "long", "rang", "hang", "bang", "wing"],
          rewardCreatureId: "boomer",
          activities: [
            { type: "soundTap", graphemeId: "wh" },
            { type: "soundTap", graphemeId: "ng" },
            {
              type: "pictureSound",
              graphemeId: "wh",
              choices: [
                { word: "whale", emoji: "🐋", correct: true },
                { word: "ring", emoji: "💍", correct: false },
                { word: "fish", emoji: "🐟", correct: false },
              ],
            },
            {
              type: "blend",
              word: "king",
              emoji: "🤴",
              distractors: [
                { word: "ring", emoji: "💍" },
                { word: "wing", emoji: "🪽" },
              ],
            },
            { type: "wordBuild", word: "ring", emoji: "💍" },
            { type: "wordTap", words: ["when", "whip", "king", "ring", "sing", "song"] },
            { type: "sightFlash", words: ["what"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "king", emoji: "🤴" },
                { word: "ring", emoji: "💍" },
                { word: "wing", emoji: "🪽" },
                { word: "fish", emoji: "🐟" },
              ],
            },
          ],
        },
        {
          id: "L4-U2-20",
          levelId: "thunder-peak",
          unitId: "summit",
          title: "Peak Story: The Ship and the Fish",
          newGraphemes: [],
          reviewGraphemes: ["sh", "ch", "th", "wh", "ng"],
          newHeartWords: ["one"],
          targetWords: ["ship", "chin", "this", "when", "king", "fish", "lunch", "bath"],
          rewardCreatureId: "stormy",
          activities: [
            { type: "wordTap", words: ["ship", "chin", "this", "when", "king", "fish", "lunch", "bath"] },
            { type: "sightFlash", words: ["one"] },
            { type: "storyRead", storyId: "story-ship" },
            {
              type: "comprehendMC",
              storyId: "story-ship",
              questions: [
                {
                  prompt: "What is in the net?",
                  choices: [
                    { text: "a fish", emoji: "🐟", correct: true },
                    { text: "a frog", emoji: "🐸", correct: false },
                  ],
                },
                {
                  prompt: "What did the fish do?",
                  choices: [
                    { text: "a flip", emoji: "🤸", correct: true },
                    { text: "a nap", emoji: "😴", correct: false },
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
