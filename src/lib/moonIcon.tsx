const CRATERS = [
  { cx: 44, cy: 68, rx: 7, ry: 6.5 },
  { cx: 68, cy: 30, rx: 4.5, ry: 4 },
  { cx: 62, cy: 50, rx: 2.5, ry: 2.5 },
  { cx: 28, cy: 52, rx: 4, ry: 3.5 },
  { cx: 35, cy: 32, rx: 2.2, ry: 2 },
  { cx: 72, cy: 60, rx: 5, ry: 4.5 },
  { cx: 50, cy: 26, rx: 1.5, ry: 1.5 },
  { cx: 38, cy: 78, rx: 3, ry: 2.8 },
  { cx: 25, cy: 40, rx: 1.8, ry: 1.6 },
];

// Generates the SVG path for the lit area of moon phase n (0=new, 14=full, 27=late waning)
function getMoonPath(n: number): string {
  const cx = 50,
    cy = 50,
    r = 40;
  if (n === 0) return "";
  const top = `${cx} ${cy - r}`;
  const bot = `${cx} ${cy + r}`;
  if (n === 14) {
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  }
  const rx = parseFloat(Math.abs(r * Math.cos((Math.PI * n) / 14)).toFixed(2));
  if (n < 14) {
    // Waxing — right side lit
    // Terminator sweep=0 (CCW bot→top) passes through RIGHT → small strip = crescent
    // Terminator sweep=1 (CW bot→top) passes through LEFT → large area = gibbous
    const ts = n <= 7 ? 0 : 1;
    return `M ${top} A ${r} ${r} 0 0 1 ${bot} A ${rx} ${r} 0 0 ${ts} ${top} Z`;
  } else {
    // Waning — left side lit
    // Terminator sweep=1 (CW bot→top) passes through LEFT → small strip = crescent
    // Terminator sweep=0 (CCW bot→top) passes through RIGHT → large area = gibbous
    const ts = 28 - n <= 7 ? 1 : 0;
    return `M ${top} A ${r} ${r} 0 0 0 ${bot} A ${rx} ${r} 0 0 ${ts} ${top} Z`;
  }
}

export function MoonIcon({ num }: { num: number }) {
  const path = getMoonPath(num - 1);
  const id = `moon${num}`;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      <defs>
        <clipPath id={`${id}k`}>
          <circle cx="50" cy="50" r="40" />
        </clipPath>
        <radialGradient id={`${id}g`} cx="40%" cy="36%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0.55" />
        </radialGradient>
        <filter id={`${id}f`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="3"
            seed={num}
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.82  0 0 0 0 0.82  0 0 0 0 0.82  0 0 0 0.22 0"
            result="tinted"
          />
          <feBlend in="SourceGraphic" in2="tinted" mode="multiply" />
        </filter>
        <filter id={`${id}glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <g clipPath={`url(#${id}k)`}>
        <circle cx="50" cy="50" r="40" fill="rgba(10,12,28,0.75)" />
        {path && (
          <path d={path} fill={`url(#${id}g)`} filter={`url(#${id}f)`} />
        )}
        <g opacity="0.55">
          {CRATERS.map((c, i) => (
            <ellipse
              key={i}
              cx={c.cx}
              cy={c.cy}
              rx={c.rx}
              ry={c.ry}
              fill="rgba(0,0,0,0.5)"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
        </g>
      </g>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="white"
        strokeOpacity={0.35}
        strokeWidth={2}
        filter={`url(#${id}glow)`}
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="white"
        strokeOpacity={0.18}
        strokeWidth={1}
      />
    </svg>
  );
}

export function MoonIconStats({ size = "w-full h-full" }: { size?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`${size}`} aria-hidden>
      <defs>
        <clipPath id="sm-clip">
          <circle cx="50" cy="50" r="40" />
        </clipPath>
        <radialGradient id="sm-grad" cx="40%" cy="36%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g clipPath="url(#sm-clip)">
        <circle cx="50" cy="50" r="40" fill="#b7e63b" />
        <path
          d="M 50 10 A 40 40 0 0 1 50 90 A 17.36 40 0 0 0 50 10 Z"
          fill="rgba(0,0,0,0.7)"
        />
        <g opacity="0.55">
          {CRATERS.map((c, i) => (
            <ellipse
              key={i}
              cx={c.cx}
              cy={c.cy}
              rx={c.rx}
              ry={c.ry}
              fill="rgba(0,0,0,0.7)"
              stroke="#b7e63b"
              strokeWidth="1"
              strokeOpacity="1"
            />
          ))}
        </g>
      </g>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#b7e63b"
        strokeOpacity={1}
        strokeWidth={6}
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="white"
        strokeOpacity={0.18}
        strokeWidth={1}
      />
    </svg>
  );
}

export function MoonIconSimple() {
  const num = 5;
  const path = getMoonPath(num - 1);
  const id = "moonSimple";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      <defs>
        <clipPath id={`${id}k`}>
          <circle cx="50" cy="50" r="40" />
        </clipPath>
        <radialGradient id={`${id}g`} cx="40%" cy="36%" r="65%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="65%" stopColor="currentColor" stopOpacity="0.29" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.155" />
        </radialGradient>

        <filter id={`${id}glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <g clipPath={`url(#${id}k)`}>
        <circle cx="50" cy="50" r="40" fill="rgba(10,12,28,0.75)" />
        {path && (
          <path d={path} fill={`url(#${id}g)`} filter={`url(#${id}f)`} />
        )}
        <g opacity="0.55">
          {CRATERS.slice(0, 7).map((c, i) => (
            <ellipse
              key={i}
              cx={c.cx}
              cy={c.cy}
              rx={c.rx}
              ry={c.ry}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeOpacity="1"
            />
          ))}
        </g>
      </g>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeOpacity={1}
        strokeWidth={4}
        filter={`url(#${id}glow)`}
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="white"
        strokeOpacity={0.18}
        strokeWidth={1}
      />
    </svg>
  );
}
