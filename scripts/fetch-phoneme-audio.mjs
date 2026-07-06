// Downloads the recorded phoneme clips into src/assets/audio/phonemes/.
// Run on a machine WITH internet (the build sandbox's egress policy blocks the
// CDN with a 403):
//
//   node scripts/fetch-phoneme-audio.mjs
//
// Each file is saved as <id>.wav and auto-registers via src/lib/phonemeAudio.ts
// (no code change needed). CLIPS below is the FULL canonical set — all 41
// non-aliased sounds — generated with Higgsfield / ByteDance Seed Audio
// (voice "Gia"). Aliased graphemes (ss, ck, wh, ai, oy, ...) reuse a canonical
// clip via the alias map, so they need no file of their own.
//
// LICENSE: this set replaces the human-recorded AGPL-3.0 clips that shipped as
// `.mp3`. Once every clip downloads cleanly, this script deletes the leftover
// `.mp3` files so the bundled audio is a single permissively-usable voice with
// no copyleft obligation. See docs/AUDIO.md and the folder's ATTRIBUTION.md.

import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/audio/phonemes");
const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3G0O2bTfeHKb067N8sLYFMSxSD7";

// id = grapheme id (the canonical sound). Suggested TTS input for each is in
// the docs/AUDIO.md table; regenerate an entry and swap its filename here if a
// sound needs a better take.
const CLIPS = [
  // Consonants
  { id: "s", file: "hf_20260705_192219_e9912546-63ac-485f-99b1-469c28cc700c.wav" },
  { id: "t", file: "hf_20260705_192355_99c6c1d5-7b65-4751-a16a-ea1eba40417f.wav" },
  { id: "p", file: "hf_20260705_195712_37d38b6b-1d4e-46ac-8937-0b9058078ffd.wav" },
  { id: "n", file: "hf_20260706_014341_aae7f6c0-e255-44d8-b457-e338a309a424.wav" },
  { id: "m", file: "hf_20260706_014344_52c8f603-ae80-498b-ba42-d390f70918af.wav" },
  { id: "d", file: "hf_20260706_014345_0a463d25-a12c-4c2d-b1a0-f3f21309c2d2.wav" },
  { id: "g", file: "hf_20260706_014346_868a06ad-fa46-466f-b02e-55718575f822.wav" },
  { id: "k", file: "hf_20260706_014347_8ba1c81a-a032-4fb1-8cd0-e4c8fa756aef.wav" },
  { id: "r", file: "hf_20260706_014411_ad4df688-5540-4621-b9da-a9ab61eec1c6.wav" },
  { id: "h", file: "hf_20260706_014412_f5b832d1-9ad8-4361-8b5f-ceecb839d02c.wav" },
  { id: "b", file: "hf_20260706_014413_6b8f47d7-0c2e-4551-932c-3e9e03d05f20.wav" },
  { id: "f", file: "hf_20260706_014414_6c8103d5-e748-4709-bae2-db54c038d168.wav" },
  { id: "l", file: "hf_20260706_014415_fea8ec87-b5ff-40f4-aaf4-969d5ac54611.wav" },
  { id: "j", file: "hf_20260706_014416_fe9237d2-08f2-46de-8b32-5c0b3564bfbf.wav" },
  { id: "v", file: "hf_20260706_014417_d8e2b063-e229-49fd-bb01-9a06609e318a.wav" },
  { id: "w", file: "hf_20260706_014418_39753dfc-cc0a-4acc-8372-05a112c91f9d.wav" },
  { id: "y", file: "hf_20260706_014429_46c9f342-e0ba-42a6-855e-4e4885b44983.wav" },
  { id: "x", file: "hf_20260706_014452_6e9264bd-f001-4446-86f1-97e31ecf82ce.wav" },
  { id: "z", file: "hf_20260706_014453_c8bb99bc-c69b-43f0-8c91-4f9a45edf32b.wav" },
  { id: "qu", file: "hf_20260706_014454_9073e7c2-1a33-425f-984f-1abac023a72d.wav" },

  // Consonant digraphs
  { id: "sh", file: "hf_20260705_192402_ba5bc251-31b1-49b1-992b-9212b501d3cf.wav" },
  { id: "ch", file: "hf_20260706_014455_9175b6b6-7e93-4f77-843b-65bbc0f3a1f0.wav" },
  { id: "th", file: "hf_20260706_014434_45ad13ff-cb66-4a04-8627-d59135a8e096.wav" },
  { id: "ng", file: "hf_20260706_014456_c4310120-d32c-4350-b123-51d63c0746b9.wav" },

  // Short vowels
  { id: "a", file: "hf_20260705_195805_3fa42dcd-fd7b-4f80-90f9-d83ffa389376.wav" },
  { id: "o", file: "hf_20260705_192321_e9969d22-65cd-4173-9bf8-8181b4d82b46.wav" },
  { id: "i", file: "hf_20260706_014341_b64f5607-4cc9-4915-a97d-97c582f6862e.wav" },
  { id: "e", file: "hf_20260706_014348_c5d65237-8d81-413a-968e-aa559cc5b60b.wav" },
  { id: "u", file: "hf_20260706_014348_914152c7-e342-478b-aa08-e0cc8d23aef9.wav" },

  // Long vowels (split digraphs) + vowel teams
  { id: "a_e", file: "hf_20260706_014436_95e0e4a3-7da8-4ab2-ad92-65930cb0d178.wav" },
  { id: "i_e", file: "hf_20260706_014457_3c596f22-397f-4fb6-9494-92f52dc8836f.wav" },
  { id: "o_e", file: "hf_20260706_014507_f54f975d-e230-4d61-99a8-aab6dd85b638.wav" },
  { id: "u_e", file: "hf_20260706_014509_143a9c92-8f2d-4ffd-9019-831504866491.wav" },
  { id: "e_e", file: "hf_20260706_014525_5297ed18-6234-462e-b5ea-9f629285ccdb.wav" },
  { id: "oo", file: "hf_20260706_014511_d1fff079-5023-44f6-a20a-246051f7f7f2.wav" },

  // R-controlled vowels + diphthongs
  { id: "ar", file: "hf_20260706_014526_bf50f677-5a7e-452a-a103-9eebcaa2b7d9.wav" },
  { id: "or", file: "hf_20260706_013316_1c73c103-3de0-4176-a1c9-9334582f4777.wav" },
  { id: "er", file: "hf_20260706_014527_338c14d0-8c00-4643-ad9b-e58fd27707e4.wav" },
  { id: "oi", file: "hf_20260706_013316_54a6987c-7e3a-4918-87d2-73452f503c9f.wav" },
  { id: "ou", file: "hf_20260706_014527_6ebc5546-31a2-48dc-beb4-0cb6149be705.wav" },
  { id: "aw", file: "hf_20260706_013637_531cd854-6af9-482b-beed-98432fa07474.wav" },
];

