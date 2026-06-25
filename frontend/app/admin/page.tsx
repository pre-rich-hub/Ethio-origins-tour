'use client'

import { useEffect, useState } from 'react'
import {
  Compass,
  MapPin,
  CalendarCheck,
  Image as ImageIcon,
  MessageSquare,
  TrendingUp,
  CalendarDays,
} from 'lucide-react'

type Stats = {
  totals: {
    tours: number
    destinations: number
    bookings: number
    galleryImages: number
    contacts: number
  }
  bookingTrends: { date: string; count: number }[]
  topTours: { id: number; name: string; bookingCount: number }[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/admin/dashboard/stats', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ml-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Failed to load dashboard stats.</p>
      </div>
    )
  }

  const statCards = [
    { label: 'Tours', value: stats.totals.tours, icon: Compass, color: 'text-forest' },
    { label: 'Destinations', value: stats.totals.destinations, icon: MapPin, color: 'text-gold' },
    { label: 'Bookings', value: stats.totals.bookings, icon: CalendarCheck, color: 'text-forest' },
    { label: 'Gallery', value: stats.totals.galleryImages, icon: ImageIcon, color: 'text-gold' },
    { label: 'Contacts', value: stats.totals.contacts, icon: MessageSquare, color: 'text-forest' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your Ethio Origins admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon size={20} className={card.color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-gold" />
            <h2 className="font-serif text-lg text-foreground">Booking Trends (30 days)</h2>
          </div>
          {stats.bookingTrends.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings in the last 30 days.</p>
          ) : (
            <div className="space-y-1.5">
              {stats.bookingTrends.map((row) => (
                <div key={row.date} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-28 shrink-0">{row.date}</span>
                  <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all"
                      style={{
                        width: `${Math.max(4, (row.count / Math.max(...stats.bookingTrends.map((r) => r.count))) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground w-6 text-right">{row.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-border p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays size={18} className="text-gold" />
            <h2 className="font-serif text-lg text-foreground">Top Tours by Bookings</h2>
          </div>
          {stats.topTours.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tours have been booked yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.topTours.map((tour, i) => (
                <div key={tour.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}.</span>
                  <span className="text-sm text-foreground flex-1 truncate">{tour.name}</span>
                  <span className="text-xs font-medium bg-gold/10 text-gold px-2.5 py-1 rounded-full">
                    {tour.bookingCount} booking{tour.bookingCount !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
