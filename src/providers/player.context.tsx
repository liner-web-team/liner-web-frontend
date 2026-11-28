import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from 'react'

import { songs as catalog } from '../data/mockSongs'
import type { Song, RepeatMode } from '../types/music'


type PlayerState = {
  currentSong: Song | null
  isPlaying: boolean
  unavailable: boolean
  progress: number
  duration: number
  volume: number
  shuffle: boolean
  repeat: RepeatMode
  library: string[]
  play: (song: Song, queue?: Song[]) => void
  toggle: () => void
  next: () => void
  prev: () => void
  seek: (seconds: number) => void
  setVolume: (v: number) => void
  toggleShuffle: () => void
  cycleRepeat: () => void
  toggleLibrary: (id: string) => void
  isSaved: (id: string) => boolean
  clearLibrary: () => void
}

const PlayerContext = createContext<PlayerState | null>(null)
const LIB_KEY = 'liner.library'

function loadLibrary(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(LIB_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [queue, setQueue] = useState<Song[]>(catalog)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<RepeatMode>('off')
  const [library, setLibrary] = useState<string[]>(loadLibrary)

  useEffect(() => {
    try { localStorage.setItem(LIB_KEY, JSON.stringify(library)) } catch { /* ignore */ }
  }, [library])

  const load = useCallback((song: Song) => {
    const audio = audioRef.current
    setCurrentSong(song)
    setProgress(0)
    setDuration(song.durationSec)
    if (!audio) return
    if (!song.audioUrl) {
      audio.pause()
      audio.removeAttribute('src')
      setUnavailable(true)
      setIsPlaying(false)
      return
    }
    setUnavailable(false)
    audio.src = song.audioUrl
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      setUnavailable(true)
      setIsPlaying(false)
    })
  }, [])

  const play = useCallback((song: Song, newQueue?: Song[]) => {
    if (newQueue) setQueue(newQueue)
    load(song)
  }, [load])

  const step = useCallback((dir: 1 | -1, auto = false) => {
    if (!currentSong || queue.length === 0) return
    const idx = queue.findIndex((s) => s.id === currentSong.id)
    let nextIdx: number
    if (shuffle && queue.length > 1) {
      do { nextIdx = Math.floor(Math.random() * queue.length) } while (nextIdx === idx)
    } else {
      nextIdx = idx + dir
      if (nextIdx >= queue.length) {
        if (auto && repeat === 'off') { setIsPlaying(false); return }
        nextIdx = 0
      }
      if (nextIdx < 0) nextIdx = queue.length - 1
    }
    load(queue[nextIdx])
  }, [currentSong, queue, shuffle, repeat, load])

  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) { audio.currentTime = 0; return }
    step(-1)
  }, [step])


  // Сохраняет актуальный обработчик завершения композиции.
  const endedRef = useRef<() => void>(() => { })

  useEffect(() => {
    endedRef.current = () => {
      const audio = audioRef.current

      if (repeat === 'one' && audio) {
        audio.currentTime = 0
        void audio.play()
        return
      }

      step(1, true)
    }
  }, [repeat, step])


  useEffect(() => {
    if (typeof Audio === 'undefined') return
    const audio = new Audio()
    audioRef.current = audio
    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () => { if (Number.isFinite(audio.duration)) setDuration(audio.duration) }
    const onEnded = () => endedRef.current()
    const onError = () => { setUnavailable(true); setIsPlaying(false) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume }, [volume])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentSong || !currentSong.audioUrl || unavailable) return
    if (audio.paused) audio.play().then(() => setIsPlaying(true)).catch(() => setUnavailable(true))
    else { audio.pause(); setIsPlaying(false) }
  }, [currentSong, unavailable])

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio || !currentSong?.audioUrl) return
    audio.currentTime = seconds
    setProgress(seconds)
  }, [currentSong])

  const value = useMemo<PlayerState>(() => ({
    currentSong, isPlaying, unavailable, progress, duration, volume, shuffle, repeat, library,
    play, toggle, next, prev, seek,
    setVolume: (v) => setVolumeState(Math.min(1, Math.max(0, v))),
    toggleShuffle: () => setShuffle((s) => !s),
    cycleRepeat: () => setRepeat((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off')),
    toggleLibrary: (id) => setLibrary((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])),
    isSaved: (id) => library.includes(id),
    clearLibrary: () => setLibrary([]),
  }), [currentSong, isPlaying, unavailable, progress, duration, volume, shuffle, repeat, library, play, toggle, next, prev, seek])

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>')
  return ctx
}
