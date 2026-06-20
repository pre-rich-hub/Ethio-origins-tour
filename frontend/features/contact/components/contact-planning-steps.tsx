import { planningSteps } from '../data/planning-steps'

export function ContactPlanningSteps() {
  return (
    <section className="bg-stone py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">
            How Planning Works
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
            From first note to final route
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {planningSteps.map((step, index) => (
            <article key={step.title} className="border border-border bg-card p-7">
              <step.icon className="size-8 text-gold" strokeWidth={1.5} />
              <p className="mt-7 font-sans text-xs uppercase tracking-widest text-muted-foreground">
                Step {index + 1}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
