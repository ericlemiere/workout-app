import type { WorkoutTemplate } from "@/types";
import {
  squats,
  prisonerSquats,
  sumoSquats,
  squatJumps,
  squatsToCalfRaises,
  lunges,
  reverseLunges,
  sideLunges,
  lateralSquatsLeft,
  lateralSquatsRight,
  singleLegSquatsLeft,
  singleLegSquatsRight,
  calfRaises,
  buttKicks,
  gluteBridges,
  gluteBridgeHolds,
  singleLegGluteBridgeLeft,
  singleLegGluteBridgeRight,
  singleLegDeadlift,
  fireHydrantLeft,
  fireHydrantRight,
  donkeyKicksLeft,
  donkeyKicksRight,
} from "./exercisesLowerBody";
import {
  highKneesMarch,
  standingHipRotations,
  activeCalfStretch,
  malasanaSquat,
  torsoTwists,
  deepSideToSideLunges,
  rotatingToeTouches,
  pendulumHamstringStretch,
} from "./warmUps";
import {
  childsPose,
  hipFlexorStretch,
  quadStretchLeft,
  quadStretchRight,
  seatedHamstringStretch,
  figure4Left,
  figure4Right,
  catCow,
  seatedForwardFold,
} from "./coolDowns";

const COOLDOWN_END = [figure4Left, figure4Right, childsPose];

export const lowerBodyTemplates: WorkoutTemplate[] = [
  // ── 1 · Lower Body ─────────────────────────────────────────────────────────
  {
    id: "workout-01",
    name: "Workout 1 · Lower Body",
    description:
      "Foundation lower body session. Lunges and squats standing, then glutes and donkey kicks on the floor.",
    estimatedDuration: 20,
    tags: ["lower body", "glutes", "foundation"],
    coverImage: "/images/workouts/lower-body.png",
    warmups: [
      highKneesMarch,
      standingHipRotations,
      activeCalfStretch,
      malasanaSquat,
      torsoTwists,
    ],
    supersets: [
      { e1: lunges, e2: [squats, squatJumps] },
      { e1: gluteBridges, e2: donkeyKicksLeft, e3: donkeyKicksRight },
      { e1: reverseLunges, e2: squats },
    ],
    lvl2Extra: { e1: calfRaises, e2: sideLunges },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      standingHipRotations,
      deepSideToSideLunges,
      malasanaSquat,
      activeCalfStretch,
      torsoTwists,
    ],
    supersets: [
      { e1: sideLunges, e2: reverseLunges, e3: squatsToCalfRaises },
      { e1: gluteBridges, e2: fireHydrantLeft, e3: fireHydrantRight },
      { e1: gluteBridgeHolds, e2: donkeyKicksLeft, e3: donkeyKicksRight },
    ],
    lvl2Extra: { e1: lateralSquatsLeft, e2: lateralSquatsRight },
    lvl3Extra: { e1: singleLegGluteBridgeLeft, e2: singleLegGluteBridgeRight },
    cooldowns: [
      seatedForwardFold,
      seatedHamstringStretch,
      hipFlexorStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      deepSideToSideLunges,
      standingHipRotations,
      malasanaSquat,
      activeCalfStretch,
      torsoTwists,
    ],
    supersets: [
      { e1: singleLegDeadlift, e2: reverseLunges },
      { e1: squats, e2: lunges, e3: prisonerSquats },
      { e1: gluteBridges, e2: donkeyKicksLeft, e3: donkeyKicksRight },
    ],
    lvl2Extra: { e1: lateralSquatsLeft, e2: lateralSquatsRight },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      deepSideToSideLunges,
      standingHipRotations,
      activeCalfStretch,
      torsoTwists,
      malasanaSquat,
    ],
    supersets: [
      { e1: [squats, squatJumps], e2: lunges },
      { e1: gluteBridgeHolds, e2: donkeyKicksLeft, e3: donkeyKicksRight },
      { e1: reverseLunges, e2: sideLunges },
    ],
    lvl2Extra: { e1: lateralSquatsLeft, e2: lateralSquatsRight },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      catCow,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      standingHipRotations,
      deepSideToSideLunges,
      activeCalfStretch,
      malasanaSquat,
      torsoTwists,
    ],
    supersets: [
      { e1: squats, e2: singleLegDeadlift },
      { e1: [sumoSquats, squatJumps], e2: lunges },
      { e1: gluteBridges, e2: donkeyKicksLeft, e3: donkeyKicksRight },
    ],
    lvl2Extra: { e1: lateralSquatsLeft, e2: lateralSquatsRight },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      catCow,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      deepSideToSideLunges,
      standingHipRotations,
      malasanaSquat,
      rotatingToeTouches,
      activeCalfStretch,
    ],
    supersets: [
      { e1: reverseLunges, e2: sideLunges },
      { e1: gluteBridges, e2: fireHydrantLeft, e3: fireHydrantRight },
      { e1: [squats, squatJumps], e2: singleLegDeadlift },
    ],
    lvl2Extra: { e1: singleLegGluteBridgeLeft, e2: singleLegGluteBridgeRight },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      standingHipRotations,
      deepSideToSideLunges,
      malasanaSquat,
      activeCalfStretch,
      pendulumHamstringStretch,
    ],
    supersets: [
      { e1: [squats, squatJumps], e2: singleLegDeadlift },
      { e1: gluteBridgeHolds, e2: donkeyKicksLeft, e3: donkeyKicksRight },
      { e1: reverseLunges, e2: sideLunges },
    ],
    lvl2Extra: { e1: singleLegGluteBridgeLeft, e2: singleLegGluteBridgeRight },
    lvl3Extra: {
      e1: buttKicks,
      e2: singleLegSquatsLeft,
      e3: singleLegSquatsRight,
    },
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      catCow,
      ...COOLDOWN_END,
    ],
  },
];
