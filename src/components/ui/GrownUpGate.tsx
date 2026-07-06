import { useMemo, useState } from "react";
import { BigButton } from "./BigButton";

interface Props {
  onUnlock: () => void;
  onCancel: () => void;
}

/** A simple math gate so a young child can't reach settings / reset by accident. */
export function GrownUpGate({ onUnlock, onCancel }: Props) {
  const { a, b, answer, options } = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 6); // 3..8
    const b = 2 + Math.floor(Math.random() * 6); // 2..7
    const answer = a + b;
    const opts = new Set<number>([answer]);
    while (opts.size < 4) opts.add(answer + (Math.floor(Math.random() * 9) - 4));
    return { a, b, answer, options: [...opts].sort(() => Math.random() - 0.5) };
  }, []);
  const [wrong, setWrong] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold text-brand-dark">Grown-ups only</h2>
        <p className="mb-6 text-xl text-gray-600">
          What is {a} + {b}?
        </p>
        <div className="grid grid-cols-2 gap-4">
          {options.map((o) => (
            <BigButton
              key={o}
              variant="soft"
              onClick={() => (o === answer ? onUnlock() : setWrong(true))}
            >
              {o}
            </BigButton>
          ))}
        </div>
        {wrong && <p className="mt-4 text-lg text-red-500">Not quite — try again.</p>}
        <button onClick={onCancel} className="mt-6 text-lg text-gray-400 underline">
          Go back
        </button>
      </div>
    </div>
  );
}
