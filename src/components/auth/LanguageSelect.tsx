import { useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська'},
  { code: 'de', label: 'Deutsch' },
] as const

export function LanguageSelect() {
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]['code']>('en')
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0]

  return (
    <div className="auth-lang">
      <button
        type="button"
        className="auth-lang__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="auth-lang__globe">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </span>
        {current.label}
        <span aria-hidden="true" className="auth-lang__caret">
          ▾
        </span>
      </button>

      {open ? (
        <ul className="auth-lang__menu" role="listbox" aria-label="Language">
          {LANGUAGES.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                role="option"
                aria-selected={item.code === language}
                className={`auth-lang__option ${item.code === language ? 'is-active' : ''}`}
                onClick={() => {
                  setLanguage(item.code)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
