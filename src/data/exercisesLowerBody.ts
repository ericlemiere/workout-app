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
  target: ["legs", "glutes", "core"],
  matPosition: "standing",
  instructions:
    "Feet shoulder-width, toes slightly out. Sit back and down until thighs are parallel. Drive through heels to stand.",
  description:
    "The foundation lower-body move. Quads do most of the work with the glutes and hamstrings driving you out of the bottom, and the core holding your torso upright.",
};

export const prisonerSquats: Exercise = {
  id: "prisoner-squats",
  name: "Prisoner Squats",
  duration: 30,
  level: 1,
  image: ["/images/exercises/prisoner-squats.jpg"],
  category: "exercise",
  target: ["legs", "glutes", "back"],
  matPosition: "standing",
  instructions:
    "Feet shoulder-width, toes slightly out. Place hands behind head. Sit back and down until thighs are parallel. Drive through heels to stand.",
  description:
    "A squat with the hands behind the head, which forces the upper back to work to keep your chest tall. Quads and glutes still do the lifting.",
};

export const sumoSquats: Exercise = {
  id: "sumo-squats",
  name: "Sumo Squats",
  duration: 30,
  level: 1,
  image: ["/images/exercises/sumo-squats.jpg"],
  category: "exercise",
  target: ["legs", "glutes"],
  matPosition: "standing",
  instructions:
    "Feet wider than shoulder-width with toes pointed out and hands together in front of chest. Sit back and down until thighs are parallel. Drive through heels to stand.",
  description:
    "The wide stance shifts the emphasis to the inner thighs and glutes. Expect to feel the adductors along the inside of your legs more than in a normal squat.",
};

export const squatsToCalfRaises: Exercise = {
  id: "squats-to-calf-raises",
  name: "Squats to Calf Raises",
  duration: 30,
  level: 1,
  image: ["/images/exercises/squats-to-calf-raises.jpg"],
  category: "exercise",
  target: ["legs", "glutes"],
  matPosition: "standing",
  instructions:
    "Perform a squat, then rise onto your toes into a calf raise. Lower back down and repeat.",
  description:
    "Works the whole leg top to bottom — quads and glutes in the squat, then the calves at full extension. Balance gets challenged at the top of each rep.",
};

export const lunges: Exercise = {
  id: "lunges",
  name: "Alternating Lunges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/lunges.jpg"],
  category: "exercise",
  target: ["legs", "glutes", "core"],
  matPosition: "standing",
  instructions:
    "Step forward, lower your back knee toward floor. Return to standing. Alternate legs. Keep torso upright.",
  description:
    "Single-leg work for the quads and glutes, with the hip flexor of the trailing leg getting a stretch. Your core and ankles handle the balance.",
};

export const reverseLunges: Exercise = {
  id: "reverse-lunges",
  name: "Reverse Lunges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/reverse-lunges.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "standing",
  instructions:
    "Step backward and lower back knee toward floor. Drive front foot through heel to return. Alternate legs.",
  description:
    "Stepping back rather than forward loads the glute and hamstring of the front leg and is easier on the knees than a forward lunge.",
};

export const sideLungesLeft: Exercise = {
  id: "side-lunges-left",
  name: "Side Lunges Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-lunges-left.jpg"],
  category: "exercise",
  target: ["legs", "glutes"],
  matPosition: "standing",
  instructions:
    "Step wide to the left, bend left knee, keep right leg straight. Push back to center. Repeat.",
  description:
    "Trains the legs sideways, which most exercises skip. The left quad and glute do the work while the right inner thigh gets a long stretch.",
};

export const sideLungesRight: Exercise = {
  id: "side-lunges-right",
  name: "Side Lunges Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-lunges-right.jpg"],
  category: "exercise",
  target: ["legs", "glutes"],
  matPosition: "standing",
  instructions:
    "Step wide to the right, bend right knee, keep left leg straight. Push back to center. Repeat.",
  description:
    "Trains the legs sideways, which most exercises skip. The right quad and glute do the work while the left inner thigh gets a long stretch.",
};

export const calfRaises: Exercise = {
  id: "calf-raises",
  name: "Calf Raises",
  duration: 30,
  level: 1,
  image: ["/images/exercises/calf-raises.jpg"],
  category: "exercise",
  target: ["legs"],
  matPosition: "standing",
  instructions:
    "Stand with feet hip-width. Rise onto toes as high as possible, lower slowly. Use a wall for balance if needed.",
  description:
    "Isolates the calves — both the big gastrocnemius and the soleus underneath. Pause at the top and lower slowly to feel it most.",
};

