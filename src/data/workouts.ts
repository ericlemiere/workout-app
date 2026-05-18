import type { Workout, Exercise } from "@/types";
import { mainExercises as M } from "./exercises";
import { cooldownExercises as C } from "./coolDowns";
import { warmupExercises as W } from "./warmUps";
import { REST_DURATION } from "@/lib/workout";

// ─── Index reference ──────────────────────────────────────────────────────────
//
// warmupExercises (W)             mainExercises (M)               cooldownExercises (C)
//  0  Dynamic Side Bends           0  Burpees          [floor]      0  Child's Pose        [floor]
//  1  Chest Openers w/ Rotation    1  Burpee Walk      [floor]      1  Hip Flexor Stretch  [floor]
//  2  Deep Side-to-Side Lunges     2  Push-Ups         [floor]      2  Quad Stretch        [standing]
//  3  Torso Twists                 3  Kneeling Push-Ups[floor]      3  Seated Hamstring    [floor]
//  4  Active Calf Stretch          4  Airplane Push-Ups[floor]      4  Figure-4 Left       [floor]
//  5  Malasana Squat               5  Wave Push-Ups    [floor]      5  Figure-4 Right      [floor]
//  6  Roll Downs                   6  Spider Cross Plnk[floor]      6  Chest Stretch       [standing]
//  7  Standing Hip Rotations       7  Squats           [standing]   7  Tricep Stretch      [standing]
//  8  Shoulder Rotations           8  Mountain Climbers[floor]      8  Upper Back Stretch  [standing]
//  9  Pendulum Hamstring Stretch   9  Plank Hold       [floor]      9  Cat-Cow             [floor]
// 10  Hip Marching                10  Alternating Lunges[standing]
// 11  Rotating Toe Touches        11  Glute Bridges    [floor]
//                                 12  Glute Bridge Holds[floor]
//                                 13  Russian Twists   [floor]
//                                 14  Jump Squats      [standing]
//                                 15  Side Lunges      [standing]
//                                 16  Inchworms        [floor]
//                                 17  Plank Shlder Taps[floor]
//                                 18  Calf Raises      [standing]
//                                 19  High Knees       [standing]
//                                 20  Jumping Jacks    [standing]
//                                 21  Single Leg DL    [standing]
//                                 22  Reverse Lunges   [standing]
//                                 23  Dead Bug         [floor]
//                                 24  Bird Dog         [floor]
//                                 25  Plank Rotations  [floor]
//                                 26  Fire Hydrant     [floor]
//                                 27  Donkey Kicks     [floor]
//                                 28  Pelvic Tilts     [floor]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const rest: Exercise = {
  id: "rest",
  name: "Rest",
  duration: REST_DURATION,
  image: [],
  category: "exercise",
  target: "full body",
  isRest: true,
};

// Repeats 2-3 exercises with rest at the end, twice
function superset(e1: Exercise, e2: Exercise, e3?: Exercise): Exercise[] {
  const round = [{ ...e1 }, { ...e2 }, ...(e3 ? [{ ...e3 }] : []), { ...rest }];
  return [...round, ...round];
}

// Final superset: repeats twice but removes rest from the second round
function supersetFinal(e1: Exercise, e2: Exercise, e3?: Exercise): Exercise[] {
  const round = [{ ...e1 }, { ...e2 }, ...(e3 ? [{ ...e3 }] : []), { ...rest }];
  return [...round, ...round.slice(0, -1)];
}

// Every cooldown ends: Figure-4 Left → Figure-4 Right → Child's Pose
const COOLDOWN_END = [C[4], C[5], C[0]];

// ─── 28 workouts — cycle: Lower Body · Upper Body · Core · Full Body ─────────

