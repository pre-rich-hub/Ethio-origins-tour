'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Loader2, Image as ImageIcon } from 'lucide-react'

type GalleryItem = {
  id: number
  imageUrl: string | null
  alt?: string
  title?: string
  place?: string
  tourId: number | null
  createdAt?: string
}

export function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/gallery', { credentials: 'include' })
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
    if (!confirm('Are you sure you want to delete this image?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/v1/admin/gallery/${id}`, {
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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Gallery</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your gallery images
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          <Plus size={16} />
          Add Images
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={24} />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 shadow-xs text-center">
          <ImageIcon size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No images in the gallery</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Click "Add Images" to upload your first image
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-muted">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.alt ?? ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={24} className="text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="p-3">
                {item.title && (
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                )}
                {item.place && (
                  <p className="text-xs text-muted-foreground truncate">{item.place}</p>
                )}
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Link
                  href={`/admin/gallery/${item.id}`}
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground shadow-xs transition-colors"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive shadow-xs transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  {deleting === item.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
