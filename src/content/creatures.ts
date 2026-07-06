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

  // --- Level 5 lesson rewards (Sunbeam Meadow) ---
  { id: "beamkit", name: "Beamkit", kind: "pocketling", emoji: "🌟" },
  { id: "petalpop", name: "Petalpop", kind: "pocketling", emoji: "🌸" },
  { id: "sunbud", name: "Sunbud", kind: "pocketling", emoji: "🌻" },
  { id: "rayling", name: "Rayling", kind: "pocketling", emoji: "☀️" },
  { id: "glimflit", name: "Glimflit", kind: "pocketling", emoji: "🦋" },

  // --- Level 6 lesson rewards (Tidal Reef) ---
  { id: "coralet", name: "Coralet", kind: "pocketling", emoji: "🪸" },
  { id: "finneo", name: "Finneo", kind: "pocketling", emoji: "🐠" },
  { id: "wavelet", name: "Wavelet", kind: "pocketling", emoji: "🌊" },
  { id: "pearlkin", name: "Pearlkin", kind: "pocketling", emoji: "🦪" },
  { id: "tidepup", name: "Tidepup", kind: "pocketling", emoji: "🦭" },

  // --- Level 7 lesson rewards (Storm Coast) ---
  { id: "gustling", name: "Gustling", kind: "pocketling", emoji: "💨" },
  { id: "boulderk", name: "Boulderk", kind: "pocketling", emoji: "🪨" },
  { id: "sparkfin", name: "Sparkfin", kind: "pocketling", emoji: "🌩️" },
  { id: "cragple", name: "Cragple", kind: "pocketling", emoji: "⛰️" },
  { id: "windwhorl", name: "Windwhorl", kind: "pocketling", emoji: "🌀" },

  // --- Level 8 lesson rewards (Ancient Ruins) ---
  { id: "runeling", name: "Runeling", kind: "pocketling", emoji: "🔮" },
  { id: "fossilit", name: "Fossilit", kind: "pocketling", emoji: "🦴" },
  { id: "glyphmun", name: "Glyphmun", kind: "pocketling", emoji: "📜" },
  { id: "relicto", name: "Relicto", kind: "pocketling", emoji: "🏺" },
  { id: "chronox", name: "Chronox", kind: "pocketling", emoji: "⏳" },

  // --- Region bosses (Levels 5–8) ---
  { id: "solaris", name: "Solaris", kind: "pocketling", emoji: "🌞" },
  { id: "leviatide", name: "Leviatide", kind: "pocketling", emoji: "🐙" },
  { id: "cyclorag", name: "Cyclorag", kind: "pocketling", emoji: "🌪️" },
  { id: "titanor", name: "Titanor", kind: "pocketling", emoji: "🗿" },

  // --- Dinosaurs (Levels 5–8 unit hatches) ---
  {
    id: "diplo",
    name: "Diplo the Diplodocus",
    kind: "dino",
    emoji: "🦕",
    funFact: "Diplodocus was as long as three school buses lined up!",
  },
  {
    id: "iguan",
    name: "Iguan the Iguanodon",
    kind: "dino",
    emoji: "🦎",
    funFact: "Iguanodon had a spiky thumb it may have used to fight off enemies.",
  },
  {
    id: "plesio",
    name: "Plesio the Plesiosaur",
    kind: "dino",
    emoji: "🐊",
    funFact: "Plesiosaurs swam in the sea with four big flippers, like paddles.",
  },
  {
    id: "mosa",
    name: "Mosa the Mosasaurus",
    kind: "dino",
    emoji: "🐋",
    funFact: "Mosasaurus was a giant sea reptile with a tail like a shark's.",
  },
  {
    id: "allo",
    name: "Allo the Allosaurus",
    kind: "dino",
    emoji: "🦖",
    funFact: "Allosaurus was a fierce hunter long before T. rex existed.",
  },
  {
    id: "cerato",
    name: "Cerato the Ceratosaurus",
    kind: "dino",
    emoji: "🐲",
    funFact: "Ceratosaurus had a horn on its nose and bumps above its eyes.",
  },
  {
    id: "brachio",
    name: "Brachio the Brachiosaurus",
    kind: "dino",
    emoji: "🦕",
    funFact: "Brachiosaurus held its head high like a crane to eat treetops.",
  },
  {
    id: "giganto",
    name: "Giganto the Giganotosaurus",
    kind: "dino",
    emoji: "🦖",
    funFact: "Giganotosaurus was one of the biggest meat-eaters ever to walk on land.",
  },
];

export const CREATURE_BY_ID: Record<string, Creature> = Object.fromEntries(
  CREATURES.map((c) => [c.id, c]),
);
