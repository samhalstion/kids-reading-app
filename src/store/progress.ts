import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LESSON_REF_BY_ID, LESSON_REFS } from "../lib/curriculum";

// Persist to localStorage, but fall back to in-memory storage if it's
// unavailable (private browsing, sandboxed iframes) so the app never crashes
// on load — progress just won't survive a refresh in that case.
function makeSafeStorage(): Storage {
  try {
    const k = "__mr_test__";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    return localStorage;
  } catch {
    const mem = new Map<string, string>();
    return {
      getItem: (key) => mem.get(key) ?? null,
      setItem: (key, value) => void mem.set(key, value),
      removeItem: (key) => void mem.delete(key),
      clear: () => mem.clear(),
      key: (i) => Array.from(mem.keys())[i] ?? null,
      get length() {
        return mem.size;
      },
    } as Storage;
  }
}

// ---------------------------------------------------------------------------
// Persisted learner progress (localStorage). No accounts, no backend.
// ---------------------------------------------------------------------------

const XP_PER_LESSON = 20;

/** First-try accuracy at or above this = the lesson is "mastered". */
export const MASTERY_THRESHOLD = 0.8;

function starsFor(accuracy: number): 1 | 2 | 3 {
  if (accuracy >= 0.9) return 3;
  if (accuracy >= MASTERY_THRESHOLD) return 2;
  return 1;
}

/** Aggregated first-try performance a finished lesson reports up from its activities. */
export interface LessonResult {
  /** Graded items across the lesson. */
  items: number;
  /** Items correct on the first attempt. */
  firstTryCorrect: number;
  /** grapheme ids / words missed (for the weak-skills report + review). */
  misses: string[];
}

/** Best recorded performance for a lesson. */
export interface LessonScore {
  accuracy: number;
  stars: 1 | 2 | 3;
  mastered: boolean;
}

export interface Settings {
  muted: boolean;
  /** TTS rate; slow default so early readers can follow. */
  ttsRate: number;
  dyslexicFont: boolean;
}

/** What a single lesson completion newly awarded — drives reward animations. */
export interface LessonRewards {
  creatureId: string;
  dinoId?: string;
  bossId?: string;
  newBadges: string[];
  xpGained: number;
  alreadyDone: boolean;
  /** First-try accuracy for THIS run (0..1). */
  accuracy: number;
  /** 1–3 stars earned this run. */
  stars: 1 | 2 | 3;
  /** Whether this run met the mastery threshold. */
  mastered: boolean;
}

interface ProgressState {
  xp: number;
  completedLessons: string[];
  unlockedCreatures: string[];
  hatchedDinos: string[];
  badges: string[];
  streakDays: number;
  lastPlayedDate: string | null;
  /** Best score per lesson (accuracy/stars/mastery). */
  lessonScores: Record<string, LessonScore>;
  /** How many times each grapheme has been missed — the weak-skills heat map. */
  missedGraphemes: Record<string, number>;
  settings: Settings;

  completeLesson: (lessonId: string, result: LessonResult) => LessonRewards;
  toggleMute: () => void;
  setRate: (rate: number) => void;
  toggleDyslexicFont: () => void;
  resetProgress: () => void;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86_400_000);
}

