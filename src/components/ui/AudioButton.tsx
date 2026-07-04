import { speak } from "../../lib/speech";

interface Props {
  /** Text spoken when tapped. */
  say: string;
  /** Accessible label / visual (defaults to a speaker). */
  label?: string;
  size?: "md" | "lg";
  className?: string;
}

/** A round "hear it again" button — the always-available audio helper. */
export function AudioButton({ say, label = "🔊", size = "md", className = "" }: Props) {
  const dim = size === "lg" ? "w-20 h-20 text-4xl" : "w-16 h-16 text-2xl";
  return (
    <button
      aria-label={`Hear ${say}`}
      onClick={() => speak(say)}
      className={`${dim} flex items-center justify-center rounded-full bg-brand text-white shadow-lg active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-light ${className}`}
    >
      {label}
    </button>
  );
}
