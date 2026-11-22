import { getMostListened } from '../../data/mockSongs'
import { AlbumCard } from './AlbumCard'
import { TrophyIcon } from './Icons'
import { SectionHeading } from './SectionHeading'

export function MostListened() {
  const songs = getMostListened(10)

  return (
    <section className="dash-section">
      <SectionHeading icon={<TrophyIcon />} title="Most listened of all time" />
      <div className="album-row album-row--scroll">
        {songs.map((song) => (
          <AlbumCard key={song.id} song={song} queue={songs} size="md" />
        ))}
      </div>
    </section>
  )
}
