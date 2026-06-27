import { tourFaqs } from '../data/tour-faqs'

export function TourFaq() {
  return (
    <section aria-labelledby="tour-faq-title" className="bg-stone py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <p className="font-sans text-xs uppercase tracking-luxe text-gold-dark">Planning answers</p>
        <h2 id="tour-faq-title" className="mt-4 font-serif text-4xl font-medium text-foreground md:text-5xl">
          Ethiopia tour booking FAQs
        </h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {tourFaqs.map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="cursor-pointer list-none pr-8 font-serif text-xl font-medium text-foreground marker:hidden md:text-2xl">
                {item.question}
              </summary>
              <p className="mt-4 max-w-3xl font-sans text-sm font-light leading-7 text-muted-foreground md:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
