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
  target: ["back", "shoulders", "glutes"],
  matPosition: "floor",
  instructions:
    "Kneel, sit back on heels, reach arms forward on floor. Let chest sink toward ground. Breathe deeply.",
  description:
    "A full decompression for the spine. Feel the stretch spread across the lower back, through the lats, and into the shoulders as the chest sinks.",
};

export const hipFlexorStretch: Exercise = {
  id: "hip-flexor-stretch",
  name: "Hip Flexor Stretch",
  duration: 40,
  image: ["/images/exercises/hip-flexor-stretch.jpg"],
  category: "cool-down",
  target: ["legs", "glutes"],
  matPosition: "floor",
  midSwitch: true,
  instructions:
    "Kneel on one knee, lunge forward. Push hips forward gently. Hold 20 seconds each side.",
  description:
    "Targets the hip flexors, which shorten from sitting and from every lunge you just did. You should feel it at the front of the hip on the kneeling side.",
};

export const quadStretchLeft: Exercise = {
  id: "quad-stretch-left",
  name: "Quad Stretch Left",
  duration: 20,
  image: ["/images/exercises/quad-stretch-left.jpg"],
  category: "cool-down",
  target: ["legs"],
  matPosition: "standing",
  instructions:
    "Stand on your right leg, pull your left foot toward glute. Keep knees together.",
  description:
    "Stretches the left quad and hip flexor. Squeeze the left glute and tuck your pelvis to feel it along the whole front of the thigh.",
};

export const quadStretchRight: Exercise = {
  id: "quad-stretch-right",
  name: "Quad Stretch Right",
  duration: 20,
  image: ["/images/exercises/quad-stretch-right.jpg"],
  category: "cool-down",
  target: ["legs"],
  matPosition: "standing",
  instructions:
    "Stand on your left leg, pull your right foot toward glute. Keep knees together.",
  description:
    "Stretches the right quad and hip flexor. Squeeze the right glute and tuck your pelvis to feel it along the whole front of the thigh.",
};

export const seatedHamstringStretch: Exercise = {
  id: "seated-hamstring-stretch",
  name: "Seated Hamstring Stretch",
  duration: 30,
  image: ["/images/exercises/seated-hamstring-stretch.jpg"],
  category: "cool-down",
  target: ["legs", "back"],
  matPosition: "floor",
  instructions:
    "Sit with both legs extended. Reach toward toes, keeping back straight.",
  description:
    "Feel this down the backs of both thighs and into the calves. Hinge from the hips rather than rounding your spine to keep the stretch where it belongs.",
};

export const figure4Left: Exercise = {
  id: "figure-4-left",
  name: "Figure-4 Left",
  duration: 30,
  image: ["/images/exercises/figure-4-left.jpg"],
  category: "cool-down",
  target: ["glutes"],
  matPosition: "floor",
  instructions:
    "Cross left ankle over right knee while lying on back. Pull the right leg toward chest.",
  description:
    "Opens the left glute and the piriformis underneath it. The stretch should sit deep in the back of the left hip, not in the knee.",
};

export const figure4Right: Exercise = {
  id: "figure-4-right",
  name: "Figure-4 Right",
  duration: 30,
  image: ["/images/exercises/figure-4-right.jpg"],
  category: "cool-down",
  target: ["glutes"],
  matPosition: "floor",
  instructions:
    "Cross right ankle over left knee while lying on back. Pull the left leg toward chest.",
  description:
    "Opens the right glute and the piriformis underneath it. The stretch should sit deep in the back of the right hip, not in the knee.",
};

export const proneGluteStretchLeft: Exercise = {
  id: "prone-glute-stretch-left",
  name: "Prone Glute Stretch Left",
  duration: 30,
  image: ["/images/exercises/prone-glute-stretch-left.jpg"],
  category: "cool-down",
  target: ["glutes", "legs"],
  matPosition: "floor",
  instructions:
    "Lie face down. Bend your left knee and draw it up under your chest so the shin crosses beneath you. Extend your right leg straight behind, then sink your hips toward the floor and breathe.",
  description:
    "A deeper version of the figure-4 using your bodyweight. Expect a strong stretch in the left glute and outer hip, plus the right hip flexor lengthening behind you.",
};

