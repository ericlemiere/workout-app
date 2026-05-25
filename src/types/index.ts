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
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
}

export interface AppSettings {
  soundEnabled: boolean;
  voiceCuesEnabled: boolean;
  autoAdvance: boolean;
  defaultRestDuration: number; // seconds
}
