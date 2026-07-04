import type { Level } from "../types";

// Level 3 — Crystal Lake. Graphemes: j v w x y z qu zz ff ll ss + consonant
// blends. Heart: of, are, they, have, do.
export const level3: Level = {
  id: "crystal-lake",
  title: "Crystal Lake",
  blurb: "Splash into new sounds and word blends!",
  emoji: "💠",
  color: "from-cyan-300 to-blue-500",
  bossCreatureId: "prismaw",
  units: [
    {
      id: "shiny-shore",
      title: "Shiny Shore",
      rewardDinoId: "bronto",
      lessons: [
        {
          id: "L3-U1-11",
          levelId: "crystal-lake",
          unitId: "shiny-shore",
          title: "Jump and Vroom: j, v",
          newGraphemes: ["j", "v"],
          reviewGraphemes: ["s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k", "e", "u", "r", "h", "b", "f", "l"],
          newHeartWords: ["of"],
          targetWords: ["jam", "jab", "jet", "job", "jog", "jig", "jug", "van", "vat", "vet"],
          rewardCreatureId: "glimmr",
          activities: [
            { type: "soundTap", graphemeId: "j" },
            { type: "soundTap", graphemeId: "v" },
            {
              type: "pictureSound",
              graphemeId: "j",
              choices: [
                { word: "jam", emoji: "🍯", correct: true },
                { word: "van", emoji: "🚐", correct: false },
                { word: "egg", emoji: "🥚", correct: false },
              ],
            },
            {
              type: "blend",
              word: "jet",
              emoji: "✈️",
              distractors: [
                { word: "van", emoji: "🚐" },
                { word: "jug", emoji: "🫙" },
              ],
            },
            { type: "wordBuild", word: "van", emoji: "🚐" },
            { type: "wordTap", words: ["jam", "jet", "jog", "van", "vet", "jug"] },
            { type: "sightFlash", words: ["of"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "jam", emoji: "🍯" },
                { word: "van", emoji: "🚐" },
                { word: "jet", emoji: "✈️" },
                { word: "sun", emoji: "🌞" },
              ],
            },
          ],
        },
        {
          id: "L3-U1-12",
          levelId: "crystal-lake",
          unitId: "shiny-shore",
          title: "Wiggle and Fix: w, x",
          newGraphemes: ["w", "x"],
          reviewGraphemes: ["j", "v", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k", "e", "u", "r", "h", "b", "f", "l"],
          newHeartWords: ["are"],
          targetWords: ["web", "wet", "wag", "wig", "win", "wax", "fix", "fox", "box", "six", "mix"],
          rewardCreatureId: "frostip",
          activities: [
            { type: "soundTap", graphemeId: "w" },
            { type: "soundTap", graphemeId: "x" },
            {
              type: "pictureSound",
              graphemeId: "w",
              choices: [
                { word: "web", emoji: "🕸️", correct: true },
                { word: "fox", emoji: "🦊", correct: false },
                { word: "egg", emoji: "🥚", correct: false },
              ],
            },
            {
              type: "blend",
              word: "fox",
              emoji: "🦊",
              distractors: [
                { word: "web", emoji: "🕸️" },
                { word: "box", emoji: "📦" },
              ],
            },
            { type: "wordBuild", word: "box", emoji: "📦" },
            { type: "wordTap", words: ["web", "wet", "win", "fox", "box", "six"] },
            { type: "sightFlash", words: ["are"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "web", emoji: "🕸️" },
                { word: "fox", emoji: "🦊" },
                { word: "box", emoji: "📦" },
                { word: "sun", emoji: "🌞" },
              ],
            },
          ],
        },
        {
          id: "L3-U1-13",
          levelId: "crystal-lake",
          unitId: "shiny-shore",
          title: "Yes and Zip: y, z",
          newGraphemes: ["y", "z"],
          reviewGraphemes: ["w", "x", "j", "v", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k", "e", "u", "r", "h", "b", "f", "l"],
          newHeartWords: ["they"],
          targetWords: ["yes", "yet", "yam", "yap", "zip", "zap", "zig", "zag"],
          rewardCreatureId: "bubblo",
          activities: [
            { type: "soundTap", graphemeId: "y" },
            { type: "soundTap", graphemeId: "z" },
            {
              type: "pictureSound",
              graphemeId: "z",
              choices: [
                { word: "zebra", emoji: "🦓", correct: true },
                { word: "yam", emoji: "🍠", correct: false },
                { word: "fox", emoji: "🦊", correct: false },
              ],
            },
            {
              type: "blend",
              word: "zip",
              emoji: "🤐",
              distractors: [
                { word: "yam", emoji: "🍠" },
                { word: "zap", emoji: "⚡" },
              ],
            },
            { type: "wordBuild", word: "yes", emoji: "✅" },
            { type: "wordTap", words: ["yes", "yet", "yam", "zip", "zap", "zig"] },
            { type: "sightFlash", words: ["they"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "yam", emoji: "🍠" },
                { word: "zip", emoji: "🤐" },
                { word: "web", emoji: "🕸️" },
                { word: "fox", emoji: "🦊" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "deep-water",
      title: "Deep Water",
      rewardDinoId: "raptar",
      lessons: [
        {
          id: "L3-U2-14",
          levelId: "crystal-lake",
          unitId: "deep-water",
          title: "Queen's Buzz: qu, zz, ff, ll, ss",
          newGraphemes: ["qu", "zz", "ff", "ll", "ss"],
          reviewGraphemes: ["y", "z", "w", "x", "j", "v", "s", "a", "t", "p", "i", "n", "m", "d", "g", "o", "c", "k", "e", "u", "r", "h", "b", "f", "l"],
          newHeartWords: ["have"],
          targetWords: ["quiz", "quit", "buzz", "fizz", "jazz", "off", "puff", "huff", "bell", "tell", "doll", "well", "kiss", "miss", "pass", "mess", "less"],
          rewardCreatureId: "zaplet",
          activities: [
            { type: "soundTap", graphemeId: "qu" },
            { type: "soundTap", graphemeId: "zz" },
            { type: "soundTap", graphemeId: "ll" },
            {
              type: "pictureSound",
              graphemeId: "qu",
              choices: [
                { word: "queen", emoji: "👑", correct: true },
                { word: "bell", emoji: "🔔", correct: false },
                { word: "fox", emoji: "🦊", correct: false },
              ],
            },
            {
              type: "blend",
              word: "buzz",
              emoji: "🐝",
              distractors: [
                { word: "bell", emoji: "🔔" },
                { word: "doll", emoji: "🪆" },
              ],
            },
            { type: "wordBuild", word: "bell", emoji: "🔔" },
            { type: "wordTap", words: ["quiz", "buzz", "puff", "bell", "kiss", "pass"] },
            { type: "sightFlash", words: ["have"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "bell", emoji: "🔔" },
                { word: "doll", emoji: "🪆" },
                { word: "fox", emoji: "🦊" },
                { word: "jam", emoji: "🍯" },
              ],
            },
          ],
        },
        {
          id: "L3-U2-15",
          levelId: "crystal-lake",
          unitId: "deep-water",
          title: "Blend Rapids",
          newGraphemes: [],
          reviewGraphemes: ["s", "t", "p", "l", "r", "g", "f", "c", "n", "d", "m", "b", "w", "k"],
          newHeartWords: ["do"],
          targetWords: ["stop", "spin", "clap", "flag", "grab", "trap", "frog", "crab", "drum", "swim", "hand", "tent", "jump", "nest", "lamp", "fast", "best", "land", "sand", "gift"],
          rewardCreatureId: "splashy",
          activities: [
            {
              type: "blend",
              word: "frog",
              emoji: "🐸",
              distractors: [
                { word: "drum", emoji: "🥁" },
                { word: "flag", emoji: "🚩" },
              ],
            },
            {
              type: "blend",
              word: "hand",
              emoji: "✋",
              distractors: [
                { word: "tent", emoji: "⛺" },
                { word: "nest", emoji: "🪺" },
              ],
            },
            { type: "wordBuild", word: "stop", emoji: "🛑" },
            { type: "wordBuild", word: "jump", emoji: "🤸" },
            { type: "wordTap", words: ["stop", "clap", "frog", "swim", "hand", "jump", "nest", "fast"] },
            { type: "sightFlash", words: ["do"] },
            { type: "storyRead", storyId: "story-frog" },
            {
              type: "comprehendMC",
              storyId: "story-frog",
              questions: [
                {
                  prompt: "Who did swim?",
                  choices: [
                    { text: "the duck", emoji: "🦆", correct: true },
                    { text: "the cat", emoji: "🐱", correct: false },
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
