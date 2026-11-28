import type { AuthResult, SignInPayload, SignUpPayload } from '../../types/auth'
import type { IAuthService } from '../../interfaces/auth-service.interface'

const MOCK_DELAY_MS = 900

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Frontend-only mock. Does not create real accounts or authenticate users.
 * Replace with API calls when the backend is ready.
 */
export async function mockSignIn(payload: SignInPayload): Promise<AuthResult> {
  await wait(MOCK_DELAY_MS)

  const email = payload.email.trim().toLowerCase()

  if (email === 'fail@liner.app') {
    return {
      ok: false,
      message: 'Invalid email or password. Please try again.',
    }
  }

  return {
    ok: true,
    user: {
      id: 'mock-user-1',
      name: email.split('@')[0] || 'Listener',
      email,
    },
  }
}

/**
 * Frontend-only mock. Does not create real accounts.
 * Replace with API calls when the backend is ready.
 */
export async function mockSignUp(payload: SignUpPayload): Promise<AuthResult> {
  await wait(MOCK_DELAY_MS)

  const email = payload.email.trim().toLowerCase()
  const name = payload.name.trim()

  if (email === 'taken@liner.app') {
    return {
      ok: false,
      message: 'An account with this email already exists.',
    }
  }

  return {
    ok: true,
    user: {
      id: `mock-user-${Date.now()}`,
      name,
      email,
    },
  }
}

// Тестовая реализация контракта сервиса авторизации Liner.
export const mockAuthService: IAuthService = {
  signIn: mockSignIn,
  signUp: mockSignUp,
}
