import type { Exercise } from "@/types";

// ===============================================================================
//                                                            Full Body exercises
// ===============================================================================

export const burpees: Exercise = {
  id: "burpees",
  name: "Burpees",
  duration: 30,
  level: 3,
  image: ["/images/exercises/burpees.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Squat, jump feet back to plank, do a push-up, jump feet forward, then jump up with arms overhead.",
};

export const burpeeWalk: Exercise = {
  id: "burpee-walk",
  name: "Burpee Walk",
  duration: 30,
  level: 1,
  image: ["/images/exercises/burpee-walk.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Feet shoulder-width apart. Lower into a plank position then stand up.",
};

export const inchworms: Exercise = {
  id: "inchworms",
  name: "Inchworms",
  duration: 30,
  level: 2,
  image: ["/images/exercises/inchworms.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Stand, hinge forward, walk hands out to plank, do a push-up, walk hands back, stand. Repeat.",
};

export const jumpingJacks: Exercise = {
  id: "jumping-jacks",
  name: "Jumping Jacks",
  duration: 40,
  level: 1,
  image: ["/images/exercises/jumping-jacks.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "standing",
  instructions:
    "Jump feet out wide while raising arms overhead. Jump feet back together while lowering arms. Repeat rapidly.",
};

export const fourPointBoxJumps: Exercise = {
  id: "four-point-box-jumps",
  name: "Four-Point Box Jumps",
  duration: 30,
  level: 3,
  image: ["/images/exercises/four-point-box-jumps.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "standing",
  instructions:
    "Jump forward, jump left, jump back, jump right to return to start. Repeat.",
};

export const shadowBoxing: Exercise = {
  id: "shadow-boxing",
  name: "Shadow Boxing",
  duration: 30,
  level: 3,
  image: ["/images/exercises/shadow-boxing.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "standing",
  instructions:
    "Run in place while throwing punches in the air. Keep your core engaged and move with purpose.",
};

export const walkoutPushUps: Exercise = {
  id: "walkout-push-ups",
  name: "Walkout Push-Ups",
  duration: 30,
  level: 2,
  image: ["/images/exercises/walkout-push-ups.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Stand, hinge forward, walk hands out to plank, do a push-up, walk hands back, stand. Repeat.",
};

export const pushUpToDownwardDog: Exercise = {
  id: "push-up-to-downward-dog",
  name: "Push-Up to Downward Dog",
  duration: 30,
  level: 2,
  image: ["/images/exercises/push-up-to-downward-dog.jpg"],
  category: "exercise",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Start in a high plank. Do a push-up, then lift your hips up and back into downward dog. Return to plank and repeat.",
};

// ===============================================================================
//                                                                   Exercise list
// ===============================================================================

export const mainExercises: Exercise[] = [
  burpees,
  burpeeWalk,
  inchworms,
  jumpingJacks,
  fourPointBoxJumps,
  shadowBoxing,
  walkoutPushUps,
  pushUpToDownwardDog,
];
