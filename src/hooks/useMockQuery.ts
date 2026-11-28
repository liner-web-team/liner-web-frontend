import { useEffect, useRef, useState } from 'react'

type State<T> = { status: 'loading' } | { status: 'success'; data: T } | { status: 'error' }

/**
 * Simulates an async request so loading/error UI works today.
 * When a real music API arrives, replace the body with a real fetch.
 */
export function useMockQuery<T>(load: () => T, delayMs = 500) {
  const [state, setState] = useState<State<T>>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  const loadRef = useRef(load)

  useEffect(() => {
    loadRef.current = load
  }, [load])


  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        setState({ status: 'success', data: loadRef.current() })
      } catch {
        setState({ status: 'error' })
      }
    }, delayMs)
    return () => window.clearTimeout(id)
  }, [attempt, delayMs])

  const retry = () => {
    setState({ status: 'loading' })
    setAttempt((a) => a + 1)
  }
  return { ...state, retry }
}
