import type { Exercise } from "@/types";

// ===============================================================================
//                                                                 Main exercises
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

export const mountainClimberWalks: Exercise = {
  id: "mountain-climber-walks",
  name: "Mountain Climber Walks",
  duration: 30,
  level: 1,
  image: ["/images/exercises/mountain-climber-walks.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Start in plank. Bring one knee toward your chest, then return to plank. Alternate sides. Keep hips level.",
};

export const mountainClimbers: Exercise = {
  id: "mountain-climbers",
  name: "Mountain Climbers",
  duration: 30,
  level: 2,
  image: ["/images/exercises/mountain-climbers.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Start in plank. Drive alternate knees toward chest as fast as control allows. Keep hips level.",
};

export const plank: Exercise = {
  id: "plank",
  name: "Plank Hold",
  duration: 40,
  level: 1,
  image: ["/images/exercises/plank.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Forearms on floor, elbows under shoulders. Hold a straight line from head to heels. Breathe steadily.",
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

export const russianTwists: Exercise = {
  id: "russian-twists",
  name: "Russian Twists",
  duration: 30,
  level: 2,
  image: ["/images/exercises/russian-twists.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Sit with knees bent, hands together in front of your chest. Lean back 45°. Rotate torso so your elbows tap floor on each side. Lift feet to increase difficulty.",
};

export const jumpSquats: Exercise = {
  id: "jump-squats",
  name: "Jump Squats",
  duration: 30,
  level: 3,
  image: ["/images/exercises/jump-squats.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Perform a squat, then explode upward into a jump. Land softly, immediately descend into next squat.",
};

export const sideLunges: Exercise = {
  id: "side-lunges",
  name: "Side Lunges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-lunges.jpg"],
  category: "exercise",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Step wide to the right, bend right knee, keep left leg straight. Push back to center. Alternate sides.",
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

export const plankShoulderTaps: Exercise = {
  id: "plank-shoulder-taps",
  name: "Plank Shoulder Taps",
  duration: 30,
  level: 1,
  image: ["/images/exercises/plank-shoulder-taps.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "In high plank, tap opposite shoulder with each hand while keeping hips as still as possible.",
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

export const singleLegDeadlift: Exercise = {
  id: "single-leg-deadlift",
  name: "Single Leg Deadlift",
  duration: 40,
  level: 1,
  image: ["/images/exercises/single-leg-deadlift.jpg"],
  category: "exercise",
  target: "glutes",
  matPosition: "standing",
  instructions:
    "Stand on one leg, hinge forward at hip, extend back leg behind. Return to standing. 20 seconds each side.",
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

export const deadBug: Exercise = {
  id: "dead-bug",
  name: "Dead Bug",
  duration: 30,
  level: 1,
  image: ["/images/exercises/dead-bug.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Lie on back, arms straight up, knees bent 90°. Slowly lower opposite arm and leg toward the floor while pressing your lower back into the ground. Return and alternate.",
};

export const birdDog: Exercise = {
  id: "bird-dog",
  name: "Bird Dog",
  duration: 30,
  level: 1,
  image: ["/images/exercises/bird-dog.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "On hands and knees, extend opposite arm and leg until parallel to floor. Hold 2 seconds, return, alternate. Keep hips level throughout.",
};

export const plankRotations: Exercise = {
  id: "plank-rotations",
  name: "Plank Rotations",
  duration: 40,
  level: 1,
  image: ["/images/exercises/plank-rotations.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Start in a forearm plank. Rotate your torso and reach one arm toward the ceiling, then return to plank. Alternate sides.",
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
    "On hands and knees, kick your left leg back and up, squeezing the glute at the top. Keep hips level. Do 20 seconds each side.",
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
    "On hands and knees, kick your right leg back and up, squeezing the glute at the top. Keep hips level. Do 20 seconds each side.",
};

export const pelvicTilts: Exercise = {
  id: "pelvic-tilts",
  name: "Pelvic Tilts",
  duration: 30,
  level: 1,
  image: ["/images/exercises/pelvic-tilts.jpg"],
  category: "exercise",
  target: "core",
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Gently flatten your lower back into the floor by tightening your abs and tilting your pelvis. Hold 5 seconds, release. Repeat slowly.",
};

export const mainExercises: Exercise[] = [
  burpees,
  burpeeWalk,
  pushUps,
  kneelingPushUps,
  airplanePushUps,
  wavePushUps,
  spiderCrossPlanks,
  squats,
  mountainClimberWalks,
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
  fireHydrantRight,
  donkeyKicksLeft,
  donkeyKicksRight,
  pelvicTilts,
];
