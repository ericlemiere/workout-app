import type { Exercise } from "@/types";

// ============================================
//                                     Level 1
// ============================================

export const squats: Exercise = {
  id: "squats",
  name: "Squats",
  duration: 30,
  level: 1,
  image: ["/images/exercises/squats.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Feet shoulder-width, toes slightly out. Sit back and down until thighs are parallel. Drive through heels to stand.",
};

export const prisonerSquats: Exercise = {
  id: "prisoner-squats",
  name: "Prisoner Squats",
  duration: 30,
  level: 1,
  image: ["/images/exercises/prisoner-squats.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Feet shoulder-width, toes slightly out. Place hands behind head. Sit back and down until thighs are parallel. Drive through heels to stand.",
};

export const sumoSquats: Exercise = {
  id: "sumo-squats",
  name: "Sumo Squats",
  duration: 30,
  level: 1,
  image: ["/images/exercises/sumo-squats.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Feet wider than shoulder-width with toes pointed out and hands together in front of chest. Sit back and down until thighs are parallel. Drive through heels to stand.",
};

export const squatsToCalfRaises: Exercise = {
  id: "squats-to-calf-raises",
  name: "Squats to Calf Raises",
  duration: 30,
  level: 1,
  image: ["/images/exercises/squats-to-calf-raises.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Perform a squat, then rise onto your toes into a calf raise. Lower back down and repeat.",
};

export const lunges: Exercise = {
  id: "lunges",
  name: "Alternating Lunges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/lunges.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Step forward, lower your back knee toward floor. Return to standing. Alternate legs. Keep torso upright.",
};

export const reverseLunges: Exercise = {
  id: "reverse-lunges",
  name: "Reverse Lunges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/reverse-lunges.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Step backward and lower back knee toward floor. Drive front foot through heel to return. Alternate legs.",
};

export const sideLungesLeft: Exercise = {
  id: "side-lunges-left",
  name: "Side Lunges Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-lunges-left.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Step wide to the left, bend left knee, keep right leg straight. Push back to center. Repeat.",
};

export const sideLungesRight: Exercise = {
  id: "side-lunges-right",
  name: "Side Lunges Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-lunges-right.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Step wide to the right, bend right knee, keep left leg straight. Push back to center. Repeat.",
};

export const calfRaises: Exercise = {
  id: "calf-raises",
  name: "Calf Raises",
  duration: 30,
  level: 1,
  image: ["/images/exercises/calf-raises.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand with feet hip-width. Rise onto toes as high as possible, lower slowly. Use a wall for balance if needed.",
};

export const gluteBridges: Exercise = {
  id: "glute-bridges",
  name: "Glute Bridges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/glute-bridges.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Drive hips up by squeezing glutes. Hold 1 second at top, lower slowly.",
};

export const gluteBridgeHolds: Exercise = {
  id: "glute-bridge-holds",
  name: "Glute Bridge Holds",
  duration: 30,
  level: 1,
  image: ["/images/exercises/glute-bridge-holds.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Drive hips up by squeezing glutes and hold.",
};

export const fireHydrantLeft: Exercise = {
  id: "fire-hydrant-left",
  name: "Fire Hydrant Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/fire-hydrant-left.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "On hands and knees, lift your left knee out to the side, keeping it bent at 90°. Keep hips square. Lower and repeat.",
};

export const fireHydrantRight: Exercise = {
  id: "fire-hydrant-right",
  name: "Fire Hydrant Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/fire-hydrant-right.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "On hands and knees, lift your right knee out to the side, keeping it bent at 90°. Keep hips square. Lower and repeat.",
};

export const donkeyKicksLeft: Exercise = {
  id: "donkey-kicks-left",
  name: "Donkey Kicks Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/donkey-kicks-left.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "On hands and knees, kick your left leg back and up, squeezing the glute at the top. Keep hips level.",
};

export const donkeyKicksRight: Exercise = {
  id: "donkey-kicks-right",
  name: "Donkey Kicks Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/donkey-kicks-right.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "On hands and knees, kick your right leg back and up, squeezing the glute at the top. Keep hips level.",
};

export const forwardLungeLeft: Exercise = {
  id: "forward-lunge-left",
  name: "Forward Lunge Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/forward-lunge-left.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Step forward with your left leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
};

export const forwardLungeRight: Exercise = {
  id: "forward-lunge-right",
  name: "Forward Lunge Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/forward-lunge-right.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Step forward with your right leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
};

export const reverseLungesLeft: Exercise = {
  id: "reverse-lunge-left",
  name: "Reverse Lunge Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/reverse-lunge-left.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Step backward with your left leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
};

export const reverseLungesRight: Exercise = {
  id: "reverse-lunge-right",
  name: "Reverse Lunge Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/reverse-lunge-right.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Step backward with your right leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
};

// ============================================
//                                     Level 2
// ============================================

export const highKnees: Exercise = {
  id: "high-knees",
  name: "High Knees",
  duration: 30,
  level: 2,
  image: ["/images/exercises/high-knees.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Run in place, driving knees up to hip height as fast as possible. Pump arms for balance.",
};

export const singleLegGluteBridgeLeft: Exercise = {
  id: "single-leg-glute-bridge-left",
  name: "Single-Leg Glute Bridge Left",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-glute-bridge-left.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Extend left leg, drive hips up by squeezing left glute. Hold 1 second at top, lower slowly.",
};

export const singleLegGluteBridgeRight: Exercise = {
  id: "single-leg-glute-bridge-right",
  name: "Single-Leg Glute Bridge Right",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-glute-bridge-right.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Extend right leg, drive hips up by squeezing right glute. Hold 1 second at top, lower slowly.",
};

export const singleLegDeadliftLeft: Exercise = {
  id: "single-leg-deadlift-left",
  name: "Single Leg Deadlift Left",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-deadlift-left.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "standing",
  instructions:
    "Stand on your left leg, hinge forward at hip, extend your right leg behind. Return to standing. Repeat.",
};

export const singleLegDeadliftRight: Exercise = {
  id: "single-leg-deadlift-right",
  name: "Single Leg Deadlift Right",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-deadlift-right.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "standing",
  instructions:
    "Stand on your right leg, hinge forward at hip, extend your left leg behind. Return to standing. Repeat.",
};

// ============================================
//                                     Level 3
// ============================================

export const squatJumps: Exercise = {
  id: "squat-jumps",
  name: "Squat Jumps",
  duration: 30,
  level: 3,
  image: ["/images/exercises/squat-jumps.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Perform a squat, then explode upward into a jump. Land softly, immediately descend into next squat.",
};

export const singleLegSquatsLeft: Exercise = {
  id: "single-leg-squats-left",
  name: "Single Leg Squats Left",
  duration: 30,
  level: 3,
  image: ["/images/exercises/single-leg-squats-left.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand on your left leg, extend your right leg in front of you. Sit back and down on your left leg while keeping your right leg off the floor. Drive through your left heel to return to standing.",
};

export const singleLegSquatsRight: Exercise = {
  id: "single-leg-squats-right",
  name: "Single Leg Squats Right",
  duration: 30,
  level: 3,
  image: ["/images/exercises/single-leg-squats-right.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand on your right leg, extend your left leg in front of you. Sit back and down on your right leg while keeping your left leg off the floor. Drive through your right heel to return to standing.",
};

export const buttKicks: Exercise = {
  id: "butt-kicks",
  name: "Butt Kicks",
  duration: 30,
  level: 3,
  image: ["/images/exercises/butt-kicks.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Run in place, kicking your heels up toward your glutes as fast as possible. Pump arms for balance.",
};

// ===============================================================================
//                                                                   Exercise list
// ===============================================================================

export const mainExercises: Exercise[] = [
  // Level 1
  squats,
  prisonerSquats,
  sumoSquats,
  squatsToCalfRaises,
  lunges,
  reverseLunges,
  sideLungesLeft,
  sideLungesRight,
  calfRaises,
  gluteBridges,
  gluteBridgeHolds,
  fireHydrantLeft,
  fireHydrantRight,
  donkeyKicksLeft,
  donkeyKicksRight,
  forwardLungeLeft,
  forwardLungeRight,
  reverseLungesLeft,
  reverseLungesRight,

  // Level 2
  highKnees,
  singleLegGluteBridgeLeft,
  singleLegGluteBridgeRight,
  singleLegDeadliftLeft,
  singleLegDeadliftRight,

  // Level 3
  squatJumps,
  singleLegSquatsLeft,
  singleLegSquatsRight,
  buttKicks,
];
