import { getListeningNow } from '../../data/mockSongs'
import { useMockQuery } from '../../hooks/useMockQuery'
import Icon from '../ui/Icon'
import EmptyState from '../ui/EmptyState'
import ErrorState from '../ui/ErrorState'
import { RowSkeletons } from '../ui/Skeleton'
import SongRow from './SongRow'

export default function ListeningNow() {
  const q = useMockQuery(getListeningNow, 500)
  return (
    <section className="ln-section" aria-labelledby="h-now">
      <h2 id="h-now" className="ln-heading"><Icon name="flame" /> Listening right now</h2>
      {q.status === 'loading' && <RowSkeletons count={10} />}
      {q.status === 'error' && <ErrorState onRetry={q.retry} />}
      {q.status === 'success' && (q.data.length === 0
        ? <EmptyState icon="flame" title="Nobody’s listening yet" text="Songs you play will show up here." />
        : <div className="ln-panel ln-two-col">{q.data.map((s) => <SongRow key={s.id} song={s} queue={q.data} />)}</div>)}
    </section>
  )
}
