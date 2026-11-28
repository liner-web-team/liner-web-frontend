import { useMemo, useState } from 'react'
import { searchSongs } from '../data/mockSongs'
import SongRow from '../components/dashboard/SongRow'
import EmptyState from '../components/ui/EmptyState'
import Icon from '../components/ui/Icon'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchSongs(query), [query])

  return (
    <section className="ln-section">
      <h2 className="ln-heading"><Icon name="search" /> Search</h2>
      <input
        className="ln-search" type="search" placeholder="Search by title or artist"
        value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search songs"
      />
      {results.length === 0 ? (
        <EmptyState
          icon="search" title={`No songs match “${query}”`}
          text="Try a different title or artist."
          action={<button type="button" className="ln-btn" onClick={() => setQuery('')}>Clear search</button>}
        />
      ) : (
        <div className="ln-panel ln-two-col">
          {results.map((s) => <SongRow key={s.id} song={s} queue={results} />)}
        </div>
      )}
    </section>
  )
}
