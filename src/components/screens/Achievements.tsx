"use client";

import { useState } from "react";
import {
  HundredIcon,
  CrescentMoonIcon,
  TwentyFourHoursIcon,
} from "@/lib/customIcons";
import { MoonIconSimple } from "@/lib/moonIcon";
import { PiPlanetFill } from "react-icons/pi";
import { RiAliensLine } from "react-icons/ri";
import { SiSaturn } from "react-icons/si";

import {
  GiTriplePlier,
  GiAstronautHelmet,
  GiSpaceSuit,
  GiMoonOrbit,
  GiOrbitalRays,
  GiGiant,
  GiExplodingPlanet,
  GiFlyingFlag,
  GiKnockedOutStars,
  GiStarCycle,
  GiFlexibleStar,
  GiStarSwirl,
  GiStarfighter,
  GiStarGate,
  GiStarKey,
  GiStarProminences,
  GiStarStruck,
  GiSevenPointedStar,
  GiOrbit,
  GiStarSattelites,
  GiRobotGolem,
  GiRobotHelmet,
  GiAura,
  GiAtlas,
  GiBlackHoleBolas,
  GiBurningMeteor,
  GiDeathStar,
  GiDrippingStar,
  GiEclipseFlare,
  GiFinishLine,
  GiForwardField,
  GiJupiter,
  GiLaurelsTrophy,
  GiMegabot,
  GiMountaintop,
  GiPlanetCore,
  GiRoad,
  GiRocket,
  GiSoulVessel,
  GiSquidHead,
  GiStrong,
  GiWorld,
  GiThreeBurningBalls,
  GiFireRing,
  GiFireZone,
  GiFireSilhouette,
  GiFireShield,
  GiFireDash,
  GiDiceFire,
  GiMadScientist,
  GiFox,
  GiDoubleRingedOrb,
  GiGasPump,
} from "react-icons/gi";

import { useProgressStore } from "@/store/progressStore";
import { ModalFromBottom } from "@/components/ui/ModalFromBottom";

