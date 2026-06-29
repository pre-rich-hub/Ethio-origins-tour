'use client'

import { useCallback, useEffect, useState } from 'react'
import { Search, Trash2, Loader2 } from 'lucide-react'

type SubscriberListItem = {
  id: number
  email: string
  name: string | null
  subscribedAt: string | null
  status: string
}

export function AdminSubscribers() {
  const [items, setItems] = useState<SubscriberListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/subscribers', { credentials: 'include' })
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
    if (!confirm('Are you sure you want to remove this subscriber?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/v1/admin/subscribers/${id}`, {
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
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    (t.name?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Subscribers</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Newsletter email subscribers
          </p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search subscribers..."
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
          <UsersIcon size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No subscribers found</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            {search ? 'Try a different search term' : 'Subscribers will appear here when people sign up'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-xs overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Email</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Name</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Subscribed</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
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
                    <span className="text-foreground font-medium">{item.email}</span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {item.name ?? '—'}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs">
                    {item.subscribedAt
                      ? new Date(item.subscribedAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    {item.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
                        Unsubscribed
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
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

function UsersIcon(props: { size: number; className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
