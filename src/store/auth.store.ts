
// Хранилище авторизации Liner Web Frontend.
// Получает сервис авторизации через Dependency Injection.

import { create } from 'zustand'
import { dependencies } from '../config/dependencies'
import type { IAuthService } from '../interfaces/auth-service.interface'
import type { AuthUser, SignInPayload, SignUpPayload } from '../types/auth'

type AuthStatus = 'idle' | 'loading' | 'success' | 'error'

type AuthState = {
  user: AuthUser | null
  status: AuthStatus
  message: string | null
  setUser: (user: AuthUser | null) => void
  clearFeedback: () => void
  signIn: (payload: SignInPayload) => Promise<boolean>
  signUp: (payload: SignUpPayload) => Promise<boolean>
  signOut: () => void
}

// Фабрика Zustand Store с внедрением сервиса авторизации.
export function createAuthStore(authService: IAuthService) {
  return create<AuthState>((set) => ({
    user: null,
    status: 'idle',
    message: null,

    setUser: (user) => set({ user }),

    clearFeedback: () =>
      set({ status: 'idle', message: null }),

    signIn: async (payload) => {
      set({ status: 'loading', message: null })

      try {
        const result = await authService.signIn(payload)

        if (!result.ok) {
          set({
            status: 'error',
            message: result.message,
          })
          return false
        }

        set({
          user: result.user,
          status: 'success',
          message: 'Signed in successfully. Backend auth is not connected yet.',
        })

        return true
      } catch {
        set({
          status: 'error',
          message: 'Unable to sign in. Please try again.',
        })
        return false
      }
    },

    signUp: async (payload) => {
      set({ status: 'loading', message: null })

      try {
        const result = await authService.signUp(payload)

        if (!result.ok) {
          set({
            status: 'error',
            message: result.message,
          })
          return false
        }

        set({
          user: result.user,
          status: 'success',
          message: 'Account details accepted locally. No real account was created.',
        })

        return true
      } catch {
        set({
          status: 'error',
          message: 'Unable to register. Please try again.',
        })
        return false
      }
    },

    signOut: () =>
      set({
        user: null,
        status: 'idle',
        message: null,
      }),
  }))
}

// Создание единственного экземпляра Store для приложения.
export const useAuthStore = createAuthStore(dependencies.authService)
