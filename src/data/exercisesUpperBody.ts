import type { Exercise } from "@/types";

// ============================================
//                                     Level 1
// ============================================

export const kneelingPushUps: Exercise = {
  id: "kneeling-push-ups",
  name: "Kneeling Push-Ups",
  duration: 30,
  level: 1,
  image: ["/images/exercises/kneeling-push-ups.jpg"],
  category: "exercise",
  target: ["chest", "arms", "shoulders"],
  matPosition: "floor",
  instructions:
    "Hands shoulder-width, knees on the ground. Lower chest to floor and press up.",
  description:
    "The full push-up pattern with less bodyweight to move. Chest and triceps do the pressing, front shoulders assist, and the core still holds a straight line from knees to head.",
};

export const airplanePushUps: Exercise = {
  id: "airplane-push-ups",
  name: "Airplane Push-Ups",
  duration: 30,
  level: 1,
  image: ["/images/exercises/airplane-push-ups.jpg"],
  category: "exercise",
  target: ["chest", "shoulders", "core", "back"],
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Rotate your torso and arm toward the ceiling and back. Do a push-up. Alternate sides.",
  description:
    "A push-up with a thoracic rotation added, so the chest and triceps press while the obliques and upper back open you up. You'll feel a stretch across the front of the chest at the top of each reach.",
};

export const wavePushUps: Exercise = {
  id: "wave-push-ups",
  name: "Wave Push-Ups",
  duration: 40,
  level: 1,
  image: ["/images/exercises/wave-push-ups.jpg"],
  category: "exercise",
  target: ["chest", "arms", "shoulders", "back"],
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Lower yourself to the floor in a wave motion from knees to hips to chest to shoulders. Reverse the motion to push back up.",
  description:
    "Slow, segmented pressing that keeps the chest, triceps, and shoulders under tension far longer than a normal push-up, with the spine moving through a gentle wave.",
};

export const spiderCrossPlanks: Exercise = {
  id: "spider-cross-planks",
  name: "Spider Cross Planks",
  duration: 40,
  level: 1,
  image: ["/images/exercises/spider-cross-planks.jpg"],
  category: "exercise",
  target: ["shoulders", "core", "chest"],
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Bring your left knee to the outside of your left elbow, then bring your knee across your body to your right elbow. Alternate sides.",
  description:
    "Your shoulders and chest hold the plank while the obliques and hip flexors drive the knee across. Expect a stretch in the hip of the moving leg.",
};

// ============================================
//                                     Level 2
// ============================================

export const pushUps: Exercise = {
  id: "push-ups",
  name: "Push-Ups",
  duration: 30,
  level: 2,
  image: ["/images/exercises/push-ups.jpg"],
  category: "exercise",
  target: ["chest", "arms", "shoulders", "core"],
  matPosition: "floor",
  instructions:
    "Hands shoulder-width, body in a straight line from head to heels. Lower chest to floor and press up.",
  description:
    "The benchmark upper-body press: chest and triceps do the lifting, front shoulders assist, and the core keeps your body rigid as one plank.",
};

export const tableTopDips: Exercise = {
  id: "table-top-dips",
  name: "Table Top Dips",
  duration: 30,
  level: 2,
  image: ["/images/exercises/table-top-dips.jpg"],
  category: "exercise",
  target: ["arms", "shoulders", "chest"],
  matPosition: "floor",
  instructions:
    "Sit with knees bent, feet flat, hands behind you on the floor. Lift hips off the ground and bend elbows to lower your body, then straighten arms to lift back up.",
  description:
    "The most direct triceps move in the program. You'll feel it on the back of your upper arms, plus a stretch across the front of the shoulders and chest at the bottom.",
};

export const shoulderTapPushUps: Exercise = {
  id: "shoulder-tap-push-ups",
  name: "Shoulder Tap Push-Ups",
  duration: 30,
  level: 2,
  image: ["/images/exercises/shoulder-tap-push-ups.jpg"],
  category: "exercise",
  target: ["chest", "shoulders", "core", "arms"],
  matPosition: "floor",
  instructions:
    "Start in a push-up position. Lower yourself to the floor, then press back up. At the top, tap your left shoulder with your right hand, then tap your right shoulder with your left hand. Repeat.",
  description:
    "A push-up plus an anti-rotation hold. Chest and triceps press, then the obliques fight to keep your hips square each time a hand comes off the floor.",
};

export const downwardDogPushUps: Exercise = {
  id: "downward-dog-push-ups",
  name: "Downward Dog Push-Ups",
  duration: 30,
  level: 2,
  image: ["/images/exercises/downward-dog-push-ups.jpg"],
  category: "exercise",
  target: ["shoulders", "arms", "back"],
  matPosition: "floor",
  instructions:
    "Start in a downward dog position. Lower your head toward the floor by bending your elbows, then press back up to downward dog.",
  description:
    "Tipping your hips up shifts the load onto the shoulders — this is the closest thing to an overhead press without weights. Triceps and upper back help, and the hamstrings get a stretch.",
};

// ===============================================================================
//                                                                   Exercise list
// ===============================================================================

export const mainExercises: Exercise[] = [
  // Level 1
  kneelingPushUps,
  airplanePushUps,
  wavePushUps,
  spiderCrossPlanks,

  // Level 2
  pushUps,
  tableTopDips,
  shoulderTapPushUps,
  downwardDogPushUps,
];
