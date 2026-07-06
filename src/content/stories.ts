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

  {
    id: "story-cake", // L5 — silent-e; heart: come, some, there
    title: "Jake Bakes a Cake",
    pages: [
      { text: "Jake can bake a cake.", emoji: "🎂" },
      { text: "The cake is on a plate.", emoji: "🍽️" },
      { text: "Come and get some cake!", emoji: "🍰" },
      { text: "Jake ate the cake. Yum!", emoji: "😋" },
    ],
  },
  {
    id: "story-bike", // L5 — silent-e; heart: where, were
    title: "Pete Rides a Bike",
    pages: [
      { text: "Pete has a red bike.", emoji: "🚲" },
      { text: "He rode the bike home.", emoji: "🏠" },
      { text: "Where did Pete go?", emoji: "❓" },
      { text: "Pete and Mike had fun!", emoji: "😄" },
    ],
  },
  {
    id: "story-rain", // L6 — vowel teams; heart: why, your
    title: "A Rainy Day",
    pages: [
      { text: "It did rain all day.", emoji: "🌧️" },
      { text: "We can not go out to play.", emoji: "🏠" },
      { text: "Why is it so wet?", emoji: "💧" },
      { text: "Then we see a big rainbow!", emoji: "🌈" },
    ],
  },
  {
    id: "story-moon", // L6 — oo/igh; heart: would, should
    title: "The Moon at Night",
    pages: [
      { text: "It is night. I see the moon.", emoji: "🌙" },
      { text: "The moon is high and bright.", emoji: "⭐" },
      { text: "I would like to sleep soon.", emoji: "😴" },
      { text: "Night night, moon!", emoji: "🌛" },
    ],
  },
  {
    id: "story-park", // L7 — r-controlled; heart: water, over
    title: "The Park by the Sea",
    pages: [
      { text: "We park the car by the sea.", emoji: "🚗" },
      { text: "A bird sings in a tree.", emoji: "🐦" },
      { text: "The water is right over here.", emoji: "🌊" },
      { text: "We had corn for lunch. Yum!", emoji: "🌽" },
    ],
  },
  {
    id: "story-coin", // L7 — diphthongs; heart: about
    title: "The Boy and the Coin",
    pages: [
      { text: "A boy found a coin.", emoji: "🪙" },
      { text: "It was on the ground.", emoji: "🟫" },
      { text: "The boy saw a big paw print.", emoji: "🐾" },
      { text: "What was it about? A cat!", emoji: "🐱" },
    ],
  },
  {
    id: "story-rabbit", // L8 — multisyllable/inflections
    title: "The Rabbit Picnic",
    pages: [
      { text: "The rabbit had a picnic.", emoji: "🐰" },
      { text: "It was sunny and warm.", emoji: "☀️" },
      { text: "The rabbit was munching a carrot.", emoji: "🥕" },
      { text: "Then it started napping in the sun.", emoji: "😴" },
    ],
  },
  {
    id: "story-dino-ruins", // L8 — capstone
    title: "The Lost Dino Egg",
    pages: [
      { text: "Deep in the ruins, a dino egg was hidden.", emoji: "🥚" },
      { text: "A boy and his dog went looking for it.", emoji: "🔦" },
      { text: "They looked under rocks and inside caves.", emoji: "🪨" },
      { text: "At last, the egg started to crack!", emoji: "🐣" },
      { text: "Out came a baby dino. What a day!", emoji: "🦕" },
    ],
  },

  // -------------------------------------------------------------------------
  // Bonus fluency stories. Each is extra decodable connected text at a stage
  // the child has already reached, so they get more re-reading practice with
  // patterns they know. Wired into a lesson via a second storyRead activity;
  // validated against that lesson's cumulative phonics set by the test suite.
  // -------------------------------------------------------------------------
  {
    id: "story-pig-dog", // bonus @ L1-U2-04 — s a t p i n m d g o; heart: the a I is
    title: "A Pig and a Dog",
    pages: [
      { text: "A pig sat on a mat.", emoji: "🐷" },
      { text: "A dog sat on top.", emoji: "🐶" },
      { text: "I pat the pig. I pat the dog.", emoji: "🤚" },
      { text: "Nap, pig! Nap, dog!", emoji: "😴" },
    ],
  },
  {
    id: "story-snack", // bonus @ L1-U2-05 — adds c k ck
    title: "Pack a Snack",
    pages: [
      { text: "I pack a sack.", emoji: "🎒" },
      { text: "The cat got a snack.", emoji: "🐱" },
      { text: "Tick tock! Tap, tap!", emoji: "⏰" },
      { text: "The cat naps on a cot.", emoji: "😴" },
    ],
  },
  {
    id: "story-sun-fun", // bonus @ L2-U2-10 — all five short vowels (adds e r h b f l u)
    title: "Fun in the Sun",
    pages: [
      { text: "The sun is up. It is hot!", emoji: "☀️" },
      { text: "A bug ran to a big log.", emoji: "🐛" },
      { text: "Ben and Deb hop and run.", emoji: "🏃" },
      { text: "Fun, fun! The sun is fun!", emoji: "😄" },
    ],
  },
  {
    id: "story-vet", // bonus @ L3-U1-13 — adds j v w x y z
    title: "Vic the Vet",
    pages: [
      { text: "Vic is a vet.", emoji: "🩺" },
      { text: "A wet dog ran to Vic.", emoji: "🐶" },
      { text: "Vic can fix the dog.", emoji: "🔧" },
      { text: "The dog is not sad. Yes!", emoji: "😄" },
    ],
  },
  {
    id: "story-frogs-jump", // bonus @ L3-U2-15 — blends + qu zz ff ll ss
    title: "Frogs Jump",
    pages: [
      { text: "Ten frogs sit on a log.", emoji: "🐸" },
      { text: "A duck must quack.", emoji: "🦆" },
      { text: "The frogs jump in fast.", emoji: "💨" },
      { text: "Buzz! A bug zips off.", emoji: "🐝" },
    ],
  },
  {
    id: "story-fish-dish", // bonus @ L4-U2-20 — adds sh ch th wh ng
    title: "Fish in a Dish",
    pages: [
      { text: "A fish is in a dish.", emoji: "🐟" },
      { text: "The fish can splash.", emoji: "🌊" },
      { text: "Chomp! The fish had lunch.", emoji: "🍽️" },
      { text: "What fun! The fish is quick.", emoji: "⚡" },
    ],
  },
  {
    id: "story-corn-fort", // bonus @ L7-U1-32 — practices bossy /or/
    title: "The Corn Fort",
    pages: [
      { text: "Nort has a fort of corn.", emoji: "🌽" },
      { text: "The fort is by a tree.", emoji: "🌳" },
      { text: "A big storm hit the fort!", emoji: "⛈️" },
      { text: "Nort can fix the fort. Good job!", emoji: "🔧" },
    ],
  },
  {
    id: "story-boy-toys", // bonus @ L7-U2-34 — practices oi / oy / ou / aw
    title: "The Boy and the Toys",
    pages: [
      { text: "A boy had lots of toys.", emoji: "🧸" },
      { text: "He found a coin in the soil.", emoji: "🪙" },
      { text: "The boy saw a paw print.", emoji: "🐾" },
      { text: "It was a cat! Do not shout.", emoji: "🐱" },
    ],
  },
];

export const STORY_BY_ID: Record<string, Story> = Object.fromEntries(
  STORIES.map((s) => [s.id, s]),
);
