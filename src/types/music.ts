export type Song = {
  id: string
  title: string
  artist: string
  album: string
  artworkUrl: string
  durationSec: number
  /** Optional demo/licensed stream URL. Empty means playback unavailable. */
  audioUrl?: string
  playCount: number
  lastPlayedAt?: string
  isRecent?: boolean
}

export type RepeatMode = 'off' | 'all' | 'one'
