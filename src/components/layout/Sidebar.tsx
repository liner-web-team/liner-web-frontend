import { NavLink, useNavigate } from 'react-router'
import { useAuthStore } from '../../store/auth.store'
import {
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  SearchIcon,
  SettingsIcon,
} from '../dashboard/Icons'

const links = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/search', label: 'Search', icon: SearchIcon },
  { to: '/library', label: 'Library', icon: LibraryIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
] as const

type SidebarProps = {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <div
        className={`dash-sidebar-backdrop ${mobileOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden={!mobileOpen}
      />
      <aside className={`dash-sidebar ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="dash-sidebar__brand">
          <span className="dash-sidebar__logo-mark" aria-hidden>
            L
          </span>
          <span className="dash-sidebar__logo-text">LINER</span>
        </div>

        <nav className="dash-sidebar__nav">
          {links.map(({ to, label, icon: Icon, ...rest }) => (
            <NavLink
              key={to}
              to={to}
              end={'end' in rest ? rest.end : false}
              className={({ isActive }) =>
                `dash-sidebar__link ${isActive ? 'is-active' : ''}`
              }
              title={label}
              onClick={onClose}
            >
              <Icon />
              <span className="dash-sidebar__tooltip">{label}</span>
              <span className="dash-sidebar__label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dash-sidebar__footer">
          <div className="dash-sidebar__user" title={user?.email ?? 'User'}>
            <span className="dash-sidebar__avatar" aria-hidden>
              {(user?.name?.[0] ?? 'U').toUpperCase()}
            </span>
            <span className="dash-sidebar__user-name">{user?.name ?? 'Listener'}</span>
          </div>
          <button
            type="button"
            className="dash-sidebar__link"
            title="Log out"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span className="dash-sidebar__tooltip">Log out</span>
            <span className="dash-sidebar__label">Log out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
