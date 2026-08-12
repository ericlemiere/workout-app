import type { Exercise } from "@/types";

// ============================================
//                                     Level 1
// ============================================

export const burpeeWalk: Exercise = {
  id: "burpee-walk",
  name: "Burpee Walk",
  duration: 30,
  level: 1,
  image: ["/images/exercises/burpee-walk.jpg"],
  category: "exercise",
  target: ["legs", "shoulders", "core"],
  matPosition: "floor",
  instructions:
    "Feet shoulder-width apart. Lower into a plank position then stand up.",
  description:
    "A burpee with the jump taken out. Legs and glutes handle the squat down and the stand up, while shoulders and core support the plank — the lungs get the rest of the work.",
};

export const inchworms: Exercise = {
  id: "inchworms",
  name: "Inchworms",
  duration: 30,
  level: 1,
  image: ["/images/exercises/inchworms.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "legs"],
  matPosition: "floor",
  instructions:
    "Stand with feet hip-width. Hinge forward at hips, place hands on floor, walk hands out to plank, then walk them back and stand. Repeat.",
  description:
    "Strength and mobility in one: the hamstrings and calves stretch on the way down, then the core and shoulders take over as you walk out to the plank.",
};

// ============================================
//                                     Level 2
// ============================================

export const jumpingJacks: Exercise = {
  id: "jumping-jacks",
  name: "Jumping Jacks",
  duration: 40,
  level: 2,
  image: ["/images/exercises/jumping-jacks.jpg"],
  category: "exercise",
  target: ["legs", "shoulders"],
  matPosition: "standing",
  instructions:
    "Jump feet out wide while raising arms overhead. Jump feet back together while lowering arms. Repeat rapidly.",
  description:
    "A cardio staple that warms the whole body — calves and hip abductors do the jumping, shoulders do the reaching, and your heart rate does the rest.",
};

export const walkoutPushUps: Exercise = {
  id: "walkout-push-ups",
  name: "Walkout Push-Ups",
  duration: 30,
  level: 2,
  image: ["/images/exercises/walkout-push-ups.jpg"],
  category: "exercise",
  target: ["chest", "core", "shoulders"],
  matPosition: "floor",
  instructions:
    "Stand, hinge forward, walk hands out to plank, do a push-up, walk hands back, stand. Repeat.",
  description:
    "An inchworm with a press bolted on. Hamstrings stretch on the hinge, core holds the walk-out, then chest and triceps take over for the push-up.",
};

export const pushUpToDownwardDog: Exercise = {
  id: "push-up-to-downward-dog",
  name: "Push-Up to Downward Dog",
  duration: 30,
  level: 2,
  image: ["/images/exercises/push-up-to-downward-dog.jpg"],
  category: "exercise",
  target: ["chest", "shoulders", "back"],
  matPosition: "floor",
  instructions:
    "Start in a high plank. Do a push-up, then lift your hips up and back into downward dog. Return to plank and repeat.",
  description:
    "Presses the chest and triceps, then flips the load onto the shoulders and upper back. Each downward dog gives your hamstrings and calves a moment of stretch.",
};

// ============================================
//                                     Level 3
// ============================================

export const burpees: Exercise = {
  id: "burpees",
  name: "Burpees",
  duration: 30,
  level: 3,
  image: ["/images/exercises/burpees.jpg"],
  category: "exercise",
  target: ["legs", "chest", "core"],
  matPosition: "floor",
  instructions:
    "Squat, jump feet back to plank, do a push-up, jump feet forward, then jump up with arms overhead.",
  description:
    "The hardest thing in the program with no equipment attached — quads, glutes, chest, and core all fire in one rep, and it doubles as conditioning.",
};

export const fourPointBoxJumps: Exercise = {
  id: "four-point-box-jumps",
  name: "Four-Point Box Jumps",
  duration: 30,
  level: 3,
  image: ["/images/exercises/four-point-box-jumps.jpg"],
  category: "exercise",
  target: ["legs", "core"],
  matPosition: "standing",
  instructions:
    "Jump forward, jump left, jump back, jump right to return to start. Repeat.",
  description:
    "Plyometric footwork in four directions. Calves and quads absorb every landing while the core keeps you balanced through the direction changes.",
};

export const shadowBoxing: Exercise = {
  id: "shadow-boxing",
  name: "Shadow Boxing",
  duration: 30,
  level: 3,
  image: ["/images/exercises/shadow-boxing.jpg"],
  category: "exercise",
  target: ["shoulders", "arms", "core"],
  matPosition: "standing",
  instructions:
    "Run in place while throwing punches in the air. Keep your core engaged and move with purpose.",
  description:
    "Shoulders and arms burn from the punches, the obliques rotate you into each one, and the legs keep the engine running underneath.",
};

// ===============================================================================
//                                                                   Exercise list
// ===============================================================================

export const mainExercises: Exercise[] = [
  // Level 1
  burpeeWalk,
  inchworms,

  // Level 2
  jumpingJacks,
  walkoutPushUps,
  pushUpToDownwardDog,

  // Level 3
  burpees,
  fourPointBoxJumps,
  shadowBoxing,
];
