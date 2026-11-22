import type { ReactNode } from 'react'

type SectionHeadingProps = {
  icon: ReactNode
  title: string
}

export function SectionHeading({ icon, title }: SectionHeadingProps) {
  return (
    <header className="dash-section__heading">
      <span className="dash-section__icon" aria-hidden>
        {icon}
      </span>
      <h2>{title}</h2>
    </header>
  )
}
