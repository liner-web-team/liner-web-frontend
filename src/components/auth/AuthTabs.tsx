import type { AuthMode } from '../../types/auth'

type AuthTabsProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div className="auth-tabs" role="tablist" aria-label="Authentication">
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'signin'}
        className={`auth-tabs__tab ${mode === 'signin' ? 'is-active' : ''}`}
        onClick={() => onChange('signin')}
      >
        Sign in
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'signup'}
        className={`auth-tabs__tab ${mode === 'signup' ? 'is-active' : ''}`}
        onClick={() => onChange('signup')}
      >
        Create account
      </button>
    </div>
  )
}