export const proneGluteStretchRight: Exercise = {
  id: "prone-glute-stretch-right",
  name: "Prone Glute Stretch Right",
  duration: 30,
  image: ["/images/exercises/prone-glute-stretch-right.jpg"],
  category: "cool-down",
  target: ["glutes", "legs"],
  matPosition: "floor",
  instructions:
    "Lie face down. Bend your right knee and draw it up under your chest so the shin crosses beneath you. Extend your left leg straight behind, then sink your hips toward the floor and breathe.",
  description:
    "A deeper version of the figure-4 using your bodyweight. Expect a strong stretch in the right glute and outer hip, plus the left hip flexor lengthening behind you.",
};

export const chestStretch: Exercise = {
  id: "chest-stretch",
  name: "Chest Stretch",
  duration: 30,
  image: ["/images/exercises/chest-stretch.jpg"],
  category: "cool-down",
  target: ["chest", "shoulders"],
  matPosition: "standing",
  instructions:
    "Clasp hands behind back, squeeze shoulder blades together, lift hands slightly. Feel the chest opening.",
  description:
    "Lengthens the chest and front shoulders after pressing work, and pulls your posture back upright. Feel it across the collarbones.",
};

export const tricepStretch: Exercise = {
  id: "tricep-stretch",
  name: "Tricep Stretch",
  duration: 40,
  image: ["/images/exercises/tricep-stretch.jpg"],
  category: "cool-down",
  target: ["arms", "shoulders"],
  matPosition: "standing",
  midSwitch: true,
  instructions:
    "Raise one arm overhead, bend elbow. Use other hand to gently press elbow back. Hold 20 seconds each side.",
  description:
    "Feel this along the back of the raised upper arm and into the lat on that side. Keep your ribs down so the stretch stays in the arm.",
};

export const hugStretch: Exercise = {
  id: "hug-stretch",
  name: "Hug Stretch",
  duration: 30,
  image: ["/images/exercises/upper-back-stretch.jpg"],
  category: "cool-down",
  target: ["back", "shoulders"],
  matPosition: "standing",
  instructions:
    "Give yourself a big hug. Grab your shoulders, pull your elbows forward, and gently round your upper back.",
  description:
    "Spreads the shoulder blades apart to stretch the upper back and rear shoulders — the counterbalance to all the chest opening.",
};

export const catCow: Exercise = {
  id: "cat-cow",
  name: "Cat-Cow",
  duration: 30,
  image: ["/images/exercises/cat-cow.jpg"],
  category: "cool-down",
  target: ["back", "core"],
  matPosition: "floor",
  instructions:
    "On hands and knees, inhale and let your belly drop, then exhale and round your spine toward the ceiling. Move slowly through the full range.",
  description:
    "Flexes and extends the whole spine to release tension after core work. Move with your breath and let the neck follow the rest of the spine.",
};

export const spinalTwistLeft: Exercise = {
  id: "spinal-twist-left",
  name: "Spinal Twist Left",
  duration: 30,
  image: ["/images/exercises/spinal-twist-left.jpg"],
  category: "cool-down",
  target: ["back", "core", "glutes"],
  matPosition: "floor",
  instructions:
    "Lie on your back, knees bent. Drop both knees to your left side while keeping shoulders flat, and look to your right.",
  description:
    "Wrings out the lower back and the right-side obliques. Keeping both shoulders down is what creates the twist through the spine.",
};

export const spinalTwistRight: Exercise = {
  id: "spinal-twist-right",
  name: "Spinal Twist Right",
  duration: 30,
  image: ["/images/exercises/spinal-twist-right.jpg"],
  category: "cool-down",
  target: ["back", "core", "glutes"],
  matPosition: "floor",
  instructions:
    "Lie on your back, knees bent. Drop both knees to your right side while keeping shoulders flat, and look to your left.",
  description:
    "Wrings out the lower back and the left-side obliques. Keeping both shoulders down is what creates the twist through the spine.",
};

export const plankToDownwardDog: Exercise = {
  id: "plank-to-downward-dog",
  name: "Plank to Downward Dog",
  duration: 30,
  image: ["/images/exercises/plank-to-downward-dog.jpg"],
  category: "cool-down",
  target: ["shoulders", "back", "legs"],
  area: "full body",
  matPosition: "floor",
  instructions:
    "Start in a plank position. Push hips up and back into a downward dog. Hold, then return to plank.",
  description:
    "A moving stretch from head to heels. The downward dog lengthens the calves, hamstrings, and lats while the plank keeps a little tension in the core.",
};

