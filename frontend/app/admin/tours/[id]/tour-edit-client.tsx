'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Plus, X, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'

type Destination = { id: number; name: string }
type Category = { id: number; name: string }
type GalleryImage = { id: number; imageUrl: string; tourId: number | null }

type ItineraryDay = {
  day: number
  title: string
  activities: string
  overnight: string
  meals?: string
}

type TourData = {
  id: number
  name: string
  overview: string
  adultPrice: number | null
  childPrice: number | null
  discount: string | null
  rating: number | null
  noOfRates: number | null
  isFeatured: boolean
  mainImage: string | null
  destination: { id: number; name: string } | null
  categories: Category[]
  gallery: GalleryImage[]
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  journeyMap: string | null
}

export function AdminTourEdit() {
  const router = useRouter()
  const params = useParams()
  const tourId = Number(params.id)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tour, setTour] = useState<TourData | null>(null)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])
  const [included, setIncluded] = useState<string[]>([])
  const [excluded, setExcluded] = useState<string[]>([])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([])

  useEffect(() => {
    const id = window.setTimeout(() => {
      void Promise.all([
        fetch(`/api/v1/admin/tours/${tourId}`, { credentials: 'include' })
          .then((r) => r.json())
          .then((d) => {
            if (d.success) {
              const t = d.data as TourData
              setTour(t)
              setIncluded(t.included ?? [])
              setExcluded(t.excluded ?? [])
              setItinerary(
                t.itinerary?.length
                  ? t.itinerary.map((item) => ({
                      day: item.day,
                      title: item.title ?? '',
                      activities: item.activities ?? '',
                      overnight: item.overnight ?? '',
                      meals: item.meals ?? '',
                    }))
                  : [{ day: 1, title: '', activities: '', overnight: '', meals: '' }]
              )
              setSelectedCategories(t.categories.map((c) => c.id))
            }
          }),
        fetch('/api/v1/admin/destinations', { credentials: 'include' })
          .then((r) => r.json())
          .then((d) => { if (d.success) setDestinations(d.data) }),
        fetch('/api/v1/admin/categories', { credentials: 'include' })
          .then((r) => r.json())
          .then((d) => { if (d.success) setCategories(d.data) }),
      ]).finally(() => setLoading(false))
    }, 0)
    return () => window.clearTimeout(id)
  }, [tourId])

  function toggleCategory(id: number) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  function addArrayItem(list: string[], setter: (v: string[]) => void) {
    setter([...list, ''])
  }
  function removeArrayItem(list: string[], idx: number, setter: (v: string[]) => void) {
    setter(list.filter((_, i) => i !== idx))
  }
  function updateArrayItem(list: string[], idx: number, val: string, setter: (v: string[]) => void) {
    const next = [...list]
    next[idx] = val
    setter(next)
  }

  function addItineraryDay() {
    setItinerary((prev) => [
      ...prev,
      { day: prev.length + 1, title: '', activities: '', overnight: '', meals: '' },
    ])
  }
  function removeItineraryDay(idx: number) {
    setItinerary((prev) => {
      const next = prev.filter((_, i) => i !== idx)
      return next.map((d, i) => ({ ...d, day: i + 1 }))
    })
  }
  function updateItineraryDay(idx: number, field: keyof ItineraryDay, val: string) {
    setItinerary((prev) => {
      const next = [...prev]
      ;(next[idx] as Record<string, unknown>)[field] = val
      return next
    })
  }
  function moveItineraryDay(idx: number, dir: 'up' | 'down') {
    setItinerary((prev) => {
      const target = dir === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next.map((d, i) => ({ ...d, day: i + 1 }))
    })
  }

  function toggleDeleteImage(imgId: number) {
    setDeleteImageIds((prev) =>
      prev.includes(imgId) ? prev.filter((id) => id !== imgId) : [...prev, imgId]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.set('tourCategories', JSON.stringify(selectedCategories))
    formData.set('tourIncluded', JSON.stringify(included.filter(Boolean)))
    formData.set('tourExcluded', JSON.stringify(excluded.filter(Boolean)))
    formData.set('tourItinerary', JSON.stringify(itinerary))
    formData.set('tourReviews', String(tour?.noOfRates ?? 0))
    formData.set('deleteImages', JSON.stringify(deleteImageIds))

    formData.delete('tourImages')
    newImages.forEach((file) => formData.append('tourImages', file))

    try {
      const res = await fetch(`/api/v1/admin/tours/${tourId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin/tours')
      } else {
        setError(data.message || 'Failed to update tour')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ml-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Tour not found.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Edit Tour</h1>
        <p className="text-muted-foreground text-sm mt-1">{tour.name}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label htmlFor="tourTitle" className="block text-sm font-medium text-foreground mb-1.5">
                Tour Name
              </label>
              <input
                id="tourTitle"
                name="tourTitle"
                required
                defaultValue={tour.name}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="tourDestination" className="block text-sm font-medium text-foreground mb-1.5">
                Destination
              </label>
              <select
                id="tourDestination"
                name="tourDestination"
                required
                defaultValue={tour.destination?.id ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tourDiscount" className="block text-sm font-medium text-foreground mb-1.5">
                Discount (%)
              </label>
              <input
                id="tourDiscount"
                name="tourDiscount"
                type="number"
                min="0"
                max="100"
                defaultValue={tour.discount ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="adultPrice" className="block text-sm font-medium text-foreground mb-1.5">
                Adult Price ($)
              </label>
              <input
                id="adultPrice"
                name="adultPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={tour.adultPrice ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="childPrice" className="block text-sm font-medium text-foreground mb-1.5">
                Child Price ($)
              </label>
              <input
                id="childPrice"
                name="childPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={tour.childPrice ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="tourRating" className="block text-sm font-medium text-foreground mb-1.5">
                Rating (0-5)
              </label>
              <input
                id="tourRating"
                name="tourRating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                defaultValue={tour.rating ?? ''}
                className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  value="true"
                  defaultChecked={tour.isFeatured}
                  className="w-4 h-4 rounded border-border text-gold focus:ring-gold/30"
                />
                <span className="text-sm font-medium text-foreground">Featured Tour</span>
              </label>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <label htmlFor="tourOverview" className="mb-5 block font-serif text-lg text-foreground">
            Overview
          </label>
          <textarea
            id="tourOverview"
            name="tourOverview"
            rows={6}
            defaultValue={tour.overview ?? ''}
            className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
          />
        </section>

        {/* Included */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-foreground">Included</h2>
            <button
              type="button"
              onClick={() => addArrayItem(included, setIncluded)}
              className="inline-flex items-center gap-1 text-sm text-gold font-medium hover:text-gold/80 transition-colors"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="space-y-2.5">
            {included.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayItem(included, i, e.target.value, setIncluded)}
                  className="flex-1 px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  placeholder="e.g. Airport transfers"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(included, i, setIncluded)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Excluded */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-foreground">Excluded</h2>
            <button
              type="button"
              onClick={() => addArrayItem(excluded, setExcluded)}
              className="inline-flex items-center gap-1 text-sm text-gold font-medium hover:text-gold/80 transition-colors"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="space-y-2.5">
            {excluded.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayItem(excluded, i, e.target.value, setExcluded)}
                  className="flex-1 px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  placeholder="e.g. International flights"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(excluded, i, setExcluded)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerary Builder */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg text-foreground">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center gap-1 text-sm text-gold font-medium hover:text-gold/80 transition-colors"
            >
              <Plus size={14} /> Add Day
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((day, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Day {day.day}</span>
                    <button
                      type="button"
                      onClick={() => moveItineraryDay(i, 'up')}
                      disabled={i === 0}
                      className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItineraryDay(i, 'down')}
                      disabled={i === itinerary.length - 1}
                      className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(i)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <input
                      value={day.title}
                      onChange={(e) => updateItineraryDay(i, 'title', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      placeholder={`Day ${day.day} title`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      value={day.activities}
                      onChange={(e) => updateItineraryDay(i, 'activities', e.target.value)}
                      rows={3}
                      className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
                      placeholder="Activities description..."
                    />
                  </div>
                  <div>
                    <input
                      value={day.overnight}
                      onChange={(e) => updateItineraryDay(i, 'overnight', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      placeholder="Overnight location"
                    />
                  </div>
                  <div>
                    <input
                      value={day.meals ?? ''}
                      onChange={(e) => updateItineraryDay(i, 'meals', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      placeholder="Meals"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Existing Images */}
        {tour.gallery.length > 0 && (
          <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
            <h2 className="font-serif text-lg text-foreground mb-5">Existing Images</h2>
            <div className="flex flex-wrap gap-3">
              {tour.gallery.map((img) => {
                const marked = deleteImageIds.includes(img.id)
                return (
                  <div
                    key={img.id}
                    className={`relative w-28 h-28 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      marked ? 'border-red-400 opacity-50' : 'border-border hover:border-gold'
                    }`}
                    onClick={() => toggleDeleteImage(img.id)}
                    title={marked ? 'Click to keep' : 'Click to mark for deletion'}
                  >
                    {/* Admin images can come from uploaded files or an external CDN. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {marked && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <Trash2 size={18} className="text-red-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Click images to mark them for deletion
            </p>
          </section>
        )}

        {/* Add New Images */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <h2 className="font-serif text-lg text-foreground mb-5">Add New Images</h2>
          <input
            type="file"
            name="tourImages"
            multiple
            accept="image/*"
            onChange={(e) => setNewImages(Array.from(e.target.files ?? []))}
            className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
          />
          {newImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {newImages.map((file, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs bg-gold/10 text-gold px-2.5 py-1 rounded-full"
                >
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="bg-white rounded-xl border border-border p-6 shadow-xs">
            <h2 className="font-serif text-lg text-foreground mb-5">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const selected = selectedCategories.includes(cat.id)
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                      selected
                        ? 'border-gold bg-gold/5 text-gold'
                        : 'border-border bg-white text-muted-foreground hover:border-gold/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCategory(cat.id)}
                      className="sr-only"
                    />
                    {cat.name}
                  </label>
                )
              })}
            </div>
          </section>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            data-testid="save-tour"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/tours')}
            className="px-6 py-2.5 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
