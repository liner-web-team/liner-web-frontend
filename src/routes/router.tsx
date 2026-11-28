
// Конфигурация публичных и защищённых маршрутов Liner Web Frontend.

import { createBrowserRouter } from 'react-router'

import { AuthPage } from '../pages/auth/AuthPage'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'

import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import LibraryPage from '../pages/LibraryPage'
import SettingsPage from '../pages/SettingsPage'
import ProfilePage from '../pages/ProfilePage'
import NotFoundPage from '../pages/errors/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/register',
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/search', element: <SearchPage /> },
          { path: '/library', element: <LibraryPage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
