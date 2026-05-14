import type { Exercise } from "@/types";

// ===============================================================================
//                                                                 Main exercises
// ===============================================================================

export const mainExercises: Exercise[] = [
  {
    id: "burpees",
    name: "Burpees",
    duration: 30,
    image: ["/images/exercises/burpees.jpg"],
    category: "exercise",
    target: "full body",
    instructions:
      "Squat, jump feet back to plank, do a push-up, jump feet forward, then jump up with arms overhead.",
  },
  {
    id: "burpee-walk",
    name: "Burpee Walk",
    duration: 30,
    image: ["/images/exercises/burpee-walk.jpg"],
    category: "exercise",
    target: "full body",
    instructions:
      "Feet shoulder-width apart. Lower into a plank position then stand up.",
  },
  {
    id: "push-ups",
    name: "Push-Ups",
    duration: 30,
    image: ["/images/exercises/push-ups.jpg"],
    category: "exercise",
    target: "chest",
    instructions:
      "Hands shoulder-width, body in a straight line from head to heels. Lower chest to floor and press up.",
  },
  {
    id: "kneeling-push-ups",
    name: "Kneeling Push-Ups",
    duration: 30,
    image: ["/images/exercises/kneeling-push-ups.jpg"],
    category: "exercise",
    target: "chest",
    instructions:
      "Hands shoulder-width, knees on the ground. Lower chest to floor and press up.",
  },
  {
    id: "airplane-push-ups",
    name: "Airplane Push-Ups",
    duration: 30,
    image: ["/images/exercises/airplane-push-ups.jpg"],
    category: "exercise",
    target: "chest",
    instructions:
      "Start in a push-up position. Rotate your torso and arm toward the ceiling and back. Do a push-up. Alternate sides.",
  },
  {
    id: "wave-push-ups",
    name: "Wave Push-Ups",
    duration: 40,
    image: ["/images/exercises/wave-push-ups.jpg"],
    category: "exercise",
    target: "chest",
    instructions:
      "Start in a push-up position. Lower yourself to the floor in a wave motion from knees to chest to shoulders. Reverse the motion to push back up.",
  },
  {
    id: "spider-cross-planks",
    name: "Spider Cross Planks",
    duration: 40,
    image: ["/images/exercises/spider-cross-planks.jpg"],
    category: "exercise",
    target: "upper body",
    instructions:
      "Start in a push-up position. Bring your left knee to the outside of your left elbow, then bring your knee across your body to your right elbow. Alternate sides.",
  },
  {
    id: "squats",
    name: "Squats",
    duration: 30,
    image: ["/images/exercises/squats.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Feet shoulder-width, toes slightly out. Sit back and down until thighs are parallel. Drive through heels to stand.",
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    duration: 30,
    image: ["/images/exercises/mountain-climbers.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Start in plank. Drive alternate knees toward chest as fast as control allows. Keep hips level.",
  },
  {
    id: "plank",
    name: "Plank Hold",
    duration: 40,
    image: ["/images/exercises/plank.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Forearms on floor, elbows under shoulders. Hold a straight line from head to heels. Breathe steadily.",
  },
  {
    id: "lunges",
    name: "Alternating Lunges",
    duration: 30,
    image: ["/images/exercises/lunges.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Step forward, lower your back knee toward floor. Return to standing. Alternate legs. Keep torso upright.",
  },
  {
    id: "glute-bridges",
    name: "Glute Bridges",
    duration: 30,
    image: ["/images/exercises/glute-bridges.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "Lie on back, knees bent. Drive hips up by squeezing glutes. Hold 1 second at top, lower slowly.",
  },
  {
    id: "glute-bridge-holds",
    name: "Glute Bridge Holds",
    duration: 30,
    image: ["/images/exercises/glute-bridge-holds.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "Lie on back, knees bent. Drive hips up by squeezing glutes and hold.",
  },
  {
    id: "russian-twists",
    name: "Russian Twists",
    duration: 30,
    image: ["/images/exercises/russian-twists.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Sit with knees bent, lean back 45°. Rotate torso to tap floor on each side. Lift feet to increase difficulty.",
  },
  {
    id: "jump-squats",
    name: "Jump Squats",
    duration: 30,
    image: ["/images/exercises/jump-squats.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Perform a squat, then explode upward into a jump. Land softly, immediately descend into next squat.",
  },
  {
    id: "side-lunges",
    name: "Side Lunges",
    duration: 30,
    image: ["/images/exercises/side-lunges.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Step wide to the right, bend right knee, keep left leg straight. Push back to center. Alternate sides.",
  },
  {
    id: "inchworms",
    name: "Inchworms",
    duration: 30,
    image: ["/images/exercises/inchworms.jpg"],
    category: "exercise",
    target: "full body",
    instructions:
      "Stand, hinge forward, walk hands out to plank, do a push-up, walk hands back, stand. Repeat.",
  },
  {
    id: "plank-shoulder-taps",
    name: "Plank Shoulder Taps",
    duration: 30,
    image: ["/images/exercises/plank-shoulder-taps.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "In high plank, tap opposite shoulder with each hand while keeping hips as still as possible.",
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    duration: 30,
    image: ["/images/exercises/calf-raises.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Stand with feet hip-width. Rise onto toes as high as possible, lower slowly. Use a wall for balance if needed.",
  },
  {
    id: "high-knees",
    name: "High Knees",
    duration: 30,
    image: ["/images/exercises/high-knees.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Run in place, driving knees up to hip height as fast as possible. Pump arms for balance.",
  },
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    duration: 40,
    image: ["/images/exercises/jumping-jacks.jpg"],
    category: "exercise",
    target: "full body",
    instructions:
      "Jump feet out wide while raising arms overhead. Jump feet back together while lowering arms. Repeat rapidly.",
  },
  {
    id: "single-leg-deadlift",
    name: "Single Leg Deadlift",
    duration: 40,
    image: ["/images/exercises/single-leg-deadlift.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "Stand on one leg, hinge forward at hip, extend back leg behind. Return to standing. 20 seconds each side.",
  },
  {
    id: "reverse-lunges",
    name: "Reverse Lunges",
    duration: 30,
    image: ["/images/exercises/reverse-lunges.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Step backward and lower back knee toward floor. Drive front foot through heel to return. Alternate legs.",
  },

  {
    id: "dead-bug",
    name: "Dead Bug",
    duration: 30,
    image: ["/images/exercises/dead-bug.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Lie on back, arms straight up, knees bent 90°. Slowly lower opposite arm and leg toward the floor while pressing your lower back into the ground. Return and alternate.",
  },
  // 24
  {
    id: "bird-dog",
    name: "Bird Dog",
    duration: 30,
    image: ["/images/exercises/bird-dog.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "On hands and knees, extend opposite arm and leg until parallel to floor. Hold 2 seconds, return, alternate. Keep hips level throughout.",
  },
  // 25
  {
    id: "plank-rotations",
    name: "Plank Rotations",
    duration: 40,
    image: ["/images/exercises/plank-rotations.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Start in a forearm plank. Rotate your torso and reach one arm toward the ceiling, then return to plank. Alternate sides.",
  },
  // 28
  {
    id: "fire-hydrant",
    name: "Fire Hydrant",
    duration: 40,
    image: ["/images/exercises/fire-hydrant.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "On hands and knees, lift one knee out to the side, keeping it bent at 90°. Keep hips square. Lower and repeat. Do 20 seconds each side.",
  },
  // 29
  {
    id: "donkey-kicks",
    name: "Donkey Kicks",
    duration: 40,
    image: ["/images/exercises/donkey-kicks.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "On hands and knees, kick one leg back and up, squeezing the glute at the top. Keep hips level. Do 20 seconds each side.",
  },
  // 30
  {
    id: "pelvic-tilts",
    name: "Pelvic Tilts",
    duration: 30,
    image: ["/images/exercises/pelvic-tilts.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Lie on back, knees bent. Gently flatten your lower back into the floor by tightening your abs and tilting your pelvis. Hold 5 seconds, release. Repeat slowly.",
  },
];