export const workouts: Workout[] = [
  // ── 1 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-01",
    name: "Workout 1 · Lower Body",
    description:
      "Foundation lower body session. Lunges and squats standing, then glutes and donkey kicks on the floor.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "foundation"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[10], W[7], W[4], W[5], W[3]],
    exercises: [
      ...superset(M[10], M[22]), // Alternating Lunges + Reverse Lunges [standing]
      ...superset(M[11], M[27]), // Glute Bridges + Donkey Kicks [floor]
      ...supersetFinal(M[14], M[7]), // Jump Squats + Squats [standing]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 2 · Upper Body ─────────────────────────────────────────────────────────
  {
    id: "workout-02",
    name: "Workout 2 · Upper Body",
    description:
      "Foundational push strength on the floor. Push-ups, planks, and spider cross planks hit every upper body angle.",
    estimatedDuration: 20,
    tags: ["upper body", "push", "foundation"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[0], W[1], W[3], W[8], W[6]],
    exercises: [
      ...superset(M[2], M[8]), // Push-Ups + Mountain Climbers [floor]
      ...superset(M[9], M[17]), // Plank Hold + Plank Shoulder Taps [floor]
      ...supersetFinal(M[3], M[6]), // Kneeling Push-Ups + Spider Cross Planks [floor]
    ],
    cooldowns: [C[6], C[7], C[8], ...COOLDOWN_END],
  },

  // ── 3 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-03",
    name: "Workout 3 · Core",
    description:
      "Anti-extension and anti-rotation core work. All floor movements — completely safe for lower back pain.",
    estimatedDuration: 20,
    tags: ["core", "foundation", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[10], W[6], W[0], W[3], W[4]],
    exercises: [
      ...superset(M[4], M[23]), // Airplane Push-Ups + Dead Bug [floor]
      ...superset(M[24], M[25]), // Bird Dog + Plank Rotations [floor]
      ...supersetFinal(M[26], M[28]), // Fire Hydrant + Pelvic Tilts [floor]
    ],
    cooldowns: [C[1], C[9], C[3], ...COOLDOWN_END],
  },

  // ── 4 · Full Body ──────────────────────────────────────────────────────────
  {
    id: "workout-04",
    name: "Workout 4 · Full Body",
    description:
      "Cardio on your feet, then power on the floor. Jumping jacks and high knees alternate with burpees and mountain climbers.",
    estimatedDuration: 20,
    tags: ["full body", "cardio", "foundation"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[0], W[2], W[3], W[4], W[7]],
    exercises: [
      ...superset(M[20], M[19]), // Jumping Jacks + High Knees [standing]
      ...superset(M[0], M[8]), // Burpees + Mountain Climbers [floor]
      ...supersetFinal(M[10], M[22]), // Alternating Lunges + Reverse Lunges [standing]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 5 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-05",
    name: "Workout 5 · Lower Body",
    description:
      "Lateral leg strength and glute activation. Side lunges standing, then glute bridges and floor work.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "lateral"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[7], W[2], W[5], W[4], W[3]],
    exercises: [
      ...superset(M[15], M[22]), // Side Lunges + Reverse Lunges [standing]
      ...superset(M[11], M[26]), // Glute Bridges + Fire Hydrant [floor]
      ...supersetFinal(M[12], M[27]), // Glute Bridge Holds + Donkey Kicks [floor]
    ],
    cooldowns: [C[9], C[3], C[1], ...COOLDOWN_END],
  },

  // ── 6 · Upper Body ─────────────────────────────────────────────────────────
  {
    id: "workout-06",
    name: "Workout 6 · Upper Body",
    description:
      "Upper body strength built entirely on the floor. Wave push-ups, planks, and inchworms for full range of motion.",
    estimatedDuration: 20,
    tags: ["upper body", "push", "strength"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[0], W[8], W[1], W[3], W[6]],
    exercises: [
      ...superset(M[1], M[5]), // Burpee Walk + Wave Push-Ups [floor]
      ...superset(M[8], M[9]), // Mountain Climbers + Plank Hold [floor]
      ...supersetFinal(M[4], M[16]), // Airplane Push-Ups + Inchworms [floor]
    ],
    cooldowns: [C[6], C[7], C[8], ...COOLDOWN_END],
  },

  // ── 7 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-07",
    name: "Workout 7 · Core",
    description:
      "Core stability deepening. Dead bug, bird dog, and plank progressions all on the floor.",
    estimatedDuration: 20,
    tags: ["core", "stability", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[0], W[3], W[10], W[7], W[4]],
    exercises: [
      ...superset(M[23], M[24]), // Dead Bug + Bird Dog [floor]
      ...superset(M[4], M[9]), // Airplane Push-Ups + Plank Hold [floor]
      ...supersetFinal(M[25], M[26]), // Plank Rotations + Fire Hydrant [floor]
    ],
    cooldowns: [C[1], C[3], C[8], ...COOLDOWN_END],
  },

  // ── 8 · Full Body ──────────────────────────────────────────────────────────
  {
    id: "workout-08",
    name: "Workout 8 · Full Body",
    description:
      "Floor power then standing cardio. Glute bridge holds and mountain climbers on the mat, then jumping jacks and lunges on your feet.",
    estimatedDuration: 20,
    tags: ["full body", "power", "endurance"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[0], W[3], W[2], W[7], W[4]],
    exercises: [
      ...superset(M[12], M[8]), // Glute Bridge Holds + Mountain Climbers [floor]
      ...superset(M[20], M[18]), // Jumping Jacks + Calf Raises [standing]
      ...supersetFinal(M[10], M[19]), // Alternating Lunges + High Knees [standing]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 9 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-09",
    name: "Workout 9 · Lower Body",
    description:
      "Single-leg stability and glute strength. Standing balance work then floor glute activation.",
    estimatedDuration: 20,
    tags: ["lower body", "stability", "single-leg"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[2], W[7], W[5], W[4], W[3]],
    exercises: [
      ...superset(M[21], M[22]), // Single Leg Deadlift + Reverse Lunges [standing]
      ...superset(M[7], M[10]), // Squats + Alternating Lunges [standing]
      ...supersetFinal(M[11], M[27]), // Glute Bridges + Donkey Kicks [floor]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 10 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-10",
    name: "Workout 10 · Upper Body",
    description:
      "Chest and shoulder focus with push-up and plank combinations — all on the floor.",
    estimatedDuration: 20,
    tags: ["upper body", "chest", "shoulders"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[1], W[0], W[3], W[6], W[8]],
    exercises: [
      ...superset(M[2], M[8]), // Push-Ups + Mountain Climbers [floor]
      ...superset(M[6], M[9]), // Spider Cross Planks + Plank Hold [floor]
      ...supersetFinal(M[1], M[5]), // Burpee Walk + Wave Push-Ups [floor]
    ],
    cooldowns: [C[6], C[7], C[8], ...COOLDOWN_END],
  },

  // ── 11 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-11",
    name: "Workout 11 · Core",
    description:
      "Bird dog, dead bug, and plank rotations. Maximum spinal stability with zero compression — all floor work.",
    estimatedDuration: 20,
    tags: ["core", "stability", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[3], W[0], W[10], W[7], W[4]],
    exercises: [
      ...superset(M[24], M[23]), // Bird Dog + Dead Bug [floor]
      ...superset(M[25], M[26]), // Plank Rotations + Fire Hydrant [floor]
      ...supersetFinal(M[4], M[13]), // Airplane Push-Ups + Russian Twists [floor]
    ],
    cooldowns: [C[1], C[3], C[8], ...COOLDOWN_END],
  },

  // ── 12 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-12",
    name: "Workout 12 · Full Body",
    description:
      "Standing cardio then floor strength. High knees and jumping jacks on your feet, then burpees and mountain climbers on the mat.",
    estimatedDuration: 20,
    tags: ["full body", "cardio", "strength"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[2], W[0], W[3], W[7], W[4]],
    exercises: [
      ...superset(M[19], M[10]), // High Knees + Alternating Lunges [standing]
      ...superset(M[20], M[18]), // Jumping Jacks + Calf Raises [standing]
      ...supersetFinal(M[1], M[8]), // Burpee Walk + Mountain Climbers [floor]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 13 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-13",
    name: "Workout 13 · Lower Body",
    description:
      "Explosive standing lower body paired with floor glute work. Jump squats and lunges alternate with glute bridge holds and donkey kicks.",
    estimatedDuration: 20,
    tags: ["lower body", "power", "glutes"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[2], W[7], W[4], W[3], W[5]],
    exercises: [
      ...superset(M[14], M[10]), // Jump Squats + Alternating Lunges [standing]
      ...superset(M[12], M[27]), // Glute Bridge Holds + Donkey Kicks [floor]
      ...supersetFinal(M[22], M[15]), // Reverse Lunges + Side Lunges [standing]
    ],
    cooldowns: [C[2], C[3], C[9], ...COOLDOWN_END],
  },

  // ── 14 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-14",
    name: "Workout 14 · Upper Body",
    description:
      "Plank and push-up endurance on the floor. Spider cross planks, shoulder taps, and airplane push-ups test every muscle.",
    estimatedDuration: 20,
    tags: ["upper body", "endurance", "push"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[0], W[1], W[8], W[3], W[6]],
    exercises: [
      ...superset(M[6], M[17]), // Spider Cross Planks + Plank Shoulder Taps [floor]
      ...superset(M[2], M[9]), // Push-Ups + Plank Hold [floor]
      ...supersetFinal(M[1], M[4]), // Burpee Walk + Airplane Push-Ups [floor]
    ],
    cooldowns: [C[6], C[7], C[8], ...COOLDOWN_END],
  },

  // ── 15 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-15",
    name: "Workout 15 · Core",
    description:
      "Plank rotations, fire hydrant, and bird dog. Total floor core session for spinal stability.",
    estimatedDuration: 20,
    tags: ["core", "lateral strength", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[0], W[10], W[3], W[7], W[4]],
    exercises: [
      ...superset(M[4], M[25]), // Airplane Push-Ups + Plank Rotations [floor]
      ...superset(M[26], M[23]), // Fire Hydrant + Dead Bug [floor]
      ...supersetFinal(M[24], M[28]), // Bird Dog + Pelvic Tilts [floor]
    ],
    cooldowns: [C[1], C[3], C[8], ...COOLDOWN_END],
  },

  // ── 16 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-16",
    name: "Workout 16 · Full Body",
    description:
      "Floor power and standing cardio in alternating sets. Glute bridge holds and airplane push-ups, then jumping jacks and lunge intervals.",
    estimatedDuration: 20,
    tags: ["full body", "conditioning", "strength"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[0], W[2], W[7], W[3], W[4]],
    exercises: [
      ...superset(M[12], M[4]), // Glute Bridge Holds + Airplane Push-Ups [floor]
      ...superset(M[19], M[22]), // High Knees + Reverse Lunges [standing]
      ...supersetFinal(M[20], M[10]), // Jumping Jacks + Alternating Lunges [standing]
    ],
    cooldowns: [C[2], C[1], C[3], ...COOLDOWN_END],
  },

  // ── 17 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-17",
    name: "Workout 17 · Lower Body",
    description:
      "Progressive lower body strength. Standing balance and jump work, then floor glute activation to finish.",
    estimatedDuration: 20,
    tags: ["lower body", "strength", "balance"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[7], W[2], W[4], W[5], W[3]],
    exercises: [
      ...superset(M[7], M[21]), // Squats + Single Leg Deadlift [standing]
      ...superset(M[14], M[10]), // Jump Squats + Alternating Lunges [standing]
      ...supersetFinal(M[11], M[27]), // Glute Bridges + Donkey Kicks [floor]
    ],
    cooldowns: [C[1], C[2], C[9], ...COOLDOWN_END],
  },

  // ── 18 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-18",
    name: "Workout 18 · Upper Body",
    description:
      "Push-up strength from multiple angles on the floor. Burpee walk, spider planks, and wave push-ups hit every upper body fiber.",
    estimatedDuration: 20,
    tags: ["upper body", "push", "strength"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[1], W[0], W[8], W[6], W[3]],
    exercises: [
      ...superset(M[1], M[2]), // Burpee Walk + Push-Ups [floor]
      ...superset(M[6], M[8]), // Spider Cross Planks + Mountain Climbers [floor]
      ...supersetFinal(M[5], M[9]), // Wave Push-Ups + Plank Hold [floor]
    ],
    cooldowns: [C[7], C[6], C[8], ...COOLDOWN_END],
  },

  // ── 19 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-19",
    name: "Workout 19 · Core",
    description:
      "Dead bug, Russian twists, and mountain climbers. High-demand floor core session.",
    estimatedDuration: 20,
    tags: ["core", "strength", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[3], W[0], W[7], W[10], W[4]],
    exercises: [
      ...superset(M[23], M[24]), // Dead Bug + Bird Dog [floor]
      ...superset(M[13], M[28]), // Russian Twists + Pelvic Tilts [floor]
      ...supersetFinal(M[8], M[25]), // Mountain Climbers + Plank Rotations [floor]
    ],
    cooldowns: [C[1], C[3], C[8], ...COOLDOWN_END],
  },

  // ── 20 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-20",
    name: "Workout 20 · Full Body",
    description:
      "Burpees on the floor, then standing cardio. A challenging full-body session that tests everything you've built.",
    estimatedDuration: 20,
    tags: ["full body", "intense", "strength"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[0], W[3], W[2], W[4], W[7]],
    exercises: [
      ...superset(M[0], M[8]), // Burpees + Mountain Climbers [floor]
      ...superset(M[12], M[1]), // Glute Bridge Holds + Burpee Walk [floor]
      ...supersetFinal(M[19], M[10]), // High Knees + Alternating Lunges [standing]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 21 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-21",
    name: "Workout 21 · Lower Body",
    description:
      "Reverse lunges and side lunges standing, then glute bridges and fire hydrant on the floor.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "endurance"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[2], W[7], W[5], W[3], W[4]],
    exercises: [
      ...superset(M[22], M[15]), // Reverse Lunges + Side Lunges [standing]
      ...superset(M[11], M[26]), // Glute Bridges + Fire Hydrant [floor]
      ...supersetFinal(M[14], M[21]), // Jump Squats + Single Leg Deadlift [standing]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },

  // ── 22 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-22",
    name: "Workout 22 · Upper Body",
    description:
      "High-rep push endurance on the floor. Spider planks, burpee walks, and wave push-ups will test your stamina.",
    estimatedDuration: 20,
    tags: ["upper body", "endurance", "push"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[0], W[8], W[1], W[6], W[3]],
    exercises: [
      ...superset(M[6], M[2]), // Spider Cross Planks + Push-Ups [floor]
      ...superset(M[1], M[8]), // Burpee Walk + Mountain Climbers [floor]
      ...supersetFinal(M[5], M[9]), // Wave Push-Ups + Plank Hold [floor]
    ],
    cooldowns: [C[6], C[7], C[8], ...COOLDOWN_END],
  },

  // ── 23 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-23",
    name: "Workout 23 · Core",
    description:
      "Plank rotations, airplane push-ups, and dead bug. Attacks all planes of core stability on the floor.",
    estimatedDuration: 20,
    tags: ["core", "advanced", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[0], W[3], W[7], W[10], W[4]],
    exercises: [
      ...superset(M[25], M[26]), // Plank Rotations + Fire Hydrant [floor]
      ...superset(M[4], M[24]), // Airplane Push-Ups + Bird Dog [floor]
      ...supersetFinal(M[23], M[13]), // Dead Bug + Russian Twists [floor]
    ],
    cooldowns: [C[1], C[3], C[8], ...COOLDOWN_END],
  },

  // ── 24 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-24",
    name: "Workout 24 · Full Body",
    description:
      "Burpees and kneeling push-ups on the floor, then jump squats and reverse lunges on your feet. High-intensity full-body session.",
    estimatedDuration: 20,
    tags: ["full body", "intense", "cardio"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[0], W[2], W[3], W[7], W[4]],
    exercises: [
      ...superset(M[0], M[3]), // Burpees + Kneeling Push-Ups [floor]
      ...superset(M[14], M[22]), // Jump Squats + Reverse Lunges [standing]
      ...supersetFinal(M[1], M[4]), // Burpee Walk + Airplane Push-Ups [floor]
    ],
    cooldowns: [C[2], C[3], C[9], ...COOLDOWN_END],
  },

  // ── 25 · Lower Body ────────────────────────────────────────────────────────
  {
    id: "workout-25",
    name: "Workout 25 · Lower Body",
    description:
      "Peak lower body session. Explosive standing work and floor glute isolation for maximum leg and glute strength.",
    estimatedDuration: 20,
    tags: ["lower body", "peak", "glutes"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [W[7], W[2], W[5], W[4], W[3]],
    exercises: [
      ...superset(M[14], M[21]), // Jump Squats + Single Leg Deadlift [standing]
      ...superset(M[12], M[27]), // Glute Bridge Holds + Donkey Kicks [floor]
      ...supersetFinal(M[22], M[15]), // Reverse Lunges + Side Lunges [standing]
    ],
    cooldowns: [C[1], C[3], C[9], ...COOLDOWN_END],
  },

  // ── 26 · Upper Body ────────────────────────────────────────────────────────
  {
    id: "workout-26",
    name: "Workout 26 · Upper Body",
    description:
      "Peak upper body session. A full push-up ladder and plank sequence, finishing with mountain climbers and inchworms.",
    estimatedDuration: 20,
    tags: ["upper body", "peak", "push"],
    coverImage: "/images/workouts/upper-body.png",
    warmups: [W[1], W[0], W[3], W[8], W[6]],
    exercises: [
      ...superset(M[1], M[6]), // Burpee Walk + Spider Cross Planks [floor]
      ...superset(M[2], M[5]), // Push-Ups + Wave Push-Ups [floor]
      ...supersetFinal(M[8], M[16]), // Mountain Climbers + Inchworms [floor]
    ],
    cooldowns: [C[6], C[7], C[8], ...COOLDOWN_END],
  },

  // ── 27 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-27",
    name: "Workout 27 · Core",
    description:
      "Peak core session. Airplane push-ups, bird dog, and fire hydrant for total floor spinal stability.",
    estimatedDuration: 20,
    tags: ["core", "peak", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [W[3], W[0], W[10], W[4], W[7]],
    exercises: [
      ...superset(M[4], M[23]), // Airplane Push-Ups + Dead Bug [floor]
      ...superset(M[24], M[25]), // Bird Dog + Plank Rotations [floor]
      ...supersetFinal(M[26], M[13]), // Fire Hydrant + Russian Twists [floor]
    ],
    cooldowns: [C[1], C[3], C[8], ...COOLDOWN_END],
  },

  // ── 28 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-28",
    name: "Workout 28 · Full Body",
    description:
      "The final workout. Burpees on the floor, then jump squats and high knees standing. Test everything you've built.",
    estimatedDuration: 20,
    tags: ["full body", "peak", "challenge"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [W[0], W[2], W[3], W[4], W[7]],
    exercises: [
      ...superset(M[0], M[8]), // Burpees + Mountain Climbers [floor]
      ...superset(M[14], M[20]), // Jump Squats + Jumping Jacks [standing]
      ...supersetFinal(M[19], M[22]), // High Knees + Reverse Lunges [standing]
    ],
    cooldowns: [C[1], C[2], C[3], ...COOLDOWN_END],
  },
];

export function getWorkoutById(id: string): Workout | undefined {
  return workouts.find((w) => w.id === id);
}

export function getTotalExercisesForWorkout(workout: Workout): number {
  return (
    workout.warmups.length +
    workout.exercises.filter((e) => !e.isRest).length +
    workout.cooldowns.length
  );
}
