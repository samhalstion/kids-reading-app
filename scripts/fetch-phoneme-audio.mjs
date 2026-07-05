// Downloads generated phoneme clips into src/assets/audio/phonemes/.
// Run on a machine WITH internet (the CI sandbox blocks the CDN):
//
//   node scripts/fetch-phoneme-audio.mjs
//
// Add entries to CLIPS as more sounds are generated. Each file is saved as
// <id>.wav and auto-registers via src/lib/phonemeAudio.ts. See docs/AUDIO.md for
// the full list of sounds to generate and the suggested input for each.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/audio/phonemes");
const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3G0O2bTfeHKb067N8sLYFMSxSD7";

// Starter set already generated (voice: "Gia"). id = grapheme id.
const CLIPS = [
  { id: "s", file: "hf_20260705_192219_e9912546-63ac-485f-99b1-469c28cc700c.wav" },
  { id: "a", file: "hf_20260705_195805_3fa42dcd-fd7b-4f80-90f9-d83ffa389376.wav" },
  { id: "o", file: "hf_20260705_192321_e9969d22-65cd-4173-9bf8-8181b4d82b46.wav" },
  { id: "t", file: "hf_20260705_192355_99c6c1d5-7b65-4751-a16a-ea1eba40417f.wav" },
  { id: "p", file: "hf_20260705_195712_37d38b6b-1d4e-46ac-8937-0b9058078ffd.wav" },
  { id: "sh", file: "hf_20260705_192402_ba5bc251-31b1-49b1-992b-9212b501d3cf.wav" },
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
console.log(`\nDone: ${ok}/${CLIPS.length} clips. Run \`npm run build\` and the app uses them.`);
