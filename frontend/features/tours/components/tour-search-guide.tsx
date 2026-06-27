import Link from 'next/link'

const collections = [
  {
    title: 'Cultural and historical journeys',
    description:
      'Our Ethiopia cultural tours, Ethiopia historical tours and Ethiopia heritage tours connect travelers with living traditions, UNESCO sites and expert local interpretation. Explore Lalibela tour packages, Gondar historical tours, Axum tours in Ethiopia and immersive Ethiopia cultural experiences.',
    links: [
      ['Cultural tours', '/tours/cultural-tours'],
      ['Historical tours', '/tours/historical-tours'],
      ['Historic route tours', '/tours/ethiopia-historic-route-tours'],
    ],
  },
  {
    title: 'Adventure, nature and photography',
    description:
      'Choose Ethiopia adventure tours, Ethiopia trekking tours, Ethiopia wildlife tours, Ethiopia eco tours or Ethiopia photography tours. Routes include Simien Mountains tours, Danakil Depression tours, Omo Valley tours and other landscapes suited to Ethiopian adventure travel.',
    links: [
      ['Adventure tours', '/tours/nature-adventure-tours'],
      ['Trekking tours', '/tours/trekking-hiking-tours'],
      ['Wildlife tours', '/tours/wildlife-tours'],
      ['Photography tours', '/tours/photography-tours'],
    ],
  },
  {
    title: 'Private trips for every travel style',
    description:
      'We design private tours in Ethiopia, Ethiopia group tours, Ethiopia family vacations and Ethiopia honeymoon tours around your preferred pace. Ask our Ethiopia travel planner about Ethiopia luxury tours, Ethiopia budget tours, affordable Ethiopia tours and fully customized Ethiopia tours.',
    links: [
      ['Private and customized tours', '/tours/private-customized-tours'],
      ['Talk to an expert', '/contact'],
    ],
  },
  {
    title: 'Packages, guides and city experiences',
    description:
      'Compare Ethiopia vacation packages, Ethiopia holiday packages and flexible Ethiopia travel packages led by local tour guides in Ethiopia. Our Ethiopia guided tours include Ethiopia sightseeing tours, Addis Ababa city tours and longer Ethiopia travel and tourism routes.',
    links: [
      ['Holiday packages', '/tours/ethiopia-holiday-packages'],
      ['City tours', '/tours/city-tours'],
      ['Day tours', '/tours/day-tours'],
    ],
  },
] as const

export function TourSearchGuide() {
  return (
    <section aria-labelledby="find-ethiopia-tour" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-luxe text-gold">Find your route</p>
          <h2 id="find-ethiopia-tour" className="mt-4 text-balance font-serif text-4xl font-medium text-foreground md:text-5xl">
            Ethiopia tour packages shaped by local travel experts
          </h2>
          <p className="mt-5 font-sans text-base font-light leading-relaxed text-muted-foreground">
            Ethio Origins Tour is an Ethiopia tour company and Ethiopia travel agency creating thoughtful private and guided journeys. Browse by experience below or speak with our team for personal Ethiopia travel services and tour booking support.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {collections.map((collection) => (
            <article key={collection.title} className="bg-background p-6 md:p-8">
              <h3 className="font-serif text-2xl font-medium text-foreground">{collection.title}</h3>
              <p className="mt-4 font-sans text-sm font-light leading-7 text-muted-foreground">{collection.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {collection.links.map(([label, href]) => (
                  <Link key={href} href={href} className="border border-forest/20 px-3 py-2 font-sans text-xs uppercase tracking-wider text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream">
                    {label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
