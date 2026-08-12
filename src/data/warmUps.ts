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
  target: ["shoulders", "core", "back"],
  matPosition: "standing",
  instructions:
    "Stand with feet shoulder-width apart and hands on hips. Reach one arm overhead, bend to the opposite side. Alternate sides in a fluid motion.",
  description:
    "Opens the side of the torso — you should feel the stretch running from the hip up through the ribs and into the shoulder of the reaching arm.",
};

export const chestOpenersWithRotation: Exercise = {
  id: "chest-openers-with-rotation",
  name: "Chest Openers with Rotation",
  duration: 30,
  image: ["/images/exercises/chest-openers-with-rotation.jpg"],
  category: "warm-up",
  target: ["chest", "shoulders", "back"],
  matPosition: "standing",
  instructions:
    "Stand tall, arms at sides. Sweep both arms back to open the chest, then rotate the torso to one side. Alternate sides.",
  description:
    "Wakes up the chest, front shoulders, and upper back before any pressing work. Feel the stretch across the front of the chest as the arms sweep back.",
};

export const deepSideToSideLunges: Exercise = {
  id: "deep-side-to-side-lunges",
  name: "Deep Side-to-Side Lunges",
  duration: 30,
  image: ["/images/exercises/deep-side-to-side-lunges.jpg"],
  category: "warm-up",
  target: ["legs", "glutes"],
  matPosition: "standing",
  instructions:
    "Stand with feet wide. Shift weight to one side, bending that knee while keeping the other leg straight. Push back to center and repeat on the other side.",
  description:
    "Prepares the hips for sideways movement. You should feel the stretch along the inner thigh of the straight leg and work in the quad of the bent one.",
};

export const torsoTwists: Exercise = {
  id: "torso-twists",
  name: "Torso Twists",
  duration: 30,
  image: ["/images/exercises/torso-twists.jpg"],
  category: "warm-up",
  target: ["core", "back"],
  matPosition: "standing",
  instructions:
    "Feet shoulder-width, hands together at chest level. Rotate torso left and right, keeping hips still.",
  description:
    "Loosens the mid-back and obliques through rotation. Keeping the hips still is what sends the movement into the spine instead of the legs.",
};

export const activeCalfStretch: Exercise = {
  id: "active-calf-stretch",
  name: "Active Calf & Hamstring Stretch",
  duration: 30,
  image: ["/images/exercises/active-calf-stretch.jpg"],
  category: "warm-up",
  target: ["legs"],
  matPosition: "standing",
  instructions:
    "Step one foot forward, flex toes up, lean forward slightly to feel the stretch. Hold 3 seconds, switch legs. Alternate.",
  description:
    "A moving stretch down the back of the front leg. You should feel it behind the knee and through the calf as the toes pull up.",
};

export const deepHoldSquatWithElbowPry: Exercise = {
  id: "deep-hold-squat-with-elbow-pry",
  name: "Deep Squat Hold with Elbow Pry",
  duration: 30,
  image: ["/images/exercises/deep-hold-squat-with-elbow-pry.jpg"],
  category: "warm-up",
  target: ["legs", "glutes", "back"],
  matPosition: "standing",
  instructions:
    "Stand with feet wider than hip-width, toes slightly out. Squat down, bringing hands together in front of chest. Use elbows to gently press knees apart. Hold and breathe.",
  description:
    "Opens the hips, groin, and ankles at the bottom of a squat. Prying the knees apart deepens the stretch through the inner thighs and glutes.",
};

export const rollDowns: Exercise = {
  id: "roll-downs",
  name: "Roll Downs",
  duration: 30,
  image: ["/images/exercises/roll-downs.jpg"],
  category: "warm-up",
  target: ["back", "legs"],
  matPosition: "standing",
  instructions:
    "Slowly drop chin to chest, roll body down vertebra by vertebra until fingertips touch floor. Reverse to stand.",
  description:
    "Mobilizes the spine one segment at a time and stretches the hamstrings at the bottom. Bend the knees slightly if the backs of the legs feel tight.",
};

export const standingHipRotations: Exercise = {
  id: "standing-hip-rotations",
  name: "Standing Hip Rotations",
  duration: 30,
  image: ["/images/exercises/standing-hip-rotations.jpg"],
  category: "warm-up",
  target: ["glutes", "legs", "core"],
  matPosition: "standing",
  instructions:
    "Stand with feet hip-width apart. March in place, lifting knees high. As you lift each knee, rotate it outward to open the hip. Alternate legs.",
  description:
    "Takes the hip joint through its full range before any squatting or lunging. Feel it deep in the hip socket and around the outside of the glute.",
};

export const shoulderRotations: Exercise = {
  id: "shoulder-rotations",
  name: "Shoulder Rotations",
  duration: 30,
  image: ["/images/exercises/shoulder-rotations.jpg"],
  category: "warm-up",
  target: ["shoulders", "back"],
  matPosition: "standing",
  instructions:
    "Rotate arms forward in big circles for 15 seconds, then reverse direction for another 15 seconds. Keep movements controlled and smooth.",
  description:
    "Circulates blood through the shoulder joint and the small rotator cuff muscles around it. Essential before push-ups or any plank work.",
};

export const pendulumHamstringStretch: Exercise = {
  id: "pendulum-hamstring-stretch",
  name: "Pendulum Hamstring Stretch",
  duration: 30,
  image: ["/images/exercises/pendulum-hamstring-stretch.jpg"],
  category: "warm-up",
  target: ["legs", "back"],
  matPosition: "standing",
  instructions:
    "Take a wide stance, cross arms in front of chest. Swing your torso from left knee to right knee, keeping your back straight.",
  description:
    "A dynamic hamstring and lower-back opener. The stretch shifts from one hamstring to the other as your torso swings across.",
};

export const highKneesMarch: Exercise = {
  id: "high-knees-march",
  name: "High Knees March ",
  duration: 30,
  image: ["/images/exercises/high-knees-march.jpg"],
  category: "warm-up",
  target: ["legs", "core"],
  matPosition: "standing",
  instructions:
    "March in place, lifting one knee at a time as high as comfortable. Engage your core throughout.",
  description:
    "Raises your heart rate gently while activating the hip flexors, quads, and core. A controlled way in before anything faster.",
};

export const openTheGate: Exercise = {
  id: "open-the-gate",
  name: "Open the Gate",
  duration: 30,
  level: 3,
  image: ["/images/exercises/open-the-gate.jpg"],
  category: "warm-up",
  target: ["glutes", "legs", "core"],
  matPosition: "standing",
  instructions:
    "Jog lightly in place. Every other step, drive one knee up to hip height and swing it open to the side, then bring it back down into the jog. Alternate legs and keep the rhythm smooth.",
  description:
    "Combines a light jog with an active hip opener, so the groin and outer glute get mobile while your heart rate climbs.",
};

export const rotatingToeTouches: Exercise = {
  id: "rotating-toe-touches",
  name: "Rotating Toe Touches",
  duration: 30,
  image: ["/images/exercises/rotating-toe-touches.jpg"],
  category: "warm-up",
  target: ["legs", "core", "back"],
  matPosition: "standing",
  instructions:
    "Stand with feet hip-width apart. Reach your right hand to your left foot while twisting your torso. Alternate sides.",
  description:
    "A hamstring stretch with rotation added, so the obliques and lower back warm up alongside the backs of the legs.",
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
