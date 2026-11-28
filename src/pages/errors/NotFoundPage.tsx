
// Страница 404 для несуществующих маршрутов Liner Web Frontend.

import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>

      <h2 className="text-2xl font-semibold">
        Page not found
      </h2>

      <p className="text-sm text-gray-400">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  )
}
