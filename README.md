# 🦖 Monster Reader

A fun, tablet-first reading app that helps a kindergarten→1st-grade child learn to
read using **systematic synthetic phonics** — the instructional approach research
associates with strong early-reading outcomes. Themed around original "pocketling"
monsters and real dinosaurs to keep young readers motivated.

Designed for short (~10–15 min) daily sessions that build decoding skill step by
step. (Note: this is an in-progress learning tool, not a clinically validated
program — it makes no guaranteed outcome or timeframe claim. See the
launch-readiness review for current limitations.)

## How it teaches reading

- **One new letter-sound at a time**, in a high-utility order (`s a t p i n` first,
  so real words appear on day one) — not alphabetical.
- **Only decodable practice text.** Every word a child is asked to *read* is built
  from patterns already taught (plus a small set of "heart words" learned by
  sight). This rule is **enforced in code** (`src/lib/decodability.ts`) and checked
  by tests (`tests/decodability.test.ts`) so content can never run ahead of the child.
- **I do → we do → you do** in every lesson: the app models a sound, guides
  blending/building, then has the child read independently.
- **Audio-first, no reading required to navigate.** Everything is spoken via the
  browser's text-to-speech; tap any word to hear it.

### Curriculum (this build: Levels 1–4, 20 lessons)

| Region | Focus | Sounds |
|--------|-------|--------|
| 🌋 Ember Cave | First sounds + CVC words | `s a t p i n m d g o c k ck` |
| 🌲 Mossy Woods | All five short vowels | `e u r h b f l` |
| 💠 Crystal Lake | New consonants + blends | `j v w x y z qu zz ff ll ss` |
| ⛰️ Thunder Peak | Consonant digraphs | `sh ch th wh ng` |

Levels 5–8 (silent-e, vowel teams, r-controlled, multisyllable) are scaffolded in
the phoneme catalog and plug in as data — no engine changes needed.

## Activities

Data-driven activity types (`src/components/activities/`), one per skill: letter-sound
tap, initial-sound picture match, sound blending, word building, tap-to-hear word
grids, decodable story reading with word highlight, comprehension questions,
sight-word flash cards, and word↔picture matching. No timers, no "lives" — wrong
answers gently re-teach.

## Rewards

Complete a lesson → catch a **pocketling**. Finish a unit → hatch a **dinosaur egg**
(with a fun fact read aloud). Finish a region → unlock its **boss** + a **badge**.
Rewards appear *between* activities and never gate learning. Progress saves in the
browser (`localStorage`) — no accounts, no backend.

## Tech

React + Vite + TypeScript · Tailwind CSS · Zustand (persisted) · Framer Motion ·
Web Speech API (TTS) · Web Audio SFX · installable PWA (works offline).

## Develop

```bash
npm install
npm run dev        # local dev server
npm test           # decodability + content-integrity tests
npm run build      # production build (dist/)
npm run preview    # serve the production build

# Authoring helper: what's decodable by a given lesson?
npm run wordbank -- L2-U1-08 helmet frog the
```

## Deploy

Static SPA — deploy `dist/` to any static host. `vercel.json` is included for
Vercel; the app uses hash routing so it also works on GitHub Pages and plain file
hosts with no server config.

## Content model

All curriculum is typed data in `src/content/`:
- `phonemes.ts` — the ordered grapheme catalog (source of truth).
- `levels/level1..4.ts` — lessons, each declaring `newGraphemes`, `newHeartWords`,
  `targetWords`, and an `activities[]` list.
- `stories.ts` — decodable stories.
- `creatures.ts` — collectible monsters + dinosaurs.

To add content: add words/stories, then run `npm test`. A failing test means a word
uses a pattern not yet taught — fix it and you're guaranteed in-sequence.

## Roadmap

- Levels 5–8 content (through 2nd-grade patterns).
- Original generated creature/dino art (currently emoji placeholders).
- Recorded phoneme audio + SFX.
- Optional read-aloud scoring (speech recognition).
