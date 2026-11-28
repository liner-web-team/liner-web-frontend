import { NavLink } from 'react-router'
import Icon, { type IconName } from '../ui/Icon'

const items: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/search', label: 'Search', icon: 'search' },
  { to: '/library', label: 'Library', icon: 'library' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

export default function Sidebar() {
  return (
    <nav className="ln-sidebar" aria-label="Main">
      <div className="ln-sidebar__logo" aria-label="Liner">L</div>
      <ul className="ln-sidebar__list">
        {items.map((it) => (
          <li key={it.to}>
            <NavLink
              to={it.to}
              end={it.end}
              className={({ isActive }) => `ln-nav${isActive ? ' is-active' : ''}`}
              data-tooltip={it.label}
              aria-label={it.label}
            >
              <Icon name={it.icon} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
