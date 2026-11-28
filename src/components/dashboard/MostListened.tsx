import { getMostListened } from '../../data/mockSongs'
import { useMockQuery } from '../../hooks/useMockQuery'
import Icon from '../ui/Icon'
import EmptyState from '../ui/EmptyState'
import ErrorState from '../ui/ErrorState'
import { CardSkeletons } from '../ui/Skeleton'
import AlbumCard from './AlbumCard'

export default function MostListened() {
  const q = useMockQuery(getMostListened, 900)
  return (
    <section className="ln-section" aria-labelledby="h-most">
      <h2 id="h-most" className="ln-heading"><Icon name="trophy" /> Most listened of all time</h2>
      {q.status === 'loading' && <CardSkeletons count={6} />}
      {q.status === 'error' && <ErrorState onRetry={q.retry} />}
      {q.status === 'success' && (q.data.length === 0
        ? <EmptyState icon="trophy" title="No listening history yet" text="Your top songs will build up over time." />
        : <div className="ln-scroller">{q.data.map((s) => <AlbumCard key={s.id} song={s} queue={q.data} />)}</div>)}
    </section>
  )
}
