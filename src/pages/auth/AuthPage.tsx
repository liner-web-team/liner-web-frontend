
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { AuthLeftPanel } from '../../components/auth/AuthLeftPanel'
import { AuthTabs } from '../../components/auth/AuthTabs'
import { SignInForm } from '../../components/auth/SignInForm'
import { SignUpForm } from '../../components/auth/SignUpForm'
import { useAuthStore } from '../../store/auth.store'
import type { AuthMode } from '../../types/auth'
import '../../styles/auth.css'


function modeFromPath(pathname: string): AuthMode {
  return pathname.includes('register') ? 'signup' : 'signin'
}

export function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const clearFeedback = useAuthStore((state) => state.clearFeedback)
  const mode = modeFromPath(location.pathname)

  useEffect(() => {
    clearFeedback()
  }, [mode, clearFeedback])

  function handleModeChange(next: AuthMode) {
    if (next === mode) return
    clearFeedback()
    navigate(next === 'signup' ? '/register' : '/login', { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-page__glow auth-page__glow--one" aria-hidden="true" />
      <div className="auth-page__glow auth-page__glow--two" aria-hidden="true" />
      <div className="auth-page__geo" aria-hidden="true" />

      <div className="auth-card">
        <AuthLeftPanel />

        <section className="auth-right">
          <div className="auth-right__inner">
            <h2 className="auth-right__heading">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </h2>
            <p className="auth-right__switch">
              {mode === 'signin' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    className="auth-link auth-link--inline"
                    onClick={() => handleModeChange('signup')}
                  >
                    Create account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="auth-link auth-link--inline"
                    onClick={() => handleModeChange('signin')}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            <AuthTabs mode={mode} onChange={handleModeChange} />

            {mode === 'signin' ? (
              <SignInForm />
            ) : (
              <SignUpForm onSwitchToSignIn={() => handleModeChange('signin')} />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
