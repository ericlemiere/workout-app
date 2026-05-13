import type { Exercise } from "@/types";

// ===============================================================================
//                                                                 Main exercises
// ===============================================================================

export const mainExercises: Exercise[] = [
  {
    id: "burpees",
    name: "Burpees",
    duration: 40,
    image: ["/images/exercises/burpees.jpg"],
    category: "exercise",
    target: "full body",
    instructions:
      "Squat, jump feet back to plank, do a push-up, jump feet forward, then jump up with arms overhead.",
  },
  {
    id: "push-ups",
    name: "Push-Ups",
    duration: 40,
    image: ["/images/exercises/push-ups.jpg"],
    category: "exercise",
    target: "chest",
    instructions:
      "Hands shoulder-width, body in a straight line from head to heels. Lower chest to floor, press up.",
  },
  {
    id: "squats",
    name: "Squats",
    duration: 40,
    image: ["/images/exercises/squats.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Feet shoulder-width, toes slightly out. Sit back and down until thighs are parallel. Drive through heels to stand.",
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    duration: 40,
    image: ["/images/exercises/mountain-climbers.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Start in plank. Drive alternate knees toward chest as fast as control allows. Keep hips level.",
  },
  {
    id: "plank",
    name: "Plank Hold",
    duration: 45,
    image: ["/images/exercises/plank.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Forearms on floor, elbows under shoulders. Hold a straight line from head to heels. Breathe steadily.",
  },
  {
    id: "lunges",
    name: "Alternating Lunges",
    duration: 40,
    image: ["/images/exercises/lunges.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Step forward, lower back knee toward floor. Return to standing. Alternate legs. Keep torso upright.",
  },
  {
    id: "diamond-push-ups",
    name: "Diamond Push-Ups",
    duration: 40,
    image: ["/images/exercises/diamond-push-ups.jpg"],
    category: "exercise",
    target: "arms",
    instructions:
      "Place hands close together under chest, forming a diamond shape. Lower chest to hands, press up.",
  },
  {
    id: "pike-push-ups",
    name: "Pike Push-Ups",
    duration: 40,
    image: ["/images/exercises/pike-push-ups.jpg"],
    category: "exercise",
    target: "shoulders",
    instructions:
      "Form an inverted V. Bend elbows to lower head toward floor, then press back up.",
  },
  {
    id: "tricep-dips",
    name: "Tricep Dips",
    duration: 40,
    image: ["/images/exercises/tricep-dips.jpg"],
    category: "exercise",
    target: "arms",
    instructions:
      "Use a chair or floor. Hands behind you, fingers forward. Lower hips by bending elbows, then press up.",
  },
  {
    id: "superman",
    name: "Superman",
    duration: 40,
    image: ["/images/exercises/superman.jpg"],
    category: "exercise",
    target: "back",
    instructions:
      "Lie face down, arms forward. Simultaneously lift arms, chest, and legs off floor. Hold briefly, lower.",
  },
  {
    id: "glute-bridges",
    name: "Glute Bridges",
    duration: 40,
    image: ["/images/exercises/glute-bridges.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "Lie on back, knees bent. Drive hips up by squeezing glutes. Hold 1 second at top, lower slowly.",
  },
  {
    id: "russian-twists",
    name: "Russian Twists",
    duration: 40,
    image: ["/images/exercises/russian-twists.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Sit with knees bent, lean back 45°. Rotate torso to tap floor on each side. Lift feet to increase difficulty.",
  },
  {
    id: "jump-squats",
    name: "Jump Squats",
    duration: 40,
    image: ["/images/exercises/jump-squats.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Perform a squat, then explode upward into a jump. Land softly, immediately descend into next squat.",
  },
  {
    id: "side-lunges",
    name: "Side Lunges",
    duration: 40,
    image: ["/images/exercises/side-lunges.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Step wide to the right, bend right knee, keep left leg straight. Push back to center. Alternate sides.",
  },
  {
    id: "wall-sit",
    name: "Wall Sit",
    duration: 45,
    image: ["/images/exercises/wall-sit.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Slide back against wall until thighs are parallel to floor. Hold position. Keep back flat against wall.",
  },
  {
    id: "inchworms",
    name: "Inchworms",
    duration: 40,
    image: ["/images/exercises/inchworms.jpg"],
    category: "exercise",
    target: "full body",
    instructions:
      "Stand, hinge forward, walk hands out to plank, do a push-up, walk hands back, stand. Repeat.",
  },
  {
    id: "plank-shoulder-taps",
    name: "Plank Shoulder Taps",
    duration: 40,
    image: ["/images/exercises/plank-shoulder-taps.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "In high plank, tap opposite shoulder with each hand while keeping hips as still as possible.",
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    duration: 40,
    image: ["/images/exercises/calf-raises.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Stand with feet hip-width. Rise onto toes as high as possible, lower slowly. Use a wall for balance if needed.",
  },
  {
    id: "wide-push-ups",
    name: "Wide Push-Ups",
    duration: 40,
    image: ["/images/exercises/wide-push-ups.jpg"],
    category: "exercise",
    target: "chest",
    instructions:
      "Hands wider than shoulder-width, fingers angled out. Lower chest to floor, press up. Targets outer chest.",
  },
  {
    id: "high-knees",
    name: "High Knees",
    duration: 40,
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
    duration: 40,
    image: ["/images/exercises/reverse-lunges.jpg"],
    category: "exercise",
    target: "lower body",
    instructions:
      "Step backward and lower back knee toward floor. Drive front foot through heel to return. Alternate legs.",
  },
  // ── Back-safe core & glute exercises (indices 23–30) ──────────────────────
  // 23
  {
    id: "dead-bug",
    name: "Dead Bug",
    duration: 40,
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
    duration: 40,
    image: ["/images/exercises/bird-dog.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "On hands and knees, extend opposite arm and leg until parallel to floor. Hold 2 seconds, return, alternate. Keep hips level throughout.",
  },
  // 25
  {
    id: "side-plank-left",
    name: "Side Plank Left",
    duration: 30,
    image: ["/images/exercises/side-plank-left.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Lie on your left side, forearm on the floor, elbow under shoulder. Lift hips to form a straight line. Hold. Modify by keeping bottom knee down.",
  },
  // 26
  {
    id: "side-plank-right",
    name: "Side Plank Right",
    duration: 30,
    image: ["/images/exercises/side-plank-right.jpg"],
    category: "exercise",
    target: "core",
    instructions:
      "Lie on your right side, forearm on the floor, elbow under shoulder. Lift hips to form a straight line. Hold. Modify by keeping bottom knee down.",
  },
  // 27
  {
    id: "clamshells",
    name: "Clamshells",
    duration: 40,
    image: ["/images/exercises/clamshells.jpg"],
    category: "exercise",
    target: "glutes",
    instructions:
      "Lie on your side, hips stacked, knees bent. Keeping feet together, rotate top knee upward like a clamshell. Do 20 seconds each side.",
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
