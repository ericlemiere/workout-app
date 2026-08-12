import type { WorkoutTemplate } from "@/types";
import {
  mountainClimberWalks,
  mountainClimbers,
  plank,
  highPlankToElbowPlank,
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
  gluteBridgeHoldKneeToChest,
} from "./exercisesCore";
import { airplanePushUps } from "./exercisesUpperBody";
import { fireHydrantLeft, fireHydrantRight } from "./exercisesLowerBody";
import {
  highKneesMarch,
  rollDowns,
  dynamicSideBends,
  chestOpenersWithRotation,
  torsoTwists,
  shoulderRotations,
  activeCalfStretch,
  pendulumHamstringStretch,
  standingHipRotations,
  rotatingToeTouches,
  openTheGate,
} from "./warmUps";
import {
  childsPose,
  fullBodyStretch,
  hipFlexorStretch,
  catCow,
  seatedHamstringStretch,
  seatedCrossoverStretchLeft,
  seatedCrossoverStretchRight,
  seatedCrossoverHamstringStretchLeft,
  seatedCrossoverHamstringStretchRight,
  spinalTwistLeft,
  spinalTwistRight,
  figure4Left,
  figure4Right,
  proneGluteStretchLeft,
  proneGluteStretchRight,
} from "./coolDowns";

// Alternating glute-stretch finishers — every other workout uses the prone version
const COOLDOWN_END = [figure4Left, figure4Right, fullBodyStretch];
const COOLDOWN_END_PRONE = [
  proneGluteStretchLeft,
  proneGluteStretchRight,
  childsPose,
];

