import type { Exercise } from "@/types";

// ===============================================================================
//                                                           Upper Body exercises
// ===============================================================================

export const pushUps: Exercise = {
  id: "push-ups",
  name: "Push-Ups",
  duration: 30,
  level: 2,
  image: ["/images/exercises/push-ups.jpg"],
  category: "exercise",
  target: "chest",
  matPosition: "floor",
  instructions:
    "Hands shoulder-width, body in a straight line from head to heels. Lower chest to floor and press up.",
};

export const kneelingPushUps: Exercise = {
  id: "kneeling-push-ups",
  name: "Kneeling Push-Ups",
  duration: 30,
  level: 1,
  image: ["/images/exercises/kneeling-push-ups.jpg"],
  category: "exercise",
  target: "chest",
  matPosition: "floor",
  instructions:
    "Hands shoulder-width, knees on the ground. Lower chest to floor and press up.",
};

export const airplanePushUps: Exercise = {
  id: "airplane-push-ups",
  name: "Airplane Push-Ups",
  duration: 30,
  level: 1,
  image: ["/images/exercises/airplane-push-ups.jpg"],
  category: "exercise",
  target: "chest",
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Rotate your torso and arm toward the ceiling and back. Do a push-up. Alternate sides.",
};

export const wavePushUps: Exercise = {
  id: "wave-push-ups",
  name: "Wave Push-Ups",
  duration: 40,
  level: 1,
  image: ["/images/exercises/wave-push-ups.jpg"],
  category: "exercise",
  target: "chest",
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Lower yourself to the floor in a wave motion from knees to chest to shoulders. Reverse the motion to push back up.",
};

export const spiderCrossPlanks: Exercise = {
  id: "spider-cross-planks",
  name: "Spider Cross Planks",
  duration: 40,
  level: 1,
  image: ["/images/exercises/spider-cross-planks.jpg"],
  category: "exercise",
  target: "upper body",
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Bring your left knee to the outside of your left elbow, then bring your knee across your body to your right elbow. Alternate sides.",
};

export const tableTopDips: Exercise = {
  id: "table-top-dips",
  name: "Table Top Dips",
  duration: 30,
  level: 2,
  image: ["/images/exercises/table-top-dips.jpg"],
  category: "exercise",
  target: "upper body",
  matPosition: "floor",
  instructions:
    "Sit with knees bent, feet flat, hands behind you on the floor. Lift hips off the ground and bend elbows to lower your body, then straighten arms to lift back up.",
};

// ===============================================================================
//                                                                   Exercise list
// ===============================================================================

export const mainExercises: Exercise[] = [
  pushUps,
  kneelingPushUps,
  airplanePushUps,
  wavePushUps,
  spiderCrossPlanks,
  tableTopDips,
];
