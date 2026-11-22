import { create } from 'zustand'
import { getListeningNow } from '../data/mockSongs'
import type { RepeatMode, Song } from '../types/music'

type PlayerState = {
  queue: Song[]
  currentIndex: number
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  shuffle: boolean
  repeat: RepeatMode
  unavailableMessage: string | null
  setQueue: (songs: Song[], startIndex?: number, autoplay?: boolean) => void
  playSong: (song: Song, queue?: Song[]) => void
  togglePlay: () => void
  setPlaying: (playing: boolean) => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  toggleShuffle: () => void
  cycleRepeat: () => void
  clearUnavailable: () => void
  markUnavailable: (message: string) => void
}

function withPlaybackAvailability(song: Song | null): Partial<PlayerState> {
  if (!song) {
    return {
      currentSong: null,
      isPlaying: false,
      unavailableMessage: null,
    }
  }

  if (!song.audioUrl) {
    return {
      currentSong: song,
      isPlaying: false,
      currentTime: 0,
      duration: song.durationSec,
      unavailableMessage:
        'Preview unavailable — no licensed audio URL for this track yet.',
    }
  }

  return {
    currentSong: song,
    unavailableMessage: null,
    duration: song.durationSec,
  }
}

const defaultQueue = getListeningNow(10)

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: defaultQueue,
  currentIndex: 0,
  currentSong: defaultQueue[0] ?? null,
  isPlaying: false,
  currentTime: 0,
  duration: defaultQueue[0]?.durationSec ?? 0,
  volume: 0.8,
  muted: false,
  shuffle: false,
  repeat: 'off',
  unavailableMessage: defaultQueue[0]?.audioUrl
    ? null
    : 'Preview unavailable — no licensed audio URL for this track yet.',

  setQueue: (songs, startIndex = 0, autoplay = false) => {
    if (!songs.length) return
    const index = Math.min(Math.max(startIndex, 0), songs.length - 1)
    const song = songs[index]
    set({
      queue: songs,
      currentIndex: index,
      currentTime: 0,
      isPlaying: Boolean(autoplay && song.audioUrl),
      ...withPlaybackAvailability(song),
    })
  },

  playSong: (song, queue) => {
    const nextQueue = queue ?? get().queue
    const existingIndex = nextQueue.findIndex((item) => item.id === song.id)
    const queueToUse =
      existingIndex >= 0 ? nextQueue : [...nextQueue.filter((s) => s.id !== song.id), song]
    const index = existingIndex >= 0 ? existingIndex : queueToUse.length - 1

    set({
      queue: queueToUse,
      currentIndex: index,
      currentTime: 0,
      isPlaying: Boolean(song.audioUrl),
      ...withPlaybackAvailability(song),
    })
  },

  togglePlay: () => {
    const { currentSong, isPlaying } = get()
    if (!currentSong) return
    if (!currentSong.audioUrl) {
      set({
        isPlaying: false,
        unavailableMessage:
          'Preview unavailable — no licensed audio URL for this track yet.',
      })
      return
    }
    set({ isPlaying: !isPlaying, unavailableMessage: null })
  },

  setPlaying: (playing) => set({ isPlaying: playing }),

  next: () => {
    const { queue, currentIndex, shuffle, repeat } = get()
    if (!queue.length) return

    let nextIndex = currentIndex + 1
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else if (nextIndex >= queue.length) {
      if (repeat === 'all') nextIndex = 0
      else {
        set({ isPlaying: false })
        return
      }
    }

    const song = queue[nextIndex]
    set({
      currentIndex: nextIndex,
      currentTime: 0,
      isPlaying: Boolean(song.audioUrl),
      ...withPlaybackAvailability(song),
    })
  },

  previous: () => {
    const { queue, currentIndex, currentTime } = get()
    if (!queue.length) return

    if (currentTime > 3) {
      set({ currentTime: 0 })
      return
    }

    const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1
    const song = queue[prevIndex]
    set({
      currentIndex: prevIndex,
      currentTime: 0,
      isPlaying: Boolean(song.audioUrl),
      ...withPlaybackAvailability(song),
    })
  },

  seek: (time) => set({ currentTime: Math.max(0, time) }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)), muted: volume === 0 }),
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  cycleRepeat: () =>
    set((state) => ({
      repeat:
        state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off',
    })),
  clearUnavailable: () => set({ unavailableMessage: null }),
  markUnavailable: (message) => set({ unavailableMessage: message, isPlaying: false }),
}))
