import { Link } from 'react-router'
import { songs } from '../data/mockSongs'
import { usePlayer } from '../store/player.context'
import SongRow from '../components/dashboard/SongRow'
import EmptyState from '../components/ui/EmptyState'
import Icon from '../components/ui/Icon'

export default function LibraryPage() {
  const { library } = usePlayer()
  const saved = songs.filter((s) => library.includes(s.id))

  return (
    <section className="ln-section">
      <h2 className="ln-heading"><Icon name="library" /> Your library</h2>
      {saved.length === 0 ? (
        <EmptyState
          icon="library" title="Your library is empty"
          text="Open a song’s menu and choose “Add to library”."
          action={<Link to="/search" className="ln-btn ln-btn--dark">Find songs</Link>}
        />
      ) : (
        <div className="ln-panel ln-two-col">
          {saved.map((s) => <SongRow key={s.id} song={s} queue={saved} />)}
        </div>
      )}
    </section>
  )
}
