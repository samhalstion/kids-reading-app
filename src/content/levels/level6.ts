import type { Level } from "../types";

// Level 6 — Tidal Reef. Vowel teams: ai ay ee ea oa ow oo igh.
// Two vowels walking, the first does the talking. Heart: who, why, your, could, would, should.
export const level6: Level = {
  id: "tidal-reef",
  title: "Tidal Reef",
  blurb: "Two letters team up to make one long sound!",
  emoji: "🐚",
  color: "from-teal-300 to-cyan-500",
  bossCreatureId: "leviatide",
  units: [
    {
      id: "coral-cove",
      title: "Coral Cove",
      rewardDinoId: "plesio",
      lessons: [
        {
          id: "L6-U1-26",
          levelId: "tidal-reef",
          unitId: "coral-cove",
          title: "Long a Teams: ai, ay",
          newGraphemes: ["ai", "ay"],
          reviewGraphemes: ["r", "n", "p", "l", "d", "h", "m", "t", "w", "s"],
          newHeartWords: ["who"],
          targetWords: ["rain", "play", "day", "way", "mail", "tail", "hay", "pay"],
          rewardCreatureId: "coralet",
          activities: [
            { type: "soundTap", graphemeId: "ai" },
            { type: "soundTap", graphemeId: "ay" },
            {
              type: "blend",
              word: "rain",
              emoji: "🌧️",
              distractors: [
                { word: "hay", emoji: "🌾" },
                { word: "train", emoji: "🚂" },
              ],
            },
            { type: "wordBuild", word: "rain", emoji: "🌧️" },
            { type: "wordTap", words: ["rain", "play", "day", "way", "mail", "tail"] },
            { type: "sightFlash", words: ["who"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "rain", emoji: "🌧️" },
                { word: "hay", emoji: "🌾" },
                { word: "train", emoji: "🚂" },
                { word: "snail", emoji: "🐌" },
              ],
            },
          ],
        },
        {
          id: "L6-U1-27",
          levelId: "tidal-reef",
          unitId: "coral-cove",
          title: "Long e Teams: ee, ea",
          newGraphemes: ["ee", "ea"],
          reviewGraphemes: ["ai", "ay", "b", "s", "t", "r", "f", "l", "d", "n"],
          newHeartWords: ["why"],
          targetWords: ["bee", "see", "tree", "feet", "sea", "seal", "leaf", "seat"],
          rewardCreatureId: "finneo",
          activities: [
            { type: "soundTap", graphemeId: "ee" },
            { type: "soundTap", graphemeId: "ea" },
            {
              type: "blend",
              word: "seal",
              emoji: "🦭",
              distractors: [
                { word: "bee", emoji: "🐝" },
                { word: "leaf", emoji: "🍃" },
              ],
            },
            { type: "wordBuild", word: "leaf", emoji: "🍃" },
            { type: "wordTap", words: ["bee", "see", "tree", "feet", "sea", "leaf"] },
            { type: "sightFlash", words: ["why"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "bee", emoji: "🐝" },
                { word: "tree", emoji: "🌳" },
                { word: "leaf", emoji: "🍃" },
                { word: "seal", emoji: "🦭" },
              ],
            },
          ],
        },
        {
          id: "L6-U1-28",
          levelId: "tidal-reef",
          unitId: "coral-cove",
          title: "Long o Teams: oa, ow",
          newGraphemes: ["oa", "ow"],
          reviewGraphemes: ["ai", "ay", "ee", "ea", "b", "t", "c", "r", "d", "s", "n", "g", "l"],
          newHeartWords: ["your"],
          targetWords: ["boat", "coat", "road", "snow", "low", "goat", "soap", "toad"],
          rewardCreatureId: "wavelet",
          activities: [
            { type: "soundTap", graphemeId: "oa" },
            { type: "soundTap", graphemeId: "ow" },
            {
              type: "blend",
              word: "boat",
              emoji: "⛵",
              distractors: [
                { word: "snow", emoji: "❄️" },
                { word: "goat", emoji: "🐐" },
              ],
            },
            { type: "wordBuild", word: "goat", emoji: "🐐" },
            { type: "wordTap", words: ["boat", "coat", "road", "snow", "low", "goat"] },
            { type: "sightFlash", words: ["your"] },
            { type: "storyRead", storyId: "story-rain" },
            {
              type: "comprehendMC",
              storyId: "story-rain",
              questions: [
                {
                  prompt: "What did they see at the end?",
                  choices: [
                    { text: "a rainbow", emoji: "🌈", correct: true },
                    { text: "a boat", emoji: "⛵", correct: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "deep-lagoon",
      title: "Deep Lagoon",
      rewardDinoId: "mosa",
      lessons: [
        {
          id: "L6-U2-29",
          levelId: "tidal-reef",
          unitId: "deep-lagoon",
          title: "oo and igh",
          newGraphemes: ["oo", "igh"],
          reviewGraphemes: ["oa", "ow", "m", "n", "z", "b", "t", "f", "d", "l", "r", "h"],
          newHeartWords: ["could"],
          targetWords: ["moon", "zoom", "boot", "food", "night", "light", "high", "right"],
          rewardCreatureId: "pearlkin",
          activities: [
            { type: "soundTap", graphemeId: "oo" },
            { type: "soundTap", graphemeId: "igh" },
            {
              type: "blend",
              word: "moon",
              emoji: "🌕",
              distractors: [
                { word: "night", emoji: "🌃" },
                { word: "boot", emoji: "👢" },
              ],
            },
            { type: "wordBuild", word: "moon", emoji: "🌕" },
            { type: "wordTap", words: ["moon", "zoom", "boot", "food", "night", "light"] },
            { type: "sightFlash", words: ["could"] },
            {
              type: "matchPairs",
              pairs: [
                { word: "moon", emoji: "🌕" },
                { word: "boot", emoji: "👢" },
                { word: "night", emoji: "🌃" },
                { word: "light", emoji: "💡" },
              ],
            },
          ],
        },
        {
          id: "L6-U2-30",
          levelId: "tidal-reef",
          unitId: "deep-lagoon",
          title: "Vowel Team Mix",
          newGraphemes: [],
          reviewGraphemes: ["ai", "ay", "ee", "ea", "oa", "ow", "oo", "igh"],
          newHeartWords: ["would", "should"],
          targetWords: ["rain", "tree", "boat", "moon", "day", "sea", "snow", "night"],
          rewardCreatureId: "tidepup",
          activities: [
            { type: "wordTap", words: ["rain", "tree", "boat", "moon", "day", "sea", "snow", "night"] },
            { type: "wordBuild", word: "tree", emoji: "🌳" },
            { type: "sightFlash", words: ["would", "should"] },
            { type: "storyRead", storyId: "story-moon" },
            {
              type: "comprehendMC",
              storyId: "story-moon",
              questions: [
                {
                  prompt: "What did I see in the sky?",
                  choices: [
                    { text: "the moon", emoji: "🌙", correct: true },
                    { text: "a boat", emoji: "⛵", correct: false },
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
