import type { ReactNode } from 'react'

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'span' | 'li' | 'h2'
}) {
  const Tag = as
  void delay
  return <Tag className={className}>{children}</Tag>
}