await mkdir(OUT, { recursive: true });
let ok = 0;
for (const { id, file } of CLIPS) {
  try {
    const res = await fetch(`${BASE}/${file}`);
    if (!res.ok) {
      console.error(`FAIL ${id}: HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(join(OUT, `${id}.wav`), buf);
    console.log(`saved ${id}.wav (${buf.length} bytes)`);
    ok++;
  } catch (e) {
    console.error(`FAIL ${id}:`, e.message);
  }
}

console.log(`\nDone: ${ok}/${CLIPS.length} clips.`);

// Only swap out the old AGPL .mp3 recordings once the full .wav set is present,
// so the app never ends up with missing audio.
if (ok === CLIPS.length) {
  const stale = (await readdir(OUT)).filter((f) => f.endsWith(".mp3"));
  for (const f of stale) {
    await unlink(join(OUT, f));
    console.log(`removed AGPL clip ${f}`);
  }
  if (stale.length) {
    console.log(
      `\nReplaced ${stale.length} AGPL .mp3 clips with the Seed Audio .wav set. ` +
        `You can now delete the AGPL section from ATTRIBUTION.md.`,
    );
  }
} else {
  console.log(
    `\nSome clips failed — keeping the existing .mp3 fallbacks. Re-run once the ` +
      `failures resolve to complete the license-clean swap.`,
  );
}
console.log(`Run \`npm run build\` and the app uses the recorded clips.`);
