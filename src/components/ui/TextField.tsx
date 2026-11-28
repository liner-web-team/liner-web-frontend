import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  requiredMark?: boolean
}

export function TextField({
  id,
  label,
  error,
  requiredMark = true,
  className = '',
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name

  return (
    <label className="auth-field" htmlFor={fieldId}>
      <span className="auth-field__label">
        {label}
        {requiredMark ? <span className="auth-field__required">*</span> : null}
      </span>
      <input
        id={fieldId}
        className={`auth-field__input ${error ? 'auth-field__input--error' : ''} ${className}`.trim()}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${fieldId}-error`} className="auth-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}
