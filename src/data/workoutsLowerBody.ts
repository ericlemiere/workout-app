import type { WorkoutTemplate } from "@/types";
import {
  squats,
  prisonerSquats,
  sumoSquats,
  squatJumps,
  squatsToCalfRaises,
  lunges,
  reverseLunges,
  sideLungesLeft,
  sideLungesRight,
  singleLegSquatsLeft,
  singleLegSquatsRight,
  calfRaises,
  buttKicks,
  gluteBridges,
  gluteBridgeHolds,
  singleLegGluteBridgeLeft,
  singleLegGluteBridgeRight,
  fireHydrantLeft,
  fireHydrantRight,
  donkeyKicksLeft,
  donkeyKicksRight,
  forwardLungeLeft,
  forwardLungeRight,
  reverseLungesLeft,
  reverseLungesRight,
  singleLegDeadliftLeft,
  singleLegDeadliftRight,
} from "./exercisesLowerBody";
import {
  highKneesMarch,
  standingHipRotations,
  activeCalfStretch,
  deepHoldSquatWithElbowPry,
  torsoTwists,
  deepSideToSideLunges,
  rotatingToeTouches,
  pendulumHamstringStretch,
  openTheGate,
} from "./warmUps";
import {
  childsPose,
  hipFlexorStretch,
  quadStretchLeft,
  quadStretchRight,
  seatedHamstringStretch,
  seatedCrossoverStretchLeft,
  seatedCrossoverStretchRight,
  seatedCrossoverHamstringStretchLeft,
  seatedCrossoverHamstringStretchRight,
  figure4Left,
  figure4Right,
  proneGluteStretchLeft,
  proneGluteStretchRight,
  catCow,
  seatedForwardFold,
} from "./coolDowns";

// Alternating glute-stretch finishers — every other workout uses the prone version
const COOLDOWN_END = [figure4Left, figure4Right, childsPose];
const COOLDOWN_END_PRONE = [
  proneGluteStretchLeft,
  proneGluteStretchRight,
  childsPose,
];

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
      deepHoldSquatWithElbowPry,
      rotatingToeTouches,
    ],
    supersets: [
      { e1: lunges, e2: [squats, squatJumps] },
      { e1: gluteBridges, e2: forwardLungeLeft, e3: forwardLungeRight },
      { e1: reverseLunges, e2: sumoSquats },
    ],
    lvl2Extra: {
      e1: squatsToCalfRaises,
      e2: sideLungesLeft,
      e3: sideLungesRight,
    },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      seatedForwardFold,
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
      torsoTwists,
      deepHoldSquatWithElbowPry,
      activeCalfStretch,
      pendulumHamstringStretch,
    ],
    supersets: [
      { e1: squatsToCalfRaises, e2: reverseLunges },
      { e1: gluteBridges, e2: fireHydrantLeft, e3: fireHydrantRight },
      { e1: gluteBridgeHolds, e2: donkeyKicksLeft, e3: donkeyKicksRight },
    ],
    lvl2Extra: {
      e1: prisonerSquats,
      e2: sideLungesLeft,
      e3: sideLungesRight,
    },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      seatedForwardFold,
      seatedHamstringStretch,
      hipFlexorStretch,
      ...COOLDOWN_END_PRONE,
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
      standingHipRotations,
      deepSideToSideLunges,
      torsoTwists,
      activeCalfStretch,
      openTheGate,
    ],
    supersets: [
      { e1: reverseLungesLeft, e2: reverseLungesRight, e3: prisonerSquats },
      { e1: gluteBridges, e2: donkeyKicksLeft, e3: donkeyKicksRight },
      { e1: squats, e2: lunges },
    ],
    lvl2Extra: { e1: singleLegDeadliftLeft, e2: singleLegDeadliftRight },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      seatedForwardFold,
      quadStretchLeft,
      quadStretchRight,
      seatedCrossoverHamstringStretchRight,
      seatedCrossoverHamstringStretchLeft,
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
      highKneesMarch,
      pendulumHamstringStretch,
      standingHipRotations,
      deepSideToSideLunges,
      activeCalfStretch,
    ],
    supersets: [
      { e1: [squats, squatJumps], e2: lunges },
      { e1: gluteBridgeHolds, e2: donkeyKicksLeft, e3: donkeyKicksRight },
      {
        e1: forwardLungeLeft,
        e2: forwardLungeRight,
        e3: [sideLungesLeft, sideLungesRight],
      },
    ],
    lvl2Extra: { e1: singleLegGluteBridgeLeft, e2: singleLegGluteBridgeRight },
    lvl3Extra: { e1: singleLegSquatsLeft, e2: singleLegSquatsRight },
    cooldowns: [
      catCow,
      quadStretchLeft,
      quadStretchRight,
      seatedCrossoverHamstringStretchLeft,
      seatedCrossoverHamstringStretchRight,
      ...COOLDOWN_END_PRONE,
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
      deepHoldSquatWithElbowPry,
      rotatingToeTouches,
    ],
    supersets: [
      { e1: squats, e2: sideLungesLeft, e3: sideLungesRight },
      { e1: [sumoSquats, squatJumps], e2: lunges },
      { e1: gluteBridges, e2: donkeyKicksLeft, e3: donkeyKicksRight },
    ],
    lvl2Extra: {
      e1: prisonerSquats,
      e2: [singleLegDeadliftLeft, singleLegDeadliftRight],
    },
    lvl3Extra: {
      e1: singleLegGluteBridgeLeft,
      e2: singleLegGluteBridgeRight,
    },
    cooldowns: [
      seatedForwardFold,
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
      standingHipRotations,
      deepSideToSideLunges,
      rotatingToeTouches,
      deepHoldSquatWithElbowPry,
      activeCalfStretch,
    ],
    supersets: [
      { e1: reverseLungesLeft, e2: reverseLungesRight },
      { e1: gluteBridges, e2: fireHydrantLeft, e3: fireHydrantRight },
      { e1: [squats, squatJumps], e2: forwardLungeLeft },
    ],
    lvl2Extra: { e1: singleLegDeadliftLeft, e2: singleLegDeadliftRight },
    lvl3Extra: {
      e1: singleLegGluteBridgeLeft,
      e2: singleLegGluteBridgeRight,
    },
    cooldowns: [
      seatedForwardFold,
      quadStretchLeft,
      quadStretchRight,
      seatedCrossoverStretchRight,
      seatedCrossoverStretchLeft,
      ...COOLDOWN_END_PRONE,
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
      highKneesMarch,
      deepHoldSquatWithElbowPry,
      activeCalfStretch,
      pendulumHamstringStretch,
      openTheGate,
    ],
    supersets: [
      {
        e1: [squats, squatJumps],
        e2: singleLegDeadliftLeft,
        e3: singleLegDeadliftRight,
      },
      { e1: gluteBridgeHolds, e2: donkeyKicksLeft, e3: donkeyKicksRight },
      { e1: prisonerSquats, e2: lunges },
    ],
    lvl2Extra: { e1: singleLegGluteBridgeLeft, e2: singleLegGluteBridgeRight },
    lvl3Extra: {
      e1: buttKicks,
      e2: singleLegSquatsLeft,
      e3: singleLegSquatsRight,
    },
    cooldowns: [
      seatedForwardFold,
      seatedCrossoverHamstringStretchLeft,
      seatedCrossoverHamstringStretchRight,
      catCow,
      ...COOLDOWN_END,
    ],
  },
];
