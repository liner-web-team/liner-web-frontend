import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { AuthPage } from './pages/AuthPage.tsx'
import ProtectedRoute from './components/auth/ProtectedRoute.tsx'
import DashboardLayout from './components/layout/DashboardLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import LibraryPage from './pages/LibraryPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'

const router = createBrowserRouter([
  { path: '/login', element: <AuthPage /> },
  { path: '/register', element: <AuthPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/search', element: <SearchPage /> },
          { path: '/library', element: <LibraryPage /> },
          { path: '/settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)