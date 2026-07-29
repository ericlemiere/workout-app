import type { Exercise } from "@/types";

// ===============================================================================
//                                                                    Cool Downs
// ===============================================================================

export const childsPose: Exercise = {
  id: "childs-pose",
  name: "Child's Pose",
  duration: 30,
  image: ["/images/exercises/childs-pose.jpg"],
  category: "cool-down",
  target: "back",
  matPosition: "floor",
  instructions:
    "Kneel, sit back on heels, reach arms forward on floor. Let chest sink toward ground. Breathe deeply.",
};

export const hipFlexorStretch: Exercise = {
  id: "hip-flexor-stretch",
  name: "Hip Flexor Stretch",
  duration: 40,
  image: ["/images/exercises/hip-flexor-stretch.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "floor",
  instructions:
    "Kneel on one knee, lunge forward. Push hips forward gently. Hold 20 seconds each side.",
};

export const quadStretchLeft: Exercise = {
  id: "quad-stretch-left",
  name: "Quad Stretch Left",
  duration: 20,
  image: ["/images/exercises/quad-stretch-left.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand on your right leg, pull your left foot toward glute. Keep knees together.",
};

export const quadStretchRight: Exercise = {
  id: "quad-stretch-right",
  name: "Quad Stretch Right",
  duration: 20,
  image: ["/images/exercises/quad-stretch-right.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand on your left leg, pull your right foot toward glute. Keep knees together.",
};

export const seatedHamstringStretch: Exercise = {
  id: "seated-hamstring-stretch",
  name: "Seated Hamstring Stretch",
  duration: 30,
  image: ["/images/exercises/seated-hamstring-stretch.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "floor",
  instructions:
    "Sit with both legs extended. Reach toward toes, keeping back straight.",
};

export const figure4Left: Exercise = {
  id: "figure-4-left",
  name: "Figure-4 Left",
  duration: 30,
  image: ["/images/exercises/figure-4-left.jpg"],
  category: "cool-down",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Cross left ankle over right knee while lying on back. Pull the right leg toward chest.",
};

export const figure4Right: Exercise = {
  id: "figure-4-right",
  name: "Figure-4 Right",
  duration: 30,
  image: ["/images/exercises/figure-4-right.jpg"],
  category: "cool-down",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Cross right ankle over left knee while lying on back. Pull the left leg toward chest.",
};

export const proneGluteStretchLeft: Exercise = {
  id: "prone-glute-stretch-left",
  name: "Prone Glute Stretch Left",
  duration: 30,
  image: ["/images/exercises/prone-glute-stretch-left.jpg"],
  category: "cool-down",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Lie face down. Bend your left knee and draw it up under your chest so the shin crosses beneath you. Extend your right leg straight behind, then sink your hips toward the floor and breathe.",
};

export const proneGluteStretchRight: Exercise = {
  id: "prone-glute-stretch-right",
  name: "Prone Glute Stretch Right",
  duration: 30,
  image: ["/images/exercises/prone-glute-stretch-right.jpg"],
  category: "cool-down",
  target: "glutes",
  matPosition: "floor",
  instructions:
    "Lie face down. Bend your right knee and draw it up under your chest so the shin crosses beneath you. Extend your left leg straight behind, then sink your hips toward the floor and breathe.",
};

export const chestStretch: Exercise = {
  id: "chest-stretch",
  name: "Chest Stretch",
  duration: 30,
  image: ["/images/exercises/chest-stretch.jpg"],
  category: "cool-down",
  target: "chest",
  matPosition: "standing",
  instructions:
    "Clasp hands behind back, squeeze shoulder blades together, lift hands slightly. Feel the chest opening.",
};

export const tricepStretch: Exercise = {
  id: "tricep-stretch",
  name: "Tricep Stretch",
  duration: 40,
  image: ["/images/exercises/tricep-stretch.jpg"],
  category: "cool-down",
  target: "arms",
  matPosition: "standing",
  instructions:
    "Raise one arm overhead, bend elbow. Use other hand to gently press elbow back. Hold 20 seconds each side.",
};

export const upperBackStretch: Exercise = {
  id: "upper-back-stretch",
  name: "Upper Back Stretch",
  duration: 30,
  image: ["/images/exercises/upper-back-stretch.jpg"],
  category: "cool-down",
  target: "back",
  matPosition: "standing",
  instructions:
    "Interlace fingers in front, push palms away. Round upper back. Hold and breathe.",
};

export const catCow: Exercise = {
  id: "cat-cow",
  name: "Cat-Cow",
  duration: 30,
  image: ["/images/exercises/cat-cow.jpg"],
  category: "cool-down",
  target: "back",
  matPosition: "floor",
  instructions:
    "On hands and knees, inhale and let your belly drop (Cow), then exhale and round your spine toward the ceiling (Cat). Move slowly through the full range.",
};

export const spinalTwistLeft: Exercise = {
  id: "spinal-twist-left",
  name: "Spinal Twist Left",
  duration: 30,
  image: ["/images/exercises/spinal-twist-left.jpg"],
  category: "cool-down",
  target: "back",
  matPosition: "floor",
  instructions:
    "Lie on your back, knees bent. Drop both knees to your left side while keeping shoulders flat, and look to your right.",
};

export const spinalTwistRight: Exercise = {
  id: "spinal-twist-right",
  name: "Spinal Twist Right",
  duration: 30,
  image: ["/images/exercises/spinal-twist-right.jpg"],
  category: "cool-down",
  target: "back",
  matPosition: "floor",
  instructions:
    "Lie on your back, knees bent. Drop both knees to your right side while keeping shoulders flat, and look to your left.",
};

export const plankToDownwardDog: Exercise = {
  id: "plank-to-downward-dog",
  name: "Plank to Downward Dog",
  duration: 30,
  image: ["/images/exercises/plank-to-downward-dog.jpg"],
  category: "cool-down",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Start in a plank position. Push hips up and back into a downward dog. Hold, then return to plank.",
};

export const seatedForwardFold: Exercise = {
  id: "seated-forward-fold",
  name: "Seated Forward Fold",
  duration: 30,
  image: ["/images/exercises/seated-forward-fold.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "floor",
  instructions:
    "Sit with legs crossed. Hinge at hips and reach forward to the floor, keeping back straight.",
};

export const seatedCrossoverStretchLeft: Exercise = {
  id: "seated-crossover-stretch-left",
  name: "Seated Crossover Stretch Left",
  duration: 30,
  image: ["/images/exercises/seated-crossover-stretch-left.jpg"],
  category: "cool-down",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your right ankle over your left knee, place your left elbow on the outside of your right knee, and gently twist your torso to the right. Lift chest, hold, and breathe.",
};

export const seatedCrossoverStretchRight: Exercise = {
  id: "seated-crossover-stretch-right",
  name: "Seated Crossover Stretch Right",
  duration: 30,
  image: ["/images/exercises/seated-crossover-stretch-right.jpg"],
  category: "cool-down",
  target: "full body",
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your left ankle over your right knee, place your right elbow on the outside of your left knee, and gently twist your torso to the left. Lift chest, hold, and breathe.",
};

export const seatedCrossoverHamstringStretchLeft: Exercise = {
  id: "seated-crossover-hamstring-stretch-left",
  name: "Seated Crossover Hamstring Stretch Left",
  duration: 30,
  image: ["/images/exercises/seated-crossover-hamstring-stretch-left.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your right ankle over your left knee, hug your right knee toward your chest. Hinge forward to stretch your hamstring, and hug your knee to stretch your hip.",
};

export const seatedCrossoverHamstringStretchRight: Exercise = {
  id: "seated-crossover-hamstring-stretch-right",
  name: "Seated Crossover Hamstring Stretch Right",
  duration: 30,
  image: ["/images/exercises/seated-crossover-hamstring-stretch-right.jpg"],
  category: "cool-down",
  target: "lower body",
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your left ankle over your right knee, hug your left knee toward your chest. Hinge forward to stretch your hamstring, and hug your knee to stretch your hip.",
};

export const cooldownExercises: Exercise[] = [
  childsPose,
  hipFlexorStretch,
  quadStretchLeft,
  quadStretchRight,
  seatedHamstringStretch,
  figure4Left,
  figure4Right,
  proneGluteStretchLeft,
  proneGluteStretchRight,
  chestStretch,
  tricepStretch,
  upperBackStretch,
  catCow,
  spinalTwistLeft,
  spinalTwistRight,
  plankToDownwardDog,
  seatedForwardFold,
  seatedCrossoverStretchLeft,
  seatedCrossoverStretchRight,
  seatedCrossoverHamstringStretchLeft,
  seatedCrossoverHamstringStretchRight,
];
