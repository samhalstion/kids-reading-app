import type { Story } from "./types";

// ---------------------------------------------------------------------------
// Decodable stories. Every word is either decodable from graphemes taught by
// the lesson that references the story, or a heart word taught by that point.
// The test suite (tests/decodability.test.ts) enforces this automatically.
// ---------------------------------------------------------------------------

export const STORIES: Story[] = [
  {
    id: "story-pip-ant", // L02 — graphemes: s a t p i n; heart: a I is
    title: "Pip the Ant",
    pages: [
      { text: "Pip is an ant.", emoji: "🐜" },
      { text: "Pip sat in a pit.", emoji: "🕳️" },
      { text: "I tap Pip.", emoji: "👆" },
      { text: "Pip naps. Tip, tap!", emoji: "😴" },
    ],
  },
  {
    id: "story-sam", // L03 — adds m d
    title: "Sam Naps",
    pages: [
      { text: "Sam is a man.", emoji: "🧍" },
      { text: "Sam is sad.", emoji: "😢" },
      { text: "I pat Sam.", emoji: "🤚" },
      { text: "Sam naps. Nap, nap, Sam!", emoji: "😴" },
    ],
  },
  {
    id: "story-dog", // L04 — adds g o
    title: "The Dog",
    pages: [
      { text: "I got a dog.", emoji: "🐶" },
      { text: "The dog sat on a mat.", emoji: "🐕" },
      { text: "The dog digs a pit.", emoji: "🕳️" },
      { text: "Go, dog, go!", emoji: "🏃" },
    ],
  },
  {
    id: "story-cat", // L05 — adds c k ck
    title: "Tick Tock, Cat",
    pages: [
      { text: "I got a cat.", emoji: "🐱" },
      { text: "The cat sat on a sock.", emoji: "🧦" },
      { text: "The cat and the dog nap.", emoji: "😴" },
      { text: "Tick tock, cat! Tick tock!", emoji: "⏰" },
    ],
  },
  {
    id: "story-hen", // L08 — adds e r h b; heart: and to
    title: "The Red Hen",
    pages: [
      { text: "The hen is red.", emoji: "🐔" },
      { text: "The hen ran to a big rock.", emoji: "🪨" },
      { text: "A cat sat on the rock.", emoji: "🐱" },
      { text: "The hen is mad at the cat!", emoji: "😠" },
    ],
  },
  {
    id: "story-bug", // L10 — adds f l u; heart: said you was
    title: "The Bug in the Mud",
    pages: [
      { text: "A bug sat in the mud.", emoji: "🐛" },
      { text: "The bug ran up a log.", emoji: "🪵" },
      { text: "A big cat ran at the bug!", emoji: "🐱" },
      { text: "The bug said, run, run!", emoji: "🏃" },
    ],
  },
  {
    id: "story-frog", // L15 — adds blends, qu zz ff ll ss; heart: of are they have do
    title: "The Frog and the Duck",
    pages: [
      { text: "A frog sat on a log.", emoji: "🐸" },
      { text: "A duck did swim in a pond.", emoji: "🦆" },
      { text: "The frog and the duck are pals.", emoji: "👫" },
      { text: "Jump in, frog! Swim, swim!", emoji: "🤸" },
    ],
  },
  {
    id: "story-ship", // L20 — adds sh ch th wh ng; heart: for what from one
    title: "The Ship and the Fish",
    pages: [
      { text: "This is a big ship.", emoji: "🚢" },
      { text: "A fish and a shell are in the net.", emoji: "🐟" },
      { text: "The ship went to a dock.", emoji: "⚓" },
      { text: "What fun! The fish did a flip!", emoji: "🐠" },
    ],
  },
];

export const STORY_BY_ID: Record<string, Story> = Object.fromEntries(
  STORIES.map((s) => [s.id, s]),
);
