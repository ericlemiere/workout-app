import type { WorkoutTemplate } from "@/types";
import {
  mountainClimberWalks,
  mountainClimbers,
  plank,
  russianTwists,
  deadBug,
  birdDog,
  plankRotations,
  pelvicTilts,
  standingSideCrunchLeft,
  standingSideCrunchRight,
  heelTaps,
  sidePlankLeft,
  sidePlankRight,
  windshieldWipers,
  sitUps,
  scissorKicks,
  flutterKicks,
  legRaises,
} from "./exercisesCore";
import { airplanePushUps } from "./exercisesUpperBody";
import { fireHydrantLeft, fireHydrantRight } from "./exercisesLowerBody";
import {
  highKneesMarch,
  rollDowns,
  dynamicSideBends,
  torsoTwists,
  activeCalfStretch,
  standingHipRotations,
} from "./warmUps";
import {
  childsPose,
  hipFlexorStretch,
  catCow,
  seatedHamstringStretch,
  upperBackStretch,
  spinalTwistLeft,
  spinalTwistRight,
  figure4Left,
  figure4Right,
} from "./coolDowns";

const COOLDOWN_END = [figure4Left, figure4Right, childsPose];

export const coreTemplates: WorkoutTemplate[] = [
  // ── 3 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-03",
    name: "Workout 3 · Core",
    description:
      "Anti-extension and anti-rotation core work. All floor movements — completely safe for lower back pain.",
    estimatedDuration: 20,
    tags: ["core", "foundation", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      highKneesMarch,
      rollDowns,
      dynamicSideBends,
      torsoTwists,
      activeCalfStretch,
    ],
    supersets: [
      { e1: airplanePushUps, e2: deadBug },
      { e1: birdDog, e2: plankRotations },
      { e1: fireHydrantLeft, e2: fireHydrantRight, e3: pelvicTilts },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: [heelTaps, russianTwists], e2: windshieldWipers },
    cooldowns: [
      hipFlexorStretch,
      catCow,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      torsoTwists,
      highKneesMarch,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: deadBug, e2: birdDog },
      { e1: airplanePushUps, e2: plank, e3: sitUps },
      { e1: plankRotations, e2: fireHydrantLeft, e3: fireHydrantRight },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: [heelTaps, russianTwists], e2: windshieldWipers },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      torsoTwists,
      dynamicSideBends,
      highKneesMarch,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: birdDog, e2: deadBug },
      { e1: plankRotations, e2: fireHydrantLeft, e3: fireHydrantRight },
      { e1: airplanePushUps, e2: [heelTaps, russianTwists] },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: windshieldWipers, e2: scissorKicks },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      highKneesMarch,
      torsoTwists,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: airplanePushUps, e2: plankRotations },
      { e1: fireHydrantLeft, e2: fireHydrantRight, e3: deadBug },
      { e1: birdDog, e2: pelvicTilts },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: [heelTaps, russianTwists], e2: windshieldWipers },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      torsoTwists,
      dynamicSideBends,
      standingHipRotations,
      highKneesMarch,
      activeCalfStretch,
    ],
    supersets: [
      { e1: deadBug, e2: birdDog },
      { e1: [heelTaps, russianTwists], e2: pelvicTilts },
      { e1: [mountainClimberWalks, mountainClimbers], e2: plankRotations },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: windshieldWipers, e2: scissorKicks },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      spinalTwistLeft,
      spinalTwistRight,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      torsoTwists,
      standingHipRotations,
      highKneesMarch,
      activeCalfStretch,
    ],
    supersets: [
      { e1: plankRotations, e2: fireHydrantLeft, e3: fireHydrantRight },
      { e1: airplanePushUps, e2: standingSideCrunchLeft, e3: standingSideCrunchRight },
      { e1: deadBug, e2: [heelTaps, russianTwists], e3: legRaises },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: windshieldWipers, e2: flutterKicks },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      torsoTwists,
      dynamicSideBends,
      highKneesMarch,
      activeCalfStretch,
      standingHipRotations,
    ],
    supersets: [
      { e1: airplanePushUps, e2: deadBug },
      { e1: birdDog, e2: plankRotations },
      {
        e1: fireHydrantLeft,
        e2: fireHydrantRight,
        e3: [heelTaps, russianTwists],
      },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: windshieldWipers, e2: scissorKicks },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
      ...COOLDOWN_END,
    ],
  },
];
