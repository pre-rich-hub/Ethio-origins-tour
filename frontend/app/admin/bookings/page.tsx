import type { Metadata } from 'next'
import { AdminBookings } from './bookings-client'

export const metadata: Metadata = { title: 'Bookings' }

export default function AdminBookingsPage() {
  return <AdminBookings />
}
