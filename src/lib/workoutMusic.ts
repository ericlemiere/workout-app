import { getAudioContext } from "@/lib/audio";
import { MUSIC_TRACKS, SHUFFLE_TRACK_ID, getTrackById } from "@/lib/musicTracks";

let workoutAudio: HTMLAudioElement | null = null;
let workoutGain: GainNode | null = null;
let workoutSource: MediaElementAudioSourceNode | null = null;
let currentTrackId: string | null = null;
let currentSelectionId: string | null = null;
let fadeRafId: number | null = null;
let fadeToken = 0;

// ─── Shuffle bag ────────────────────────────────────────────────────────────
// Ids are drawn without replacement, so no track repeats until every track has
// played. The bag is rebuilt from MUSIC_TRACKS each time it empties, so adding
// tracks to that list is all it takes to include them here.
let shuffleBag: string[] = [];
let lastShuffledId: string | null = null;

function refillShuffleBag() {
  const ids = MUSIC_TRACKS.map((t) => t.id);

  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }

  // Don't let the last track of the previous bag lead the next one — that's the
  // one back-to-back repeat a plain reshuffle can still produce.
  if (ids.length > 1 && ids[0] === lastShuffledId) {
    [ids[0], ids[ids.length - 1]] = [ids[ids.length - 1], ids[0]];
  }

  shuffleBag = ids;
}

function nextShuffleTrack() {
  if (MUSIC_TRACKS.length === 0) return null;
  if (shuffleBag.length === 0) refillShuffleBag();
  const id = shuffleBag.shift();
  if (!id) return null;
  lastShuffledId = id;
  return getTrackById(id);
}

function handleTrackEnded() {
  if (currentSelectionId !== SHUFFLE_TRACK_ID || !workoutAudio) return;
  const track = nextShuffleTrack();
  if (!track) return;
  currentTrackId = track.id;
  workoutAudio.src = track.src;
  workoutAudio.play().catch(() => {});
}

// ─── Playback ───────────────────────────────────────────────────────────────

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
  workoutAudio?.removeEventListener("ended", handleTrackEnded);
  workoutAudio = null;
  currentTrackId = null;
  currentSelectionId = null;

  workoutSource?.disconnect();
  workoutSource = null;

  workoutGain?.disconnect();
  workoutGain = null;
}

function applyVolume(volume: number) {
  if (workoutGain) {
    workoutGain.gain.value = volume;
  } else if (workoutAudio) {
    workoutAudio.volume = volume;
  }
}

/**
 * Start (or resume) workout music for a selection — either a track id or
 * SHUFFLE_TRACK_ID. Re-calling with the selection already playing just syncs
 * the volume, so a shuffle run is never restarted mid-track.
 */
export function startWorkoutMusic(selectionId: string, volume: number) {
  cancelFade();

  // Already on this selection — sync volume and let the current track run.
  // Drawing from the bag here would silently burn a track on every re-call.
  if (workoutAudio && currentSelectionId === selectionId) {
    applyVolume(volume);
    workoutAudio.play().catch(() => {});
    return;
  }

  const isShuffle = selectionId === SHUFFLE_TRACK_ID;
  const track = isShuffle ? nextShuffleTrack() : getTrackById(selectionId);
  if (!track) return;

  disposeCurrentAudio();
  const audio = new Audio(track.src);
  // A shuffle run advances on `ended`; a single pick just loops forever.
  audio.loop = !isShuffle;
  if (isShuffle) audio.addEventListener("ended", handleTrackEnded);
  workoutAudio = audio;
  currentTrackId = track.id;
  currentSelectionId = selectionId;
  connectGain(audio, volume);

  applyVolume(volume);
  audio.play().catch(() => {});
}

export function setWorkoutMusicVolume(volume: number) {
  applyVolume(volume);
}

/** The track actually sounding right now (a real track id, never "shuffle"). */
export function getCurrentWorkoutMusicTrackId() {
  return currentTrackId;
}

/** What the user picked — a track id, or "shuffle". */
export function getCurrentMusicSelectionId() {
  return currentSelectionId;
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
