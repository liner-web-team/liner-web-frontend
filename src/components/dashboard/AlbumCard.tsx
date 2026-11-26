import type { Song } from '../../data/mockSongs'
import { usePlayer } from '../../store/player.context'

type Props = { song: Song; queue: Song[]; size?: 'md' | 'lg' }

export default function AlbumCard({ song, queue, size = 'md' }: Props) {
  const { play, currentSong } = usePlayer()
  return (
    <button
      type="button"
      className={`ln-card ln-card--${size}${currentSong?.id === song.id ? ' is-active' : ''}`}
      onClick={() => play(song, queue)}
    >
      <img className="ln-card__art" src={song.artworkUrl} alt={`${song.title} cover`} />
      <span className="ln-card__title">{song.title}</span>
      <span className="ln-card__artist">{song.artist}</span>
    </button>
  )
}
