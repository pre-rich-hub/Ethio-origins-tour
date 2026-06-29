import type { Metadata } from 'next'
import { AdminDestinationNew } from './destination-new-client'

export const metadata: Metadata = {
  title: 'New Destination',
  robots: { index: false, follow: false },
}

export default function AdminDestinationNewPage() {
  return <AdminDestinationNew />
}
