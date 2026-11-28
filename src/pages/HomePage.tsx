import ListeningNow from '../components/dashboard/ListeningNow'
import RecentlyPlayed from '../components/dashboard/RecentlyPlayed'
import MostListened from '../components/dashboard/MostListened'

export default function HomePage() {
  return (
    <>
      <ListeningNow />
      <RecentlyPlayed />
      <MostListened />
    </>
  )
}
