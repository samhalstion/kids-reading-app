import { useState } from "react";
import { motion } from "framer-motion";
import type { SentenceReadActivity, StoryReadActivity } from "../../content/types";
import { STORY_BY_ID } from "../../content/stories";
import { speak, speakWord } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { ActivityFrame } from "./common";
import { EXPLORATORY, type ActivityProps } from "./types";

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

export function StoryRead({
  activity,
  onComplete,
}: ActivityProps<StoryReadActivity | SentenceReadActivity>) {
  const story = STORY_BY_ID[activity.storyId];
  const [page, setPage] = useState(0);
  if (!story) return null;
  const last = page === story.pages.length - 1;
  const p = story.pages[page];

  return (
    <ActivityFrame instruction={story.title} autoSpeak={false}>
      <motion.div
        key={page}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="text-9xl" aria-hidden>
          {p.emoji}
        </div>
        <Sentence text={p.text} />
      </motion.div>

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
              sfx.correct();
              onComplete(EXPLORATORY);
            } else {
              sfx.tap();
              setPage((n) => n + 1);
            }
          }}
        >
          {last ? "The End 🎉" : "➡️"}
        </BigButton>
      </div>
    </ActivityFrame>
  );
}
