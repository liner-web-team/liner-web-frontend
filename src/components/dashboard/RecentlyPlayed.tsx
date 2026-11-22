import { getJumpBackIn } from '../../data/mockSongs'
import { AlbumCard } from './AlbumCard'
import { ClockIcon } from './Icons'
import { SectionHeading } from './SectionHeading'

export function RecentlyPlayed() {
  const songs = getJumpBackIn(8)

  return (
    <section className="dash-section">
      <SectionHeading icon={<ClockIcon />} title="Jump back in" />
      <div className="album-row">
        {songs.map((song) => (
          <AlbumCard key={song.id} song={song} queue={songs} size="lg" />
        ))}
      </div>
    </section>
  )
}
