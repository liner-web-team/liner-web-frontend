import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export function Button({
  children,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`auth-button ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="auth-button__spinner" aria-hidden="true" /> : null}
      <span>{loading ? 'Please wait…' : children}</span>
    </button>
  )
}
