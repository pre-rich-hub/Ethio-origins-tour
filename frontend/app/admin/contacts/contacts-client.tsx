'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Eye, Trash2, Loader2 } from 'lucide-react'

type ContactListItem = {
  id: number
  name: string
  email: string
  phone: string | null
  preferredMonth: string | null
  message: string
  status: string
  createdAt: string | null
}

const statusStyles: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  read: 'bg-gray-50 text-gray-700',
  replied: 'bg-emerald-50 text-emerald-700',
}

export function AdminContacts() {
  const [items, setItems] = useState<ContactListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/contacts', { credentials: 'include' })
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
    if (!confirm('Are you sure you want to delete this contact message?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/v1/admin/contacts/${id}`, {
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
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.message.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Contacts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Messages from the contact form
          </p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search messages..."
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
          <MessageIcon size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No messages found</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            {search ? 'Try a different search term' : 'Contact messages will appear here'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-xs overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">From</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Message</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Date</th>
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
                    <div>
                      <span className="text-foreground font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground block">{item.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground max-w-xs truncate">
                    {item.message}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[item.status] ?? 'bg-gray-50 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/contacts/${item.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="View details"
                      >
                        <Eye size={15} />
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

function MessageIcon(props: { size: number; className?: string }) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
