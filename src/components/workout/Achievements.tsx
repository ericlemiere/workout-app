"use client";

import { useState } from "react";
import {
  HundredIcon,
  RocketIcon,
  CrescentMoonIcon,
  TwentyFourHoursIcon,
  CheckeredFlagIcon,
} from "@/lib/customIcons";
import { MoonIcon } from "@/lib/moonIcon";
import { PiPlanetFill } from "react-icons/pi";
import { RiAliensLine } from "react-icons/ri";
import {
  GiTriplePlier,
  GiAstronautHelmet,
  GiSpaceSuit,
  GiSpaceShuttle,
  GiMoonOrbit,
  GiEvilMoon,
  GiOrbitalRays,
  GiGiant,
  GiExplodingPlanet,
  GiFlyingFlag,
  GiOrbit,
  GiStarSattelites,
  GiSattelite,
  GiStarFlag,
} from "react-icons/gi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { SiSaturn } from "react-icons/si";

import { ModalFromBottom } from "./ModalFromBottom";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "flagship-flexer",
    name: "Flagship Flexer",
    description:
      "Complete your very first workout. Every legend starts somewhere.",
    icon: <GiFlyingFlag size={60} />,
  },
  {
    id: "super-satellite",
    name: "Super Satellite",
    description:
      "Share this app with a friend. Spreading the word and growing the MOOVment.",
    icon: <GiSattelite size={60} />,
  },
  {
    id: "week-freak",
    name: "Week Freak",
    description:
      "Complete a 7-day streak. Seven days straight — the week bows to you.",
    icon: <LiaCalendarWeekSolid size={60} />,
  },
  {
    id: "alien-athlete",
    name: "Alien Athlete",
    description:
      "Complete a 14-day streak. Two weeks of consistency that's out of this world.",
    icon: <RiAliensLine size={60} />,
  },
  {
    id: "sinister-streak",
    name: "Sinister Streak",
    description:
      "Complete a 21-day streak. Three unbroken weeks — downright diabolical.",
    icon: <GiEvilMoon size={60} />,
  },
  {
    id: "flex-finisher",
    name: "Flex Finisher",
    description:
      "Complete your very first cycle. You're on your way to greatness.",
    icon: <CheckeredFlagIcon />,
  },

  {
    id: "crescent-cruncher",
    name: "Crescent Cruncher",
    description:
      "Complete all 28 workouts within a single 28-day lunar window.",
    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-45">
        <CrescentMoonIcon />
      </div>
    ),
  },
  {
    id: "orbit-olympian",
    name: "Orbit Olympian",
    description: "Complete 2 full lunar cycles. Health is on your radar.",
    icon: <GiMoonOrbit size={60} />,
  },
  {
    id: "day-worker",
    name: "Day Worker",
    description:
      "Accumulate 24 hours of total workout time. A full day of sweat in the books.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <TwentyFourHoursIcon />
      </div>
    ),
  },
  {
    id: "tri-cycler",
    name: "Tri-Cycler",
    description:
      "Complete 3 total program cycles. Three times through the grid.",
    icon: <GiTriplePlier size={60} />,
  },
  {
    id: "100-club",
    name: "100 Club",
    description:
      "Complete 100 total workouts. The century mark — you've earned your badge.",
    icon: (
      <div className="relative flex justify-center items-center w-15">
        <HundredIcon />
      </div>
    ),
  },
  {
    id: "active-astronaut",
    name: "Active Astronaut",
    description: "Complete 5 full lunar cycles. Mission control is impressed.",
    icon: <GiAstronautHelmet size={60} />,
  },

  {
    id: "planet-pumper",
    name: "Planet Pumper",
    description:
      "Get a streak of 60 days. Two full months of non-stop MOOVing.",
    icon: <PiPlanetFill size={60} />,
  },
  {
    id: "ripped-robot",
    name: "Ripped Robot",
    description: "Complete 6 total program cycles. You're a machine.",
    icon: <GiSpaceSuit size={60} />,
  },
  {
    id: "celestial-body",
    name: "Celestial Body",
    description:
      "Complete 48 hours of total workout time. Your body is out of this world.",
    icon: <GiOrbit size={60} />,
  },
  {
    id: "gains-giant",
    name: "Gains Giant",
    description: "Complete 200 total workouts. Growth that's genuinely giant.",
    icon: <GiGiant size={60} />,
  },
  {
    id: "world-wrecker",
    name: "World Wrecker",
    description:
      "Complete 10 full lunar cycles. At this point you're just blowing up planets.",
    icon: <GiExplodingPlanet size={60} />,
  },
  {
    id: "space-shuttle",
    name: "Space Shuttle",
    description: "Complete 20 full lunar cycles. You live among the stars.",
    icon: <GiSpaceShuttle size={60} />,
  },
  {
    id: "reps-rocketeer",
    name: "Reps Rocketeer",
    description:
      "Complete 2 lunar cycles without missing a day. You are rocketing to new heights.",
    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-12">
        <RocketIcon />
      </div>
    ),
  },
  {
    id: "solar-sailor",
    name: "Solar Sailor",
    description:
      "Complete 500 total workouts. Brighter and hotter than the sun.",
    icon: <GiStarSattelites size={60} />,
  },
  {
    id: "yoked-year",
    name: "Yoked Year",
    description:
      "Complete 365 total workouts. One for every day — a year of pure dedication.",
    icon: <GiOrbitalRays size={60} />,
  },
  {
    id: "saturn-smasher",
    name: "Saturn Smasher",
    description:
      "Complete 1000 total workouts. You've crushed a thousand sessions — like smashing a planet.",
    icon: <SiSaturn size={60} />,
  },
  {
    id: "star-slayer",
    name: "Star Slayer",
    description:
      "Complete 5 cycles in a single lunar window. Five times through the grid within one moon cycle.",
    icon: <GiStarFlag size={60} />,
  },
  {
    id: "lunar-legend",
    name: "Lunar Legend",
    description:
      "Complete 50 full lunar cycles. A true legend of the moon and the grid.",

    icon: (
      <div className="relative flex justify-center items-center w-15 rotate-12">
        <MoonIcon num={1} />
      </div>
    ),
  },
];

export function Achievements() {
  const [openId, setOpenId] = useState<string | null>(null);

  const active = ACHIEVEMENTS.find((a) => a.id === openId) ?? null;

  return (
    <>
      <div className="">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3">
          Achievements <span className="text-slate-500">[coming soon]</span>
        </h2>
        <div className="bg-charcoal/50 border border-lime/50 rounded-2xl mt-4 grid grid-cols-3 justify-center items-center">
          {ACHIEVEMENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setOpenId(a.id)}
              className="text-slate-600 flex flex-col items-center justify-center aspect-square text-center gap-2 text-xs active:bg-white/5 rounded-2xl transition-colors"
            >
              {a.icon}
              <p>{a.name}</p>
            </button>
          ))}
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
              <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-70 ">
                {active.description}
              </p>
            </div>
          </div>
        )}
      </ModalFromBottom>
    </>
  );
}
