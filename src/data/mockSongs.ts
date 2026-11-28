import { makeArtwork } from '../lib/artwork'

export type Song = {
  id: string
  title: string
  artist: string
  album: string
  artworkUrl: string
  durationSec: number
  /** Optional licensed/demo stream URL. Empty = playback unavailable. */
  audioUrl?: string
  /** ISO date; present = shows up in "Jump back in". */
  lastPlayedAt?: string
  /** Listening statistics for "Most listened of all time". */
  playCount: number
}

const raw: Omit<Song, 'artworkUrl'>[] = [
  { id: 's1', title: 'Paper Lanterns', artist: 'Mira Vale', album: 'Soft Static', durationSec: 214, playCount: 412, lastPlayedAt: '2026-11-22T17:10:00Z' },
  { id: 's2', title: 'Low Tide Radio', artist: 'The Harbor Kids', album: 'Salt & Signal', durationSec: 187, playCount: 388, lastPlayedAt: '2026-11-22T12:00:00Z' },
  { id: 's3', title: 'Neon Cartography', artist: 'Oskar Lind', album: 'Night Maps', durationSec: 241, playCount: 301, lastPlayedAt: '2026-11-21T20:00:00Z' },
  { id: 's4', title: 'Velvet Hours', artist: 'Sana Ito', album: 'Velvet Hours', durationSec: 198, playCount: 276, lastPlayedAt: '2026-11-21T09:00:00Z' },
  { id: 's5', title: 'Glass Orchard', artist: 'Mira Vale', album: 'Soft Static', durationSec: 226, playCount: 255, lastPlayedAt: '2026-11-20T18:00:00Z' },
  { id: 's6', title: 'Bright Machinery', artist: 'Kellan Ray', album: 'Workshop', durationSec: 173, playCount: 240, lastPlayedAt: '2026-11-19T18:00:00Z' },
  { id: 's7', title: 'Slow Orbit', artist: 'Oskar Lind', album: 'Night Maps', durationSec: 262, playCount: 512 },
  { id: 's8', title: 'Marigold', artist: 'Dana Okafor', album: 'Field Notes', durationSec: 205, playCount: 498 },
  { id: 's9', title: 'Quiet Engines', artist: 'The Harbor Kids', album: 'Salt & Signal', durationSec: 192, playCount: 455 },
  { id: 's10', title: 'Afterglow Drive', artist: 'Sana Ito', album: 'Velvet Hours', durationSec: 233, playCount: 431 },
  { id: 's11', title: 'Cobalt Rain', artist: 'Kellan Ray', album: 'Workshop', durationSec: 219, playCount: 399 },
  { id: 's12', title: 'Small Hours', artist: 'Dana Okafor', album: 'Field Notes', durationSec: 181, playCount: 366 },
]

/**
 * Replace this with a licensed music API !!!!!!!
 */
export const songs: Song[] = raw.map((s, i) => ({
  ...s,
  artworkUrl: makeArtwork((i * 37 + 200) % 360, i),
}))

export const getListeningNow = (): Song[] => songs.slice(0, 10)

export const getRecentlyPlayed = (): Song[] =>
  songs
    .filter((s) => s.lastPlayedAt)
    .sort((a, b) => (b.lastPlayedAt ?? '').localeCompare(a.lastPlayedAt ?? ''))

export const getMostListened = (): Song[] =>
  [...songs].sort((a, b) => b.playCount - a.playCount).slice(0, 10)

export const searchSongs = (query: string): Song[] => {
  const q = query.trim().toLowerCase()
  if (!q) return songs
  return songs.filter(
    (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q),
  )
}
