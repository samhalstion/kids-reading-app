import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  grapheme: string;
  state?: "idle" | "correct" | "wrong" | "placed";
  size?: "md" | "lg";
}

const STATES: Record<NonNullable<Props["state"]>, string> = {
  idle: "bg-white text-brand-dark border-brand-light",
  correct: "bg-green-400 text-white border-green-600",
  wrong: "bg-red-300 text-white border-red-500 animate-wiggle",
  placed: "bg-brand-light text-white border-brand",
};

/** A draggable/tappable letter or grapheme tile. */
export function LetterTile({ grapheme, state = "idle", size = "lg", className = "", ...rest }: Props) {
  const dim = size === "lg" ? "w-20 h-20 text-5xl" : "w-16 h-16 text-4xl";
  return (
    <div
      {...rest}
      className={`flex ${dim} select-none items-center justify-center rounded-2xl border-4 font-reader font-bold shadow-md transition-colors ${STATES[state]} ${className}`}
    >
      {grapheme}
    </div>
  );
}
