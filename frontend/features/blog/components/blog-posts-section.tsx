import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { posts } from '../data/posts'

export function BlogPostsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden border border-border bg-card shadow-xl shadow-coffee/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-coffee">
                <img
                  src={post.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">
                  {post.category}
                </p>
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 font-sans text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                  <CalendarDays className="size-3.5 text-gold" />
                  {post.date}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-medium leading-none text-foreground">
                  {post.title}
                </h2>
                <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-forest transition-colors hover:text-gold"
                >
                  Plan with this insight
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
