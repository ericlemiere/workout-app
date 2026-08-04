import type {
  CompletedWorkout,
  StreakData,
  AppSettings,
  UserLevel,
  RefuelOffer,
} from "@/types";
import { toLocalDateString, localDateOf, shiftLocalDate } from "@/lib/refuel";
import { DEFAULT_MUSIC_VOLUME } from "@/lib/audioSettings";
import { DEFAULT_SFX_PACK } from "@/lib/sfxPacks";
import { SHUFFLE_TRACK_ID } from "@/lib/musicTracks";

const KEYS = {
  completed: "workout_completed",
  streak: "workout_streak",
  settings: "workout_settings",
  cycleStartedAt: "workout_cycle_start",
  lunarCycles: "workout_lunar_cycles",
  totalCycles: "workout_total_cycles",
  cycleCompleteAcknowledged: "workout_cycle_ack",
  earnedAchievements: "workout_earned_achievements",
  levelCycles: "workout_level_cycles",
  levelLunarCycles: "workout_level_lunar_cycles",
  refuelClaimed: "workout_refuel_claimed",
  refuelOffer: "workout_refuel_offer",
} as const;

export function getCompletedWorkouts(): CompletedWorkout[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.completed) ?? "[]");
  } catch {
    return [];
  }
}

export function addCompletedWorkout(entry: CompletedWorkout): void {
  const existing = getCompletedWorkouts();
  existing.push(entry);
  localStorage.setItem(KEYS.completed, JSON.stringify(existing));
}

export function saveCompletedWorkouts(workouts: CompletedWorkout[]): void {
  localStorage.setItem(KEYS.completed, JSON.stringify(workouts));
}

export function saveStreakData(streak: StreakData): void {
  localStorage.setItem(KEYS.streak, JSON.stringify(streak));
}

export function getStreakData(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null };
  }
  try {
    const data: StreakData = JSON.parse(
      localStorage.getItem(KEYS.streak) ?? "null",
    ) ?? {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
    };

    if (data.lastCompletedDate && data.currentStreak > 0) {
      const today = toLocalDateString(new Date());
      const yesterday = shiftLocalDate(today, -1);

      if (
        data.lastCompletedDate !== today &&
        data.lastCompletedDate !== yesterday
      ) {
        // The streak is over. If exactly one day was missed, leave an offer so
        // the user can spend a banked refuel day to restore it. This has to
        // happen here because currentStreak is about to be zeroed and the
        // original value would otherwise be gone.
        //
        // Requiring a real workout on lastCompletedDate is what stops refuel
        // days from being chained: claiming sets lastCompletedDate to the
        // missed day, which has no workout, so a second missed day in a row
        // produces no new offer.
        if (
          data.lastCompletedDate === shiftLocalDate(today, -2) &&
          hasWorkoutOn(data.lastCompletedDate)
        ) {
          saveRefuelOffer({
            streak: data.currentStreak,
            missedDate: yesterday,
            offeredOn: today,
          });
        }
        const reset = { ...data, currentStreak: 0 };
        localStorage.setItem(KEYS.streak, JSON.stringify(reset));
        return reset;
      }
    }

    return data;
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null };
  }
}

