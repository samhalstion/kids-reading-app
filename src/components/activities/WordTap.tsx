import { useState } from "react";
import { motion } from "framer-motion";
import type { WordTapActivity } from "../../content/types";
import { speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/** Independent decoding practice — tap any word to hear it. Explore, then done. */
export function WordTap({ activity, onComplete }: ActivityProps<WordTapActivity>) {
  const [tapped, setTapped] = useState<Set<string>>(new Set());
  const allTapped = tapped.size >= activity.words.length;

  return (
    <ActivityFrame instruction="Tap each word to read it!">
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {activity.words.map((w) => (
          <motion.button
            key={w}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              sfx.tap();
              speakWord(w);
              setTapped((s) => new Set(s).add(w));
            }}
            className={`min-h-tap rounded-2xl px-6 py-4 font-reader text-4xl font-bold shadow-md transition-colors ${
              tapped.has(w) ? "bg-brand-light text-white" : "bg-white text-brand-dark"
            }`}
          >
            {w}
          </motion.button>
        ))}
      </div>
      <BigButton onClick={onComplete} disabled={!allTapped}>
        {allTapped ? "All done! ➡️" : "Tap them all 👆"}
      </BigButton>
    </ActivityFrame>
  );
}
