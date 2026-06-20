import { galleryStories } from '../data/gallery-stories'

export function GalleryStoryStrip() {
  return (
    <section className="border-y border-border bg-stone py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 md:px-8">
        {galleryStories.map((story) => (
          <article
            key={story.title}
            className="grid gap-5 border-l border-gold/50 pl-5 md:pl-6"
          >
            <div>
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
                {story.label}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium leading-none text-foreground">
                {story.title}
              </h2>
            </div>
            <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
              {story.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
