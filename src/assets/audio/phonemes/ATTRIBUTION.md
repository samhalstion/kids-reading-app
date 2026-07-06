# Phoneme audio — attribution & license

## Where the app is headed: one license-clean voice

A full replacement set — all 41 canonical sounds — has been generated with
**Higgsfield / ByteDance Seed Audio** (voice "Gia") and is listed with URLs in
`scripts/fetch-phoneme-audio.mjs`. Running that script on a networked machine
writes every `<id>.wav` and **deletes the AGPL `.mp3` clips described below**,
leaving a single, consistent, permissively-usable voice with no copyleft
obligation. Aliased graphemes (`ss`, `ck`, `wh`, `oy`, …) reuse a canonical clip
via the alias map in `src/lib/phonemeAudio.ts`.

The Seed Audio clips are synthetic TTS, not covered by AGPL. Once the swap is
done, delete the "Legacy clips" section below.

> Not yet applied in this checkout: the build sandbox's egress policy blocks the
> audio CDN (403), so the `.wav` bytes can't be committed from here. Until the
> fetch script is run, the app uses the legacy `.mp3` clips (and TTS for any
> grapheme without one) — nothing breaks.

## Legacy clips — Instalabs, LLC (AGPL-3.0)

The human-recorded `.mp3` letter-sound clips currently in this folder come from
the **early-reader-app** project by **Instalabs, LLC**:

- Source: https://github.com/melvinmt/early-reader-app (`assets/en-US/*/audio.mp3`)
- License: **GNU Affero General Public License v3.0 (AGPL-3.0)**
- © 2025–2026 Instalabs, LLC

These are clean, human-recorded DISTAR-method phoneme sounds. Files are renamed to
this app's grapheme ids (e.g. `001-m/audio.mp3` → `m.mp3`, `727-long-a` → `a_e.mp3`).

**License note:** AGPL-3.0 is a strong copyleft license. Using these audio assets
is fine for a personal / non-commercial reading app whose source is available.
If this app is ever distributed or offered as a network service, AGPL-3.0
obligations apply to the combined work (make corresponding source available).
The Seed Audio set above exists to avoid the copyleft entirely — run the fetch
script and these `.mp3` files are removed automatically.
