import type { Song } from '../../data/mockSongs'
import { formatTime } from '../../lib/format'
import { usePlayer } from '../../store/player.context'
import SongMenu from './SongMenu'

type Props = { song: Song; queue: Song[] }

export default function SongRow({ song, queue }: Props) {
  const { play, currentSong } = usePlayer()
  const active = currentSong?.id === song.id
  const start = () => play(song, queue)

  return (
    <div
      className={`ln-row${active ? ' is-active' : ''}`}
      role="button" tabIndex={0}
      onClick={start}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start() } }}
    >
      <img className="ln-row__art" src={song.artworkUrl} alt="" />
      <div className="ln-row__text">
        <span className="ln-row__title">{song.title}</span>
        <span className="ln-row__artist">{song.artist}</span>
      </div>
      <span className="ln-row__time">{formatTime(song.durationSec)}</span>
      <SongMenu song={song} />
    </div>
  )
}
