"use client";

import { useState } from "react";
import {
  HundredIcon,
  CrescentMoonIcon,
  TwentyFourHoursIcon,
  SevenStarIcon,
} from "@/lib/customIcons";
import { MoonIconSimple } from "@/lib/moonIcon";
import { PiPlanetFill } from "react-icons/pi";
import { RiAliensLine } from "react-icons/ri";
import { SiSaturn } from "react-icons/si";
import {
  GiTriplePlier,
  GiAstronautHelmet,
  GiSpaceSuit,
  GiSpaceShuttle,
  GiMoonOrbit,
  GiOrbitalRays,
  GiGiant,
  GiExplodingPlanet,
  GiFlyingFlag,
  GiOrbit,
  GiStarSattelites,
  GiSattelite,
  GiStarFlag,
  GiRobotGolem,
  GiRobotHelmet,
  GiStripedSun,
  GiAura,
  GiAtlas,
  GiBlackHoleBolas,
  GiBlackball,
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
  GiOrbDirection,
  GiPlanetCore,
  GiRoad,
  GiRocket,
  GiSoulVessel,
  GiSquidHead,
  GiStrong,
  GiWorld,
} from "react-icons/gi";

import { ModalFromBottom } from "./ModalFromBottom";

interface Achievement {
  id: string;
  name: string;
  description1: string;
  description2: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "road-rager",
    name: "Road Rager",
    description1: "Complete 5 total workouts.",
    description2: "You're on the road to strength and flexibility.",
    icon: <GiRoad size={60} />,
  },
  {
    id: "strong-start",
    name: "Strong Start",
    description1: "Complete a 3-day streak.",
    description2: "A strong start leads to a strong you.",
    icon: <GiStrong size={60} />,
  },
  {
    id: "week-freak",
    name: "Week Freak",
    description1: "Complete a 7-day streak.",
    description2: "Seven days straight — the week bows to you.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <SevenStarIcon />
      </div>
    ),
  },
  {
    id: "sweat-star",
    name: "Sweat Star",
    description1: "Complete 10 total workouts.",
    description2: "Your dedication is starting to shine.",
    icon: <GiDrippingStar size={60} />,
  },
  {
    id: "alien-athlete",
    name: "Alien Athlete",
    description1: "Complete 15 total workouts.",
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
    id: "flex-finisher",
    name: "Flex Finisher",
    description1: "Complete your very first full program cycle.",
    description2: "One lap down, the rest await.",
    icon: <GiFinishLine size={60} />,
  },
  {
    id: "super-satellite",
    name: "Super Satellite",
    description1: "Share this app with a friend.",
    description2: "Spreading the word and growing the MOOVment.",
    icon: <GiSattelite size={60} />,
  },
  {
    id: "upward-force",
    name: "Upward Force",
    description1: "Complete 40 total workouts.",
    description2: "Always forward, never looking back.",
    icon: <GiForwardField size={60} />,
  },
  {
    id: "saturn-ringer",
    name: "Saturn Ringer",
    description1: "Complete 50 total workouts.",
    description2: "Your consistency is legendary, like the rings of Saturn.",
    icon: <SiSaturn size={60} />,
  },

  {
    id: "thats-no-moon",
    name: "That's No Moon",
    description1: "Complete a 21-day streak.",
    description2: "You are becoming fully operational.",
    icon: <GiDeathStar size={60} />,
  },
  {
    id: "comet-crusher",
    name: "Comet Crusher",
    description1: "Complete 75 total workouts.",
    description2: "Blazing through the atmosphere with unstoppable velocity.",
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
    description1: "Complete all 28 workouts within a single 28-day window.",
    description2: "One workout for every phase of the moon.",
    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-45">
        <CrescentMoonIcon />
      </div>
    ),
  },
  {
    id: "day-worker",
    name: "Day Worker",
    description1: "Accumulate 24 hours of total workout time.",
    description2: "A full day of nothing but sweat.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <TwentyFourHoursIcon />
      </div>
    ),
  },
  {
    id: "orbit-olympian",
    name: "Orbit Olympian",
    description1: "Complete 2 full lunar cycles.",
    description2: "The moon has you firmly on its radar.",
    icon: <GiMoonOrbit size={60} />,
  },
  {
    id: "astro-aura",
    name: "Astro Aura",
    description1: "Complete 3 full lunar cycles.",
    description2: "Your cosmic energy is impossible to miss.",
    icon: <GiAura size={60} />,
  },
  {
    id: "tri-cycler",
    name: "Tri-Cycler",
    description1: "Complete 3 total program cycles.",
    description2: "Three times through the grid, never slowing down.",
    icon: <GiTriplePlier size={60} />,
  },
  {
    id: "100-club",
    name: "100 Club",
    description1: "Complete 100 total workouts.",
    description2: "The century mark — you've earned your place.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <HundredIcon />
      </div>
    ),
  },
  {
    id: "dark-devotee",
    name: "Dark Devotee",
    description1: "Complete 150 total workouts.",
    description2: "Dense, dark, and utterly unstoppable.",
    icon: <GiBlackball size={60} />,
  },
  {
    id: "active-astronaut",
    name: "Active Astronaut",
    description1: "Complete 5 full lunar cycles.",
    description2: "Mission control is thoroughly impressed.",
    icon: <GiAstronautHelmet size={60} />,
  },
  {
    id: "moov-martian",
    name: "MOOV Martian",
    description1: "Complete 5 total program cycles.",
    description2: "The body follows wherever the soul commands.",
    icon: <GiSoulVessel size={60} />,
  },
  {
    id: "planet-pumper",
    name: "Planet Pumper",
    description1: "Complete a 60-day streak.",
    description2: "Two months of non-stop MOOVing.",
    icon: <PiPlanetFill size={60} />,
  },
  {
    id: "ripped-robot",
    name: "Ripped Robot",
    description1: "Complete 6 total program cycles.",
    description2: "Built different — you're a machine.",
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
    id: "sun-scorcher",
    name: "Sun Scorcher",
    description1: "Accumulate 72 hours of total workout time.",
    description2: "Scorching through the cosmos, one rep at a time.",
    icon: <GiStripedSun size={60} />,
  },
  {
    id: "planet-core",
    name: "Planet Core",
    description1: "Complete 20 total core workouts.",
    description2: "Your core is becoming the center of something powerful.",
    icon: <GiPlanetCore size={60} />,
  },
  {
    id: "super-cyborg",
    name: "Super Cyborg",
    description1: "Complete 8 total program cycles.",
    description2: "Built from stone, shaped by nothing but discipline.",
    icon: <GiRobotGolem size={60} />,
  },
  {
    id: "gains-giant",
    name: "Gains Giant",
    description1: "Complete 200 total workouts.",
    description2: "Growth on a genuinely giant scale.",
    icon: <GiGiant size={60} />,
  },
  {
    id: "world-wrecker",
    name: "World Wrecker",
    description1: "Complete 10 full lunar cycles.",
    description2: "At this point, you're just blowing up planets.",
    icon: <GiExplodingPlanet size={60} />,
  },
  {
    id: "star-slayer",
    name: "Star Slayer",
    description1: "Complete 12 full lunar cycles.",
    description2: "A full year's worth of stellar dedication.",
    icon: <GiStarFlag size={60} />,
  },
  {
    id: "eclipse-elitist",
    name: "Eclipse Elitist",
    description1: "Complete 15 full lunar cycles.",
    description2: "Your dedication has eclipsed all expectations.",
    icon: <GiEclipseFlare size={60} />,
  },
  {
    id: "jupiter-juggernaut",
    name: "Jupiter Juggernaut",
    description1: "Complete 10 total program cycles.",
    description2: "Ten laps around the grid — like Jupiter orbiting the sun.",
    icon: <GiJupiter size={60} />,
  },
  {
    id: "chrome-champion",
    name: "Chrome Champion",
    description1: "Complete 15 total program cycles.",
    description2: "Fifteen laps through the grid — more machine than mortal.",
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
    id: "atlas-athlete",
    name: "Atlas Athlete",
    description1: "Complete 300 total workouts.",
    description2: "You carry the weight of the world — and you thrive.",
    icon: <GiAtlas size={60} />,
  },
  {
    id: "reps-rocketeer",
    name: "Reps Rocketeer",
    description1: "Complete 2 lunar cycles without missing a single day.",
    description2:
      "Fifty-six days of perfect execution — you are rocketing to a new tier.",
    icon: (
      <div className="relative rotate-270">
        <GiRocket size={60} />
      </div>
    ),
  },
  {
    id: "space-shuttler",
    name: "Space Shuttler",
    description1: "Complete 20 full lunar cycles.",
    description2: "You don't just visit space — you live here.",
    icon: <GiSpaceShuttle size={60} />,
  },
  {
    id: "orbit-oracle",
    name: "Orbit Oracle",
    description1: "Complete 25 full lunar cycles.",
    description2: "Your course is set, and nothing can knock you from orbit.",
    icon: <GiOrbDirection size={60} />,
  },
  {
    id: "world-warrior",
    name: "World Warrior",
    description1: "Complete 30 full lunar cycles.",
    description2: "You've taken the world on — and won.",
    icon: <GiWorld size={60} />,
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
    description1: "Complete 500 total workouts.",
    description2: "Brighter and hotter than the sun itself.",
    icon: <GiStarSattelites size={60} />,
  },
  {
    id: "trophy-taker",
    name: "Trophy Taker",
    description1: "Complete 1000 total workouts.",
    description2: "The laurels are yours — you've earned every single leaf.",
    icon: <GiLaurelsTrophy size={60} />,
  },
  {
    id: "exercise-explorer",
    name: "Exercise Explorer",
    description1: "Complete 5 program cycles within a single lunar window.",
    description2: "Five full grids in one moon — thoroughly unprecedented.",
    icon: <GiSpaceSuit size={60} />,
  },
  {
    id: "lunar-legend",
    name: "Lunar Legend",
    description1: "Complete 50 full lunar cycles.",
    description2: "You are the myth, the legacy, the MOOV.",
    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-12">
        <MoonIconSimple />
      </div>
    ),
  },
];

