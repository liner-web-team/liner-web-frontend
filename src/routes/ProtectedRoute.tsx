
// Защита приватных маршрутов Liner Web Frontend.

import { Navigate, Outlet } from 'react-router'
import { useIsAuthenticated } from '../hooks/useAuth'

export default function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
