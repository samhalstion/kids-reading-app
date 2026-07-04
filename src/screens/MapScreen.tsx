import { useNavigate } from "react-router-dom";
import { LEVELS } from "../content/levels";
import { CREATURE_BY_ID } from "../content/creatures";
import { LESSON_REF_BY_ID, isLessonUnlocked } from "../lib/curriculum";
import { useProgress } from "../store/progress";
import { speak } from "../lib/speech";
import { BigButton } from "../components/ui/BigButton";

/** The region map. Picture-first so a non-reader can navigate by scene + state. */
export function MapScreen() {
  const navigate = useNavigate();
  const completed = new Set(useProgress((s) => s.completedLessons));
  const unlockedCreatures = useProgress((s) => s.unlockedCreatures);

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="mb-4 flex items-center gap-3">
        <BigButton variant="soft" onClick={() => navigate("/")}>
          🏠
        </BigButton>
        <h1 className="font-reader text-3xl font-bold text-brand-dark">Adventure Map</h1>
      </div>

      <div className="flex flex-col gap-6">
        {LEVELS.map((level) => {
          const boss = CREATURE_BY_ID[level.bossCreatureId];
          const bossUnlocked = unlockedCreatures.includes(level.bossCreatureId);
          return (
            <section
              key={level.id}
              className={`rounded-3xl bg-gradient-to-br ${level.color} p-5 shadow-lg`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-reader text-2xl font-bold text-white drop-shadow">
                  <span className="text-4xl">{level.emoji}</span> {level.title}
                </h2>
                <span
                  className={`text-4xl ${bossUnlocked ? "" : "opacity-30 grayscale"}`}
                  title={boss?.name}
                >
                  {bossUnlocked ? boss?.emoji : "👑"}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {level.units.flatMap((unit) =>
                  unit.lessons.map((lesson) => {
                    const ref = LESSON_REF_BY_ID[lesson.id];
                    const isDone = completed.has(lesson.id);
                    const unlocked = isLessonUnlocked(ref.index, completed);
                    const creature = CREATURE_BY_ID[lesson.rewardCreatureId];
                    return (
                      <button
                        key={lesson.id}
                        disabled={!unlocked}
                        onClick={() => {
                          speak(lesson.title);
                          navigate(`/lesson/${lesson.id}`);
                        }}
                        className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-4 text-center shadow-md transition-transform active:scale-95 ${
                          isDone
                            ? "border-yellow-300 bg-white"
                            : unlocked
                              ? "border-white bg-white/90 animate-pop"
                              : "border-white/40 bg-white/30"
                        }`}
                        aria-label={unlocked ? lesson.title : "Locked lesson"}
                      >
                        <span className={`text-4xl ${unlocked ? "" : "opacity-40 grayscale"}`}>
                          {unlocked ? creature?.emoji : "🔒"}
                        </span>
                        {isDone && <span className="text-lg">⭐</span>}
                      </button>
                    );
                  }),
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
