import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LEVELS } from "../content/levels";
import { TOTAL_LESSONS } from "../lib/curriculum";
import { useProgress } from "../store/progress";
import { BigButton } from "../components/ui/BigButton";
import { GrownUpGate } from "../components/ui/GrownUpGate";

/** Settings + progress dashboard, gated behind a simple math check. */
export function ParentScreen() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const s = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!unlocked) {
    return <GrownUpGate onUnlock={() => setUnlocked(true)} onCancel={() => navigate("/")} />;
  }

  const perLevel = LEVELS.map((lvl) => {
    const lessons = lvl.units.flatMap((u) => u.lessons);
    const done = lessons.filter((l) => s.completedLessons.includes(l.id)).length;
    return { title: lvl.title, emoji: lvl.emoji, done, total: lessons.length };
  });

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex items-center gap-3">
        <BigButton variant="soft" onClick={() => navigate("/")}>
          🏠
        </BigButton>
        <h1 className="font-reader text-3xl font-bold text-brand-dark">Grown-up Zone</h1>
      </div>

      {/* Progress dashboard */}
      <section className="mb-8 rounded-2xl bg-white p-5 shadow">
        <h2 className="mb-3 text-2xl font-bold text-brand-dark">Progress</h2>
        <p className="mb-4 text-lg text-gray-600">
          {s.completedLessons.length} / {TOTAL_LESSONS} lessons · ⭐ {s.xp} stars · 🔥 {s.streakDays}-day
          streak · 🐾 {s.unlockedCreatures.length} monsters
        </p>
        <div className="flex flex-col gap-2">
          {perLevel.map((l) => (
            <div key={l.title} className="flex items-center gap-3">
              <span className="w-40 text-lg">
                {l.emoji} {l.title}
              </span>
              <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-brand"
                  style={{ width: `${(l.done / l.total) * 100}%` }}
                />
              </div>
              <span className="w-14 text-right text-gray-600">
                {l.done}/{l.total}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="mb-8 rounded-2xl bg-white p-5 shadow">
        <h2 className="mb-3 text-2xl font-bold text-brand-dark">Settings</h2>
        <label className="mb-3 flex items-center justify-between text-lg">
          <span>🔇 Mute sounds</span>
          <input type="checkbox" className="h-6 w-6" checked={s.settings.muted} onChange={s.toggleMute} />
        </label>
        <label className="mb-3 flex items-center justify-between text-lg">
          <span>🔤 Dyslexia-friendly font</span>
          <input
            type="checkbox"
            className="h-6 w-6"
            checked={s.settings.dyslexicFont}
            onChange={s.toggleDyslexicFont}
          />
        </label>
        <label className="flex items-center justify-between gap-4 text-lg">
          <span>🗣️ Voice speed</span>
          <input
            type="range"
            min={0.6}
            max={1.1}
            step={0.05}
            value={s.settings.ttsRate}
            onChange={(e) => s.setRate(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-12 text-right">{s.settings.ttsRate.toFixed(2)}×</span>
        </label>
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border-2 border-red-200 bg-white p-5 shadow">
        <h2 className="mb-3 text-2xl font-bold text-red-500">Reset</h2>
        {!confirmReset ? (
          <BigButton variant="soft" onClick={() => setConfirmReset(true)}>
            Reset all progress
          </BigButton>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-lg text-gray-600">This erases all stars, monsters, and progress. Sure?</p>
            <div className="flex gap-3">
              <BigButton
                onClick={() => {
                  s.resetProgress();
                  setConfirmReset(false);
                }}
              >
                Yes, reset
              </BigButton>
              <BigButton variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </BigButton>
            </div>
          </div>
        )}
      </section>

      <p className="mt-8 text-center text-sm text-gray-400">
        Monster Reader teaches reading with systematic phonics. Aim for one short lesson a day.
      </p>
    </div>
  );
}