const BADGE_FOR_LEVEL: Record<string, string> = {
  "ember-cave": "CVC Champion",
  "mossy-woods": "Vowel Voyager",
  "crystal-lake": "Blend Boss",
  "thunder-peak": "Digraph Dynamo",
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      completedLessons: [],
      unlockedCreatures: [],
      hatchedDinos: [],
      badges: [],
      streakDays: 0,
      lastPlayedDate: null,
      lessonScores: {},
      missedGraphemes: {},
      settings: { muted: false, ttsRate: 0.85, dyslexicFont: false },

      completeLesson: (lessonId, result) => {
        const state = get();
        const ref = LESSON_REF_BY_ID[lessonId];
        if (!ref) {
          return {
            creatureId: "",
            newBadges: [],
            xpGained: 0,
            alreadyDone: true,
            accuracy: 0,
            stars: 1,
            mastered: false,
          };
        }
        const alreadyDone = state.completedLessons.includes(lessonId);
        const { lesson, unit, level } = ref;

        const completed = alreadyDone
          ? state.completedLessons
          : [...state.completedLessons, lessonId];
        const completedSet = new Set(completed);

        const unlockedCreatures = new Set(state.unlockedCreatures);
        unlockedCreatures.add(lesson.rewardCreatureId);

        // Unit finished → hatch its dino.
        let dinoId: string | undefined;
        const hatchedDinos = new Set(state.hatchedDinos);
        if (unit.rewardDinoId && unit.lessons.every((l) => completedSet.has(l.id))) {
          if (!hatchedDinos.has(unit.rewardDinoId)) {
            dinoId = unit.rewardDinoId;
            hatchedDinos.add(unit.rewardDinoId);
          }
        }

        // Level finished → unlock boss + award badge.
        let bossId: string | undefined;
        const newBadges: string[] = [];
        const badges = new Set(state.badges);
        const levelLessons = level.units.flatMap((u) => u.lessons);
        if (levelLessons.every((l) => completedSet.has(l.id))) {
          if (!unlockedCreatures.has(level.bossCreatureId)) {
            bossId = level.bossCreatureId;
            unlockedCreatures.add(level.bossCreatureId);
          }
          const badge = BADGE_FOR_LEVEL[level.id];
          if (badge && !badges.has(badge)) {
            badges.add(badge);
            newBadges.push(badge);
          }
        }

        // Streak bookkeeping.
        const today = todayKey();
        let streakDays = state.streakDays;
        if (state.lastPlayedDate !== today) {
          const gap =
            state.lastPlayedDate === null ? Infinity : daysBetween(state.lastPlayedDate, today);
          streakDays = gap === 1 ? streakDays + 1 : 1;
        } else if (streakDays === 0) {
          streakDays = 1;
        }

        const xpGained = alreadyDone ? 0 : XP_PER_LESSON;

        // Score this run on first-try accuracy (an all-exploratory lesson with no
        // graded items counts as mastered — there was nothing to get wrong).
        const accuracy = result.items > 0 ? result.firstTryCorrect / result.items : 1;
        const stars = starsFor(accuracy);
        const mastered = accuracy >= MASTERY_THRESHOLD;

        // Keep the BEST score across replays.
        const prev = state.lessonScores[lessonId];
        const bestAccuracy = prev ? Math.max(prev.accuracy, accuracy) : accuracy;
        const lessonScores = {
          ...state.lessonScores,
          [lessonId]: {
            accuracy: bestAccuracy,
            stars: starsFor(bestAccuracy),
            mastered: bestAccuracy >= MASTERY_THRESHOLD,
          },
        };

        // Tally missed graphemes/words for the weak-skills report.
        const missedGraphemes = { ...state.missedGraphemes };
        for (const m of result.misses) {
          missedGraphemes[m] = (missedGraphemes[m] ?? 0) + 1;
        }

        set({
          completedLessons: completed,
          unlockedCreatures: [...unlockedCreatures],
          hatchedDinos: [...hatchedDinos],
          badges: [...badges],
          xp: state.xp + xpGained,
          streakDays,
          lastPlayedDate: today,
          lessonScores,
          missedGraphemes,
        });

        return {
          creatureId: lesson.rewardCreatureId,
          dinoId,
          bossId,
          newBadges,
          xpGained,
          alreadyDone,
          accuracy,
          stars,
          mastered,
        };
      },

      toggleMute: () => set((s) => ({ settings: { ...s.settings, muted: !s.settings.muted } })),
      setRate: (rate) => set((s) => ({ settings: { ...s.settings, ttsRate: rate } })),
      toggleDyslexicFont: () =>
        set((s) => ({ settings: { ...s.settings, dyslexicFont: !s.settings.dyslexicFont } })),
      resetProgress: () =>
        set({
          xp: 0,
          completedLessons: [],
          unlockedCreatures: [],
          hatchedDinos: [],
          badges: [],
          streakDays: 0,
          lastPlayedDate: null,
          lessonScores: {},
          missedGraphemes: {},
        }),
    }),
    {
      name: "monster-reader-progress",
      version: 1,
      storage: createJSONStorage(makeSafeStorage),
    },
  ),
);

/** Convenience selector: how many of all lessons are complete. */
export function completionRatio(completedLessons: string[]): number {
  return LESSON_REFS.length === 0 ? 0 : completedLessons.length / LESSON_REFS.length;
}