export function Achievements() {
  const [openId, setOpenId] = useState<string | null>(null);
  const completed = false;

  const active = ACHIEVEMENTS.find((a) => a.id === openId) ?? null;

  const renderAcievements = () => {
    return ACHIEVEMENTS.map((a) => (
      <button
        key={a.id}
        onClick={() => setOpenId(a.id)}
        className={`${completed ? "text-lime" : "text-slate-600"} flex flex-col items-center justify-center aspect-square text-center gap-2 text-xs active:bg-white/5 rounded-2xl transition-colors`}
      >
        {a.icon}
        <p>{a.name}</p>
      </button>
    ));
  };

  return (
    <>
      <div className="">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3">
          Achievements <span className="text-slate-500">[coming soon]</span>
        </h2>
        <div className="bg-charcoal/50 border border-lime/50 rounded-2xl mt-4 grid grid-cols-3 justify-center items-center">
          {renderAcievements()}
        </div>
      </div>

      <ModalFromBottom open={active !== null} onClose={() => setOpenId(null)}>
        {active && (
          <div className="flex flex-col items-center text-center px-6 pt-4 pb-10 gap-5">
            <div className="text-slate-500 mt-2">{active.icon}</div>
            <div>
              <p className="text-offwhite font-bold font-orbitron tracking-wider text-lg">
                {active.name}
              </p>
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
