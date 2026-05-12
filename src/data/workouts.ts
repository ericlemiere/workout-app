import type { Workout, Exercise } from "@/types";
import { mainExercises as M } from "./exercises";
import { cooldownExercises as C } from "./coolDowns";
import { warmupExercises as W } from "./warmUps";

// ─── Index reference ──────────────────────────────────────────────────────────
//
// warmupExercises (W)             mainExercises (M)               cooldownExercises (C)
//  0  Dynamic Side Bends           0  Burpees                       0  Child's Pose
//  1  Chest Openers w/ Rotation    1  Push-Ups                      1  Hip Flexor Stretch
//  2  Deep Side-to-Side Lunges     2  Squats                        2  Quad Stretch
//  3  Torso Twists                 3  Mountain Climbers             3  Seated Hamstring Stretch
//  4  Active Calf Stretch          4  Plank Hold                    4  Figure-4 Left Stretch
//  5  Malasana Squat               5  Alternating Lunges            5  Figure-4 Right Stretch
//  6  Roll Downs                   6  Diamond Push-Ups              6  Chest Stretch
//  7  Standing Hip Rotations       7  Pike Push-Ups                 7  Tricep Stretch
//  8  Shoulder Rotations           8  Tricep Dips                   8  Upper Back Stretch
//  9  Pendulum Hamstring Stretch   9  Superman                      9  Calf Stretch
// 10  Cat-Cow                     10  Glute Bridges                10  Figure-4 Stretch (combined)
// 11  Hip Marching                11  Russian Twists               11  Deep Breathing
//                                 12  Jump Squats
//                                 13  Side Lunges
//                                 14  Wall Sit
//                                 15  Inchworms
//                                 16  Plank Shoulder Taps
//                                 17  Calf Raises
//                                 18  Wide Push-Ups
//                                 19  High Knees
//                                 20  Jumping Jacks
//                                 21  Single Leg Deadlift
//                                 22  Reverse Lunges
//                                 23  Dead Bug
//                                 24  Bird Dog
//                                 25  Side Plank Left
//                                 26  Side Plank Right
//                                 27  Clamshells
//                                 28  Fire Hydrant
//                                 29  Donkey Kicks
//                                 30  Pelvic Tilts

// ─── Superset builder ─────────────────────────────────────────────────────────
// Creates: ex1 → ex2 (30s rest) → ex1 → ex2 (30s rest or 0 if last pair)
function superset(e1: Exercise, e2: Exercise, lastPair = false): Exercise[] {
  return [
    { ...e1, restDuration: 0 },
    { ...e2, restDuration: 30 },
    { ...e1, restDuration: 0 },
    { ...e2, restDuration: lastPair ? 0 : 30 },
  ];
}

// Every cooldown ends: Figure-4 Left → Figure-4 Right → Child's Pose
const COOLDOWN_END = [C[4], C[5], C[0]];

// ─── 28 workouts — cycle: Lower Body · Upper Body · Core · Full Body ─────────