export interface Achievement {
  id: string;
  name: string;
  description1: string;
  description2: string;
  icon: React.ReactNode;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── EASIEST ────────────────────────────────────────────────────────────────
  {
    id: "flag-planter",
    name: "Flag Planter",
    description1: "Complete a workout in each target area.",
    description2: "You've planted your flag on the MOOVment.",
    icon: <GiFlyingFlag size={60} />,
  },
  {
    id: "strong-start",
    name: "Strong Start",
    description1: "Complete a 3-day streak.",
    description2: "A strong start leads to a strong you.",
    icon: <GiStrong size={60} />,
  },
  {
    id: "road-warrior",
    name: "Road Warrior",
    description1: "Complete 8 total workouts.",
    description2: "You're on the road to strength and flexibility.",
    icon: <GiRoad size={60} />,
  },
  {
    id: "sweat-star",
    name: "Sweat Star",
    description1: "Complete 16 total workouts.",
    description2: "Your dedication is starting to shine.",
    icon: <GiDrippingStar size={60} />,
  },
  {
    id: "week-freak",
    name: "Week Freak",
    description1: "Complete a 7-day streak.",
    description2: "The opposite of a weak week.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <GiSevenPointedStar size={60} />
        <p className="absolute inset-0 flex justify-center items-center text-navy font-bold text-xl mt-1 font-space-mono tracking-tighter">
          VII
        </p>
      </div>
    ),
  },
  {
    id: "alien-athlete",
    name: "Alien Athlete",
    description1: "Complete 20 total workouts.",
    description2: "Your effort is out of this world.",
    icon: <RiAliensLine size={60} />,
  },
  {
    id: "extraterrestrial-effort",
    name: "Extraterrestrial Effort",
    description1: "Complete a 14-day streak.",
    description2: "Two weeks of otherworldly dedication.",
    icon: <GiSquidHead size={60} />,
  },
  {
    id: "planet-core",
    name: "Planet Core",
    description1: "Complete 20 total core workouts.",
    description2: "Your core is becoming the center of something powerful.",
    icon: <GiPlanetCore size={60} />,
  },
  {
    id: "daily-double",
    name: "Daily Double",
    description1: "Complete two workouts in one day.",
    description2:
      "Double the effort, double the gains. This also banks you a refuel day.",
    icon: <GiDoubleRingedOrb size={60} />,
  },
  {
    id: "refuel-day",
    name: "Refuel Day",
    description1: "Claim a Refuel Day.",
    description2: "Everyone deserves a break.",
    icon: <GiGasPump size={60} />,
  },
  {
    id: "flex-finisher",
    name: "Flex Finisher",
    description1: "Complete a full program cycle.",
    description2: "You've finished your first lap.",
    icon: <GiFinishLine size={60} />,
  },
  {
    id: "upward-force",
    name: "Upward Force",
    description1: "Complete 40 total workouts.",
    description2: "The force is strong with you.",
    icon: <GiForwardField size={60} />,
  },
  {
    id: "day-worker",
    name: "Day Worker",
    description1: "Accumulate 24 hours of total workout time.",
    description2: "A full day of sweat and effort.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <TwentyFourHoursIcon />
      </div>
    ),
  },
  {
    id: "thats-no-moon",
    name: "That's No Moon",
    description1: "Complete a 21-day streak.",
    description2: "You are becoming fully operational.",
    icon: <GiDeathStar size={60} />,
  },
  {
    id: "saturn-ringer",
    name: "Saturn Ringer",
    description1: "Complete a 30-day streak.",
    description2: "Your consistency is legendary, like the rings of Saturn.",
    icon: <SiSaturn size={60} />,
  },
  {
    id: "meteor-melter",
    name: "Meteor Melter",
    description1: "Complete 60 total workouts.",
    description2: "Incinerating rock with the heat you bring.",
    icon: <GiBurningMeteor size={60} />,
  },

  {
    id: "gravity-grinder",
    name: "Gravity Grinder",
    description1: "Complete a 45-day streak.",
    description2:
      "Your gravitational pull is undeniable — everything is drawn to you.",
    icon: <GiBlackHoleBolas size={60} />,
  },
  {
    id: "crescent-cruncher",
    name: "Crescent Cruncher",
    description1: "Complete all 28 workouts in a single lunar cycle.",
    description2: "One workout for every phase of the moon.",
    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-45">
        <CrescentMoonIcon />
      </div>
    ),
  },

  // LEVEL 2 ACHIEVEMENTS
  {
    id: "key-changer",
    name: "Key Changer",
    description1: "Complete your first workout on Level 2.",
    description2: "You've unlocked a new door.",
    icon: <GiStarKey size={60} />,
  },
  {
    id: "star-struck",
    name: "Star Struck",
    description1: "Complete 10 workouts on Level 2.",
    description2: "You're seeing gains.",
    icon: <GiStarStruck size={60} />,
  },
  {
    id: "star-fighter",
    name: "Star Fighter",
    description1: "Complete 20 workouts on Level 2.",
    description2:
      "Twenty rounds in the elevated arena — you've earned your wings.",
    icon: <GiStarfighter size={60} />,
  },
  {
    id: "ignition-intensity",
    name: "Ignition Intensity",
    description1: "Complete a 7-day streak on Level 2.",
    description2: "Igniting your inner fire.",
    icon: <GiFireDash size={60} />,
  },
  {
    id: "orbital-upgrade",
    name: "Orbital Upgrade",
    description1: "Complete a full program cycle on Level 2.",
    description2: "One full rotation at a higher frequency.",
    icon: <GiStarCycle size={60} />,
  },
  {
    id: "star-spiral",
    name: "Star Spiral",
    description1: "Complete 2 full program cycles on Level 2.",
    description2: "Twice around the upgraded grid — the momentum never stops.",
    icon: <GiStarSwirl size={60} />,
  },
  {
    id: "heavenly-body",
    name: "Heavenly Body",
    description1: "Complete a Level 2 lunar cycle.",
    description2:
      "Twenty-eight days of elevated dedication. Your body is a celestial marvel.",
    icon: <GiStarProminences size={60} />,
  },

  // LEVEL 3 ACHIEVEMENTS
  {
    id: "portal-opener",
    name: "Portal Opener",
    description1: "Complete your first workout on Level 3.",
    description2: "The highest portal is open — and you walked right through.",
    icon: <GiStarGate size={60} />,
  },
  {
    id: "star-spangled",
    name: "Star Spangled",
    description1: "Complete an 8-day streak on Level 3.",
    description2: "Eight stars in orbit.",
    icon: <GiKnockedOutStars size={60} />,
  },
  {
    id: "star-fox",
    name: "Star Fox",
    description1: "Complete a 21-day streak on Level 3.",
    description2: "Jimi Hendrix might call you 'foxy.'",
    icon: <GiFox size={60} />,
  },
  {
    id: "on-fire",
    name: "On Fire",
    description1: "Complete 20 workouts on Level 3.",
    description2: "The warmup is over. You're on fire now.",
    icon: <GiFireSilhouette size={60} />,
  },
  {
    id: "apex-atomizer",
    name: "Apex Atomizer",
    description1: "Complete a full program cycle on Level 3.",
    description2: "You've atomized the challenge.",
    icon: <GiFlexibleStar size={60} />,
  },
  {
    id: "ring-of-fire",
    name: "Ring of Fire",
    description1: "Complete a Level 3 lunar cycle.",
    description2:
      "Twenty-eight consecutive days at maximum intensity. That's hot.",
    icon: <GiFireRing size={60} />,
  },
  {
    id: "fireproof",
    name: "Fireproof",
    description1: "Complete 2 full program cycles on Level 3.",
    description2: "Nothing can burn you down — you're completely fireproof.",
    icon: <GiFireShield size={60} />,
  },
  {
    id: "orbit-olympian",
    name: "Orbit Olympian",
    description1: "Complete 2 full lunar cycles.",
    description2: "The moon has you firmly on its radar.",
    icon: <GiMoonOrbit size={60} />,
  },
  {
    id: "astral-aura",
    name: "Astral Aura",
    description1: "Complete 3 full lunar cycles.",
    description2: "Your cosmic energy emits a powerful aura.",
    icon: <GiAura size={60} />,
  },
  {
    id: "tri-cycler",
    name: "Tri-Cycler",
    description1: "Complete 3 total program cycles.",
    description2: "You've pedaled through three cycles.",
    icon: <GiTriplePlier size={60} />,
  },
  {
    id: "high-roller",
    name: "High Roller",
    description1: "Complete a full cycle on levels 1, 2, and 3.",
    description2: "You've really upped the ante.",
    icon: <GiDiceFire size={60} />,
  },
  {
    id: "planet-pumper",
    name: "Planet Pumper",
    description1: "Complete a 60-day streak.",
    description2: "Two months of non-stop MOOVing.",
    icon: <PiPlanetFill size={60} />,
  },
  {
    id: "100-club",
    name: "100 Club",
    description1: "Complete 100 total workouts.",
    description2: "Your face could be on the 100 dollar bill.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <HundredIcon />
      </div>
    ),
  },
  {
    id: "moov-martian",
    name: "MOOV Martian",
    description1: "Complete 5 total program cycles.",
    description2: "You're living on the moons of MOOV.",
    icon: <GiSoulVessel size={60} />,
  },
  {
    id: "active-astronaut",
    name: "Active Astronaut",
    description1: "Complete 4 full lunar cycles.",
    description2: "Mission control is thoroughly impressed.",
    icon: <GiAstronautHelmet size={60} />,
  },
  {
    id: "ripped-robot",
    name: "Ripped Robot",
    description1: "Complete 6 total program cycles.",
    description2: "Built different. You're a machine.",
    icon: <GiMegabot size={60} />,
  },
  {
    id: "celestial-body",
    name: "Celestial Body",
    description1: "Accumulate 48 hours of total workout time.",
    description2: "Your body is becoming something out of this world.",
    icon: <GiOrbit size={60} />,
  },
  {
    id: "fire-zone",
    name: "Fire Zone",
    description1: "Accumulate 72 hours of total workout time.",
    description2: "Scorching through the cosmos, one rep at a time.",
    icon: <GiFireZone size={60} />,
  },
  {
    id: "super-cyborg",
    name: "Super Cyborg",
    description1: "Complete 8 total program cycles.",
    description2: "Robotic precision and unstoppable power.",
    icon: <GiRobotGolem size={60} />,
  },
  {
    id: "world-wrecker",
    name: "World Wrecker",
    description1: "Complete 150 total workouts.",
    description2: "At this point, you're just destroying things.",
    icon: <GiExplodingPlanet size={60} />,
  },
  {
    id: "gains-giant",
    name: "Gains Giant",
    description1: "Complete 200 total workouts.",
    description2: "Growth on a genuinely giant scale.",
    icon: <GiGiant size={60} />,
  },
  {
    id: "jupiter-juggernaut",
    name: "Jupiter Juggernaut",
    description1: "Complete 96 hours of total workout time.",
    description2: "Like Jupiter, you are celestial and a Roman god.",
    icon: <GiJupiter size={60} />,
  },
  {
    id: "eclipse-elitist",
    name: "Eclipse Elitist",
    description1: "Complete 5 full lunar cycles.",
    description2: "Your dedication has eclipsed all expectations.",
    icon: <GiEclipseFlare size={60} />,
  },
  {
    id: "chrome-dome",
    name: "Chrome Dome",
    description1: "Complete 15 total program cycles.",
    description2: "It takes a hard head to reach this level.",
    icon: <GiRobotHelmet size={60} />,
  },
  {
    id: "summit-seeker",
    name: "Summit Seeker",
    description1: "Complete a 90-day streak.",
    description2: "You've reached a peak most will only ever see from below.",
    icon: <GiMountaintop size={60} />,
  },
  {
    id: "the-atlas",
    name: "The Atlas",
    description1: "Complete 300 total workouts.",
    description2: "You are the roadmap. It's all on your shoulders.",
    icon: <GiAtlas size={60} />,
  },
  {
    id: "triple-threat",
    name: "Triple Threat",
    description1: "Complete 3 full program cycles on Level 3.",
    description2:
      "Three complete grids at maximum intensity — you are the threat.",
    icon: <GiThreeBurningBalls size={60} />,
  },
  {
    id: "reps-rocketeer",
    name: "Reps Rocketeer",
    description1: "Complete 2 lunar cycles without missing a single day.",
    description2:
      "Fifty-six days of perfect execution — you're launching to new heights.",
    icon: (
      <div className="relative rotate-270">
        <GiRocket size={60} />
      </div>
    ),
  },
  {
    id: "mad-scientist",
    name: "Mad Scientist",
    description1: "Complete 2 full lunar cycles on Level 3.",
    description2: "You are both the experiment and the result.",
    icon: <GiMadScientist size={60} />,
  },
  {
    id: "yoked-year",
    name: "Yoked Year",
    description1: "Complete 365 total workouts.",
    description2: "One for every day of the year — pure dedication.",
    icon: <GiOrbitalRays size={60} />,
  },
  {
    id: "solar-sailor",
    name: "Solar Sailor",
    description1: "Complete 400 total workouts.",
    description2: "Brighter and hotter than the sun itself.",
    icon: <GiStarSattelites size={60} />,
  },
  {
    id: "the-calorie-cup",
    name: "The Calorie Cup",
    description1: "Complete 500 total workouts.",
    description2: "Calories burned. Trophy earned.",
    icon: <GiLaurelsTrophy size={60} />,
  },
  {
    id: "exercise-explorer",
    name: "Exercise Explorer",
    description1: "Complete a 365-day streak.",
    description2: "Going places no one has gone before.",
    icon: <GiSpaceSuit size={60} />,
  },
  {
    id: "world-warrior",
    name: "World Warrior",
    description1: "Complete 6 full lunar cycles.",
    description2: "You've taken the world on — and won.",
    icon: <GiWorld size={60} />,
  },
  {
    id: "lunar-legend",
    name: "Lunar Legend",
    description1: "Complete 8 full lunar cycles.",
    description2: "You are the planet that the MOOV orbits.",
    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-12">
        <MoonIconSimple />
      </div>
    ),
  },
];

