import { Reveal } from './reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  tone?: 'dark' | 'light'
}) {
  const isCenter = align === 'center'
  const titleColor = tone === 'light' ? 'text-cream' : 'text-foreground'
  const descColor = tone === 'light' ? 'text-cream/75' : 'text-muted-foreground'
  const eyebrowColor = tone === 'light' ? 'text-gold' : 'text-gold-dark'
  return (
    <div
      className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <Reveal>
          <p className={`mb-3 font-sans text-xs uppercase tracking-luxe ${eyebrowColor}`}>
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.5}>
        <h2
          className={`text-balance font-serif text-3xl font-medium leading-tight md:text-5xl ${titleColor}`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={1}>
          <p
            className={`mt-4 text-pretty font-sans text-base font-light leading-relaxed ${descColor}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
