import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'

export type LegalSection = {
  title: string
  paragraphs: string[]
  items?: string[]
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string
  title: string
  introduction: string
  sections: LegalSection[]
}) {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <header className="bg-forest px-6 pb-16 pt-32 text-cream md:pb-24 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">{eyebrow}</p>
          <h1 className="mt-5 text-balance font-serif text-5xl font-medium md:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl font-sans text-base font-light leading-relaxed text-cream/75 md:text-lg">
            {introduction}
          </p>
          <p className="mt-6 font-sans text-xs uppercase tracking-widest text-cream/50">
            Last updated: June 27, 2026
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[220px_1fr] md:py-24">
        <nav aria-label={`${title} sections`} className="md:sticky md:top-28 md:self-start">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">On this page</p>
          <ol className="mt-4 space-y-2 border-l border-border pl-4">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#section-${index + 1}`} className="font-sans text-sm text-muted-foreground transition-colors hover:text-forest">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="space-y-12">
          {sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.title} className="scroll-mt-32 border-b border-border pb-12 last:border-0">
              <p className="font-sans text-xs uppercase tracking-widest text-gold">{String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 font-serif text-3xl font-medium md:text-4xl">{section.title}</h2>
              <div className="mt-5 space-y-4 font-sans text-sm font-light leading-7 text-muted-foreground md:text-base">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
          <div className="border border-gold/40 bg-gold/10 p-6">
            <p className="font-serif text-2xl">Questions about these terms?</p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">We are happy to explain how these policies apply to your journey.</p>
            <Link href="/contact" className="mt-5 inline-flex bg-forest px-5 py-3 font-sans text-xs uppercase tracking-widest text-cream">Contact Us</Link>
          </div>
        </article>
      </div>
      <SiteFooter />
    </main>
  )
}
