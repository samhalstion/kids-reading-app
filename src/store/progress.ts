import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LESSON_REF_BY_ID, LESSON_REFS } from "../lib/curriculum";

// ---------------------------------------------------------------------------
// Persisted learner progress (localStorage). No accounts, no backend.
// ---------------------------------------------------------------------------

const XP_PER_LESSON = 20;

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
}

interface ProgressState {
  xp: number;
  completedLessons: string[];
  unlockedCreatures: string[];
  hatchedDinos: string[];
  badges: string[];
  streakDays: number;
  lastPlayedDate: string | null;
  settings: Settings;

  completeLesson: (lessonId: string) => LessonRewards;
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
      settings: { muted: false, ttsRate: 0.85, dyslexicFont: false },

      completeLesson: (lessonId) => {
        const state = get();
        const ref = LESSON_REF_BY_ID[lessonId];
        if (!ref) {
          return { creatureId: "", newBadges: [], xpGained: 0, alreadyDone: true };
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

        set({
          completedLessons: completed,
          unlockedCreatures: [...unlockedCreatures],
          hatchedDinos: [...hatchedDinos],
          badges: [...badges],
          xp: state.xp + xpGained,
          streakDays,
          lastPlayedDate: today,
        });

        return { creatureId: lesson.rewardCreatureId, dinoId, bossId, newBadges, xpGained, alreadyDone };
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
        }),
    }),
    { name: "monster-reader-progress", version: 1 },
  ),
);

/** Convenience selector: how many of all lessons are complete. */
export function completionRatio(completedLessons: string[]): number {
  return LESSON_REFS.length === 0 ? 0 : completedLessons.length / LESSON_REFS.length;
}
