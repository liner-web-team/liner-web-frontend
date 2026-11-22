import { useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../store/auth.store'
import { MusicPlayer } from '../player/MusicPlayer'
import { Sidebar } from './Sidebar'
import '../../styles/dashboard.css'

export function DashboardLayout() {
  const user = useAuthStore((state) => state.user)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="dash-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="dash-main">
        <header className="dash-topbar">
          <button
            type="button"
            className="dash-topbar__menu"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <p className="dash-topbar__greeting">Welcome back, {user.name}</p>
        </header>

        <div className="dash-content">
          <Outlet />
        </div>
      </div>

      <MusicPlayer />
    </div>
  )
}
