import type { Exercise } from "@/types";

// ============================================
//                                     Level 1
// ============================================

export const mountainClimberWalks: Exercise = {
  id: "mountain-climber-walks",
  name: "Mountain Climber Walks",
  duration: 30,
  level: 1,
  image: ["/images/exercises/mountain-climber-walks.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "legs"],
  matPosition: "floor",
  instructions:
    "Start in plank. Bring one knee toward your chest, then return to plank. Alternate sides. Keep hips level.",
  description:
    "Works the deep abs and hip flexors while your shoulders hold the plank steady. You should feel it across the front of your midsection every time a knee drives in.",
};

export const plank: Exercise = {
  id: "elbow-plank",
  name: "Elbow Plank",
  duration: 40,
  level: 1,
  image: ["/images/exercises/elbow-plank.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "back"],
  matPosition: "floor",
  instructions:
    "Forearms on floor, elbows under shoulders. Hold a straight line from head to heels. Breathe steadily.",
  description:
    "An isometric hold for the entire midsection — abs, obliques, and the deep muscles that wrap your spine — with the shoulders and upper back keeping the line honest.",
};

export const legRaises: Exercise = {
  id: "leg-raises",
  name: "Leg Raises",
  duration: 30,
  level: 1,
  image: ["/images/exercises/leg-raises.jpg"],
  category: "exercise",
  target: ["core", "legs"],
  matPosition: "floor",
  instructions:
    "Lie on back with your legs straight and hands under your butt. Lift legs toward ceiling while keeping lower back pressed into floor. Lower slowly without touching floor.",
  description:
    "Targets the lower abs and hip flexors. The work should stay below your belly button — if you feel it in your lower back, lower your legs less far.",
};

export const plankShoulderTaps: Exercise = {
  id: "plank-shoulder-taps",
  name: "Plank Shoulder Taps",
  duration: 30,
  level: 1,
  image: ["/images/exercises/plank-shoulder-taps.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "arms"],
  matPosition: "floor",
  instructions:
    "In high plank, tap opposite shoulder with each hand while keeping hips as still as possible.",
  description:
    "Anti-rotation work for the obliques and deep core, with the shoulders and triceps stabilizing every time a hand leaves the floor.",
};

export const deadBug: Exercise = {
  id: "dead-bug",
  name: "Dead Bug",
  duration: 30,
  level: 1,
  image: ["/images/exercises/dead-bug.jpg"],
  category: "exercise",
  target: ["core", "back"],
  matPosition: "floor",
  instructions:
    "Lie on back, arms straight up, knees bent 90°. Slowly lower opposite arm and leg toward the floor while pressing your lower back into the ground. Return and alternate.",
  description:
    "Trains the deep core to hold your spine still while your limbs move. You should feel your abs bracing and your lower back staying flat, never arching.",
};

export const birdDog: Exercise = {
  id: "bird-dog",
  name: "Bird Dog",
  duration: 30,
  level: 1,
  image: ["/images/exercises/bird-dog.jpg"],
  category: "exercise",
  target: ["core", "back", "glutes"],
  matPosition: "floor",
  instructions:
    "On hands and knees, extend opposite arm and leg until parallel to floor. Hold 2 seconds, return, alternate. Keep hips level throughout.",
  description:
    "Builds spinal stability through the deep core and lower back, with the glute of the extended leg switching on to keep your hips square.",
};

export const plankRotations: Exercise = {
  id: "plank-rotations",
  name: "Plank Rotations",
  duration: 40,
  level: 1,
  image: ["/images/exercises/plank-rotations.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "back"],
  matPosition: "floor",
  instructions:
    "Start in a forearm plank. Rotate your torso and reach one arm toward the ceiling, then return to plank. Alternate sides.",
  description:
    "Hits the obliques through rotation while the shoulders and upper back keep your hips from dropping. Feel it along the sides of your waist.",
};

export const pelvicTilts: Exercise = {
  id: "pelvic-tilts",
  name: "Pelvic Tilts",
  duration: 30,
  level: 1,
  image: ["/images/exercises/pelvic-tilts.jpg"],
  category: "exercise",
  target: ["core", "back"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent. Gently flatten your lower back into the floor by tightening your abs and tilting your pelvis. Hold 5 seconds, release. Repeat slowly.",
  description:
    "A gentle activation for the lower abs and the deep muscles that support your lumbar spine. Feel your lower back press into the floor as the abs shorten.",
};

export const standingSideCrunchLeft: Exercise = {
  id: "standing-side-crunch-left",
  name: "Standing Side Crunch Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/standing-side-crunch-left.jpg"],
  category: "exercise",
  target: ["core"],
  matPosition: "standing",
  instructions:
    "Stand with feet shoulder-width. Place hands behind head. Crunch left elbow toward left knee while lifting it. Repeat on left side.",
  description:
    "Isolates the obliques down the left side of your waist. The squeeze should happen between your left ribs and left hip.",
};

export const standingSideCrunchRight: Exercise = {
  id: "standing-side-crunch-right",
  name: "Standing Side Crunch Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/standing-side-crunch-right.jpg"],
  category: "exercise",
  target: ["core"],
  matPosition: "standing",
  instructions:
    "Stand with feet shoulder-width. Place hands behind head. Crunch right elbow toward right knee while lifting it. Repeat on right side.",
  description:
    "Isolates the obliques down the right side of your waist. The squeeze should happen between your right ribs and right hip.",
};

export const heelTaps: Exercise = {
  id: "heel-taps",
  name: "Heel Taps",
  duration: 30,
  level: 1,
  image: ["/images/exercises/heel-taps.jpg"],
  category: "exercise",
  target: ["core"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent, feet flat. Crunch up and tap your heel on one side, then the other. Keep your lower back pressed into the floor.",
  description:
    "A short side-to-side crunch that burns along the obliques just above your hips. Keep your shoulder blades off the floor the whole set.",
};

export const sidePlankLeft: Exercise = {
  id: "side-plank-left",
  name: "Side Plank Left",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-plank-left.jpg"],
  category: "exercise",
  target: ["core", "shoulders"],
  matPosition: "floor",
  instructions:
    "Lie on your left side, prop up on your left forearm, stack your feet. Hold a straight line from head to heels. Breathe steadily.",
  description:
    "Loads the left obliques and the deep side of your core, with the left shoulder holding the whole line up. Drive the hip toward the ceiling to feel it more.",
};

export const sidePlankRight: Exercise = {
  id: "side-plank-right",
  name: "Side Plank Right",
  duration: 30,
  level: 1,
  image: ["/images/exercises/side-plank-right.jpg"],
  category: "exercise",
  target: ["core", "shoulders"],
  matPosition: "floor",
  instructions:
    "Lie on your right side, prop up on your right forearm, stack your feet. Hold a straight line from head to heels. Breathe steadily.",
  description:
    "Loads the right obliques and the deep side of your core, with the right shoulder holding the whole line up. Drive the hip toward the ceiling to feel it more.",
};

export const scissorKicks: Exercise = {
  id: "scissor-kicks",
  name: "Scissor Kicks",
  duration: 30,
  level: 1,
  image: ["/images/exercises/scissor-kicks.jpg"],
  category: "exercise",
  target: ["core", "legs"],
  matPosition: "floor",
  instructions:
    "Lie on back, legs straight, hands under your butt. Lift legs slightly off the floor and alternate crossing one leg over the other in a scissor motion.",
  description:
    "Lower abs and hip flexors work to keep your legs hovering while the inner thighs cross. Press your lower back down for the whole set.",
};

export const gluteBridgeHoldKneeToChest: Exercise = {
  id: "glute-bridge-hold-knee-to-chest",
  name: "Glute Bridge Hold with Alternating Knee to Chest",
  duration: 30,
  level: 1,
  image: ["/images/exercises/glute-bridge-hold-knee-to-chest.jpg"],
  category: "exercise",
  target: ["core", "glutes", "legs"],
  matPosition: "floor",
  instructions:
    "Lie on your back, knees bent, and drive your hips up into a glute bridge. Holding the bridge, pull one knee toward your chest, lower the foot back down, then alternate sides. Keep your hips high and level throughout.",
  description:
    "The glutes and hamstrings hold your hips high while the abs stop them tipping side to side. Expect to feel it in the glute of the standing leg first.",
};

export const flutterKicks: Exercise = {
  id: "flutter-kicks",
  name: "Flutter Kicks",
  duration: 30,
  level: 1,
  image: ["/images/exercises/flutter-kicks.jpg"],
  category: "exercise",
  target: ["core", "legs"],
  matPosition: "floor",
  instructions:
    "Lie on back, legs straight, hands under your butt. Lift legs slightly off the floor and alternate kicking them up and down in a fluttering motion.",
  description:
    "A lower-ab burner — the hip flexors and quads keep the legs moving while the abs fight to keep your back flat. Smaller kicks make it harder.",
};

// ============================================
//                                     Level 2
// ============================================

export const russianTwists: Exercise = {
  id: "russian-twists",
  name: "Russian Twists",
  duration: 30,
  level: 2,
  image: ["/images/exercises/russian-twists.jpg"],
  category: "exercise",
  target: ["core"],
  matPosition: "floor",
  instructions:
    "Sit with knees bent, hands together in front of your chest. Lean back 45°. Rotate torso so your elbows tap floor on each side. Lift feet to increase difficulty.",
  description:
    "Rotational work for the obliques with the whole midsection braced by the lean-back. Turn from the ribs, not just the arms, to feel it where it counts.",
};

export const highPlankToElbowPlank: Exercise = {
  id: "high-plank-to-elbow-plank",
  name: "High Plank to Elbow Plank",
  duration: 30,
  level: 2,
  image: ["/images/exercises/high-plank-to-elbow-plank.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "arms", "chest"],
  matPosition: "floor",
  instructions:
    "Start in a high plank. Lower down onto your forearms one at a time, then press back up to high plank. Alternate the arm you lead with.",
  description:
    "A plank hold with a pressing action stacked on top — abs and obliques resist the twist while shoulders, triceps, and chest do the up-and-down.",
};

export const windshieldWipers: Exercise = {
  id: "windshield-wipers",
  name: "Windshield Wipers",
  duration: 30,
  level: 2,
  image: ["/images/exercises/windshield-wipers.jpg"],
  category: "exercise",
  target: ["core", "back"],
  matPosition: "floor",
  instructions:
    "Lie on back, arms out to sides, legs straight up. Lower legs to one side while keeping shoulders on the floor. Return to center and alternate.",
  description:
    "Loaded rotation for the obliques and lower abs, with a stretch through the lower back and hips at the bottom of each sweep.",
};

// ============================================
//                                     Level 3
// ============================================

export const mountainClimbers: Exercise = {
  id: "mountain-climbers",
  name: "Mountain Climbers",
  duration: 30,
  level: 3,
  image: ["/images/exercises/mountain-climbers.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "legs"],
  matPosition: "floor",
  instructions:
    "Start in plank. Drive alternate knees toward chest as fast as control allows. Keep hips level.",
  description:
    "A conditioning move that lights up the abs and hip flexors while the shoulders carry your bodyweight. Your heart rate is part of the target here.",
};

export const plankWalkOuts: Exercise = {
  id: "plank-walk-outs",
  name: "Plank Walk-Outs",
  duration: 30,
  level: 3,
  image: ["/images/exercises/plank-walk-outs.jpg"],
  category: "exercise",
  target: ["core", "shoulders", "back"],
  matPosition: "floor",
  instructions:
    "Start in a high plank. Slowly walk your hands out as far as you can while keeping your core engaged and hips level. Walk hands back to plank. Repeat.",
  description:
    "Every inch your hands travel forward adds leverage against your abs. Stop walking out at the point where your lower back starts to sag.",
};

export const sitUps: Exercise = {
  id: "sit-ups",
  name: "Sit-Ups",
  duration: 30,
  level: 3,
  image: ["/images/exercises/sit-ups.jpg"],
  category: "exercise",
  target: ["core", "legs"],
  matPosition: "floor",
  instructions:
    "Lie on back, knees bent, feet flat. Place hands behind head or across chest. Engage core to lift upper body toward knees, then lower back down.",
  description:
    "The classic full range crunch — upper and lower abs pull you up, with the hip flexors joining in near the top. Lead with your ribs, not your neck.",
};

// ===============================================================================
//                                                                   Exercise list
// ===============================================================================

export const mainExercises: Exercise[] = [
  // Level 1
  mountainClimberWalks,
  plank,
  legRaises,
  plankShoulderTaps,
  deadBug,
  birdDog,
  plankRotations,
  pelvicTilts,
  standingSideCrunchLeft,
  standingSideCrunchRight,
  heelTaps,
  sidePlankLeft,
  sidePlankRight,
  scissorKicks,
  gluteBridgeHoldKneeToChest,
  flutterKicks,

  // Level 2
  russianTwists,
  highPlankToElbowPlank,
  windshieldWipers,

  // Level 3
  mountainClimbers,
  plankWalkOuts,
  sitUps,
];
