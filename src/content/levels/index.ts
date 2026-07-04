import type { Level } from "../types";
import { level1 } from "./level1";
import { level2 } from "./level2";
import { level3 } from "./level3";
import { level4 } from "./level4";

// Levels 1–4 (this build). Levels 5–8 (silent-e, vowel teams, r-controlled,
// multisyllable) plug in here as they are authored.
export const LEVELS: Level[] = [level1, level2, level3, level4];
