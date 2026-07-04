import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CREATURE_BY_ID } from "../../content/creatures";
import type { LessonRewards } from "../../store/progress";
import { speak } from "../../lib/speech";
import { sfx } from "../../lib/audio";
import { BigButton } from "../ui/BigButton";
import { CreatureSprite } from "../ui/CreatureSprite";

interface Step {
  kind: "creature" | "dino" | "boss" | "badge";
  title: string;
  subtitle: string;
  emoji?: string;
  creatureId?: string;
  hatch?: boolean;
}

interface Props {
  rewards: LessonRewards;
  onDone: () => void;
}

/** Full-screen celebration shown BETWEEN activities/lessons — never mid-task. */
export function RewardOverlay({ rewards, onDone }: Props) {
  const steps = useMemo<Step[]>(() => {
    const s: Step[] = [];
    const c = CREATURE_BY_ID[rewards.creatureId];
    if (c) s.push({ kind: "creature", title: "New friend!", subtitle: c.name, creatureId: c.id });
    if (rewards.dinoId) {
      const d = CREATURE_BY_ID[rewards.dinoId];
      if (d)
        s.push({
          kind: "dino",
          title: "A dino egg hatched!",
          subtitle: `${d.name}. ${d.funFact ?? ""}`,
          creatureId: d.id,
          hatch: true,
        });
    }
    if (rewards.bossId) {
      const b = CREATURE_BY_ID[rewards.bossId];
      if (b)
        s.push({ kind: "boss", title: "Region complete!", subtitle: b.name, creatureId: b.id });
    }
    for (const badge of rewards.newBadges) {
      s.push({ kind: "badge", title: "New badge!", subtitle: badge, emoji: "🏅" });
    }
    return s;
  }, [rewards]);

  const [i, setI] = useState(0);
  const step = steps[i];

  useEffect(() => {
    if (!step) return;
    if (step.kind === "dino") sfx.hatch();
    else sfx.unlock();
    const t = setTimeout(() => speak(`${step.title} ${step.subtitle}`), 400);
    return () => clearTimeout(t);
  }, [step]);

  if (!step) {
    // Nothing to celebrate (e.g. replaying a done lesson) — skip straight through.
    onDone();
    return null;
  }

  const last = i === steps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-purple-500/95 to-indigo-700/95 p-6 text-center text-white"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 font-reader text-4xl font-bold drop-shadow"
      >
        {step.title}
      </motion.h2>

      <motion.div
        initial={step.hatch ? { scale: 0.2, rotate: -20 } : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="mb-6"
      >
        {step.creatureId ? (
          <CreatureSprite creature={CREATURE_BY_ID[step.creatureId]} size="xl" />
        ) : (
          <span className="text-9xl">{step.emoji}</span>
        )}
      </motion.div>

      <p className="mb-10 max-w-lg font-reader text-2xl font-bold drop-shadow">{step.subtitle}</p>

      <BigButton
        variant="soft"
        onClick={() => {
          sfx.tap();
          if (last) onDone();
          else setI((n) => n + 1);
        }}
      >
        {last ? "Yay! Keep going ➡️" : "Cool! ➡️"}
      </BigButton>
    </motion.div>
  );
}
