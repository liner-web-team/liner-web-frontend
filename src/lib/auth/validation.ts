const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SignInErrors = {
  email?: string
  password?: string
}

export type SignUpErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function validateEmail(email: string): string | undefined {
  const value = email.trim()
  if (!value) return 'Email is required.'
  if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address.'
  return undefined
}

export function validatePassword(password: string, label = 'Password'): string | undefined {
  if (!password) return `${label} is required.`
  if (password.length < 8) return `${label} must be at least 8 characters.`
  return undefined
}

export function validateSignIn(values: {
  email: string
  password: string
}): SignInErrors {
  const errors: SignInErrors = {}
  const emailError = validateEmail(values.email)
  const passwordError = validatePassword(values.password)

  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  return errors
}

export function validateSignUp(values: {
  name: string
  email: string
  password: string
  confirmPassword: string
}): SignUpErrors {
  const errors: SignUpErrors = {}
  const name = values.name.trim()

  if (!name) errors.name = 'Full name is required.'
  else if (name.length < 2) errors.name = 'Enter your full name.'

  const emailError = validateEmail(values.email)
  const passwordError = validatePassword(values.password)
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean)
}
