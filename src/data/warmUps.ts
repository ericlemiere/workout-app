import type { Exercise } from "@/types";

// ===============================================================================
//                                                                       Warm-ups
// ===============================================================================

export const dynamicSideBends: Exercise = {
  id: "dynamic-side-bends",
  name: "Dynamic Side Bends",
  duration: 30,
  image: ["/images/exercises/dynamic-side-bends.jpg"],
  category: "warm-up",
  target: "shoulders",
  matPosition: "standing",
  instructions:
    "Stand with feet shoulder-width apart and hands on hips. Reach one arm overhead, bend to the opposite side. Alternate sides in a fluid motion.",
};

export const chestOpenersWithRotation: Exercise = {
  id: "chest-openers-with-rotation",
  name: "Chest Openers with Rotation",
  duration: 30,
  image: ["/images/exercises/chest-openers-with-rotation.jpg"],
  category: "warm-up",
  target: "chest",
  matPosition: "standing",
  instructions:
    "Stand tall, arms at sides. Sweep both arms back to open the chest, then rotate the torso to one side. Alternate sides.",
};

export const deepSideToSideLunges: Exercise = {
  id: "deep-side-to-side-lunges",
  name: "Deep Side-to-Side Lunges",
  duration: 30,
  image: ["/images/exercises/deep-side-to-side-lunges.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand with feet wide. Shift weight to one side, bending that knee while keeping the other leg straight. Push back to center and repeat on the other side.",
};

export const torsoTwists: Exercise = {
  id: "torso-twists",
  name: "Torso Twists",
  duration: 30,
  image: ["/images/exercises/torso-twists.jpg"],
  category: "warm-up",
  target: "core",
  matPosition: "standing",
  instructions:
    "Feet shoulder-width, hands together at chest level. Rotate torso left and right, keeping hips still.",
};

export const activeCalfStretch: Exercise = {
  id: "active-calf-stretch",
  name: "Active Calf & Hamstring Stretch",
  duration: 30,
  image: ["/images/exercises/active-calf-stretch.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Step one foot forward, flex toes up, lean forward slightly to feel the stretch. Hold 3 seconds, switch legs. Alternate.",
};

export const deepHoldSquatWithElbowPry: Exercise = {
  id: "deep-hold-squat-with-elbow-pry",
  name: "Deep Squat Hold with Elbow Pry",
  duration: 30,
  image: ["/images/exercises/deep-hold-squat-with-elbow-pry.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand with feet wider than hip-width, toes slightly out. Squat down, bringing hands together in front of chest. Use elbows to gently press knees apart. Hold and breathe.",
};

export const rollDowns: Exercise = {
  id: "roll-downs",
  name: "Roll Downs",
  duration: 30,
  image: ["/images/exercises/roll-downs.jpg"],
  category: "warm-up",
  target: "back",
  matPosition: "standing",
  instructions:
    "Slowly drop chin to chest, roll body down vertebra by vertebra until fingertips touch floor. Reverse to stand.",
};

export const standingHipRotations: Exercise = {
  id: "standing-hip-rotations",
  name: "Standing Hip Rotations",
  duration: 30,
  image: ["/images/exercises/standing-hip-rotations.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand with feet hip-width apart. March in place, lifting knees high. As you lift each knee, rotate it outward to open the hip. Alternate legs.",
};

export const shoulderRotations: Exercise = {
  id: "shoulder-rotations",
  name: "Shoulder Rotations",
  duration: 30,
  image: ["/images/exercises/shoulder-rotations.jpg"],
  category: "warm-up",
  target: "shoulders",
  matPosition: "standing",
  instructions:
    "Rotate arms forward in big circles for 15 seconds, then reverse direction for another 15 seconds. Keep movements controlled and smooth.",
};

export const pendulumHamstringStretch: Exercise = {
  id: "pendulum-hamstring-stretch",
  name: "Pendulum Hamstring Stretch",
  duration: 30,
  image: ["/images/exercises/pendulum-hamstring-stretch.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Take a wide stance, cross arms in front of chest. Swing your torso from left knee to right knee, keeping your back straight.",
};

export const highKneesMarch: Exercise = {
  id: "high-knees-march",
  name: "High Knees March ",
  duration: 30,
  image: ["/images/exercises/high-knees-march.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "March in place, lifting one knee at a time as high as comfortable. Engage your core throughout.",
};

export const openTheGate: Exercise = {
  id: "open-the-gate",
  name: "Open the Gate",
  duration: 30,
  level: 3,
  image: ["/images/exercises/open-the-gate.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Jog lightly in place. Every other step, drive one knee up to hip height and swing it open to the side, then bring it back down into the jog. Alternate legs and keep the rhythm smooth.",
};

export const rotatingToeTouches: Exercise = {
  id: "rotating-toe-touches",
  name: "Rotating Toe Touches",
  duration: 30,
  image: ["/images/exercises/rotating-toe-touches.jpg"],
  category: "warm-up",
  target: "lower body",
  matPosition: "standing",
  instructions:
    "Stand with feet hip-width apart. Reach your right hand to your left foot while twisting your torso. Alternate sides.",
};

export const warmupExercises: Exercise[] = [
  dynamicSideBends,
  chestOpenersWithRotation,
  deepSideToSideLunges,
  torsoTwists,
  activeCalfStretch,
  deepHoldSquatWithElbowPry,
  rollDowns,
  standingHipRotations,
  shoulderRotations,
  pendulumHamstringStretch,
  highKneesMarch,
  openTheGate,
  rotatingToeTouches,
];
