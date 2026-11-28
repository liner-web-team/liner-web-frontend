/**
 * Bridge between the dashboard and your auth store (src/store/auth.store.ts).
 */
import { useAuthStore } from '../store/auth.store'

export function useIsAuthenticated(): boolean {
  return useAuthStore((s) => Boolean(s.user))
}

export function useSignOut(): () => void {
  return useAuthStore((s) => s.signOut)
}

export function useCurrentUser() {
  return useAuthStore((s) => s.user)
}
