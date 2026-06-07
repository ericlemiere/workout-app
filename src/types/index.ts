export type ExerciseCategory = "warm-up" | "exercise" | "cool-down";

export type MuscleTarget =
  | "lower body"
  | "upper body"
  | "core"
  | "arms"
  | "back"
  | "legs"
  | "chest"
  | "shoulders"
  | "glutes"
  | "full body";

export type WorkoutSection =
  | "intro"
  | "warmup"
  | "exercise"
  | "rest"
  | "cooldown"
  | "complete";

export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  image: string[];
  category: ExerciseCategory;
  target: MuscleTarget;
  matPosition?: "floor" | "standing";
  audio?: string;
  instructions?: string;
  level?: number; // 1-5, optional difficulty rating
  isRest?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number; // minutes
  warmups: Exercise[];
  exercises: Exercise[];
  cooldowns: Exercise[];
  tags: string[];
  coverImage?: string;
}

export interface TimerSnapshot {
  startTs: number | null;
  pausedTs: number | null;
  accPauseMs: number;
  duration: number; // seconds
}

export interface CompletedWorkout {
  workoutId: string;
  completedAt: string; // ISO string
  durationMs: number;
  level?: UserLevel;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
}

export interface AppSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  voiceCuesEnabled: boolean;
}

export type UserLevel = 1 | 2 | 3;

// A slot is either a single exercise (same at all levels) or [L1, L2?, L3?].
// The resolver picks the highest available variant up to the user's level.
export type ExerciseSlot = Exercise | [Exercise, Exercise?, Exercise?];

export interface SupersetDef {
  e1: ExerciseSlot;
  e2: ExerciseSlot;
  e3?: ExerciseSlot;
}

export interface WorkoutTemplate extends Omit<Workout, "exercises"> {
  supersets: [SupersetDef, SupersetDef, SupersetDef];
  lvl2Extra: SupersetDef;
  lvl3Extra: SupersetDef;
}
