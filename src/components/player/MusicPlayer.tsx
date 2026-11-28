import { formatTime } from '../../utils/formatTime'
import { usePlayer } from '../../providers/player.context'
import Icon from '../ui/Icon'

export default function MusicPlayer() {
  const p = usePlayer()
  const song = p.currentSong
  const canPlay = Boolean(song?.audioUrl) && !p.unavailable

  return (
    <aside className="ln-player" aria-label="Music player">
      <div className="ln-player__info">
        {song ? (
          <>
            <img className="ln-player__art" src={song.artworkUrl} alt="" />
            <div className="ln-player__text">
              <span className="ln-player__title">{song.title}</span>
              <span className="ln-player__artist">{song.artist}</span>
            </div>
          </>
        ) : (
          <span className="ln-player__empty">Pick a song to start</span>
        )}
      </div>

      <div className="ln-player__center">
        <div className="ln-player__controls">
          <button type="button" className={`ln-icon-btn${p.shuffle ? ' is-on' : ''}`} aria-label="Shuffle" aria-pressed={p.shuffle} onClick={p.toggleShuffle}>
            <Icon name="shuffle" />
          </button>
          <button type="button" className="ln-icon-btn" aria-label="Previous track" onClick={p.prev} disabled={!song}>
            <Icon name="prev" />
          </button>
          <button type="button" className="ln-play" aria-label={p.isPlaying ? 'Pause' : 'Play'} onClick={p.toggle} disabled={!canPlay}>
            <Icon name={p.isPlaying ? 'pause' : 'play'} size={18} />
          </button>
          <button type="button" className="ln-icon-btn" aria-label="Next track" onClick={p.next} disabled={!song}>
            <Icon name="next" />
          </button>
          <button
            type="button" className={`ln-icon-btn${p.repeat !== 'off' ? ' is-on' : ''}`}
            aria-label={`Repeat: ${p.repeat}`} onClick={p.cycleRepeat}
          >
            <Icon name="repeat" />
            {p.repeat === 'one' && <span className="ln-badge">1</span>}
          </button>
        </div>
        <div className="ln-player__bar">
          <span className="ln-player__time">{formatTime(p.progress)}</span>
          <input
            type="range" className="ln-range" aria-label="Seek"
            min={0} max={p.duration || 1} step={1} value={Math.min(p.progress, p.duration || 1)}
            disabled={!canPlay} onChange={(e) => p.seek(Number(e.target.value))}
            style={{ ['--fill' as string]: `${p.duration ? (p.progress / p.duration) * 100 : 0}%` }}
          />
          <span className="ln-player__time">{formatTime(p.duration)}</span>
        </div>
        {song && !canPlay && (
          <span className="ln-player__note" role="status">Preview unavailable for this track</span>
        )}
      </div>

      <div className="ln-player__volume">
        <Icon name="volume" />
        <input
          type="range" className="ln-range" aria-label="Volume"
          min={0} max={1} step={0.01} value={p.volume}
          onChange={(e) => p.setVolume(Number(e.target.value))}
          style={{ ['--fill' as string]: `${p.volume * 100}%` }}
        />
      </div>
    </aside>
  )
}
