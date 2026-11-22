import { useMemo, useState } from 'react'
import { SongRow } from '../components/dashboard/SongRow'
import { searchSongs } from '../data/mockSongs'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchSongs(query), [query])

  return (
    <div className="dash-page">
      <h1 className="dash-page__title">Search</h1>
      <label className="dash-search">
        <span className="sr-only">Search songs</span>
        <input
          type="search"
          placeholder="Search by title or artist"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="dash-list-panel">
        {results.length ? (
          results.map((song) => <SongRow key={song.id} song={song} queue={results} />)
        ) : (
          <p className="dash-empty">No songs matched “{query}”.</p>
        )}
      </div>
    </div>
  )
}
