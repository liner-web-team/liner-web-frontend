import { getListeningNow } from '../../data/mockSongs'
import { FlameIcon } from './Icons'
import { SectionHeading } from './SectionHeading'
import { SongRow } from './SongRow'

export function ListeningNow() {
  const songs = getListeningNow(10)
  const left = songs.slice(0, 5)
  const right = songs.slice(5, 10)

  return (
    <section className="dash-section">
      <SectionHeading icon={<FlameIcon />} title="Listening right now" />
      <div className="listening-panel">
        <div className="listening-panel__col">
          {left.map((song) => (
            <SongRow key={song.id} song={song} queue={songs} />
          ))}
        </div>
        <div className="listening-panel__col">
          {right.map((song) => (
            <SongRow key={song.id} song={song} queue={songs} />
          ))}
        </div>
      </div>
    </section>
  )
}
