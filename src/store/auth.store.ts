import { create } from 'zustand'
import { mockSignIn, mockSignUp } from '../lib/auth/mockAuth'
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'idle',
  message: null,

  setUser: (user) => set({ user }),

  clearFeedback: () => set({ status: 'idle', message: null }),

  signIn: async (payload) => {
    set({ status: 'loading', message: null })
    const result = await mockSignIn(payload)

    if (!result.ok) {
      set({ status: 'error', message: result.message })
      return false
    }

    set({
      user: result.user,
      status: 'success',
      message: 'Signed in successfully. Backend auth is not connected yet.',
    })
    return true
  },

  signUp: async (payload) => {
    set({ status: 'loading', message: null })
    const result = await mockSignUp(payload)

    if (!result.ok) {
      set({ status: 'error', message: result.message })
      return false
    }

    set({
      user: result.user,
      status: 'success',
      message: 'Account details accepted locally. No real account was created.',
    })
    return true
  },

  signOut: () =>
    set({
      user: null,
      status: 'idle',
      message: null,
    }),
}))
