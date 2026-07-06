import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { BlendActivity } from "../../content/types";
import { segmentIntoTiles } from "../../lib/decodability";
import { speak, speakWord, speakPhoneme } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/** "We do" — sound out the letters, blend them, then tap the matching picture. */
export function Blend({ activity, onComplete }: ActivityProps<BlendActivity>) {
  const tiles = useMemo(() => segmentIntoTiles(activity.word), [activity.word]);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState<Set<string>>(new Set());

  // Shuffle the correct picture in with the distractors (stable per mount).
  const choices = useMemo(
    () =>
      [
        { word: activity.word, emoji: activity.emoji, correct: true },
        ...activity.distractors.map((d) => ({ ...d, correct: false })),
      ].sort(() => Math.random() - 0.5),
    [activity],
  );

  function soundOut() {
    // Sound out each part, then blend into the whole word smoothly. Shorter gaps
    // read as connected blending rather than choppy, isolated letters.
    const gap = 430;
    tiles.forEach((t, i) => setTimeout(() => speakPhoneme(t), i * gap));
    setTimeout(() => speakWord(activity.word), tiles.length * gap + 200);
  }

  function choose(word: string, correct: boolean) {
    if (done) return;
    speak(word);
    if (correct) {
      sfx.correct();
      setDone(true);
      const firstTry = wrong.size === 0;
      setTimeout(
        () =>
          onComplete({
            graded: true,
            items: 1,
            firstTryCorrect: firstTry ? 1 : 0,
            misses: firstTry ? [] : [activity.word],
          }),
        900,
      );
    } else {
      sfx.gentle();
      setWrong((w) => new Set(w).add(word));
    }
  }

  return (
    <ActivityFrame instruction="Sound it out, then tap the picture!" autoSpeak={false}>
      <div className="mb-6 flex gap-3">
        {tiles.map((t, i) => (
          <motion.span
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl font-reader font-bold text-brand shadow"
          >
            {t}
          </motion.span>
        ))}
      </div>
      <BigButton variant="soft" onClick={soundOut} className="mb-8">
        🔊 Blend it
      </BigButton>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {choices.map((c) => {
          const isWrong = wrong.has(c.word);
          const isRight = done && c.correct;
          return (
            <motion.button
              key={c.word}
              whileTap={{ scale: 0.9 }}
              animate={isWrong ? { x: [0, -8, 8, -8, 0] } : {}}
              onClick={() => choose(c.word, c.correct)}
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
