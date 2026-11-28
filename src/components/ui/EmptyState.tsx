import type { ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

type Props = { icon?: IconName; title: string; text?: string; action?: ReactNode }

export default function EmptyState({ icon, title, text, action }: Props) {
  return (
    <div className="ln-state">
      {icon && <span className="ln-state__icon"><Icon name={icon} size={26} /></span>}
      <p className="ln-state__title">{title}</p>
      {text && <p className="ln-state__text">{text}</p>}
      {action}
    </div>
  )
}
