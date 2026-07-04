interface Props {
  /** 0..1 */
  value: number;
  label?: string;
}

/** A chunky XP / progress bar. Visual, not numeric-heavy, for early readers. */
export function ProgressBar({ value, label }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="w-full">
      {label && <div className="mb-1 text-lg font-reader font-bold text-brand-dark">{label}</div>}
      <div className="h-6 w-full overflow-hidden rounded-full bg-white/70 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
