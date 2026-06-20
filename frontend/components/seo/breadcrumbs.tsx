import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-xs uppercase tracking-widest">
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isCurrent ? (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
