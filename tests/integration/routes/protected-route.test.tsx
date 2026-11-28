
// Интеграционные тесты защиты маршрутов Liner Web Frontend.
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import ProtectedRoute from '../../../src/routes/ProtectedRoute'
import { useAuthStore } from '../../../src/store/auth.store'

function renderProtectedRoute() {
  render(
    <MemoryRouter initialEntries={['/library']}>
      <Routes>
        <Route path="/login" element={<div>Sign in page</div>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/library" element={<div>Music library</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    useAuthStore.getState().signOut()
  })

  afterEach(() => {
    cleanup()
    useAuthStore.getState().signOut()
  })

  it('redirects unauthenticated users to login', () => {
    renderProtectedRoute()

    expect(screen.getByText('Sign in page')).toBeInTheDocument()
    expect(screen.queryByText('Music library')).not.toBeInTheDocument()
  })

  it('allows authenticated users to access protected pages', () => {
    useAuthStore.getState().setUser({
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
    })

    renderProtectedRoute()

    expect(screen.getByText('Music library')).toBeInTheDocument()
    expect(screen.queryByText('Sign in page')).not.toBeInTheDocument()
  })
})
