export const MUSIC_TRACKS = [
  {
    id: "track-1",
    name: "Stardust",
    src: "/audio/stardust.mp3",
  },
  { id: "track-2", name: "Nebula", src: "/audio/nebula.mp3" },
  { id: "track-3", name: "Eclipse", src: "/audio/dreams.mp3" },
  { id: "track-4", name: "Magnetic", src: "/audio/Magnetic.mp3" },
  { id: "track-5", name: "Skyline", src: "/audio/Skyline.mp3" },
  { id: "track-6", name: "Universe", src: "/audio/Universe.mp3" },
];

// Sentinel selection: play every track in a random order rather than one on
// loop. Stored in settings.musicTrack alongside real track ids.
export const SHUFFLE_TRACK_ID = "shuffle";

export function isShuffleSelection(selectionId: string): boolean {
  return selectionId === SHUFFLE_TRACK_ID;
}

export function getTrackById(trackId: string) {
  return MUSIC_TRACKS.find((t) => t.id === trackId) ?? null;
}
