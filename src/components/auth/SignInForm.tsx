import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { hasErrors, validateSignIn, type SignInErrors } from '../../lib/auth/validation'
import { useAuthStore } from '../../store/auth.store'
import { Button } from '../ui/Button'
import { PasswordField } from '../ui/PasswordField'
import { TextField } from '../ui/TextField'

export function SignInForm() {
  const navigate = useNavigate()
  const signIn = useAuthStore((state) => state.signIn)
  const status = useAuthStore((state) => state.status)
  const message = useAuthStore((state) => state.message)
  const clearFeedback = useAuthStore((state) => state.clearFeedback)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<SignInErrors>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearFeedback()

    const nextErrors = validateSignIn({ email, password })
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    const ok = await signIn({ email, password })
    if (ok) {
      window.setTimeout(() => navigate('/'), 700)
    }
  }

  const loading = status === 'loading'

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <TextField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="Enter email"
        value={email}
        error={errors.email}
        disabled={loading}
        onChange={(event) => {
          setEmail(event.target.value)
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
        }}
      />

      <PasswordField
        name="password"
        label="Password"
        autoComplete="current-password"
        placeholder="Enter password"
        value={password}
        error={errors.password}
        disabled={loading}
        onChange={(event) => {
          setPassword(event.target.value)
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
        }}
      />

      <div className="auth-form__row-end">
        <button type="button" className="auth-link" disabled>
          Forgot password?
        </button>
      </div>

      {status === 'error' && message ? (
        <p className="auth-alert auth-alert--error" role="alert">
          {message}
        </p>
      ) : null}

      {status === 'success' && message ? (
        <p className="auth-alert auth-alert--success" role="status">
          {message}
        </p>
      ) : null}

      <Button type="submit" loading={loading}>
        Sign in
      </Button>

      <p className="auth-legal">
        By continuing, you agree to our{' '}
        <a href="#terms">Terms of Service</a> and{' '}
        <a href="#privacy">Privacy Policy</a>.
      </p>
    </form>
  )
}
