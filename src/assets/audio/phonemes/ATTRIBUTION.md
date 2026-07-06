# Phoneme audio — attribution & license

The recorded letter-sound clips in this folder come from the **early-reader-app**
project by **Instalabs, LLC**:

- Source: https://github.com/melvinmt/early-reader-app (`assets/en-US/*/audio.mp3`)
- License: **GNU Affero General Public License v3.0 (AGPL-3.0)**
- © 2025–2026 Instalabs, LLC

These are clean, human-recorded DISTAR-method phoneme sounds. Files are renamed to
this app's grapheme ids (e.g. `001-m/audio.mp3` → `m.mp3`, `727-long-a` → `a_e.mp3`).

**License note:** AGPL-3.0 is a strong copyleft license. Using these audio assets
is fine for a personal / non-commercial reading app whose source is available.
If this app is ever distributed or offered as a network service, AGPL-3.0
obligations apply to the combined work (make corresponding source available). To
avoid the copyleft entirely, replace these clips with your own recordings or a
permissively-licensed / CC set and delete this folder's contents.

## The `or`, `oi`, `oy`, `aw` clips (different source)

These four sounds are **not** from the Instalabs set above. They were generated
with Higgsfield / ByteDance Seed Audio (voice "Gia") and are listed in
`scripts/fetch-phoneme-audio.mjs`. They are synthetic TTS clips (not AGPL) and
so carry no copyleft obligation; they are a slightly different voice than the
human `.mp3` recordings, which is unobtrusive because letter-sounds always play
in isolation. `oy` reuses the `oi` clip via the alias map in
`src/lib/phonemeAudio.ts`.

Until `node scripts/fetch-phoneme-audio.mjs` is run on a networked machine (the
build sandbox's egress policy blocks the audio CDN), these four graphemes fall
back to the built-in text-to-speech voice automatically — nothing breaks.
