import { usePlayerStore } from '../../store/player.store'
import type { Song } from '../../types/music'

type AlbumCardProps = {
  song: Song
  queue?: Song[]
  size?: 'md' | 'lg'
}

export function AlbumCard({ song, queue, size = 'md' }: AlbumCardProps) {
  const playSong = usePlayerStore((state) => state.playSong)
  const currentSong = usePlayerStore((state) => state.currentSong)
  const active = currentSong?.id === song.id

  return (
    <button
      type="button"
      className={`album-card album-card--${size} ${active ? 'is-active' : ''}`}
      onClick={() => playSong(song, queue)}
    >
      <img className="album-card__art" src={song.artworkUrl} alt="" />
      <span className="album-card__title">{song.title}</span>
      <span className="album-card__artist">{song.artist}</span>
    </button>
  )
}
