import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/auth.store'

export function SettingsPage() {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)
  const navigate = useNavigate()

  return (
    <div className="dash-page">
      <h1 className="dash-page__title">Settings</h1>

      <div className="settings-card">
        <h2>Account</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="settings-card__note">
          Authentication is mock/frontend-only. No backend account exists yet.
        </p>
        <button
          type="button"
          className="settings-card__button"
          onClick={() => {
            signOut()
            navigate('/login', { replace: true })
          }}
        >
          Log out
        </button>
      </div>

      <div className="settings-card">
        <h2>Playback</h2>
        <p className="settings-card__note">
          Demo tracks with audio URLs use public sample files. Tracks without a URL show an
          unavailable state until a licensed music API is connected.
        </p>
      </div>
    </div>
  )
}