export const coreTemplates: WorkoutTemplate[] = [
  // ── 3 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-03",
    name: "Workout 3 · Core",
    description:
      "Anti-extension and anti-rotation core work. All floor movements — completely safe for lower back pain.",
    tags: ["core", "foundation", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      torsoTwists,
      rotatingToeTouches,
      rollDowns,
      chestOpenersWithRotation,
      activeCalfStretch,
    ],
    supersets: [
      { e1: standingSideCrunchLeft, e2: standingSideCrunchRight },
      { e1: birdDog, e2: plankRotations },
      { e1: fireHydrantLeft, e2: fireHydrantRight, e3: pelvicTilts },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: [heelTaps, sitUps], e2: [windshieldWipers, legRaises] },
    cooldowns: [spinalTwistLeft, spinalTwistRight, catCow, ...COOLDOWN_END],
  },

  // ── 7 · Core ───────────────────────────────────────────────────────────────
  {
    id: "workout-07",
    name: "Workout 7 · Core",
    description:
      "Core stability deepening. Dead bug, bird dog, and plank progressions all on the floor.",
    tags: ["core", "stability", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      highKneesMarch,
      pendulumHamstringStretch,
      shoulderRotations,
      rotatingToeTouches,
      activeCalfStretch,
    ],
    supersets: [
      { e1: deadBug, e2: birdDog },
      { e1: airplanePushUps, e2: [plank, highPlankToElbowPlank] },
      { e1: fireHydrantLeft, e2: fireHydrantRight, e3: pelvicTilts },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: sitUps, e2: windshieldWipers },
    cooldowns: [
      spinalTwistLeft,
      spinalTwistRight,
      seatedCrossoverStretchLeft,
      seatedCrossoverStretchRight,
      ...COOLDOWN_END_PRONE,
    ],
  },

  // ── 11 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-11",
    name: "Workout 11 · Core",
    description:
      "Bird dog, dead bug, and plank rotations. Maximum spinal stability with zero compression — all floor work.",
    tags: ["core", "stability", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      torsoTwists,
      dynamicSideBends,
      pendulumHamstringStretch,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: birdDog, e2: deadBug },
      { e1: plankRotations, e2: fireHydrantLeft, e3: fireHydrantRight },
      {
        e1: standingSideCrunchLeft,
        e2: standingSideCrunchRight,
        e3: gluteBridgeHoldKneeToChest,
      },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: windshieldWipers, e2: [scissorKicks, flutterKicks] },
    cooldowns: [
      spinalTwistLeft,
      spinalTwistRight,
      seatedCrossoverStretchLeft,
      seatedCrossoverStretchRight,
      ...COOLDOWN_END,
    ],
  },

  // ── 15 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-15",
    name: "Workout 15 · Core",
    description:
      "Plank rotations, fire hydrant, and bird dog. Total floor core session for spinal stability.",
    tags: ["core", "lateral strength", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      dynamicSideBends,
      highKneesMarch,
      rotatingToeTouches,
      standingHipRotations,
      pendulumHamstringStretch,
    ],
    supersets: [
      { e1: standingSideCrunchLeft, e2: standingSideCrunchRight },
      { e1: fireHydrantLeft, e2: fireHydrantRight, e3: pelvicTilts },
      { e1: deadBug, e2: gluteBridgeHoldKneeToChest },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: {
      e1: [heelTaps, russianTwists],
      e2: [scissorKicks, windshieldWipers],
    },
    cooldowns: [
      seatedCrossoverHamstringStretchLeft,
      seatedCrossoverHamstringStretchRight,
      spinalTwistLeft,
      spinalTwistRight,
      ...COOLDOWN_END_PRONE,
    ],
  },

  // ── 19 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-19",
    name: "Workout 19 · Core",
    description:
      "Dead bug, Russian twists, and mountain climbers. High-demand floor core session.",
    tags: ["core", "strength", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      torsoTwists,
      standingHipRotations,
      pendulumHamstringStretch,
      highKneesMarch,
      activeCalfStretch,
    ],
    supersets: [
      { e1: deadBug, e2: birdDog },
      { e1: [heelTaps, russianTwists], e2: gluteBridgeHoldKneeToChest },
      { e1: [mountainClimberWalks, mountainClimbers], e2: plankRotations },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: [sitUps, legRaises], e2: [flutterKicks, scissorKicks] },
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
    tags: ["core", "advanced", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      torsoTwists,
      pendulumHamstringStretch,
      highKneesMarch,
      activeCalfStretch,
      openTheGate,
    ],
    supersets: [
      { e1: standingSideCrunchLeft, e2: standingSideCrunchRight },
      { e1: airplanePushUps, e2: plankRotations },
      { e1: deadBug, e2: [heelTaps, russianTwists], e3: legRaises },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: scissorKicks, e2: [flutterKicks, sitUps] },
    cooldowns: [
      seatedCrossoverStretchLeft,
      seatedCrossoverStretchRight,
      spinalTwistLeft,
      spinalTwistRight,
      ...COOLDOWN_END_PRONE,
    ],
  },

  // ── 27 · Core ──────────────────────────────────────────────────────────────
  {
    id: "workout-27",
    name: "Workout 27 · Core",
    description:
      "Peak core session. Airplane push-ups, bird dog, and fire hydrant for total floor spinal stability.",
    tags: ["core", "peak", "back safe"],
    coverImage: "/images/workouts/core.png",
    warmups: [
      torsoTwists,
      dynamicSideBends,
      pendulumHamstringStretch,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: airplanePushUps, e2: deadBug },
      { e1: birdDog, e2: plankRotations },
      {
        e1: fireHydrantLeft,
        e2: fireHydrantRight,
        e3: pelvicTilts,
      },
    ],
    lvl2Extra: { e1: sidePlankLeft, e2: sidePlankRight },
    lvl3Extra: { e1: [sitUps, russianTwists], e2: [legRaises, flutterKicks] },
    cooldowns: [
      seatedCrossoverHamstringStretchLeft,
      seatedCrossoverHamstringStretchRight,
      spinalTwistLeft,
      spinalTwistRight,
      ...COOLDOWN_END,
    ],
  },
];
