type Props = { title?: string; text?: string; onRetry?: () => void }

export default function ErrorState({
  title = 'Couldn’t load this section',
  text = 'Check your connection and try again.',
  onRetry,
}: Props) {
  return (
    <div className="ln-state ln-state--error" role="alert">
      <p className="ln-state__title">{title}</p>
      <p className="ln-state__text">{text}</p>
      {onRetry && <button type="button" className="ln-btn ln-btn--dark" onClick={onRetry}>Try again</button>}
    </div>
  )
}
