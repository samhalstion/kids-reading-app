import { useNavigate } from "react-router-dom";
import { LESSON_REFS, nextLessonIndex } from "../lib/curriculum";
import { completionRatio, useProgress } from "../store/progress";
import { BigButton } from "../components/ui/BigButton";
import { ProgressBar } from "../components/ui/ProgressBar";
import { speak } from "../lib/speech";

/** The hub. One big Play button resumes the next lesson — no reading required. */
export function HomeScreen() {
  const navigate = useNavigate();
  const completed = useProgress((s) => s.completedLessons);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streakDays);
  const unlocked = useProgress((s) => s.unlockedCreatures);

  const next = LESSON_REFS[nextLessonIndex(new Set(completed))];
  const ratio = completionRatio(completed);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="text-center">
        <h1 className="font-reader text-5xl font-black text-brand-dark drop-shadow-sm md:text-6xl">
          Monster Reader
        </h1>
        <p className="mt-2 text-xl text-brand-dark/70">Read with monsters & dinos! 🦖</p>
      </div>

      <BigButton
        className="px-16 py-8 text-4xl"
        onClick={() => {
          speak("Let's read!");
          navigate(`/lesson/${next.lesson.id}`);
        }}
      >
        ▶️ Play
      </BigButton>
      <p className="-mt-4 text-lg text-brand-dark/60">Next: {next.level.emoji} {next.lesson.title}</p>

      <div className="w-full max-w-md">
        <ProgressBar value={ratio} label="Your reading journey" />
      </div>

      <div className="flex gap-4">
        <BigButton variant="soft" onClick={() => navigate("/map")}>
          🗺️ Map
        </BigButton>
        <BigButton variant="soft" onClick={() => navigate("/collection")}>
          📖 My Monsters
        </BigButton>
      </div>

      <div className="flex items-center gap-6 text-2xl font-bold text-brand-dark">
        <span title="Stars">⭐ {xp}</span>
        <span title="Day streak">🔥 {streak}</span>
        <span title="Monsters caught">🐾 {unlocked.length}</span>
      </div>

      <button
        onClick={() => navigate("/parent")}
        aria-label="Grown-up settings"
        className="fixed right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-3xl shadow"
      >
        ⚙️
      </button>
    </div>
  );
}
