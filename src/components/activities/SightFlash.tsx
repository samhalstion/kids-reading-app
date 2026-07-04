import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SightFlashActivity } from "../../content/types";
import { speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/**
 * Heart-word flash cards. These words have irregular parts and are taught by
 * sight — tap to hear, then move on.
 */
export function SightFlash({ activity, onComplete }: ActivityProps<SightFlashActivity>) {
  const [i, setI] = useState(0);
  const word = activity.words[i];
  const last = i === activity.words.length - 1;

  function next() {
    if (last) {
      onComplete();
    } else {
      sfx.tap();
      setI((n) => n + 1);
    }
  }

  return (
    <ActivityFrame instruction="Heart words — read by heart!" autoSpeak={false}>
      <AnimatePresence mode="wait">
        <motion.button
          key={word}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => speakWord(word)}
          className="mb-10 flex h-48 w-72 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-200 to-purple-200 font-reader text-7xl font-bold text-brand-dark shadow-xl"
        >
          {word} <span className="ml-2 text-4xl">❤️</span>
        </motion.button>
      </AnimatePresence>
      <BigButton onClick={next}>{last ? "Done! ✅" : "Next ➡️"}</BigButton>
      <p className="mt-4 text-lg text-brand-dark/60">
        {i + 1} / {activity.words.length}
      </p>
    </ActivityFrame>
  );
}