export const workouts: Workout[] = [
  // ── 1 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-01",
    name: "Lower Body 1",
    description: "Foundation lower body session. Focuses on glutes and leg stability with gentle, back-safe movements.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "foundation"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[10], W[7], W[4], W[5], W[3]],
    exercises: [
      ...superset(M[2], M[10]),
      ...superset(M[22], M[27]),
      ...superset(M[14], M[29], true),
    ],
    cooldowns: [C[1], C[2], ...COOLDOWN_END],
  },

  // ── 2 · Upper Body ─────────────────────────────────────────────────────────
  {
    id: "workout-02",
    name: "Upper Body 1",
    description: "Foundational push and arm strength. All movements supported to protect the lower back.",
    estimatedDuration: 20,
    tags: ["upper body", "push", "foundation"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[0], W[1], W[3], W[8], W[6]],
    exercises: [
      ...superset(M[1], M[8]),
      ...superset(M[18], M[9]),
      ...superset(M[6], M[7], true),
    ],
    cooldowns: [C[6], C[8], ...COOLDOWN_END],
  },

  // ── 3 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-03",
    name: "Core 1",
    description: "Anti-extension and anti-rotation core work. Zero spinal flexion — completely safe for lower back pain.",
    estimatedDuration: 20,
    tags: ["core", "foundation", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[10], W[6], W[0], W[3], W[4]],
    exercises: [
      ...superset(M[4], M[23]),
      ...superset(M[24], M[25]),
      ...superset(M[26], M[30], true),
    ],
    cooldowns: [C[1], C[3], ...COOLDOWN_END],
  },

  // ── 4 · Full Body ──────────────────────────────────────────────────────────
  {
    id: "workout-04",
    name: "Full Body 1",
    description: "A total-body conditioning circuit mixing cardio, lower body, and upper body movements.",
    estimatedDuration: 20,
    tags: ["full body", "cardio", "foundation"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[0], W[2], W[3], W[4], W[7]],
    exercises: [
      ...superset(M[20], M[2]),
      ...superset(M[19], M[1]),
      ...superset(M[10], M[3], true),
    ],
    cooldowns: [C[1], C[2], ...COOLDOWN_END],
  },

  // ── 5 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-05",
    name: "Lower Body 2",
    description: "Lateral leg strength and glute activation. Side lunges and hip work improve stability.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "lateral"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[7], W[2], W[5], W[4], W[3]],
    exercises: [
      ...superset(M[13], M[27]),
      ...superset(M[2], M[10]),
      ...superset(M[17], M[28], true),
    ],
    cooldowns: [C[9], C[2], ...COOLDOWN_END],
  },

  // ── 6 · Upper Body ─────────────────────────────────────────────────────────
  {
    id: "workout-06",
    name: "Upper Body 2",
    description: "Upper body strength with tricep and shoulder emphasis. Finishes with a full-body movement pattern.",
    estimatedDuration: 20,
    tags: ["upper body", "triceps", "shoulders"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[0], W[8], W[1], W[3], W[6]],
    exercises: [
      ...superset(M[1], M[6]),
      ...superset(M[8], M[18]),
      ...superset(M[15], M[16], true),
    ],
    cooldowns: [C[7], C[8], ...COOLDOWN_END],
  },

  // ── 7 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-07",
    name: "Core 2",
    description: "Core stability deepening. Progresses from dead bug to plank to lateral holds.",
    estimatedDuration: 20,
    tags: ["core", "stability", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[0], W[3], W[10], W[7], W[4]],
    exercises: [
      ...superset(M[23], M[24]),
      ...superset(M[4], M[16]),
      ...superset(M[25], M[26], true),
    ],
    cooldowns: [C[1], C[8], ...COOLDOWN_END],
  },

  // ── 8 · Full Body ──────────────────────────────────────────────────────────
  {
    id: "workout-08",
    name: "Full Body 2",
    description: "Power and endurance combined. Jump squats, push-ups, and planks challenge every muscle.",
    estimatedDuration: 20,
    tags: ["full body", "power", "endurance"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[0], W[3], W[2], W[7], W[4]],
    exercises: [
      ...superset(M[12], M[1]),
      ...superset(M[20], M[4]),
      ...superset(M[10], M[19], true),
    ],
    cooldowns: [C[2], C[3], ...COOLDOWN_END],
  },

  // ── 9 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-09",
    name: "Lower Body 3",
    description: "Single-leg stability and glute strength. Builds balance and protects the lower back.",
    estimatedDuration: 20,
    tags: ["lower body", "stability", "single-leg"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[2], W[7], W[5], W[4], W[3]],
    exercises: [
      ...superset(M[2], M[21]),
      ...superset(M[5], M[10]),
      ...superset(M[22], M[27], true),
    ],
    cooldowns: [C[1], C[3], ...COOLDOWN_END],
  },

  // ── 10 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-10",
    name: "Upper Body 3",
    description: "Chest and shoulder focus. Wide and pike push-up variations hit different angles.",
    estimatedDuration: 20,
    tags: ["upper body", "chest", "shoulders"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[1], W[0], W[3], W[6], W[8]],
    exercises: [
      ...superset(M[18], M[7]),
      ...superset(M[6], M[8]),
      ...superset(M[1], M[9], true),
    ],
    cooldowns: [C[6], C[7], ...COOLDOWN_END],
  },

  // ── 11 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-11",
    name: "Core 3",
    description: "Bird dog, dead bug and side planks. Maximum spinal stability with zero compression.",
    estimatedDuration: 20,
    tags: ["core", "stability", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[3], W[0], W[10], W[7], W[4]],
    exercises: [
      ...superset(M[24], M[23]),
      ...superset(M[25], M[26]),
      ...superset(M[4], M[3], true),
    ],
    cooldowns: [C[1], C[3], ...COOLDOWN_END],
  },

  // ── 12 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-12",
    name: "Full Body 3",
    description: "High-knee cardio with lunges and push strength. Keeps heart rate up while building muscle.",
    estimatedDuration: 20,
    tags: ["full body", "cardio", "strength"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[2], W[0], W[3], W[7], W[4]],
    exercises: [
      ...superset(M[19], M[5]),
      ...superset(M[20], M[16]),
      ...superset(M[1], M[10], true),
    ],
    cooldowns: [C[1], C[2], ...COOLDOWN_END],
  },

  // ── 13 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-13",
    name: "Lower Body 4",
    description: "Explosive lower body with jump squats. Glute bridges balance the power work.",
    estimatedDuration: 20,
    tags: ["lower body", "power", "glutes"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[2], W[7], W[4], W[3], W[5]],
    exercises: [
      ...superset(M[12], M[10]),
      ...superset(M[13], M[28]),
      ...superset(M[22], M[29], true),
    ],
    cooldowns: [C[2], C[3], ...COOLDOWN_END],
  },

  // ── 14 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-14",
    name: "Upper Body 4",
    description: "Tricep and shoulder endurance. Plank shoulder taps add core stability to the mix.",
    estimatedDuration: 20,
    tags: ["upper body", "triceps", "endurance"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[0], W[1], W[8], W[3], W[6]],
    exercises: [
      ...superset(M[6], M[18]),
      ...superset(M[7], M[16]),
      ...superset(M[1], M[15], true),
    ],
    cooldowns: [C[6], C[8], ...COOLDOWN_END],
  },

  // ── 15 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-15",
    name: "Core 4",
    description: "Plank and side plank progressions. Builds lateral core strength vital for lower back protection.",
    estimatedDuration: 20,
    tags: ["core", "lateral strength", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[0], W[10], W[3], W[7], W[4]],
    exercises: [
      ...superset(M[4], M[25]),
      ...superset(M[26], M[23]),
      ...superset(M[24], M[16], true),
    ],
    cooldowns: [C[1], C[8], ...COOLDOWN_END],
  },

  // ── 16 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-16",
    name: "Full Body 4",
    description: "Jump squats, push strength and glute bridges. A well-rounded conditioning circuit.",
    estimatedDuration: 20,
    tags: ["full body", "conditioning", "strength"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[0], W[2], W[7], W[3], W[4]],
    exercises: [
      ...superset(M[12], M[4]),
      ...superset(M[19], M[1]),
      ...superset(M[20], M[10], true),
    ],
    cooldowns: [C[2], C[1], ...COOLDOWN_END],
  },

  // ── 17 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-17",
    name: "Lower Body 5",
    description: "Progressive lower body strength. Single-leg deadlifts and jump squats challenge balance and power.",
    estimatedDuration: 20,
    tags: ["lower body", "strength", "balance"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[7], W[2], W[4], W[5], W[3]],
    exercises: [
      ...superset(M[2], M[10]),
      ...superset(M[12], M[21]),
      ...superset(M[13], M[27], true),
    ],
    cooldowns: [C[1], C[2], ...COOLDOWN_END],
  },

  // ── 18 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-18",
    name: "Upper Body 5",
    description: "Push-up strength from multiple angles. Diamond, pike, and wide push-ups hit every upper body fiber.",
    estimatedDuration: 20,
    tags: ["upper body", "push", "strength"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[1], W[0], W[8], W[6], W[3]],
    exercises: [
      ...superset(M[1], M[7]),
      ...superset(M[6], M[8]),
      ...superset(M[18], M[9], true),
    ],
    cooldowns: [C[7], C[6], ...COOLDOWN_END],
  },

  // ── 19 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-19",
    name: "Core 5",
    description: "Mountain climbers, dead bug and plank shoulder taps. High-demand core session.",
    estimatedDuration: 20,
    tags: ["core", "strength", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[3], W[0], W[7], W[10], W[4]],
    exercises: [
      ...superset(M[23], M[24]),
      ...superset(M[3], M[4]),
      ...superset(M[16], M[25], true),
    ],
    cooldowns: [C[1], C[3], ...COOLDOWN_END],
  },

  // ── 20 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-20",
    name: "Full Body 5",
    description: "Burpees enter the mix. A challenging full-body session with glute bridge recovery.",
    estimatedDuration: 20,
    tags: ["full body", "intense", "strength"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[0], W[3], W[2], W[4], W[7]],
    exercises: [
      ...superset(M[0], M[10]),
      ...superset(M[12], M[1]),
      ...superset(M[19], M[4], true),
    ],
    cooldowns: [C[1], C[2], ...COOLDOWN_END],
  },

  // ── 21 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-21",
    name: "Lower Body 6",
    description: "Reverse lunges, clamshells and jump squats. Glute endurance is the priority.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "endurance"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[2], W[7], W[5], W[3], W[4]],
    exercises: [
      ...superset(M[22], M[29]),
      ...superset(M[13], M[27]),
      ...superset(M[12], M[10], true),
    ],
    cooldowns: [C[2], C[3], ...COOLDOWN_END],
  },

  // ── 22 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-22",
    name: "Upper Body 6",
    description: "High-rep push challenge. Back-to-back push-up variations will test your endurance.",
    estimatedDuration: 20,
    tags: ["upper body", "endurance", "push"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[0], W[8], W[1], W[6], W[3]],
    exercises: [
      ...superset(M[6], M[18]),
      ...superset(M[1], M[8]),
      ...superset(M[7], M[9], true),
    ],
    cooldowns: [C[6], C[7], ...COOLDOWN_END],
  },

  // ── 23 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-23",
    name: "Core 6",
    description: "Side plank, bird dog and mountain climbers. Attacks all planes of core stability.",
    estimatedDuration: 20,
    tags: ["core", "advanced", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[0], W[3], W[7], W[10], W[4]],
    exercises: [
      ...superset(M[25], M[26]),
      ...superset(M[4], M[24]),
      ...superset(M[23], M[3], true),
    ],
    cooldowns: [C[1], C[8], ...COOLDOWN_END],
  },

  // ── 24 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-24",
    name: "Full Body 6",
    description: "Burpees and mountain climbers paired with power squats. A high-intensity full-body session.",
    estimatedDuration: 20,
    tags: ["full body", "intense", "cardio"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[0], W[2], W[3], W[7], W[4]],
    exercises: [
      ...superset(M[0], M[3]),
      ...superset(M[12], M[1]),
      ...superset(M[20], M[4], true),
    ],
    cooldowns: [C[2], C[3], ...COOLDOWN_END],
  },

  // ── 25 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-25",
    name: "Lower Body 7",
    description: "Peak lower body session. Explosive and stability work combined for maximum glute and leg strength.",
    estimatedDuration: 20,
    tags: ["lower body", "peak", "glutes"],
    coverImage: "/images/workouts/lower-body.jpg",
    warmups: [W[7], W[2], W[5], W[4], W[3]],
    exercises: [
      ...superset(M[12], M[21]),
      ...superset(M[13], M[28]),
      ...superset(M[22], M[29], true),
    ],
    cooldowns: [C[1], C[3], ...COOLDOWN_END],
  },

  // ── 26 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-26",
    name: "Upper Body 7",
    description: "Peak upper body session. A full push-up ladder plus tricep and core stability.",
    estimatedDuration: 20,
    tags: ["upper body", "peak", "push"],
    coverImage: "/images/workouts/upper-body.jpg",
    warmups: [W[1], W[0], W[3], W[8], W[6]],
    exercises: [
      ...superset(M[1], M[6]),
      ...superset(M[18], M[7]),
      ...superset(M[8], M[16], true),
    ],
    cooldowns: [C[7], C[8], ...COOLDOWN_END],
  },

  // ── 27 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-27",
    name: "Core 7",
    description: "Peak core session. Plank, dead bug and side planks for total spinal stability.",
    estimatedDuration: 20,
    tags: ["core", "peak", "back safe"],
    coverImage: "/images/workouts/core.jpg",
    warmups: [W[3], W[0], W[10], W[4], W[7]],
    exercises: [
      ...superset(M[4], M[23]),
      ...superset(M[24], M[3]),
      ...superset(M[25], M[26], true),
    ],
    cooldowns: [C[1], C[3], ...COOLDOWN_END],
  },

  // ── 28 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-28",
    name: "Full Body 7",
    description: "The final workout. Burpees, jump squats and mountain climbers test everything you've built.",
    estimatedDuration: 20,
    tags: ["full body", "peak", "challenge"],
    coverImage: "/images/workouts/full-body.jpg",
    warmups: [W[0], W[2], W[3], W[4], W[7]],
    exercises: [
      ...superset(M[0], M[10]),
      ...superset(M[12], M[3]),
      ...superset(M[19], M[1], true),
    ],
    cooldowns: [C[1], C[2], ...COOLDOWN_END],
  },
];

export function getWorkoutById(id: string): Workout | undefined {
  return workouts.find((w) => w.id === id);
}

export function getTotalExercisesForWorkout(workout: Workout): number {
  return (
    workout.warmups.length + workout.exercises.length + workout.cooldowns.length
  );
}
