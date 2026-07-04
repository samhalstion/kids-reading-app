import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LESSON_REF_BY_ID, LESSON_REFS } from "../lib/curriculum";
import { useProgress, type LessonRewards } from "../store/progress";
import { stopSpeaking } from "../lib/speech";
import { ActivityRenderer } from "../components/ActivityRenderer";
import { RewardOverlay } from "../components/rewards/RewardOverlay";
import { BigButton } from "../components/ui/BigButton";
import { ProgressBar } from "../components/ui/ProgressBar";

/** Runs a lesson: steps through activities, then celebrates the reward. */
export function LessonScreen() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const completeLesson = useProgress((s) => s.completeLesson);

  const ref = lessonId ? LESSON_REF_BY_ID[lessonId] : undefined;
  const [step, setStep] = useState(0);
  const [rewards, setRewards] = useState<LessonRewards | null>(null);

  if (!ref) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-2xl">Hmm, that lesson is missing.</p>
        <BigButton onClick={() => navigate("/")}>🏠 Home</BigButton>
      </div>
    );
  }

  const { lesson } = ref;
  const activity = lesson.activities[step];

  function advance() {
    stopSpeaking();
    if (step < lesson.activities.length - 1) {
      setStep((n) => n + 1);
    } else {
      // Lesson finished → record progress and celebrate.
      setRewards(completeLesson(lesson.id));
    }
  }

  function finishReward() {
    stopSpeaking();
    const nextIndex = ref!.index + 1;
    if (nextIndex < LESSON_REFS.length) {
      // Send them back to the map to choose/continue (keeps agency + pacing).
      navigate("/map");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-4 p-4">
        <BigButton
          variant="ghost"
          onClick={() => {
            stopSpeaking();
            navigate("/map");
          }}
          aria-label="Back to map"
        >
          ✖️
        </BigButton>
        <div className="flex-1">
          <ProgressBar value={(step + 1) / lesson.activities.length} />
        </div>
      </div>

      {/* Activity area */}
      <div className="flex flex-1 items-center justify-center p-4">
        <ActivityRenderer key={step} activity={activity} onComplete={advance} />
      </div>

      {rewards && <RewardOverlay rewards={rewards} onDone={finishReward} />}
    </div>
  );
}