export function updateStreakData(completedDate: string): StreakData {
  const streak = getStreakData();
  const today = completedDate;
  const [y, m, d] = today.split("-").map(Number);
  const prev = new Date(y, m - 1, d - 1);
  const yesterday = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}-${String(prev.getDate()).padStart(2, "0")}`;

  let newStreak = streak.currentStreak;
  if (streak.lastCompletedDate === today) {
    // Already counted today
  } else if (streak.lastCompletedDate === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1;
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, streak.longestStreak),
    lastCompletedDate: today,
  };

  localStorage.setItem(KEYS.streak, JSON.stringify(updated));
  return updated;
}

const defaultSettings: AppSettings = {
  soundEnabled: true,
  voiceCuesEnabled: true,
  musicEnabled: false,
  musicTrack: SHUFFLE_TRACK_ID,
  musicVolume: DEFAULT_MUSIC_VOLUME,
  sfxPack: DEFAULT_SFX_PACK,
};

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    return {
      ...defaultSettings,
      ...JSON.parse(localStorage.getItem(KEYS.settings) ?? "{}"),
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export function getCycleStartedAt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEYS.cycleStartedAt);
}

export function saveCycleStartedAt(ts: string | null): void {
  if (ts === null) localStorage.removeItem(KEYS.cycleStartedAt);
  else localStorage.setItem(KEYS.cycleStartedAt, ts);
}

export function getLunarCycles(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(KEYS.lunarCycles) ?? "0", 10);
}

export function saveLunarCycles(count: number): void {
  localStorage.setItem(KEYS.lunarCycles, String(count));
}

export function getTotalCycles(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(KEYS.totalCycles) ?? "0", 10);
}

export function saveTotalCycles(count: number): void {
  localStorage.setItem(KEYS.totalCycles, String(count));
}

export function getCycleCompleteAcknowledged(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEYS.cycleCompleteAcknowledged) === "true";
}

export function saveCycleCompleteAcknowledged(val: boolean): void {
  localStorage.setItem(KEYS.cycleCompleteAcknowledged, String(val));
}

export function getLevel(): UserLevel {
  if (typeof window === "undefined") return 1;
  const v = parseInt(localStorage.getItem("workout_level") ?? "1", 10);
  return v === 2 || v === 3 ? v : 1;
}

export function saveLevel(level: UserLevel): void {
  localStorage.setItem("workout_level", String(level));
}

export function getEarnedAchievements(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const arr: string[] = JSON.parse(
      localStorage.getItem(KEYS.earnedAchievements) ?? "[]",
    );
    return new Set(arr);
  } catch {
    return new Set();
  }
}

export function saveEarnedAchievements(ids: Set<string>): void {
  localStorage.setItem(
    KEYS.earnedAchievements,
    JSON.stringify(Array.from(ids)),
  );
}

export function getLevelCycles(): Record<1 | 2 | 3, number> {
  if (typeof window === "undefined") return { 1: 0, 2: 0, 3: 0 };
  try {
    return {
      1: 0,
      2: 0,
      3: 0,
      ...JSON.parse(localStorage.getItem(KEYS.levelCycles) ?? "{}"),
    };
  } catch {
    return { 1: 0, 2: 0, 3: 0 };
  }
}

export function saveLevelCycles(v: Record<1 | 2 | 3, number>): void {
  localStorage.setItem(KEYS.levelCycles, JSON.stringify(v));
}

export function getLevelLunarCycles(): Record<2 | 3, number> {
  if (typeof window === "undefined") return { 2: 0, 3: 0 };
  try {
    return {
      2: 0,
      3: 0,
      ...JSON.parse(localStorage.getItem(KEYS.levelLunarCycles) ?? "{}"),
    };
  } catch {
    return { 2: 0, 3: 0 };
  }
}

export function saveLevelLunarCycles(v: Record<2 | 3, number>): void {
  localStorage.setItem(KEYS.levelLunarCycles, JSON.stringify(v));
}

function hasWorkoutOn(date: string): boolean {
  return getCompletedWorkouts().some((c) => localDateOf(c.completedAt) === date);
}

export function getRefuelClaimed(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(KEYS.refuelClaimed) ?? "0", 10) || 0;
}

export function saveRefuelClaimed(count: number): void {
  localStorage.setItem(KEYS.refuelClaimed, String(count));
}

function saveRefuelOffer(offer: RefuelOffer): void {
  localStorage.setItem(KEYS.refuelOffer, JSON.stringify(offer));
}

export function clearRefuelOffer(): void {
  localStorage.removeItem(KEYS.refuelOffer);
}

// An offer is only good on the day the break was noticed — the user has to come
// back the very next day. A stale one is discarded on read.
export function getRefuelOffer(): RefuelOffer | null {
  if (typeof window === "undefined") return null;
  try {
    const offer: RefuelOffer | null = JSON.parse(
      localStorage.getItem(KEYS.refuelOffer) ?? "null",
    );
    if (!offer) return null;
    if (offer.offeredOn !== toLocalDateString(new Date())) {
      clearRefuelOffer();
      return null;
    }
    return offer;
  } catch {
    return null;
  }
}

// Spends a banked refuel day to restore the broken streak. Returns the restored
// streak, or null if there was nothing to claim.
export function claimRefuelDay(): StreakData | null {
  const offer = getRefuelOffer();
  if (!offer) return null;

  const today = toLocalDateString(new Date());
  const streak = getStreakData();

  // If they already trained today, that workout landed while the streak was
  // broken and counted as a fresh day 1 — so the restored streak includes it.
  const restored: StreakData = hasWorkoutOn(today)
    ? {
        currentStreak: offer.streak + 1,
        longestStreak: Math.max(streak.longestStreak, offer.streak + 1),
        lastCompletedDate: today,
      }
    : {
        // Pointing at the missed day makes today's workout continue the streak
        // through the existing updateStreakData path.
        currentStreak: offer.streak,
        longestStreak: Math.max(streak.longestStreak, offer.streak),
        lastCompletedDate: offer.missedDate,
      };

  saveStreakData(restored);
  saveRefuelClaimed(getRefuelClaimed() + 1);
  clearRefuelOffer();
  return restored;
}

export function clearAllProgress(): void {
  localStorage.removeItem(KEYS.refuelClaimed);
  localStorage.removeItem(KEYS.refuelOffer);
  localStorage.removeItem(KEYS.completed);
  localStorage.removeItem(KEYS.streak);
  localStorage.removeItem(KEYS.cycleStartedAt);
  localStorage.removeItem(KEYS.cycleCompleteAcknowledged);
  localStorage.removeItem(KEYS.lunarCycles);
  localStorage.removeItem(KEYS.totalCycles);
  localStorage.removeItem(KEYS.earnedAchievements);
  localStorage.removeItem(KEYS.levelCycles);
  localStorage.removeItem(KEYS.levelLunarCycles);
}
