import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SentenceReadActivity, StoryReadActivity } from "../../content/types";
import { STORY_BY_ID } from "../../content/stories";
import { speak, speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { useProgress, FLUENCY_GOAL } from "../../store/progress";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import { EXPLORATORY, type ActivityProps } from "./types";

// Reading the same decodable text a few times is the most evidence-backed way to
// build fluency (repeated reading). We nudge toward a second read — gently, with
// no timer and no gate: the child can always choose "I'm done". FLUENCY_GOAL and
// the persisted per-story tally live in the progress store.

/** A tappable decodable sentence with word-by-word highlight when read aloud. */
function Sentence({ text }: { text: string }) {
  const words = text.split(/(\s+)/); // keep spaces
  const [active, setActive] = useState(-1);

  function readAll() {
    // Map highlight to the non-space tokens.
    const wordIdxMap: number[] = [];
    words.forEach((w, i) => {
      if (w.trim()) wordIdxMap.push(i);
    });
    speak(text, {
      onWord: (n) => setActive(wordIdxMap[n] ?? -1),
      onEnd: () => setActive(-1),
    });
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="flex flex-wrap justify-center gap-x-1 text-center font-reader text-word font-bold leading-tight text-brand-dark">
        {words.map((w, i) =>
          w.trim() ? (
            <button
              key={i}
              onClick={() => {
                speakWord(w.replace(/[^A-Za-z]/g, ""));
                setActive(i);
              }}
              className={`rounded-xl px-1 transition-colors ${active === i ? "bg-yellow-300" : ""}`}
            >
              {w}
            </button>
          ) : (
            <span key={i}>{w}</span>
          ),
        )}
      </p>
      <BigButton variant="soft" onClick={readAll}>
        🔊 Read to me
      </BigButton>
    </div>
  );
}

/** A row of stars showing how many times the story has been read. */
function ReadStars({ reads }: { reads: number }) {
  const total = Math.max(FLUENCY_GOAL, reads);
  return (
    <div className="flex items-center gap-1" aria-label={`Read ${reads} times`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`text-2xl ${i < reads ? "" : "opacity-25 grayscale"}`}>
          ⭐
        </span>
      ))}
    </div>
  );
}

/** Celebration shown after each full read-through, encouraging one more read. */
function ReReadPanel({
  reads,
  onAgain,
  onDone,
}: {
  reads: number;
  onAgain: () => void;
  onDone: () => void;
}) {
  const reachedGoal = reads >= FLUENCY_GOAL;
  const title =
    reads === 1 ? "Great reading! 🌟" : reads === 2 ? "Two times! 🚀" : "Reading star! ⭐";
  const message =
    reads === 1
      ? "Read it again to get even smoother."
      : reads === 2
        ? "You read it twice — you're getting fluent!"
        : `Wow, you read it ${reads} times!`;

  // Speak the encouragement (audio-first: no reading required to understand it).
  useEffect(() => {
    const t = setTimeout(() => speak(message), 250);
    return () => clearTimeout(t);
  }, [message]);

  const again = (
    <BigButton key="again" variant={reachedGoal ? "soft" : "primary"} onClick={onAgain}>
      🔁 Read it again
    </BigButton>
  );
  const done = (
    <BigButton key="done" variant={reachedGoal ? "primary" : "soft"} onClick={onDone}>
      {reachedGoal ? "I'm done 🎉" : "I'm done ✓"}
    </BigButton>
  );

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <div className="text-8xl" aria-hidden>
        📖
      </div>
      <ReadStars reads={reads} />
      <h3 className="font-reader text-3xl font-bold text-brand-dark">{title}</h3>
      <p className="max-w-md font-reader text-xl text-brand-dark/70">{message}</p>
      {/* Nudge toward another read first, but never force it. */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        {reachedGoal ? [done, again] : [again, done]}
      </div>
    </motion.div>
  );
}

export function StoryRead({
  activity,
  onComplete,
}: ActivityProps<StoryReadActivity | SentenceReadActivity>) {
  const story = STORY_BY_ID[activity.storyId];
  const [page, setPage] = useState(0);
  const [reads, setReads] = useState(0);
  const [cheering, setCheering] = useState(false);
  if (!story) return null;
  const last = page === story.pages.length - 1;
  const p = story.pages[page];

  function finishRead() {
    const n = reads + 1;
    setReads(n);
    // Persist the read-through toward the lifetime fluency tally (grown-up dashboard).
    useProgress.getState().recordStoryRead(story.id);
    if (n >= FLUENCY_GOAL) sfx.unlock();
    else sfx.correct();
    setCheering(true);
  }

  function readAgain() {
    sfx.tap();
    setPage(0);
    setCheering(false);
  }

  return (
    <ActivityFrame instruction={story.title} autoSpeak={false}>
      <AnimatePresence mode="wait">
        {cheering ? (
          <ReReadPanel
            key="cheer"
            reads={reads}
            onAgain={readAgain}
            onDone={() => onComplete(EXPLORATORY)}
          />
        ) : (
          <motion.div
            key={`page-${page}`}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {reads > 0 && <ReadStars reads={reads} />}
            <div className="text-9xl" aria-hidden>
              {p.emoji}
            </div>
            <Sentence text={p.text} />
          </motion.div>
        )}
      </AnimatePresence>

      {!cheering && (
        <div className="mt-8 flex items-center gap-4">
          <BigButton
            variant="ghost"
            disabled={page === 0}
            onClick={() => setPage((n) => Math.max(0, n - 1))}
          >
            ⬅️
          </BigButton>
          <span className="text-lg text-brand-dark/60">
            {page + 1} / {story.pages.length}
          </span>
          <BigButton
            onClick={() => {
              if (last) {
                finishRead();
              } else {
                sfx.tap();
                setPage((n) => n + 1);
              }
            }}
          >
            {last ? "The End 🎉" : "➡️"}
          </BigButton>
        </div>
      )}
    </ActivityFrame>
  );
}
