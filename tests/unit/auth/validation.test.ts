
// Unit-тесты валидации форм авторизации Liner Web Frontend.
import { describe, expect, it } from 'vitest'
import {
  hasErrors,
  validateEmail,
  validatePassword,
  validateSignIn,
  validateSignUp,
} from '../../../src/components/auth/validation'

describe('Auth validation', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('user@example.com')).toBeUndefined()
  })

  it('rejects an invalid email', () => {
    expect(validateEmail('invalid-email')).toBe('Enter a valid email address.')
  })

  it('rejects a password shorter than 8 characters', () => {
    expect(validatePassword('1234567')).toBe(
      'Password must be at least 8 characters.',
    )
  })

  it('validates required sign-in fields', () => {
    expect(validateSignIn({ email: '', password: '' })).toEqual({
      email: 'Email is required.',
      password: 'Password is required.',
    })
  })

  it('rejects mismatched registration passwords', () => {
    const errors = validateSignUp({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'different123',
    })

    expect(errors.confirmPassword).toBe('Passwords do not match.')
  })

  it('accepts valid registration data', () => {
    const errors = validateSignUp({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    })

    expect(hasErrors(errors)).toBe(false)
  })
})
