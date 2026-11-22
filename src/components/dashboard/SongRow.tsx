import { formatTime } from '../../lib/music/formatTime'
import { usePlayerStore } from '../../store/player.store'
import type { Song } from '../../types/music'
import { SongMenu } from './SongMenu'

type SongRowProps = {
  song: Song
  queue?: Song[]
}

export function SongRow({ song, queue }: SongRowProps) {
  const currentSong = usePlayerStore((state) => state.currentSong)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const playSong = usePlayerStore((state) => state.playSong)
  const active = currentSong?.id === song.id

  return (
    <button
      type="button"
      className={`song-row ${active ? 'is-active' : ''} ${active && isPlaying ? 'is-playing' : ''}`}
      onClick={() => playSong(song, queue)}
    >
      <img className="song-row__art" src={song.artworkUrl} alt="" />
      <span className="song-row__meta">
        <span className="song-row__title">{song.title}</span>
        <span className="song-row__artist">{song.artist}</span>
      </span>
      <span className="song-row__duration">{formatTime(song.durationSec)}</span>
      <span
        className="song-row__menu"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <SongMenu song={song} />
      </span>
    </button>
  )
}