export const seatedForwardFold: Exercise = {
  id: "seated-forward-fold",
  name: "Seated Forward Fold",
  duration: 30,
  image: ["/images/exercises/seated-forward-fold.jpg"],
  category: "cool-down",
  target: ["legs", "back", "glutes"],
  matPosition: "floor",
  instructions:
    "Sit with legs crossed. Hinge at hips and reach forward to the floor, keeping back straight.",
  description:
    "Opens the hips and outer glutes with the crossed legs, and lengthens the lower back as you reach forward. Breathe into it rather than forcing depth.",
};

export const seatedCrossoverStretchLeft: Exercise = {
  id: "seated-crossover-stretch-left",
  name: "Seated Crossover Stretch Left",
  duration: 30,
  image: ["/images/exercises/seated-crossover-stretch-left.jpg"],
  category: "cool-down",
  target: ["glutes", "back", "core"],
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your right ankle over your left knee, place your left elbow on the outside of your right knee, and gently twist your torso to the right. Lift chest, hold, and breathe.",
  description:
    "A glute stretch and a spinal twist at once — feel it in the right glute and along the spine as you rotate. Sit tall before you turn.",
};

export const seatedCrossoverStretchRight: Exercise = {
  id: "seated-crossover-stretch-right",
  name: "Seated Crossover Stretch Right",
  duration: 30,
  image: ["/images/exercises/seated-crossover-stretch-right.jpg"],
  category: "cool-down",
  target: ["glutes", "back", "core"],
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your left ankle over your right knee, place your right elbow on the outside of your left knee, and gently twist your torso to the left. Lift chest, hold, and breathe.",
  description:
    "A glute stretch and a spinal twist at once — feel it in the left glute and along the spine as you rotate. Sit tall before you turn.",
};

export const seatedCrossoverHamstringStretchLeft: Exercise = {
  id: "seated-crossover-hamstring-stretch-left",
  name: "Seated Crossover Hamstring Stretch Left",
  duration: 30,
  image: ["/images/exercises/seated-crossover-hamstring-stretch-left.jpg"],
  category: "cool-down",
  target: ["legs", "glutes"],
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your right ankle over your left knee, hug your right knee toward your chest. Hinge forward to stretch your hamstring, and hug your knee to stretch your hip.",
  description:
    "Two stretches in one position: hinging forward hits the left hamstring, hugging the knee in hits the right glute and outer hip.",
};

export const seatedCrossoverHamstringStretchRight: Exercise = {
  id: "seated-crossover-hamstring-stretch-right",
  name: "Seated Crossover Hamstring Stretch Right",
  duration: 30,
  image: ["/images/exercises/seated-crossover-hamstring-stretch-right.jpg"],
  category: "cool-down",
  target: ["legs", "glutes"],
  matPosition: "floor",
  instructions:
    "Sit with legs in front of you. Cross your left ankle over your right knee, hug your left knee toward your chest. Hinge forward to stretch your hamstring, and hug your knee to stretch your hip.",
  description:
    "Two stretches in one position: hinging forward hits the right hamstring, hugging the knee in hits the left glute and outer hip.",
};

export const fullBodyStretch: Exercise = {
  id: "full-body-stretch",
  name: "Full Body Stretch",
  duration: 30,
  image: ["/images/exercises/full-body-stretch.jpg"],
  category: "cool-down",
  target: ["back", "shoulders", "legs"],
  area: "full body",
  matPosition: "floor",
  instructions:
    "Lie on your back, arms overhead, legs extended. Stretch your whole body, reaching through fingertips and toes.",
  description:
    "One long line of tension from fingertips to toes that decompresses the spine and lets everything settle. The last thing your body needs before you're done.",
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
  hugStretch,
  catCow,
  spinalTwistLeft,
  spinalTwistRight,
  plankToDownwardDog,
  seatedForwardFold,
  seatedCrossoverStretchLeft,
  seatedCrossoverStretchRight,
  seatedCrossoverHamstringStretchLeft,
  seatedCrossoverHamstringStretchRight,
  fullBodyStretch,
];
