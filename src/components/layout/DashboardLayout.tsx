import { Outlet } from 'react-router'
import { PlayerProvider } from '../../store/player.context'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MusicPlayer from '../player/MusicPlayer'
import '../../styles/dashboard.css'
import '../../styles/dashboard-extra.css'

export default function DashboardLayout() {
  return (
    <PlayerProvider>
      <div className="ln-app">
        <Sidebar />
        <main className="ln-main">
          <TopBar />
          <Outlet />
        </main>
        <MusicPlayer />
      </div>
    </PlayerProvider>
  )
}
