import type { Song } from '../types/music'

/** Generate a simple geometric placeholder cover (no copyrighted art). */
function cover(label: string, from: string, to: string): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)"/>
  <circle cx="300" cy="90" r="70" fill="rgba(255,255,255,0.12)"/>
  <circle cx="80" cy="320" r="110" fill="rgba(0,0,0,0.12)"/>
  <text x="32" y="360" fill="rgba(255,255,255,0.92)" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">${label}</text>
</svg>`.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * Demo catalog for the frontend only.
 * Replace this module with licensed music API responses later.
 *
 * A few tracks use public SoundHelix demo MP3s so HTMLAudioElement can be tested.
 * Tracks without `audioUrl` show an unavailable playback state.
 */
export const mockSongs: Song[] = [
  {
    id: 's1',
    title: 'Midnight Transit',
    artist: 'Nova Line',
    album: 'City Glass',
    artworkUrl: cover('MT', '#5b4bff', '#ff5c8a'),
    durationSec: 214,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    playCount: 1842,
    lastPlayedAt: '2026-11-22T10:12:00.000Z',
    isRecent: true,
  },
  {
    id: 's2',
    title: 'Soft Static',
    artist: 'Elm & Ivory',
    album: 'Quiet Rooms',
    artworkUrl: cover('SS', '#1f2937', '#60a5fa'),
    durationSec: 198,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    playCount: 2204,
    lastPlayedAt: '2026-11-22T09:40:00.000Z',
    isRecent: true,
  },
  {
    id: 's3',
    title: 'Paper Planes',
    artist: 'Coastal Archive',
    album: 'Weekend Tape',
    artworkUrl: cover('PP', '#f59e0b', '#ef4444'),
    durationSec: 176,
    playCount: 965,
    lastPlayedAt: '2026-11-21T21:05:00.000Z',
    isRecent: true,
  },
  {
    id: 's4',
    title: 'Low Battery',
    artist: 'Signal Bloom',
    album: 'Charge',
    artworkUrl: cover('LB', '#10b981', '#064e3b'),
    durationSec: 241,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    playCount: 3011,
    lastPlayedAt: '2026-11-21T19:22:00.000Z',
    isRecent: true,
  },
  {
    id: 's5',
    title: 'Gold Hour Drive',
    artist: 'Maris Vale',
    album: 'Horizons',
    artworkUrl: cover('GH', '#fb923c', '#7c2d12'),
    durationSec: 205,
    playCount: 1540,
    lastPlayedAt: '2026-11-21T18:01:00.000Z',
    isRecent: true,
  },
  {
    id: 's6',
    title: 'Echo Lobby',
    artist: 'Glass Parade',
    album: 'Lobby EP',
    artworkUrl: cover('EL', '#6366f1', '#0ea5e9'),
    durationSec: 189,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    playCount: 2788,
    lastPlayedAt: '2026-11-20T22:14:00.000Z',
    isRecent: true,
  },
  {
    id: 's7',
    title: 'Velvet Circuit',
    artist: 'Kite Theory',
    album: 'Analog Hearts',
    artworkUrl: cover('VC', '#db2777', '#4c1d95'),
    durationSec: 233,
    playCount: 1198,
    lastPlayedAt: '2026-11-20T16:45:00.000Z',
    isRecent: true,
  },
  {
    id: 's8',
    title: 'Rain Check',
    artist: 'North Window',
    album: 'Weather Notes',
    artworkUrl: cover('RC', '#0f766e', '#99f6e4'),
    durationSec: 167,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    playCount: 4102,
    lastPlayedAt: '2026-11-19T12:30:00.000Z',
    isRecent: true,
  },
  {
    id: 's9',
    title: 'Blue Print',
    artist: 'Atlas Mono',
    album: 'Drafts',
    artworkUrl: cover('BP', '#1d4ed8', '#93c5fd'),
    durationSec: 221,
    playCount: 890,
    lastPlayedAt: '2026-11-18T08:20:00.000Z',
    isRecent: false,
  },
  {
    id: 's10',
    title: 'After Hours',
    artist: 'Lumen Field',
    album: 'Night Shift',
    artworkUrl: cover('AH', '#111827', '#f472b6'),
    durationSec: 256,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    playCount: 5021,
    lastPlayedAt: '2026-11-17T23:10:00.000Z',
    isRecent: true,
  },
  {
    id: 's11',
    title: 'Cedar & Smoke',
    artist: 'Pine Letter',
    album: 'Cabin Songs',
    artworkUrl: cover('CS', '#78350f', '#fbbf24'),
    durationSec: 192,
    playCount: 1344,
    isRecent: false,
  },
  {
    id: 's12',
    title: 'Orbit Glow',
    artist: 'Satellite Kids',
    album: 'Orbit',
    artworkUrl: cover('OG', '#4c1d95', '#c4b5fd'),
    durationSec: 208,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    playCount: 3670,
    lastPlayedAt: '2026-11-16T14:00:00.000Z',
    isRecent: true,
  },
  {
    id: 's13',
    title: 'Faded Polaroid',
    artist: 'Room 404',
    album: 'Undeveloped',
    artworkUrl: cover('FP', '#9ca3af', '#374151'),
    durationSec: 183,
    playCount: 744,
    isRecent: false,
  },
  {
    id: 's14',
    title: 'Silver Thread',
    artist: 'Linen Choir',
    album: 'Weave',
    artworkUrl: cover('ST', '#e5e7eb', '#6b7280'),
    durationSec: 247,
    playCount: 6120,
    lastPlayedAt: '2026-11-15T11:11:00.000Z',
    isRecent: false,
  },
  {
    id: 's15',
    title: 'Harbor Lights',
    artist: 'Dockside Duo',
    album: 'Pier 7',
    artworkUrl: cover('HL', '#0369a1', '#bae6fd'),
    durationSec: 201,
    playCount: 2901,
    isRecent: false,
  },
  {
    id: 's16',
    title: 'Empty Platform',
    artist: 'Metro Sketch',
    album: 'Departures',
    artworkUrl: cover('EP', '#7f1d1d', '#fecaca'),
    durationSec: 174,
    playCount: 1588,
    isRecent: false,
  },
]

export function getSongById(id: string): Song | undefined {
  return mockSongs.find((song) => song.id === id)
}

export function getListeningNow(limit = 10): Song[] {
  return [...mockSongs]
    .sort((a, b) => {
      const aTime = a.lastPlayedAt ? Date.parse(a.lastPlayedAt) : 0
      const bTime = b.lastPlayedAt ? Date.parse(b.lastPlayedAt) : 0
      return bTime - aTime
    })
    .slice(0, limit)
}

export function getJumpBackIn(limit = 8): Song[] {
  return mockSongs.filter((song) => song.isRecent).slice(0, limit)
}

export function getMostListened(limit = 10): Song[] {
  return [...mockSongs].sort((a, b) => b.playCount - a.playCount).slice(0, limit)
}

export function searchSongs(query: string): Song[] {
  const q = query.trim().toLowerCase()
  if (!q) return mockSongs
  return mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.album.toLowerCase().includes(q),
  )
}
