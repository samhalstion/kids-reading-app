import type { Level } from "../types";

// Level 1 — Ember Cave. Graphemes: s a t p i n m d g o c k ck.
// Heart words: the, a, I, is. Phonemic awareness + first CVC decoding.
export const level1: Level = {
  id: "ember-cave",
  title: "Ember Cave",
  blurb: "Meet your first sounds and hatch a fiery friend!",
  emoji: "🌋",
  color: "from-orange-300 to-red-400",
  bossCreatureId: "magmoth",
  units: [
    {
      id: "spark-sounds",
      title: "Spark Sounds",
      rewardDinoId: "rexy",
      lessons: [
        {
          id: "L1-U1-01",
          levelId: "ember-cave",
          unitId: "spark-sounds",
          title: "First Sparks: s, a, t",
          newGraphemes: ["s", "a", "t"],
          reviewGraphemes: [],
          newHeartWords: [],
          targetWords: ["sat", "at", "as"],
          rewardCreatureId: "sparkit",
          activities: [
            { type: "soundTap", graphemeId: "s" },
            { type: "soundTap", graphemeId: "a" },
            { type: "soundTap", graphemeId: "t" },
            {
              type: "pictureSound",
              graphemeId: "s",
              choices: [
                { word: "snake", emoji: "🐍", correct: true },
                { word: "apple", emoji: "🍎", correct: false },
                { word: "top", emoji: "🔝", correct: false },
              ],
            },
            {
              type: "blend",
              word: "sat",
              emoji: "💺",
              distractors: [
                { word: "at", emoji: "➡️" },
                { word: "as", emoji: "🟰" },
              ],
            },
            { type: "wordTap", words: ["sat", "at", "as"] },
            { type: "wordBuild", word: "sat", emoji: "💺" },
          ],
        },
        {
          id: "L1-U1-02",
          levelId: "ember-cave",
          unitId: "spark-sounds",
          title: "More Sparks: p, i, n",
          newGraphemes: ["p", "i", "n"],
          reviewGraphemes: ["s", "a", "t"],
          newHeartWords: ["the", "a", "I", "is"],
          targetWords: ["pin", "sit", "tap", "nap", "tip", "pan", "sip", "nip"],
          rewardCreatureId: "emberling",
          activities: [
            { type: "soundTap", graphemeId: "p" },
            { type: "soundTap", graphemeId: "i" },
            { type: "soundTap", graphemeId: "n" },
            {
              type: "pictureSound",
              graphemeId: "n",
              choices: [
                { word: "net", emoji: "🥅", correct: true },
                { word: "apple", emoji: "🍎", correct: false },
                { word: "sun", emoji: "🌞", correct: false },
              ],
            },
            {
              type: "blend",
              word: "pin",
              emoji: "📌",
              distractors: [
                { word: "tap", emoji: "👆" },
                { word: "sit", emoji: "🪑" },
              ],
            },
            { type: "wordBuild", word: "nap", emoji: "😴" },
            { type: "wordTap", words: ["pin", "sit", "tap", "nap", "tip", "pan"] },
            { type: "sightFlash", words: ["I", "is", "a", "the"] },
            { type: "sentenceRead", storyId: "story-pip-ant" },
          ],
        },
      ],
    },
    {
      id: "cave-critters",
      title: "Cave Critters",
      rewardDinoId: "trikey",
      lessons: [
        {
          id: "L1-U2-03",
          levelId: "ember-cave",
          unitId: "cave-critters",
          title: "Meet Magmit: m, d",
          newGraphemes: ["m", "d"],
          reviewGraphemes: ["s", "a", "t", "p", "i", "n"],
          newHeartWords: [],
          targetWords: ["mad", "map", "man", "mat", "dad", "dim", "dip", "sad", "did"],
          rewardCreatureId: "pebblo",
          activities: [
            { type: "soundTap", graphemeId: "m" },
            { type: "soundTap", graphemeId: "d" },
            {
              type: "pictureSound",
              graphemeId: "m",
              choices: [
                { word: "moon", emoji: "🌙", correct: true },
                { word: "apple", emoji: "🍎", correct: false },
                { word: "tent", emoji: "⛺", correct: false },
              ],
            },
            {
              type: "blend",
              word: "mad",
              emoji: "😠",
              distractors: [
                { word: "map", emoji: "🗺️" },
                { word: "man", emoji: "🧍" },
              ],
            },
            { type: "wordBuild", word: "map", emoji: "🗺️" },
            { type: "wordTap", words: ["mad", "map", "man", "mat", "dad", "did"] },
            { type: "storyRead", storyId: "story-sam" },
            {
              type: "comprehendMC",
              storyId: "story-sam",
              questions: [
                {
                  prompt: "How does Sam feel?",
                  choices: [
                    { text: "sad", emoji: "😢", correct: true },
                    { text: "mad", emoji: "😠", correct: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "L1-U2-04",
          levelId: "ember-cave",
          unitId: "cave-critters",
          title: "Rumble Rocks: g, o",
          newGraphemes: ["g", "o"],
          reviewGraphemes: ["m", "d", "s", "a", "t", "p", "i", "n"],
          newHeartWords: [],
          targetWords: ["got", "dog", "dot", "pot", "top", "pop", "mop", "on", "dig", "pig", "tag", "nag"],
          rewardCreatureId: "cindpup",
          activities: [
            { type: "soundTap", graphemeId: "g" },
            { type: "soundTap", graphemeId: "o" },
            {
              type: "pictureSound",
              graphemeId: "o",
              choices: [
                { word: "octopus", emoji: "🐙", correct: true },
                { word: "moon", emoji: "🌙", correct: false },
                { word: "tent", emoji: "⛺", correct: false },
              ],
            },
            {
              type: "blend",
              word: "dog",
              emoji: "🐶",
              distractors: [
                { word: "pig", emoji: "🐷" },
                { word: "top", emoji: "🔝" },
              ],
            },
            { type: "wordBuild", word: "pot", emoji: "🍲" },
            { type: "wordTap", words: ["got", "dog", "top", "pop", "mop", "dig"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "dog", emoji: "🐶" },
                { word: "pig", emoji: "🐷" },
                { word: "top", emoji: "🔝" },
                { word: "mop", emoji: "🧹" },
              ],
            },
            { type: "storyRead", storyId: "story-dog" },
            {
              type: "comprehendMC",
              storyId: "story-dog",
              questions: [
                {
                  prompt: "What did the dog dig?",
                  choices: [
                    { text: "a pit", emoji: "🕳️", correct: true },
                    { text: "a top", emoji: "🔝", correct: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "L1-U2-05",
          levelId: "ember-cave",
          unitId: "cave-critters",
          title: "Click Clack: c, k, ck",
          newGraphemes: ["c", "k", "ck"],
          reviewGraphemes: ["g", "o", "m", "d", "s", "a", "t", "p", "i", "n"],
          newHeartWords: [],
          targetWords: ["cat", "can", "cap", "cot", "kit", "kid", "sock", "pack", "kick", "pick", "tick", "dock"],
          rewardCreatureId: "rocknug",
          activities: [
            { type: "soundTap", graphemeId: "c" },
            { type: "soundTap", graphemeId: "k" },
            { type: "soundTap", graphemeId: "ck" },
            {
              type: "pictureSound",
              graphemeId: "c",
              choices: [
                { word: "cat", emoji: "🐱", correct: true },
                { word: "octopus", emoji: "🐙", correct: false },
                { word: "moon", emoji: "🌙", correct: false },
              ],
            },
            {
              type: "blend",
              word: "cat",
              emoji: "🐱",
              distractors: [
                { word: "kit", emoji: "🧰" },
                { word: "dog", emoji: "🐶" },
              ],
            },
            { type: "wordBuild", word: "sock", emoji: "🧦" },
            { type: "wordTap", words: ["cat", "can", "kit", "sock", "pack", "tick"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "cat", emoji: "🐱" },
                { word: "dog", emoji: "🐶" },
                { word: "sock", emoji: "🧦" },
                { word: "pig", emoji: "🐷" },
              ],
            },
            { type: "storyRead", storyId: "story-cat" },
            {
              type: "comprehendMC",
              storyId: "story-cat",
              questions: [
                {
                  prompt: "Where did the cat sit?",
                  choices: [
                    { text: "on a sock", emoji: "🧦", correct: true },
                    { text: "in a cap", emoji: "🧢", correct: false },
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
