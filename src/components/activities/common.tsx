import { useEffect, type ReactNode } from "react";
import { speak } from "../../lib/speech";
import { AudioButton } from "../ui/AudioButton";

interface FrameProps {
  /** Spoken + shown instruction, e.g. "Tap the word you hear." */
  instruction: string;
  /** Speak the instruction automatically when the activity mounts. */
  autoSpeak?: boolean;
  /** Optional text to (re)play with the audio button; defaults to instruction. */
  replay?: string;
  children: ReactNode;
}

/** Consistent activity layout: a big spoken instruction + a replay button. */
export function ActivityFrame({ instruction, autoSpeak = true, replay, children }: FrameProps) {
  useEffect(() => {
    if (autoSpeak) {
      const t = setTimeout(() => speak(instruction), 300);
      return () => clearTimeout(t);
    }
  }, [instruction, autoSpeak]);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="mb-6 flex items-center gap-3">
        <AudioButton say={replay ?? instruction} />
        <h2 className="font-reader text-2xl font-bold text-brand-dark md:text-3xl">{instruction}</h2>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center">{children}</div>
    </div>
  );
}
