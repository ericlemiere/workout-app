import { getAudioContext } from "@/lib/audio";
import { MUSIC_TRACKS } from "@/lib/musicTracks";

let workoutAudio: HTMLAudioElement | null = null;
let workoutGain: GainNode | null = null;
let workoutSource: MediaElementAudioSourceNode | null = null;
let currentTrackId: string | null = null;
let fadeRafId: number | null = null;
let fadeToken = 0;

function cancelFade() {
  fadeToken += 1;
  if (fadeRafId !== null) {
    cancelAnimationFrame(fadeRafId);
    fadeRafId = null;
  }
}

function connectGain(audio: HTMLAudioElement, volume: number) {
  const ctx = getAudioContext();
  if (!ctx) {
    audio.volume = volume;
    workoutGain = null;
    workoutSource = null;
    return;
  }

  const source = ctx.createMediaElementSource(audio);
  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.connect(gain).connect(ctx.destination);

  workoutSource = source;
  workoutGain = gain;
}

function disposeCurrentAudio() {
  cancelFade();

  workoutAudio?.pause();
  workoutAudio = null;
  currentTrackId = null;

  workoutSource?.disconnect();
  workoutSource = null;

  workoutGain?.disconnect();
  workoutGain = null;
}

export function startWorkoutMusic(trackId: string, volume: number) {
  cancelFade();

  const track = MUSIC_TRACKS.find((t) => t.id === trackId);
  if (!track) return;

  if (!workoutAudio || currentTrackId !== track.id) {
    disposeCurrentAudio();
    const audio = new Audio(track.src);
    audio.loop = true;
    workoutAudio = audio;
    currentTrackId = track.id;
    connectGain(audio, volume);
  }

  if (workoutGain) {
    workoutGain.gain.value = volume;
  } else if (workoutAudio) {
    workoutAudio.volume = volume;
  }

  workoutAudio?.play().catch(() => {});
}

export function setWorkoutMusicVolume(volume: number) {
  if (workoutGain) {
    workoutGain.gain.value = volume;
  } else if (workoutAudio) {
    workoutAudio.volume = volume;
  }
}

export function getCurrentWorkoutMusicTrackId() {
  return currentTrackId;
}

export function stopWorkoutMusic() {
  disposeCurrentAudio();
}

export async function fadeOutWorkoutMusic(durationMs = 1000): Promise<void> {
  if (!workoutAudio) return;

  cancelFade();
  const myToken = fadeToken;

  const startVolume = workoutGain
    ? workoutGain.gain.value
    : (workoutAudio?.volume ?? 0);

  if (startVolume <= 0) {
    stopWorkoutMusic();
    return;
  }

  await new Promise<void>((resolve) => {
    const startTs = performance.now();

    const step = (now: number) => {
      if (myToken !== fadeToken || !workoutAudio) {
        resolve();
        return;
      }

      const elapsed = now - startTs;
      const progress = Math.min(elapsed / durationMs, 1);
      const volume = startVolume * (1 - progress);

      if (workoutGain) {
        workoutGain.gain.value = volume;
      } else {
        workoutAudio.volume = volume;
      }

      if (progress >= 1) {
        stopWorkoutMusic();
        resolve();
        return;
      }

      fadeRafId = requestAnimationFrame(step);
    };

    fadeRafId = requestAnimationFrame(step);
  });
}
