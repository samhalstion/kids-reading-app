# Recorded phoneme audio

Drop clips here named by **grapheme id** — `s.wav`, `a.wav`, `sh.wav`, `a_e.wav`,
`ar.wav`, etc. They are picked up automatically at build time
(`src/lib/phonemeAudio.ts`) and used by `speakPhoneme()`; any grapheme without a
clip falls back to the text-to-speech approximation.

You do **not** need one file per grapheme — several graphemes share a sound and
reuse one clip via the alias map in `phonemeAudio.ts` (e.g. `ss`→`s`, `ck`→`k`,
`ai`/`ay`→`a_e`). See `docs/AUDIO.md` for the full list of clips to record and the
suggested generation input for each.

To pull the already-generated starter clips onto a computer with internet:

```bash
node scripts/fetch-phoneme-audio.mjs
```

`.wav` and `.mp3` are both supported.
