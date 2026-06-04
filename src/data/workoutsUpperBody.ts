import type { WorkoutTemplate } from "@/types";
import {
  mountainClimberWalks,
  mountainClimbers,
  plank,
  highPlankToElbowPlank,
  plankShoulderTaps,
  plankWalkOuts,
} from "./exercisesCore";
import {
  pushUps,
  kneelingPushUps,
  airplanePushUps,
  wavePushUps,
  spiderCrossPlanks,
  tableTopDips,
  shoulderTapPushUps,
  downwardDogPushUps,
} from "./exercisesUpperBody";
import { burpeeWalk, inchworms, pushUpToDownwardDog } from "./exercisesFullBody";
import {
  dynamicSideBends,
  chestOpenersWithRotation,
  torsoTwists,
  shoulderRotations,
  rollDowns,
} from "./warmUps";
import {
  childsPose,
  chestStretch,
  tricepStretch,
  upperBackStretch,
  figure4Left,
  figure4Right,
  plankToDownwardDog,
} from "./coolDowns";

const COOLDOWN_END = [figure4Left, figure4Right, childsPose];

export const upperBodyTemplates: WorkoutTemplate[] = [
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
    supersets: [
      {
        e1: [kneelingPushUps, pushUps],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: [plank, highPlankToElbowPlank], e2: plankShoulderTaps },
      {
        e1: [airplanePushUps, kneelingPushUps, pushUps],
        e2: spiderCrossPlanks,
      },
    ],
    lvl2Extra: { e1: wavePushUps, e2: downwardDogPushUps },
    lvl3Extra: { e1: shoulderTapPushUps, e2: tableTopDips },
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    supersets: [
      { e1: burpeeWalk, e2: wavePushUps },
      { e1: [mountainClimberWalks, mountainClimbers], e2: plank },
      { e1: airplanePushUps, e2: [spiderCrossPlanks, inchworms] },
    ],
    lvl2Extra: { e1: [kneelingPushUps, pushUps], e2: plankShoulderTaps },
    lvl3Extra: { e1: plankWalkOuts, e2: downwardDogPushUps },
    cooldowns: [chestStretch, tricepStretch, plankToDownwardDog, ...COOLDOWN_END],
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
    supersets: [
      {
        e1: [kneelingPushUps, pushUps],
        e2: [mountainClimberWalks, mountainClimbers],
      },
      { e1: spiderCrossPlanks, e2: plank },
      { e1: burpeeWalk, e2: wavePushUps },
    ],
    lvl2Extra: { e1: plankShoulderTaps, e2: downwardDogPushUps },
    lvl3Extra: { e1: shoulderTapPushUps, e2: tableTopDips },
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    supersets: [
      { e1: spiderCrossPlanks, e2: plankShoulderTaps },
      { e1: [kneelingPushUps, pushUps], e2: plank },
      { e1: burpeeWalk, e2: airplanePushUps },
    ],
    lvl2Extra: { e1: wavePushUps, e2: shoulderTapPushUps },
    lvl3Extra: { e1: plankWalkOuts, e2: downwardDogPushUps },
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    supersets: [
      { e1: burpeeWalk, e2: [kneelingPushUps, pushUps] },
      { e1: spiderCrossPlanks, e2: [mountainClimberWalks, mountainClimbers] },
      { e1: wavePushUps, e2: [plank, pushUpToDownwardDog] },
    ],
    lvl2Extra: { e1: airplanePushUps, e2: plankShoulderTaps },
    lvl3Extra: { e1: plankWalkOuts, e2: tableTopDips },
    cooldowns: [tricepStretch, chestStretch, upperBackStretch, ...COOLDOWN_END],
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
    supersets: [
      { e1: spiderCrossPlanks, e2: [kneelingPushUps, pushUps] },
      { e1: burpeeWalk, e2: [mountainClimberWalks, mountainClimbers] },
      { e1: wavePushUps, e2: plank },
    ],
    lvl2Extra: { e1: airplanePushUps, e2: shoulderTapPushUps },
    lvl3Extra: { e1: downwardDogPushUps, e2: tableTopDips },
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
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
    supersets: [
      { e1: burpeeWalk, e2: spiderCrossPlanks },
      { e1: [kneelingPushUps, pushUps], e2: wavePushUps },
      {
        e1: [mountainClimberWalks, mountainClimbers],
        e2: [airplanePushUps, inchworms],
      },
    ],
    lvl2Extra: { e1: plankShoulderTaps, e2: shoulderTapPushUps },
    lvl3Extra: { e1: plankWalkOuts, e2: downwardDogPushUps },
    cooldowns: [chestStretch, tricepStretch, upperBackStretch, ...COOLDOWN_END],
  },
];
