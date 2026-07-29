import type { WorkoutTemplate } from "@/types";
import {
  mountainClimberWalks,
  mountainClimbers,
  plankShoulderTaps,
  birdDog,
  deadBug,
  gluteBridgeHoldKneeToChest,
} from "./exercisesCore";
import {
  kneelingPushUps,
  pushUps,
  airplanePushUps,
} from "./exercisesUpperBody";
import {
  squats,
  squatJumps,
  sumoSquats,
  squatsToCalfRaises,
  lunges,
  reverseLunges,
  reverseLungesLeft,
  reverseLungesRight,
  forwardLungeLeft,
  forwardLungeRight,
  calfRaises,
  highKnees,
  buttKicks,
  gluteBridgeHolds,
} from "./exercisesLowerBody";
import {
  burpees,
  burpeeWalk,
  inchworms,
  jumpingJacks,
  fourPointBoxJumps,
  shadowBoxing,
  walkoutPushUps,
} from "./exercisesFullBody";
import {
  dynamicSideBends,
  deepSideToSideLunges,
  deepHoldSquatWithElbowPry,
  highKneesMarch,
  torsoTwists,
  activeCalfStretch,
  standingHipRotations,
  rotatingToeTouches,
  pendulumHamstringStretch,
  openTheGate,
} from "./warmUps";
import {
  childsPose,
  hipFlexorStretch,
  tricepStretch,
  quadStretchLeft,
  quadStretchRight,
  seatedHamstringStretch,
  seatedForwardFold,
  seatedCrossoverStretchLeft,
  seatedCrossoverStretchRight,
  seatedCrossoverHamstringStretchLeft,
  seatedCrossoverHamstringStretchRight,
  catCow,
  plankToDownwardDog,
  spinalTwistLeft,
  spinalTwistRight,
  figure4Left,
  figure4Right,
  proneGluteStretchLeft,
  proneGluteStretchRight,
  chestStretch,
  upperBackStretch,
} from "./coolDowns";

// Alternating glute-stretch finishers — every other workout uses the prone version
const COOLDOWN_END = [figure4Left, figure4Right, childsPose];
const COOLDOWN_END_PRONE = [
  proneGluteStretchLeft,
  proneGluteStretchRight,
  childsPose,
];

export const fullBodyTemplates: WorkoutTemplate[] = [
  // ── 4 · Full Body ──────────────────────────────────────────────────────────
  {
    id: "workout-04",
    name: "Workout 4 · Full Body",
    description:
      "Cardio on your feet, then power on the floor. Jumping jacks and high knees alternate with burpees and mountain climbers.",
    estimatedDuration: 20,
    tags: ["full body", "cardio", "foundation"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [
      highKneesMarch,
      torsoTwists,
      activeCalfStretch,
      pendulumHamstringStretch,
      openTheGate,
    ],
    supersets: [
      { e1: [squats, jumpingJacks], e2: [calfRaises, highKnees] },
      {
        e1: [burpeeWalk, burpees, buttKicks],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: lunges, e2: [kneelingPushUps, pushUps] },
    ],
    lvl2Extra: { e1: reverseLunges, e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: squatsToCalfRaises },
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      hipFlexorStretch,
      seatedHamstringStretch,
      ...COOLDOWN_END_PRONE,
    ],
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
    warmups: [
      dynamicSideBends,
      rotatingToeTouches,
      standingHipRotations,
      deepSideToSideLunges,
      activeCalfStretch,
    ],
    supersets: [
      { e1: gluteBridgeHolds, e2: [birdDog, mountainClimbers] },
      { e1: [squats, jumpingJacks], e2: [calfRaises, highKnees] },
      { e1: lunges, e2: [kneelingPushUps, pushUps] },
    ],
    lvl2Extra: { e1: inchworms, e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: sumoSquats },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedCrossoverHamstringStretchLeft,
      seatedCrossoverHamstringStretchRight,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      highKneesMarch,
      rotatingToeTouches,
      deepHoldSquatWithElbowPry,
      activeCalfStretch,
      openTheGate,
    ],
    supersets: [
      { e1: [squats, jumpingJacks], e2: burpeeWalk },
      { e1: [calfRaises, highKnees], e2: lunges },
      { e1: [kneelingPushUps, pushUps], e2: [deadBug, mountainClimbers] },
    ],
    lvl2Extra: { e1: forwardLungeLeft, e2: forwardLungeRight },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedCrossoverHamstringStretchLeft,
      seatedCrossoverHamstringStretchRight,
      ...COOLDOWN_END_PRONE,
    ],
  },

  // ── 16 · Full Body ─────────────────────────────────────────────────────────
  {
    id: "workout-16",
    name: "Workout 16 · Full Body",
    description:
      "Floor power and standing cardio in alternating sets. Glute bridge holds with knee drives and airplane push-ups, then jumping jacks and lunge intervals.",
    estimatedDuration: 20,
    tags: ["full body", "conditioning", "strength"],
    coverImage: "/images/workouts/full-body.png",
    warmups: [
      dynamicSideBends,
      highKneesMarch,
      deepSideToSideLunges,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: gluteBridgeHoldKneeToChest, e2: airplanePushUps },
      { e1: [calfRaises, highKnees], e2: reverseLunges },
      { e1: [squats, jumpingJacks], e2: sumoSquats },
    ],
    lvl2Extra: { e1: [kneelingPushUps, pushUps], e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: squatsToCalfRaises },
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      seatedForwardFold,
      plankToDownwardDog,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      torsoTwists,
      deepHoldSquatWithElbowPry,
      activeCalfStretch,
      openTheGate,
    ],
    supersets: [
      {
        e1: [burpeeWalk, burpees, sumoSquats],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: gluteBridgeHolds, e2: [kneelingPushUps, pushUps] },
      {
        e1: [squats, jumpingJacks, highKnees],
        e2: [reverseLungesLeft, reverseLungesRight],
      },
    ],
    lvl2Extra: { e1: inchworms, e2: walkoutPushUps },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      catCow,
      spinalTwistLeft,
      spinalTwistRight,
      hipFlexorStretch,
      ...COOLDOWN_END_PRONE,
    ],
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
    warmups: [
      dynamicSideBends,
      torsoTwists,
      deepHoldSquatWithElbowPry,
      activeCalfStretch,
      openTheGate,
    ],
    supersets: [
      { e1: [burpeeWalk, burpees, buttKicks], e2: [kneelingPushUps, pushUps] },
      { e1: [squats, squatJumps], e2: sumoSquats },
      {
        e1: [mountainClimberWalks, mountainClimbers],
        e2: airplanePushUps,
      },
    ],
    lvl2Extra: { e1: walkoutPushUps, e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      tricepStretch,
      upperBackStretch,
      seatedCrossoverStretchLeft,
      seatedCrossoverStretchRight,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      rotatingToeTouches,
      deepSideToSideLunges,
      activeCalfStretch,
      openTheGate,
    ],
    supersets: [
      {
        e1: [burpeeWalk, burpees, buttKicks],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: [squats, squatJumps], e2: [kneelingPushUps, pushUps] },
      {
        e1: [calfRaises, highKnees],
        e2: [reverseLungesLeft, reverseLungesRight],
      },
    ],
    lvl2Extra: { e1: inchworms, e2: [forwardLungeLeft, forwardLungeRight] },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      chestStretch,
      hipFlexorStretch,
      seatedForwardFold,
      catCow,
      ...COOLDOWN_END_PRONE,
    ],
  },
];
