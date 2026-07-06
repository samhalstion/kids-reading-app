# Recorded phoneme audio — how to finish it

The app plays letter-sounds with browser text-to-speech as a **stopgap**. TTS
can't hold a smooth, accurate isolated phoneme, so the plan is to replace it with
short **recorded clips**. The plumbing is already in place:

- Clips live in `src/assets/audio/phonemes/<id>.wav` (or `.mp3`).
- `src/lib/phonemeAudio.ts` auto-registers them (Vite glob) and maps shared
  sounds via an alias table, so you only record the ~31 canonical sounds below.
- `speakPhoneme()` uses a clip when present and falls back to TTS otherwise —
  so you can add clips incrementally and nothing breaks.

## Status

**The full canonical set — all 41 non-aliased sounds — is generated** (voice
**"Gia"**, ByteDance Seed Audio, ~0.1 credits each) and listed with URLs in
`scripts/fetch-phoneme-audio.mjs`. Run it once on any machine with internet:

```bash
node scripts/fetch-phoneme-audio.mjs   # writes every <id>.wav, deletes old .mp3s
npm run build
```

This replaces the human-recorded **AGPL-3.0** `.mp3` clips (see `ATTRIBUTION.md`)
with one consistent, permissively-usable voice across the whole catalog — no
more copyleft obligation. The script only deletes the `.mp3` files after all
clips download cleanly, so the app never ends up silent.

> Why not committed from the build sandbox: its egress policy blocks the
> Higgsfield CDN (403), so the generated `.wav` bytes must be fetched from a
> normal machine. Until then those graphemes keep using the bundled `.mp3`
> clips (or TTS where none exists) — nothing breaks.

**Spot-check before committing:** the stop consonants (`b d g k p t`) and
affricates (`ch j`) carry a light schwa from any TTS voice — listen to those
and the ⚠️ sounds below, and regenerate an entry (swap its filename in the
script) if one is off.

## Canonical clips to record

Save each as `src/assets/audio/phonemes/<canonical id>.wav`. "Reused by" graphemes
need no file of their own. **Spot-check the ⚠️ ones** — short vowels, `ng`, and the
`ou` diphthong are the hardest for any voice; regenerate with a tweaked input if
they sound off.

| Canonical id | Sound (key word) | Suggested TTS input | Reused by |
|---|---|---|---|
| s | /s/ (snake) | `sssss` | ss |
| a | short a (apple) ⚠️ | `aa` | |
| t | /t/ (top) | `tuh` | |
| p | /p/ (pig) | `puh` | |
| i | short i (insect) ⚠️ | `ih` | |
| n | /n/ (net) | `nnnnn` | |
| m | /m/ (moon) | `mmmmm` | |
| d | /d/ (dog) | `duh` | |
| g | /g/ (goat) | `guh` | |
| o | short o (octopus) ⚠️ | `ah` | |
| k | /k/ (cat) | `kuh` | c, ck |
| e | short e (egg) ⚠️ | `eh` | |
| u | short u (up) ⚠️ | `uh` | |
| r | /r/ (rat) | `rrrrr` | |
| h | /h/ (hat) | `huh` | |
| b | /b/ (ball) | `buh` | |
| f | /f/ (fish) | `fffff` | ff |
| l | /l/ (leaf) | `lllll` | ll |
| j | /j/ (jam) | `juh` | |
| v | /v/ (van) | `vvvvv` | |
| w | /w/ (web) | `wuh` | wh |
| x | /ks/ (fox) | `kss` | |
| y | /y/ (yo-yo) | `yuh` | |
| z | /z/ (zebra) | `zzzzz` | zz |
| qu | /kw/ (queen) | `kwuh` | |
| ch | /ch/ (chick) | `chuh` | |
| th | /th/ (thumb) | `thuh` | |
| ng | /ng/ (ring) ⚠️ | `nng` | |
| a_e | long a (cake) | `ay` | ai, ay |
| i_e | long i (bike) | `eye` | igh |
| o_e | long o (bone) | `oh` | oa, ow |
| u_e | long u (cube) | `yoo` | |
| e_e | long e (Pete) | `ee` | ee, ea |
| oo | /oo/ (moon) | `ooo` | |
| ar | /ar/ (car) | `ar` | |
| or | /or/ (corn) | `or` | |
| er | /er/ (her) | `er` | ir, ur |
| oi | /oi/ (coin) | `oy` | oy |
| ou | /ow/ (cloud) ⚠️ | `ow` | |
| aw | /aw/ (paw) | `aw` | |

## Generating a clip (Higgsfield Seed Audio)

`generate_audio(model:"seed_audio", prompt:<input>, voice_type:"preset",
voice_id:"530df032-c311-483b-a750-cb3c9e1bcdfd")` → poll `show_generations` for
`results.rawUrl` → download to `src/assets/audio/phonemes/<id>.wav`. Then
`npm run build`. Also worth recording later: natural read-alouds of the practice
words/stories (replace `speakWord`), for the same smoothness win on connected text.
