import { motion } from "framer-motion";
import { PHONEME_BY_ID } from "../../content/phonemes";
import type { SoundTapActivity } from "../../content/types";
import { speakPhoneme, speakPhonemeWithExample } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import { EXPLORATORY, type ActivityProps } from "./types";

/** "I do" — model a new letter-sound. Tap the letter to hear its sound. */
export function SoundTap({ activity, onComplete }: ActivityProps<SoundTapActivity>) {
  const p = PHONEME_BY_ID[activity.graphemeId];
  if (!p) return null;

  return (
    <ActivityFrame instruction={`This says ${p.say}`} replay={`${p.say}. ${p.example}.`}>
      <div className="flex flex-col items-center gap-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            sfx.tap();
            speakPhoneme(p.id);
          }}
          className="flex h-44 w-44 items-center justify-center rounded-3xl bg-white text-8xl font-reader font-bold text-brand shadow-xl"
          aria-label={`The letter ${p.grapheme}`}
        >
          {p.grapheme}
        </motion.button>

        <button
          onClick={() => speakPhonemeWithExample(p.id)}
          className="flex items-center gap-3 rounded-full bg-white/80 px-6 py-3 text-3xl shadow"
        >
          <span>{p.exampleEmoji}</span>
          <span className="font-reader font-bold text-brand-dark">{p.example}</span>
        </button>

        <BigButton onClick={() => onComplete(EXPLORATORY)}>I said it! ✅</BigButton>
      </div>
    </ActivityFrame>
  );
}
