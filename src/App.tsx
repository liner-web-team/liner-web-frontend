import { Link } from 'react-router'
import { useAuthStore } from './store/auth.store'

export default function App() {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)

  return (
    <main className="min-h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Liner</h1>
      <p className="max-w-md text-text-secondary">
         streaming dashboard will come soon here(mock only).
      </p>

      {user ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-text-primary">
            Signed in locally as <strong>{user.name}</strong> ({user.email})
          </p>
          <button
            type="button"
            onClick={signOut}
            className="rounded-lg bg-btn-primary-bg px-4 py-2 text-sm font-medium text-btn-primary-text"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-btn-primary-bg px-4 py-2 text-sm font-medium text-btn-primary-text"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-lg border border-border-secondary px-4 py-2 text-sm font-medium text-text-primary"
          >
            Create account
          </Link>
        </div>
      )}
    </main>
  )
}
