import { useEffect, useRef } from 'react'
import { formatTime } from '../../lib/music/formatTime'
import { usePlayerStore } from '../../store/player.store'
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from '../dashboard/Icons'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const seekLock = useRef(false)

  const currentSong = usePlayerStore((state) => state.currentSong)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const duration = usePlayerStore((state) => state.duration)
  const volume = usePlayerStore((state) => state.volume)
  const muted = usePlayerStore((state) => state.muted)
  const shuffle = usePlayerStore((state) => state.shuffle)
  const repeat = usePlayerStore((state) => state.repeat)
  const unavailableMessage = usePlayerStore((state) => state.unavailableMessage)

  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const next = usePlayerStore((state) => state.next)
  const previous = usePlayerStore((state) => state.previous)
  const seek = usePlayerStore((state) => state.seek)
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime)
  const setDuration = usePlayerStore((state) => state.setDuration)
  const setVolume = usePlayerStore((state) => state.setVolume)
  const toggleMute = usePlayerStore((state) => state.toggleMute)
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle)
  const cycleRepeat = usePlayerStore((state) => state.cycleRepeat)
  const setPlaying = usePlayerStore((state) => state.setPlaying)
  const markUnavailable = usePlayerStore((state) => state.markUnavailable)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      if (!seekLock.current) setCurrentTime(audio.currentTime)
    }
    const onMeta = () => setDuration(audio.duration || currentSong?.durationSec || 0)
    const onEnded = () => {
      if (usePlayerStore.getState().repeat === 'one') {
        audio.currentTime = 0
        void audio.play()
        return
      }
      next()
    }
    const onError = () => {
      markUnavailable('Unable to load this audio preview right now.')
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [currentSong, markUnavailable, next, setCurrentTime, setDuration])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    if (!currentSong.audioUrl) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      return
    }

    if (audio.src !== currentSong.audioUrl) {
      audio.src = currentSong.audioUrl
      audio.load()
    }
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong?.audioUrl) return

    if (isPlaying) {
      void audio.play().catch(() => {
        setPlaying(false)
        markUnavailable('Playback was blocked or failed to start.')
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSong, setPlaying, markUnavailable])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong?.audioUrl) return
    if (Math.abs(audio.currentTime - currentTime) > 0.35) {
      audio.currentTime = currentTime
    }
  }, [currentTime, currentSong])

  const progressMax = duration || currentSong?.durationSec || 0
  const canPlay = Boolean(currentSong?.audioUrl)

  return (
    <footer className="music-player" aria-label="Music player">
      <audio ref={audioRef} preload="metadata" />

      <div className="music-player__track">
        {currentSong ? (
          <>
            <img src={currentSong.artworkUrl} alt="" className="music-player__art" />
            <div className="music-player__meta">
              <p className="music-player__title">{currentSong.title}</p>
              <p className="music-player__artist">{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <p className="music-player__empty">Select a song to start listening</p>
        )}
      </div>

      <div className="music-player__center">
        <div className="music-player__controls">
          <button
            type="button"
            className={`music-player__btn ${shuffle ? 'is-on' : ''}`}
            aria-label="Shuffle"
            aria-pressed={shuffle}
            onClick={toggleShuffle}
          >
            <ShuffleIcon />
          </button>
          <button type="button" className="music-player__btn" aria-label="Previous" onClick={previous}>
            <PrevIcon />
          </button>
          <button
            type="button"
            className="music-player__play"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={togglePlay}
            disabled={!currentSong}
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <button type="button" className="music-player__btn" aria-label="Next" onClick={next}>
            <NextIcon />
          </button>
          <button
            type="button"
            className={`music-player__btn ${repeat !== 'off' ? 'is-on' : ''}`}
            aria-label={`Repeat ${repeat}`}
            onClick={cycleRepeat}
          >
            <RepeatIcon />
            {repeat === 'one' ? <span className="music-player__badge">1</span> : null}
          </button>
        </div>

        <div className="music-player__progress">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={progressMax || 0}
            step={0.1}
            value={Math.min(currentTime, progressMax || 0)}
            aria-label="Seek"
            disabled={!canPlay}
            onMouseDown={() => {
              seekLock.current = true
            }}
            onMouseUp={() => {
              seekLock.current = false
            }}
            onTouchStart={() => {
              seekLock.current = true
            }}
            onTouchEnd={() => {
              seekLock.current = false
            }}
            onChange={(event) => seek(Number(event.target.value))}
          />
          <span>{formatTime(progressMax)}</span>
        </div>

        {unavailableMessage ? (
          <p className="music-player__notice" role="status">
            {unavailableMessage}
          </p>
        ) : null}
      </div>

      <div className="music-player__volume">
        <button
          type="button"
          className="music-player__btn"
          aria-label={muted ? 'Unmute' : 'Mute'}
          onClick={toggleMute}
        >
          <VolumeIcon />
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          aria-label="Volume"
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </div>
    </footer>
  )
}
