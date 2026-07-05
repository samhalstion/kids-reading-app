import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ComprehendMCActivity } from "../../content/types";
import { speak } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { ActivityFrame } from "./common";
import type { ActivityProps } from "./types";

/** Comprehension check — answer picture/text multiple choice after a story. */
export function ComprehendMC({ activity, onComplete }: ActivityProps<ComprehendMCActivity>) {
  const [qi, setQi] = useState(0);
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [answered, setAnswered] = useState(false);
  const firstTryCorrect = useRef(0);
  const q = activity.questions[qi];
  const lastQ = qi === activity.questions.length - 1;

  function choose(i: number) {
    if (answered) return;
    const c = q.choices[i];
    speak(c.text);
    if (c.correct) {
      sfx.correct();
      setAnswered(true);
      if (wrong.size === 0) firstTryCorrect.current += 1;
      setTimeout(() => {
        if (lastQ) {
          onComplete({
            graded: true,
            items: activity.questions.length,
            firstTryCorrect: firstTryCorrect.current,
            misses: [],
          });
        } else {
          setQi((n) => n + 1);
          setWrong(new Set());
          setAnswered(false);
        }
      }, 1000);
    } else {
      sfx.gentle();
      setWrong((w) => new Set(w).add(i));
    }
  }

  return (
    <ActivityFrame instruction={q.prompt}>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {q.choices.map((c, i) => {
          const isWrong = wrong.has(i);
          const isRight = answered && c.correct;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.92 }}
              animate={isWrong ? { x: [0, -8, 8, -8, 0] } : {}}
              onClick={() => choose(i)}
              disabled={isWrong}
              className={`flex min-h-tap flex-col items-center gap-2 rounded-3xl px-8 py-6 shadow-lg transition-colors ${
                isRight ? "bg-green-300" : isWrong ? "bg-red-200 opacity-50" : "bg-white"
              }`}
            >
              {c.emoji && <span className="text-6xl">{c.emoji}</span>}
              <span className="font-reader text-3xl font-bold text-brand-dark">{c.text}</span>
            </motion.button>
          );
        })}
      </div>
      {activity.questions.length > 1 && (
        <p className="mt-6 text-lg text-brand-dark/60">
          Question {qi + 1} / {activity.questions.length}
        </p>
      )}
    </ActivityFrame>
  );
}
