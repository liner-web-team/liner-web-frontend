import { ListeningNow } from '../components/dashboard/ListeningNow'
import { MostListened } from '../components/dashboard/MostListened'
import { RecentlyPlayed } from '../components/dashboard/RecentlyPlayed'

export function HomePage() {
  return (
    <div className="dash-page">
      <h1 className="dash-page__title">Home</h1>
      <ListeningNow />
      <RecentlyPlayed />
      <MostListened />
    </div>
  )
}
