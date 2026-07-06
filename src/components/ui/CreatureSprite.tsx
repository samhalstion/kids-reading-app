import type { Creature } from "../../content/types";

interface Props {
  creature: Creature;
  size?: "sm" | "md" | "lg" | "xl";
  locked?: boolean;
  className?: string;
}

const SIZES: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-8xl",
  xl: "text-9xl",
};

/**
 * Emoji sprite placeholder for a creature. Swapping in generated art later is a
 * one-line change here (render an <img> when creature has an image field).
 */
export function CreatureSprite({ creature, size = "md", locked = false, className = "" }: Props) {
  return (
    <span
      role="img"
      aria-label={locked ? "Locked creature" : creature.name}
      className={`inline-block ${SIZES[size]} ${locked ? "opacity-25 grayscale" : ""} ${className}`}
    >
      {locked ? "❔" : creature.emoji}
    </span>
  );
}
