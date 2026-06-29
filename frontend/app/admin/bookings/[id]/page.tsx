import type { Metadata } from 'next'
import { AdminBookingEdit } from './booking-edit-client'

export const metadata: Metadata = {
  title: 'Booking Details',
  robots: { index: false, follow: false },
}

export default function AdminBookingEditPage() {
  return <AdminBookingEdit />
}
