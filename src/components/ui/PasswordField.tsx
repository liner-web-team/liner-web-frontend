import { useState, type InputHTMLAttributes } from 'react'

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
  error?: string
  requiredMark?: boolean
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M9.5 5.3A10.6 10.6 0 0 1 12 5c6 0 9.5 7 9.5 7a16.7 16.7 0 0 1-3.1 4.1M6.2 6.3A16.3 16.3 0 0 0 2.5 12S6 19 12 19c1.3 0 2.5-.3 3.6-.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PasswordField({
  id,
  label,
  error,
  requiredMark = true,
  className = '',
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const fieldId = id ?? props.name

  return (
    <label className="auth-field" htmlFor={fieldId}>
      <span className="auth-field__label">
        {label}
        {requiredMark ? <span className="auth-field__required">*</span> : null}
      </span>
      <span className="auth-field__password-wrap">
        <input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          className={`auth-field__input auth-field__input--password ${error ? 'auth-field__input--error' : ''} ${className}`.trim()}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          className="auth-field__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          <EyeIcon open={visible} />
        </button>
      </span>
      {error ? (
        <span id={`${fieldId}-error`} className="auth-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}
