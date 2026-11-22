import { SongRow } from '../components/dashboard/SongRow'
import { useLibraryStore } from '../store/library.store'

export function LibraryPage() {
  const savedSongs = useLibraryStore((state) => state.getSavedSongs())

  return (
    <div className="dash-page">
      <h1 className="dash-page__title">Library</h1>
      <p className="dash-page__subtitle">Songs you’ve saved on this device (mock).</p>

      <div className="dash-list-panel">
        {savedSongs.length ? (
          savedSongs.map((song) => <SongRow key={song.id} song={song} queue={savedSongs} />)
        ) : (
          <p className="dash-empty">
            Your library is empty. Use a song’s ⋮ menu to add tracks.
          </p>
        )}
      </div>
    </div>
  )
}
