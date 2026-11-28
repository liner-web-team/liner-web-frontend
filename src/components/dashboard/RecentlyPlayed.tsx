import { getRecentlyPlayed } from '../../data/mockSongs'
import { useMockQuery } from '../../hooks/useMockQuery'
import Icon from '../ui/Icon'
import EmptyState from '../ui/EmptyState'
import ErrorState from '../ui/ErrorState'
import { CardSkeletons } from '../ui/Skeleton'
import AlbumCard from './AlbumCard'

export default function RecentlyPlayed() {
  const q = useMockQuery(getRecentlyPlayed, 700)
  return (
    <section className="ln-section" aria-labelledby="h-recent">
      <h2 id="h-recent" className="ln-heading"><Icon name="clock" /> Jump back in</h2>
      {q.status === 'loading' && <CardSkeletons count={5} />}
      {q.status === 'error' && <ErrorState onRetry={q.retry} />}
      {q.status === 'success' && (q.data.length === 0
        ? <EmptyState icon="clock" title="Nothing played recently" text="Play a song and it will appear here." />
        : <div className="ln-grid">{q.data.map((s) => <AlbumCard key={s.id} song={s} queue={q.data} size="lg" />)}</div>)}
    </section>
  )
}
