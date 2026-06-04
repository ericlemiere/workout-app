import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-between safe-top safe-bottom">
      {/* Logo */}
      <div className="w-full max-w-xl pt-2">
        <Image
          src="/moov-logo-transparent.png"
          alt="MOOV"
          width={850}
          height={289}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-8 pb-4">
        <p className="text-lime text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Lost in space
        </p>
        <h1 className="font-orbitron text-8xl font-bold text-offwhite mb-4 leading-none">
          404
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-xs mb-10">
          This page doesn't exist. Maybe it was never here, or maybe it drifted off into the void.
        </p>
        <Link
          href="/"
          className="bg-lime/20 text-lime border border-lime/40 font-semibold px-8 py-3.5 rounded-2xl active:bg-lime/30 transition-colors"
        >
          Back to workouts
        </Link>
      </div>

      {/* Bottom spacer to balance the logo */}
      <div className="w-full max-w-xl" aria-hidden />
    </div>
  );
}