export function Achievements() {
  const [openId, setOpenId] = useState<string | null>(null);
  const earnedAchievements = useProgressStore((s) => s.earnedAchievements);

  const active = ACHIEVEMENTS.find((a) => a.id === openId) ?? null;
  const activeEarned = active ? earnedAchievements.has(active.id) : false;

  const earnedCount = ACHIEVEMENTS.filter((a) =>
    earnedAchievements.has(a.id),
  ).length;

  return (
    <>
      <div className="">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lime text-xs font-bold uppercase tracking-widest">
            Achievements
          </h2>
          <span className="text-slate-500 text-xs">
            {earnedCount} / {ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="bg-charcoal/50 border border-slate-500 rounded-2xl mt-4 grid grid-cols-3 justify-center items-center">
          {ACHIEVEMENTS.map((a) => {
            const isEarned = earnedAchievements.has(a.id);
            return (
              <button
                key={a.id}
                onClick={() => setOpenId(a.id)}
                className={`${isEarned ? "text-lime" : "text-slate-600"} flex flex-col items-center justify-center aspect-square text-center gap-2 text-xs active:bg-white/5 rounded-2xl transition-colors`}
              >
                {a.icon}
                <p className={`${isEarned ? "text-white" : "text-slate-600"}`}>
                  {a.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <ModalFromBottom open={active !== null} onClose={() => setOpenId(null)}>
        {active && (
          <div className="flex flex-col items-center text-center px-6 pt-4 pb-10 gap-5">
            <div
              className={`${activeEarned ? "text-lime" : "text-slate-500"} mt-2`}
            >
              {active.icon}
            </div>
            <div>
              <p className="text-offwhite font-bold font-orbitron tracking-wider text-lg">
                {active.name}
              </p>
              {activeEarned && (
                <p className="text-lime text-xs font-bold uppercase tracking-widest mb-2">
                  Earned
                </p>
              )}

              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                {active.description1}
              </p>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                {active.description2}
              </p>
            </div>
          </div>
        )}
      </ModalFromBottom>
    </>
  );
}
