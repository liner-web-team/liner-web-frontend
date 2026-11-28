import { useCurrentUser, useSignOut } from '../hooks/useAuth'
import { usePlayer } from '../providers/player.context'
import EmptyState from '../components/ui/EmptyState'

export default function ProfilePage() {
  const user = useCurrentUser()
  const signOut = useSignOut()
  const { library } = usePlayer()

  if (!user) return <EmptyState title="You’re signed out" text="Sign in to see your profile." />

  const initial = (user.name ?? user.email).trim().charAt(0).toUpperCase()

  return (
    <section className="ln-section">
      <div className="ln-panel ln-profile">
        <span className="ln-avatar ln-avatar--lg" aria-hidden="true">{initial}</span>
        <div className="ln-profile__text">
          <h2 className="ln-profile__name">{user.name}</h2>
          <p className="ln-profile__mail">{user.email}</p>
          <p className="ln-profile__meta">{library.length} saved {library.length === 1 ? 'song' : 'songs'}</p>
        </div>
        <button type="button" className="ln-btn ln-btn--dark" onClick={signOut}>Sign out</button>
      </div>
      <p className="ln-note">Local mock account. No backend is connected yet.</p>
    </section>
  )
}
