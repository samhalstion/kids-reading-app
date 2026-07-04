import type { ButtonHTMLAttributes, ReactNode } from "react";
import { sfx } from "../../lib/audio";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "soft" | "ghost";
  /** Play a tap tick on press (default true). */
  tick?: boolean;
}

const VARIANTS: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-brand text-white shadow-lg active:translate-y-0.5 hover:bg-brand-dark",
  soft: "bg-white text-brand-dark border-4 border-brand-light shadow active:translate-y-0.5",
  ghost: "bg-transparent text-brand-dark",
};

/** A large, thumb-friendly button (≥64px) for early readers. */
export function BigButton({ children, variant = "primary", tick = true, className = "", onClick, ...rest }: Props) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        if (tick) sfx.tap();
        onClick?.(e);
      }}
      className={`min-h-tap min-w-tap rounded-3xl px-6 py-4 text-2xl font-reader font-bold transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-light disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
