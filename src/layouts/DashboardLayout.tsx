
// Общий Layout авторизованной части Liner Web Frontend.

import { Outlet } from 'react-router'
import { PlayerProvider } from '../providers/player.context'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MusicPlayer from '../components/player/MusicPlayer'
import '../styles/dashboard.css'
import '../styles/dashboard-extra.css'

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
