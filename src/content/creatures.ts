import type { Creature } from "./types";

// ---------------------------------------------------------------------------
// Collectible creatures. "Pocketlings" are ORIGINAL monsters (no Pokémon IP) —
// emoji sprites stand in until original art is generated. Dinosaurs are real
// and hatch from eggs when a unit is finished; each carries a fun fact read
// aloud, sneaking in nonfiction vocabulary.
// ---------------------------------------------------------------------------

export const CREATURES: Creature[] = [
  // --- Level 1 lesson rewards (Ember Cave) ---
  { id: "sparkit", name: "Sparkit", kind: "pocketling", emoji: "🐱‍🔥" },
  { id: "emberling", name: "Emberling", kind: "pocketling", emoji: "🔥" },
  { id: "pebblo", name: "Pebblo", kind: "pocketling", emoji: "🪨" },
  { id: "cindpup", name: "Cindpup", kind: "pocketling", emoji: "🐕‍🦺" },
  { id: "rocknug", name: "Rocknug", kind: "pocketling", emoji: "🗿" },

  // --- Level 2 lesson rewards (Mossy Woods) ---
  { id: "mosslet", name: "Mosslet", kind: "pocketling", emoji: "🐸" },
  { id: "barkub", name: "Barkub", kind: "pocketling", emoji: "🐨" },
  { id: "fernfly", name: "Fernfly", kind: "pocketling", emoji: "🦋" },
  { id: "spriggo", name: "Spriggo", kind: "pocketling", emoji: "🌿" },
  { id: "dewdrop", name: "Dewdrop", kind: "pocketling", emoji: "💧" },

  // --- Level 3 lesson rewards (Crystal Lake) ---
  { id: "glimmr", name: "Glimmr", kind: "pocketling", emoji: "✨" },
  { id: "frostip", name: "Frostip", kind: "pocketling", emoji: "❄️" },
  { id: "bubblo", name: "Bubblo", kind: "pocketling", emoji: "🫧" },
  { id: "zaplet", name: "Zaplet", kind: "pocketling", emoji: "⚡" },
  { id: "splashy", name: "Splashy", kind: "pocketling", emoji: "🐬" },

  // --- Level 4 lesson rewards (Thunder Peak) ---
  { id: "thundo", name: "Thundo", kind: "pocketling", emoji: "🌩️" },
  { id: "voltip", name: "Voltip", kind: "pocketling", emoji: "🔋" },
  { id: "zephyr", name: "Zephyr", kind: "pocketling", emoji: "🌪️" },
  { id: "boomer", name: "Boomer", kind: "pocketling", emoji: "💥" },
  { id: "stormy", name: "Stormy", kind: "pocketling", emoji: "⛈️" },

  // --- Region bosses ---
  { id: "magmoth", name: "Magmoth", kind: "pocketling", emoji: "🦣" },
  { id: "treemunch", name: "Treemunch", kind: "pocketling", emoji: "🌳" },
  { id: "prismaw", name: "Prismaw", kind: "pocketling", emoji: "💎" },
  { id: "galestrike", name: "Galestrike", kind: "pocketling", emoji: "🦅" },

  // --- Dinosaurs (unit-completion egg hatches) ---
  {
    id: "rexy",
    name: "Rexy the T. rex",
    kind: "dino",
    emoji: "🦖",
    funFact: "Tyrannosaurus rex had teeth as big as bananas!",
  },
  {
    id: "trikey",
    name: "Trikey the Triceratops",
    kind: "dino",
    emoji: "🦕",
    funFact: "Triceratops had three horns and a big bony frill on its head.",
  },
  {
    id: "steggo",
    name: "Steggo the Stegosaurus",
    kind: "dino",
    emoji: "🦎",
    funFact: "Stegosaurus had spiky plates on its back and a tail full of spikes.",
  },
  {
    id: "ptera",
    name: "Ptera the Pteranodon",
    kind: "dino",
    emoji: "🦅",
    funFact: "Pteranodon could fly with wings wider than a school bus!",
  },
  {
    id: "bronto",
    name: "Bronto the Brontosaurus",
    kind: "dino",
    emoji: "🦕",
    funFact: "Brontosaurus had a super long neck to reach the tallest leaves.",
  },
  {
    id: "raptar",
    name: "Raptar the Raptor",
    kind: "dino",
    emoji: "🐊",
    funFact: "Velociraptors were fast, feathered, and hunted in packs.",
  },
  {
    id: "ankylo",
    name: "Ankylo the Ankylosaurus",
    kind: "dino",
    emoji: "🐢",
    funFact: "Ankylosaurus had armor like a tank and a club on its tail.",
  },
  {
    id: "spinno",
    name: "Spinno the Spinosaurus",
    kind: "dino",
    emoji: "🐉",
    funFact: "Spinosaurus loved water and was even bigger than T. rex!",
  },
];

export const CREATURE_BY_ID: Record<string, Creature> = Object.fromEntries(
  CREATURES.map((c) => [c.id, c]),
);
