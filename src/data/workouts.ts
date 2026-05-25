import type { Workout, Exercise } from "@/types";
import {
  burpees,
  burpeeWalk,
  pushUps,
  kneelingPushUps,
  airplanePushUps,
  wavePushUps,
  spiderCrossPlanks,
  squats,
  mountainClimbers,
  plank,
  lunges,
  gluteBridges,
  gluteBridgeHolds,
  russianTwists,
  jumpSquats,
  sideLunges,
  inchworms,
  plankShoulderTaps,
  calfRaises,
  highKnees,
  jumpingJacks,
  singleLegDeadlift,
  reverseLunges,
  deadBug,
  birdDog,
  plankRotations,
  fireHydrantLeft,
  donkeyKicksLeft,
  pelvicTilts,
  donkeyKicksRight,
  fireHydrantRight,
} from "./exercises";
import {
  dynamicSideBends,
  chestOpenersWithRotation,
  deepSideToSideLunges,
  torsoTwists,
  activeCalfStretch,
  malasanaSquat,
  rollDowns,
  standingHipRotations,
  shoulderRotations,
  highKneesMarch,
  rotatingToeTouches,
} from "./warmUps";
import {
  childsPose,
  hipFlexorStretch,
  quadStretchLeft,
  seatedHamstringStretch,
  figure4Left,
  figure4Right,
  chestStretch,
  tricepStretch,
  upperBackStretch,
  catCow,
  quadStretchRight,
} from "./coolDowns";
import { REST_DURATION } from "@/lib/workout";

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
const COOLDOWN_END = [figure4Left, figure4Right, childsPose];

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
    warmups: [
      highKneesMarch,
      standingHipRotations,
      activeCalfStretch,
      malasanaSquat,
      torsoTwists,
    ],
    exercises: [
      ...superset(lunges, jumpSquats),
      ...superset(gluteBridges, donkeyKicksLeft, donkeyKicksRight),
      ...supersetFinal(reverseLunges, squats),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      chestOpenersWithRotation,
      torsoTwists,
      shoulderRotations,
      rollDowns,
    ],
    exercises: [
      ...superset(pushUps, mountainClimbers),
      ...superset(plank, plankShoulderTaps),
      ...supersetFinal(kneelingPushUps, spiderCrossPlanks),
    ],
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    warmups: [
      highKneesMarch,
      rollDowns,
      dynamicSideBends,
      torsoTwists,
      activeCalfStretch,
    ],
    exercises: [
      ...superset(airplanePushUps, deadBug),
      ...superset(birdDog, plankRotations),
      ...supersetFinal(fireHydrantLeft, fireHydrantRight, pelvicTilts),
    ],
    cooldowns: [
      hipFlexorStretch,
      catCow,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      deepSideToSideLunges,
      torsoTwists,
      activeCalfStretch,
      standingHipRotations,
    ],
    exercises: [
      ...superset(jumpingJacks, highKnees),
      ...superset(burpees, mountainClimbers),
      ...supersetFinal(lunges, reverseLunges),
    ],
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
    exercises: [
      ...superset(sideLunges, reverseLunges),
      ...superset(gluteBridges, fireHydrantLeft, fireHydrantRight),
      ...supersetFinal(gluteBridgeHolds, donkeyKicksLeft, donkeyKicksRight),
    ],
    cooldowns: [
      catCow,
      seatedHamstringStretch,
      hipFlexorStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      shoulderRotations,
      chestOpenersWithRotation,
      torsoTwists,
      rollDowns,
    ],
    exercises: [
      ...superset(burpeeWalk, wavePushUps),
      ...superset(mountainClimbers, plank),
      ...supersetFinal(airplanePushUps, inchworms),
    ],
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    exercises: [
      ...superset(deadBug, birdDog),
      ...superset(airplanePushUps, plank),
      ...supersetFinal(plankRotations, fireHydrantLeft, fireHydrantRight),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
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
    exercises: [
      ...superset(gluteBridgeHolds, mountainClimbers),
      ...superset(jumpingJacks, calfRaises),
      ...supersetFinal(lunges, highKnees),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
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
    exercises: [
      ...superset(singleLegDeadlift, reverseLunges),
      ...superset(squats, lunges),
      ...supersetFinal(gluteBridges, donkeyKicksLeft, donkeyKicksRight),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      chestOpenersWithRotation,
      dynamicSideBends,
      torsoTwists,
      rollDowns,
      shoulderRotations,
    ],
    exercises: [
      ...superset(pushUps, mountainClimbers),
      ...superset(spiderCrossPlanks, plank),
      ...supersetFinal(burpeeWalk, wavePushUps),
    ],
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    exercises: [
      ...superset(birdDog, deadBug),
      ...superset(plankRotations, fireHydrantLeft, fireHydrantRight),
      ...supersetFinal(airplanePushUps, russianTwists),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
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
    exercises: [
      ...superset(highKnees, lunges),
      ...superset(jumpingJacks, calfRaises),
      ...supersetFinal(burpeeWalk, mountainClimbers),
    ],
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
    exercises: [
      ...superset(jumpSquats, lunges),
      ...superset(gluteBridgeHolds, donkeyKicksLeft, donkeyKicksRight),
      ...supersetFinal(reverseLunges, sideLunges),
    ],
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      catCow,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      chestOpenersWithRotation,
      shoulderRotations,
      torsoTwists,
      rollDowns,
    ],
    exercises: [
      ...superset(spiderCrossPlanks, plankShoulderTaps),
      ...superset(pushUps, plank),
      ...supersetFinal(burpeeWalk, airplanePushUps),
    ],
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    exercises: [
      ...superset(airplanePushUps, plankRotations),
      ...superset(fireHydrantLeft, fireHydrantRight, deadBug),
      ...supersetFinal(birdDog, pelvicTilts),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
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
    exercises: [
      ...superset(gluteBridgeHolds, airplanePushUps),
      ...superset(highKnees, reverseLunges),
      ...supersetFinal(jumpingJacks, lunges),
    ],
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      hipFlexorStretch,
      seatedHamstringStretch,
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
    exercises: [
      ...superset(squats, singleLegDeadlift),
      ...superset(jumpSquats, lunges),
      ...supersetFinal(gluteBridges, donkeyKicksLeft, donkeyKicksRight),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      catCow,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      chestOpenersWithRotation,
      dynamicSideBends,
      shoulderRotations,
      rollDowns,
      torsoTwists,
    ],
    exercises: [
      ...superset(burpeeWalk, pushUps),
      ...superset(spiderCrossPlanks, mountainClimbers),
      ...supersetFinal(wavePushUps, plank),
    ],
    cooldowns: [tricepStretch, chestStretch, upperBackStretch, ...COOLDOWN_END],
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
    exercises: [
      ...superset(deadBug, birdDog),
      ...superset(russianTwists, pelvicTilts),
      ...supersetFinal(mountainClimbers, plankRotations),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
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
    exercises: [
      ...superset(burpees, mountainClimbers),
      ...superset(gluteBridgeHolds, burpeeWalk),
      ...supersetFinal(highKnees, lunges),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
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
      torsoTwists,
      activeCalfStretch,
    ],
    exercises: [
      ...superset(reverseLunges, sideLunges),
      ...superset(gluteBridges, fireHydrantLeft, fireHydrantRight),
      ...supersetFinal(jumpSquats, singleLegDeadlift),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      dynamicSideBends,
      shoulderRotations,
      chestOpenersWithRotation,
      rollDowns,
      torsoTwists,
    ],
    exercises: [
      ...superset(spiderCrossPlanks, pushUps),
      ...superset(burpeeWalk, mountainClimbers),
      ...supersetFinal(wavePushUps, plank),
    ],
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    exercises: [
      ...superset(plankRotations, fireHydrantLeft, fireHydrantRight),
      ...superset(airplanePushUps, birdDog),
      ...supersetFinal(deadBug, russianTwists),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
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
    exercises: [
      ...superset(burpees, kneelingPushUps),
      ...superset(jumpSquats, reverseLunges),
      ...supersetFinal(burpeeWalk, airplanePushUps),
    ],
    cooldowns: [
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      catCow,
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
      torsoTwists,
    ],
    exercises: [
      ...superset(jumpSquats, singleLegDeadlift),
      ...superset(gluteBridgeHolds, donkeyKicksLeft, donkeyKicksRight),
      ...supersetFinal(reverseLunges, sideLunges),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      catCow,
      ...COOLDOWN_END,
    ],
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
    warmups: [
      chestOpenersWithRotation,
      dynamicSideBends,
      torsoTwists,
      shoulderRotations,
      rollDowns,
    ],
    exercises: [
      ...superset(burpeeWalk, spiderCrossPlanks),
      ...superset(pushUps, wavePushUps),
      ...supersetFinal(mountainClimbers, inchworms),
    ],
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    exercises: [
      ...superset(airplanePushUps, deadBug),
      ...superset(birdDog, plankRotations),
      ...supersetFinal(fireHydrantLeft, fireHydrantRight, russianTwists),
    ],
    cooldowns: [
      hipFlexorStretch,
      seatedHamstringStretch,
      upperBackStretch,
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
    exercises: [
      ...superset(burpees, mountainClimbers),
      ...superset(jumpSquats, jumpingJacks),
      ...supersetFinal(highKnees, reverseLunges),
    ],
    cooldowns: [
      hipFlexorStretch,
      quadStretchLeft,
      quadStretchRight,
      seatedHamstringStretch,
      ...COOLDOWN_END,
    ],
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
