import type { Metadata } from 'next'
import { AdminDestinations } from './destinations-client'

export const metadata: Metadata = { title: 'Destinations' }

export default function AdminDestinationsPage() {
  return <AdminDestinations />
}