export const gluteBridges: Exercise = {
  id: "glute-bridges",
  name: "Glute Bridges",
  duration: 30,
  level: 1,
  image: ["/images/exercises/glute-bridges.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Drive hips up by squeezing glutes. Hold 1 second at top, lower slowly.",
  description:
    "The cleanest way to isolate the glutes with no equipment, with the hamstrings assisting. If you feel it in your lower back, tuck your pelvis before lifting.",
};

export const gluteBridgeHolds: Exercise = {
  id: "glute-bridge-holds",
  name: "Glute Bridge Holds",
  duration: 30,
  level: 1,
  image: ["/images/exercises/glute-bridge-holds.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Drive hips up by squeezing glutes, and hold for 30 seconds.",
  description:
    "An isometric hold that keeps the glutes and hamstrings under constant tension. Keep squeezing the whole time rather than resting on your lower back.",
};

export const fireHydrantLeft: Exercise = {
  id: "fire-hydrant-left",
  name: "Fire Hydrant Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/fire-hydrant-left.jpg"],
  category: "exercise",
  target: ["glutes", "core"],
  matPosition: "floor",
  instructions:
    "On hands and knees, lift your left knee out to the side, keeping it bent at 90°. Keep hips square. Lower and repeat.",
  description:
    "Targets the smaller glute muscles on the outside of the left hip — the ones that stabilize you on one leg. Keeping the hips square is what makes it work.",
};

export const fireHydrantRight: Exercise = {
  id: "fire-hydrant-right",
  name: "Fire Hydrant Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/fire-hydrant-right.jpg"],
  category: "exercise",
  target: ["glutes", "core"],
  matPosition: "floor",
  instructions:
    "On hands and knees, lift your right knee out to the side, keeping it bent at 90°. Keep hips square. Lower and repeat.",
  description:
    "Targets the smaller glute muscles on the outside of the right hip — the ones that stabilize you on one leg. Keeping the hips square is what makes it work.",
};

export const donkeyKicksLeft: Exercise = {
  id: "donkey-kicks-left",
  name: "Donkey Kicks Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/donkey-kicks-left.jpg"],
  category: "exercise",
  target: ["glutes", "core"],
  matPosition: "floor",
  instructions:
    "On hands and knees, kick your left leg back and up, squeezing the glute at the top. Keep hips level.",
  description:
    "Direct isolation for the left glute. The squeeze at the top is the rep — height matters less than keeping your lower back out of it.",
};

export const donkeyKicksRight: Exercise = {
  id: "donkey-kicks-right",
  name: "Donkey Kicks Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/donkey-kicks-right.jpg"],
  category: "exercise",
  target: ["glutes", "core"],
  matPosition: "floor",
  instructions:
    "On hands and knees, kick your right leg back and up, squeezing the glute at the top. Keep hips level.",
  description:
    "Direct isolation for the right glute. The squeeze at the top is the rep — height matters less than keeping your lower back out of it.",
};

export const forwardLungeLeft: Exercise = {
  id: "forward-lunge-left",
  name: "Forward Lunge Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/forward-lunge-left.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Step forward with your left leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
  description:
    "All the work stays on the left leg for the full set, hitting the quad and glute harder than alternating lunges. The right hip flexor stretches at the bottom.",
};

export const forwardLungeRight: Exercise = {
  id: "forward-lunge-right",
  name: "Forward Lunge Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/forward-lunge-right.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Step forward with your right leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
  description:
    "All the work stays on the right leg for the full set, hitting the quad and glute harder than alternating lunges. The left hip flexor stretches at the bottom.",
};

export const reverseLungesLeft: Exercise = {
  id: "reverse-lunge-left",
  name: "Reverse Lunge Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/reverse-lunge-left.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Step backward with your left leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
  description:
    "Stepping back keeps the load on the front leg's glute and hamstring while the hip flexor of the trailing leg opens up. Gentler on the knees than a forward lunge.",
};

export const reverseLungesRight: Exercise = {
  id: "reverse-lunge-right",
  name: "Reverse Lunge Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/reverse-lunge-right.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Step backward with your right leg, lowering your hips until both knees are bent at about 90 degrees. Push back to starting position.",
  description:
    "Stepping back keeps the load on the front leg's glute and hamstring while the hip flexor of the trailing leg opens up. Gentler on the knees than a forward lunge.",
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
  target: ["legs", "core"],
  matPosition: "standing",
  instructions:
    "Run in place, driving knees up to hip height as fast as possible. Pump arms for balance.",
  description:
    "A cardio burst that works the hip flexors, quads, and calves. The abs stay braced to keep you upright as the pace picks up.",
};

