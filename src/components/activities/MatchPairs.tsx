import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { MatchPairsActivity } from "../../content/types";
import { speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/** Match each word to its picture. Reinforces whole-word recognition. */
export function MatchPairs({ activity, onComplete }: ActivityProps<MatchPairsActivity>) {
  const pics = useMemo(() => [...activity.pairs].sort(() => Math.random() - 0.5), [activity]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());

  function tapWord(word: string) {
    if (matched.has(word)) return;
    sfx.tap();
    speakWord(word);
    setSelectedWord(word);
  }

  function tapPic(word: string) {
    if (matched.has(word) || !selectedWord) return;
    if (word === selectedWord) {
      const next = new Set(matched).add(word);
      setMatched(next);
      setSelectedWord(null);
      sfx.correct();
      if (next.size === activity.pairs.length) setTimeout(onComplete, 800);
    } else {
      sfx.gentle();
      setSelectedWord(null);
    }
  }

  return (
    <ActivityFrame instruction="Match the word to the picture!">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          {activity.pairs.map((p) => (
            <motion.button
              key={p.word}
              whileTap={{ scale: 0.94 }}
              onClick={() => tapWord(p.word)}
              disabled={matched.has(p.word)}
              className={`min-h-tap rounded-2xl px-6 py-3 font-reader text-3xl font-bold shadow transition-colors ${
                matched.has(p.word)
                  ? "bg-green-300 text-white"
                  : selectedWord === p.word
                    ? "bg-brand text-white"
                    : "bg-white text-brand-dark"
              }`}
            >
              {p.word}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {pics.map((p) => (
            <motion.button
              key={p.word}
              whileTap={{ scale: 0.94 }}
              onClick={() => tapPic(p.word)}
              disabled={matched.has(p.word)}
              className={`flex min-h-tap items-center justify-center rounded-2xl px-6 py-3 text-5xl shadow transition-colors ${
                matched.has(p.word) ? "bg-green-300" : "bg-white"
              }`}
              aria-label={matched.has(p.word) ? p.word : "picture"}
            >
              {p.emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </ActivityFrame>
  );
}
