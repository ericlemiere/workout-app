"use client";

import { useState } from "react";
import { FaCalendarWeek, FaMoon } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa";
import { MdSatelliteAlt } from "react-icons/md";
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
  GiGooeyEyedSun,
  GiOrbit,
} from "react-icons/gi";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { TbClock24 } from "react-icons/tb";
import { LiaMoneyBillSolid } from "react-icons/lia";
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
    icon: <MdSatelliteAlt size={60} />,
  },
  {
    id: "week-freak",
    name: "Week Freak",
    description:
      "Complete a 7-day streak. Seven days straight — the week bows to you.",
    icon: <FaCalendarWeek size={60} />,
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
    icon: <FaFlagCheckered size={60} />,
  },

  {
    id: "lunar-lifter",
    name: "Lunar Lifter",
    description:
      "Complete all 28 workouts within a single 28-day lunar window.",
    icon: <FaMoon size={60} />,
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
    icon: <TbClock24 size={60} />,
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
      <div className="relative flex justify-center items-center">
        <LiaMoneyBillSolid size={60} />
        <p className="absolute bg-navy px-px py-px -mt-px text-xs w-fit text-slate-600">
          100
        </p>
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
    icon: <BsRocketTakeoffFill size={60} />,
  },
  {
    id: "solar-shredder",
    name: "Solar Shredder",
    description:
      "Complete 500 total workouts. Brighter and hotter than the sun.",
    icon: <GiGooeyEyedSun size={60} />,
  },
  {
    id: "yoked-year",
    name: "Yoked Year",
    description:
      "Complete 365 total workouts. One for every day — a year of pure dedication.",
    icon: <GiOrbitalRays size={60} />,
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