export const singleLegGluteBridgeLeft: Exercise = {
  id: "single-leg-glute-bridge-left",
  name: "Single-Leg Glute Bridge Left",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-glute-bridge-left.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Extend left leg, drive hips up by squeezing left glute. Hold 1 second at top, lower slowly.",
  description:
    "One leg carries the whole bridge, so the working glute and hamstring do roughly twice the usual job while the core stops your hips from tilting.",
};

export const singleLegGluteBridgeRight: Exercise = {
  id: "single-leg-glute-bridge-right",
  name: "Single-Leg Glute Bridge Right",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-glute-bridge-right.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "core"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Extend right leg, drive hips up by squeezing right glute. Hold 1 second at top, lower slowly.",
  description:
    "One leg carries the whole bridge, so the working glute and hamstring do roughly twice the usual job while the core stops your hips from tilting.",
};

export const singleLegDeadliftLeft: Exercise = {
  id: "single-leg-deadlift-left",
  name: "Single Leg Deadlift Left",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-deadlift-left.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "back", "core"],
  matPosition: "standing",
  instructions:
    "Stand on your left leg, hinge forward at hip, extend your right leg behind. Return to standing. Repeat.",
  description:
    "A hip hinge on one leg — you should feel a strong stretch in the left hamstring on the way down and the left glute driving you back up. Balance work comes free.",
};

export const singleLegDeadliftRight: Exercise = {
  id: "single-leg-deadlift-right",
  name: "Single Leg Deadlift Right",
  duration: 30,
  level: 2,
  image: ["/images/exercises/single-leg-deadlift-right.jpg"],
  category: "exercise",
  target: ["glutes", "legs", "back", "core"],
  matPosition: "standing",
  instructions:
    "Stand on your right leg, hinge forward at hip, extend your left leg behind. Return to standing. Repeat.",
  description:
    "A hip hinge on one leg — you should feel a strong stretch in the right hamstring on the way down and the right glute driving you back up. Balance work comes free.",
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
  target: ["legs", "glutes", "core"],
  matPosition: "standing",
  instructions:
    "Perform a squat, then explode upward into a jump. Land softly, immediately descend into next squat.",
  description:
    "Explosive power for the quads, glutes, and calves. Landing softly is where the strength is built, so absorb each jump instead of dropping into it.",
};

export const singleLegSquatsLeft: Exercise = {
  id: "single-leg-squats-left",
  name: "Single Leg Squats Left",
  duration: 30,
  level: 3,
  image: ["/images/exercises/single-leg-squats-left.jpg"],
  category: "exercise",
  target: ["legs", "glutes", "core"],
  matPosition: "standing",
  instructions:
    "Stand on your left leg, extend your right leg in front of you. Sit back and down on your left leg while keeping your right leg off the floor. Drive through your left heel to return to standing.",
  description:
    "The hardest bodyweight leg move in the program. The left quad and glute carry all your weight while the ankle and core fight to keep you steady.",
};

export const singleLegSquatsRight: Exercise = {
  id: "single-leg-squats-right",
  name: "Single Leg Squats Right",
  duration: 30,
  level: 3,
  image: ["/images/exercises/single-leg-squats-right.jpg"],
  category: "exercise",
  target: ["legs", "glutes", "core"],
  matPosition: "standing",
  instructions:
    "Stand on your right leg, extend your left leg in front of you. Sit back and down on your right leg while keeping your left leg off the floor. Drive through your right heel to return to standing.",
  description:
    "The hardest bodyweight leg move in the program. The right quad and glute carry all your weight while the ankle and core fight to keep you steady.",
};

export const buttKicks: Exercise = {
  id: "butt-kicks",
  name: "Butt Kicks",
  duration: 30,
  level: 3,
  image: ["/images/exercises/butt-kicks.jpg"],
  category: "exercise",
  target: ["legs", "glutes"],
  matPosition: "standing",
  instructions:
    "Run in place, kicking your heels up toward your glutes as fast as possible. Pump arms for balance.",
  description:
    "A cardio move that hits the hamstrings hard while dynamically stretching the quads on every kick. Stay light on the balls of your feet.",
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
