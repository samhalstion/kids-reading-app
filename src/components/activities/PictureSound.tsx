import { useState } from "react";
import { motion } from "framer-motion";
import { PHONEME_BY_ID } from "../../content/phonemes";
import type { PictureSoundActivity } from "../../content/types";
import { speak, speakPhoneme } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/** Phonemic awareness — tap the picture that STARTS with the target sound. */
export function PictureSound({ activity, onComplete }: ActivityProps<PictureSoundActivity>) {
  const p = PHONEME_BY_ID[activity.graphemeId];
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  function choose(i: number) {
    if (done) return;
    const c = activity.choices[i];
    speak(c.word);
    if (c.correct) {
      sfx.correct();
      setDone(true);
      const firstTry = wrong.size === 0;
      setTimeout(
        () =>
          onComplete({
            graded: true,
            items: 1,
            firstTryCorrect: firstTry ? 1 : 0,
            misses: firstTry ? [] : [activity.graphemeId],
          }),
        900,
      );
    } else {
      sfx.gentle();
      setWrong((w) => new Set(w).add(i));
    }
  }

  return (
    <ActivityFrame
      instruction="Which picture starts with this sound?"
      replay={p?.say ?? ""}
    >
      <button
        onClick={() => speakPhoneme(activity.graphemeId)}
        className="mb-8 rounded-full bg-white px-8 py-4 text-5xl font-reader font-bold text-brand shadow-lg"
      >
        {p?.grapheme} 🔊
      </button>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {activity.choices.map((c, i) => {
          const isWrong = wrong.has(i);
          const isRight = done && c.correct;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              animate={isWrong ? { x: [0, -8, 8, -8, 0] } : {}}
              onClick={() => choose(i)}
              disabled={isWrong}
              className={`flex h-32 w-32 items-center justify-center rounded-3xl text-7xl shadow-lg transition-colors ${
                isRight ? "bg-green-300" : isWrong ? "bg-red-200 opacity-50" : "bg-white"
              }`}
              aria-label={c.word}
            >
              {c.emoji}
            </motion.button>
          );
        })}
      </div>
    </ActivityFrame>
  );
}
