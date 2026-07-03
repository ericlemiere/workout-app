export interface ToneSpec {
  freq: number;
  dur: number;
  vol?: number;
  type?: OscillatorType;
  delayMs?: number;
}

export interface SfxPackDef {
  id: string;
  name: string;
  countdown: ToneSpec;
  go: ToneSpec[];
  complete: ToneSpec[];
}

export const DEFAULT_SFX_PACK = "classic";

export const SFX_PACKS: Record<string, SfxPackDef> = {
  classic: {
    id: "classic",
    name: "Classic",
    countdown: { freq: 660, dur: 0.12, vol: 0.35 },
    go: [
      { freq: 880, dur: 0.08, vol: 0.4 },
      { freq: 1100, dur: 0.15, vol: 0.4, delayMs: 100 },
    ],
    complete: [
      { freq: 880, dur: 0.1, vol: 0.4 },
      { freq: 1100, dur: 0.1, vol: 0.4, delayMs: 150 },
      { freq: 1320, dur: 0.25, vol: 0.4, delayMs: 300 },
    ],
  },
  chime: {
    id: "chime",
    name: "Chime",
    countdown: { freq: 988, dur: 0.14, vol: 0.32, type: "triangle" },
    go: [
      { freq: 1318, dur: 0.1, vol: 0.38, type: "triangle" },
      { freq: 1568, dur: 0.18, vol: 0.38, type: "triangle", delayMs: 110 },
    ],
    complete: [
      { freq: 1046, dur: 0.12, vol: 0.38, type: "triangle" },
      { freq: 1318, dur: 0.12, vol: 0.38, type: "triangle", delayMs: 150 },
      { freq: 1568, dur: 0.3, vol: 0.38, type: "triangle", delayMs: 300 },
    ],
  },
  retro: {
    id: "retro",
    name: "Retro",
    countdown: { freq: 523, dur: 0.09, vol: 0.4, type: "square" },
    go: [
      { freq: 659, dur: 0.07, vol: 0.42, type: "square" },
      { freq: 784, dur: 0.12, vol: 0.42, type: "square", delayMs: 90 },
    ],
    complete: [
      { freq: 523, dur: 0.08, vol: 0.42, type: "square" },
      { freq: 659, dur: 0.08, vol: 0.42, type: "square", delayMs: 100 },
      { freq: 784, dur: 0.08, vol: 0.42, type: "square", delayMs: 200 },
      { freq: 1046, dur: 0.2, vol: 0.42, type: "square", delayMs: 300 },
    ],
  },
  soft: {
    id: "soft",
    name: "Soft",
    countdown: { freq: 440, dur: 0.16, vol: 0.22, type: "sine" },
    go: [
      { freq: 554, dur: 0.14, vol: 0.26, type: "sine" },
      { freq: 659, dur: 0.22, vol: 0.26, type: "sine", delayMs: 130 },
    ],
    complete: [
      { freq: 659, dur: 0.16, vol: 0.26, type: "sine" },
      { freq: 784, dur: 0.16, vol: 0.26, type: "sine", delayMs: 180 },
      { freq: 988, dur: 0.35, vol: 0.26, type: "sine", delayMs: 360 },
    ],
  },
};

export const SFX_PACK_LIST: { id: string; name: string }[] = Object.values(
  SFX_PACKS,
).map(({ id, name }) => ({ id, name }));
