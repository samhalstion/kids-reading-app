import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { MinimalPairActivity } from "../../content/types";
import { speak, speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/**
 * Short vs long vowel contrast (e.g. tap / tape). Hear a word, tap the match.
 * (Used from Level 5 onward.)
 */
export function MinimalPair({ activity, onComplete }: ActivityProps<MinimalPairActivity>) {
  // Randomly ask for one of the two.
  const targetIdx = useMemo(() => Math.floor(Math.random() * 2), []);
  const target = activity.pair[targetIdx];
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  function choose(i: number) {
    if (done) return;
    speakWord(activity.pair[i]);
    if (i === targetIdx) {
      sfx.correct();
      setDone(true);
      const firstTry = wrong.size === 0;
      setTimeout(
        () =>
          onComplete({
            graded: true,
            items: 1,
            firstTryCorrect: firstTry ? 1 : 0,
            misses: firstTry ? [] : [target],
          }),
        900,
      );
    } else {
      sfx.gentle();
      setWrong((w) => new Set(w).add(i));
    }
  }

  return (
    <ActivityFrame instruction="Tap the word you hear" autoSpeak={false}>
      <BigButton variant="soft" className="mb-8" onClick={() => speak(target)}>
        🔊 Hear it
      </BigButton>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {activity.pair.map((w, i) => {
          const isWrong = wrong.has(i);
          const isRight = done && i === targetIdx;
          return (
            <motion.button
              key={w}
              whileTap={{ scale: 0.92 }}
              animate={isWrong ? { x: [0, -8, 8, -8, 0] } : {}}
              onClick={() => choose(i)}
              disabled={isWrong}
              className={`flex flex-col items-center gap-2 rounded-3xl px-8 py-6 shadow-lg transition-colors ${
                isRight ? "bg-green-300" : isWrong ? "bg-red-200 opacity-50" : "bg-white"
              }`}
            >
              <span className="text-6xl">{activity.emojis[i]}</span>
              <span className="font-reader text-4xl font-bold text-brand-dark">{w}</span>
            </motion.button>
          );
        })}
      </div>
    </ActivityFrame>
  );
}
