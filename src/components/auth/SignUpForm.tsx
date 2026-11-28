import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { hasErrors, validateSignUp, type SignUpErrors } from './validation'
import { useAuthStore } from '../../store/auth.store'
import { Button } from '../ui/Button'
import { PasswordField } from '../ui/PasswordField'
import { TextField } from '../ui/TextField'

type SignUpFormProps = {
  onSwitchToSignIn: () => void
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const navigate = useNavigate()
  const signUp = useAuthStore((state) => state.signUp)
  const status = useAuthStore((state) => state.status)
  const message = useAuthStore((state) => state.message)
  const clearFeedback = useAuthStore((state) => state.clearFeedback)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<SignUpErrors>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearFeedback()

    const nextErrors = validateSignUp({ name, email, password, confirmPassword })
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    const ok = await signUp({ name, email, password, confirmPassword })
    if (ok) {
      window.setTimeout(() => navigate('/'), 700)
    }
  }

  const loading = status === 'loading'

  function clearFieldError(field: keyof SignUpErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <TextField
        name="name"
        label="Full name"
        type="text"
        autoComplete="name"
        placeholder="Enter full name"
        value={name}
        error={errors.name}
        disabled={loading}
        onChange={(event) => {
          setName(event.target.value)
          clearFieldError('name')
        }}
      />

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
          clearFieldError('email')
        }}
      />

      <PasswordField
        name="password"
        label="Password"
        autoComplete="new-password"
        placeholder="Create password"
        value={password}
        error={errors.password}
        disabled={loading}
        onChange={(event) => {
          setPassword(event.target.value)
          clearFieldError('password')
        }}
      />

      <PasswordField
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Confirm password"
        value={confirmPassword}
        error={errors.confirmPassword}
        disabled={loading}
        onChange={(event) => {
          setConfirmPassword(event.target.value)
          clearFieldError('confirmPassword')
        }}
      />

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
        Create account
      </Button>

      <p className="auth-legal">
        Already have an account?{' '}
        <button
          type="button"
          className="auth-link auth-link--inline"
          onClick={() => {
            clearFeedback()
            onSwitchToSignIn()
          }}
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
