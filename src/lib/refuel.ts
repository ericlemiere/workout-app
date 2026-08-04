import type { CompletedWorkout } from "@/types";

// The app stores dates as local YYYY-MM-DD so a "day" matches the user's
// calendar rather than UTC.
export function toLocalDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function localDateOf(isoString: string): string {
  return toLocalDateString(new Date(isoString));
}

// Shifts a local YYYY-MM-DD by whole days, staying in local time so DST
// transitions don't slide the result onto the wrong calendar day.
export function shiftLocalDate(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return toLocalDateString(new Date(y, m - 1, d + days));
}

// One refuel day per calendar day on which two or more workouts were finished.
// A third or fourth workout that same day doesn't bank any extra.
export function countRefuelDaysBanked(completed: CompletedWorkout[]): number {
  const perDay = new Map<string, number>();
  for (const c of completed) {
    const day = localDateOf(c.completedAt);
    perDay.set(day, (perDay.get(day) ?? 0) + 1);
  }
  let banked = 0;
  for (const count of perDay.values()) {
    if (count >= 2) banked++;
  }
  return banked;
}
