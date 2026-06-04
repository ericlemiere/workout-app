import type { WorkoutTemplate } from "@/types";
import {
  mountainClimberWalks,
  mountainClimbers,
  plankShoulderTaps,
  birdDog,
  deadBug,
} from "./exercisesCore";
import {
  kneelingPushUps,
  pushUps,
  airplanePushUps,
} from "./exercisesUpperBody";
import {
  squats,
  squatJumps,
  lunges,
  reverseLunges,
  calfRaises,
  highKnees,
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
  torsoTwists,
  activeCalfStretch,
  standingHipRotations,
} from "./warmUps";
import {
  childsPose,
  hipFlexorStretch,
  quadStretchLeft,
  quadStretchRight,
  seatedHamstringStretch,
  catCow,
  figure4Left,
  figure4Right,
} from "./coolDowns";

const COOLDOWN_END = [figure4Left, figure4Right, childsPose];

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
      dynamicSideBends,
      deepSideToSideLunges,
      torsoTwists,
      activeCalfStretch,
      standingHipRotations,
    ],
    supersets: [
      { e1: [squats, jumpingJacks], e2: [calfRaises, highKnees] },
      {
        e1: [burpeeWalk, burpees, burpees],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: lunges, e2: reverseLunges },
    ],
    lvl2Extra: { e1: [kneelingPushUps, pushUps], e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: [squatJumps] },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
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
      torsoTwists,
      deepSideToSideLunges,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: gluteBridgeHolds, e2: [birdDog, mountainClimbers] },
      { e1: [squats, jumpingJacks], e2: calfRaises },
      { e1: lunges, e2: [calfRaises, highKnees] },
    ],
    lvl2Extra: { e1: [kneelingPushUps, pushUps], e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: squatJumps },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
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
      deepSideToSideLunges,
      dynamicSideBends,
      torsoTwists,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: [calfRaises, highKnees], e2: lunges },
      { e1: [squats, jumpingJacks], e2: calfRaises },
      { e1: burpeeWalk, e2: [deadBug, mountainClimbers] },
    ],
    lvl2Extra: { e1: [kneelingPushUps, pushUps], e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      deepSideToSideLunges,
      standingHipRotations,
      torsoTwists,
      activeCalfStretch,
    ],
    supersets: [
      { e1: gluteBridgeHolds, e2: airplanePushUps },
      { e1: [calfRaises, highKnees], e2: reverseLunges },
      { e1: [squats, jumpingJacks], e2: lunges },
    ],
    lvl2Extra: { e1: [kneelingPushUps, pushUps], e2: plankShoulderTaps },
    lvl3Extra: { e1: shadowBoxing, e2: squatJumps },
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      hipFlexorStretch,
      seatedHamstringStretch,
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
      deepSideToSideLunges,
      activeCalfStretch,
      standingHipRotations,
    ],
    supersets: [
      {
        e1: [burpeeWalk, burpees, burpees],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: gluteBridgeHolds, e2: burpeeWalk },
      { e1: [squats, jumpingJacks, highKnees], e2: lunges },
    ],
    lvl2Extra: { e1: inchworms, e2: [kneelingPushUps, pushUps] },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
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
      deepSideToSideLunges,
      torsoTwists,
      standingHipRotations,
      activeCalfStretch,
    ],
    supersets: [
      { e1: [burpeeWalk, burpees, burpees], e2: kneelingPushUps },
      { e1: [squats, squatJumps], e2: reverseLunges },
      { e1: burpeeWalk, e2: airplanePushUps },
    ],
    lvl2Extra: { e1: walkoutPushUps, e2: [kneelingPushUps, pushUps] },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      catCow,
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
      deepSideToSideLunges,
      torsoTwists,
      activeCalfStretch,
      standingHipRotations,
    ],
    supersets: [
      {
        e1: [burpeeWalk, burpees, burpees],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: [squats, squatJumps], e2: [lunges, jumpingJacks] },
      { e1: [calfRaises, highKnees], e2: reverseLunges },
    ],
    lvl2Extra: { e1: inchworms, e2: [kneelingPushUps, pushUps] },
    lvl3Extra: { e1: shadowBoxing, e2: fourPointBoxJumps },
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
  },
];
