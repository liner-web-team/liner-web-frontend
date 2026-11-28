export function LinerLogo() {
  return (
    <div className="auth-logo" aria-label="Liner">
      <span className="auth-logo__mark" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 18V6h3.2l6.2 8.8V6H17v12h-3.1L7.7 9.3V18H4Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="auth-logo__word">LINER</span>
    </div>
  )
}
