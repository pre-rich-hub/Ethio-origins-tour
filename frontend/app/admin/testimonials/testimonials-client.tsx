'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react'

type TestimonialListItem = {
  id: number
  name: string
  role: string | null
  content: string
  rating: number | null
  imageUrl: string | null
  isFeatured: boolean
  createdAt: string | null
}

export function AdminTestimonials() {
  const [items, setItems] = useState<TestimonialListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/testimonials', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setItems(data.data)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void fetchItems(), 0)
    return () => window.clearTimeout(id)
  }, [fetchItems])

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/v1/admin/testimonials/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) setItems((prev) => prev.filter((t) => t.id !== id))
    } catch {
      /* ignore */
    } finally {
      setDeleting(null)
    }
  }

  const filtered = items.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.content?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage customer testimonials
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          <Plus size={16} />
          Add Testimonial
        </Link>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={24} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 shadow-xs text-center">
          <StarIcon size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No testimonials found</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            {search ? 'Try a different search term' : 'Click "Add Testimonial" to add your first one'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-xs overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Name</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Content</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Rating</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Featured</th>
                <th className="text-right font-medium text-muted-foreground px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <StarIcon size={14} className="text-muted-foreground/40" />
                        </div>
                      )}
                      <div>
                        <span className="text-foreground font-medium block">{item.name}</span>
                        {item.role && (
                          <span className="text-xs text-muted-foreground">{item.role}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground max-w-xs truncate">
                    {item.content}
                  </td>
                  <td className="px-5 py-3.5">
                    {item.rating != null ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {item.isFeatured ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/testimonials/${item.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleting === item.id}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === item.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function StarIcon(props: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
