import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { WordBuildActivity } from "../../content/types";
import { segmentIntoTiles } from "../../lib/decodability";
import { speakPhoneme, speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/** "You do" — build the spoken word by tapping grapheme tiles into order. */
export function WordBuild({ activity, onComplete }: ActivityProps<WordBuildActivity>) {
  const answer = useMemo(() => segmentIntoTiles(activity.word), [activity.word]);
  const shuffled = useMemo(
    () => answer.map((g, i) => ({ g, id: i })).sort(() => Math.random() - 0.5),
    [answer],
  );
  const [placed, setPlaced] = useState<number[]>([]); // ids in the answer row
  const [done, setDone] = useState(false);
  const [wrongTaps, setWrongTaps] = useState(0);

  const usedIds = new Set(placed);
  const nextSlot = placed.length;

  function tapTile(id: number, g: string) {
    if (done || usedIds.has(id)) return;
    if (g !== answer[nextSlot]) {
      sfx.gentle();
      setWrongTaps((n) => n + 1); // wrong tile: counts against first-try mastery
      return;
    }
    speakPhoneme(g);
    const next = [...placed, id];
    setPlaced(next);
    if (next.length === answer.length) {
      setDone(true);
      sfx.correct();
      const firstTry = wrongTaps === 0;
      setTimeout(() => speakWord(activity.word), 200);
      setTimeout(
        () =>
          onComplete({
            graded: true,
            items: 1,
            firstTryCorrect: firstTry ? 1 : 0,
            misses: firstTry ? [] : [activity.word],
          }),
        1300,
      );
    }
  }

  return (
    <ActivityFrame instruction="Build the word!">
      <div className="mb-4 text-8xl" aria-hidden>
        {activity.emoji}
      </div>
      {/* Answer slots */}
      <div className="mb-10 flex gap-3">
        {answer.map((g, i) => (
          <div
            key={i}
            className={`flex h-20 w-20 items-center justify-center rounded-2xl border-4 text-5xl font-reader font-bold shadow ${
              i < placed.length ? "border-brand bg-brand-light text-white" : "border-dashed border-brand-light bg-white/50"
            }`}
          >
            {i < placed.length ? g : ""}
          </div>
        ))}
      </div>
      {/* Tile tray */}
      <div className="flex flex-wrap justify-center gap-3">
        {shuffled.map(({ g, id }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.9 }}
            onClick={() => tapTile(id, g)}
            disabled={usedIds.has(id)}
            className={`flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-brand-light bg-white text-5xl font-reader font-bold text-brand-dark shadow-md ${
              usedIds.has(id) ? "opacity-20" : ""
            }`}
          >
            {g}
          </motion.button>
        ))}
      </div>
    </ActivityFrame>
  );
}
