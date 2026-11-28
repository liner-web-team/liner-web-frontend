import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useCurrentUser, useSignOut } from '../../hooks/useAuth'

const titles: Record<string, string> = {
  '/': 'Home',
  '/search': 'Search',
  '/library': 'Library',
  '/settings': 'Settings',
  '/profile': 'Profile',
}

export default function TopBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = useCurrentUser()
  const signOut = useSignOut()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initial = (user?.name ?? user?.email ?? '?').trim().charAt(0).toUpperCase()

  useEffect(() => {
    if (!open) return
    const onMouse = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onMouse)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouse)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (to: string) => { setOpen(false); navigate(to) }

  return (
    <header className="ln-topbar">
      <h1 className="ln-topbar__title">{titles[pathname] ?? 'Liner'}</h1>
      <div className="ln-menu" ref={ref}>
        <button
          type="button" className="ln-avatar" aria-label="Account menu"
          aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        >
          {initial}
        </button>
        {open && (
          <div className="ln-menu__panel" role="menu">
            <button type="button" role="menuitem" onClick={() => go('/profile')}>Profile</button>
            <button type="button" role="menuitem" onClick={() => go('/settings')}>Settings</button>
            <button type="button" role="menuitem" onClick={() => { setOpen(false); signOut() }}>Sign out</button>
          </div>
        )}
      </div>
    </header>
  )
}
