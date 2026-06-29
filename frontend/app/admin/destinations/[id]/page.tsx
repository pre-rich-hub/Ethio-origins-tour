import type { Metadata } from 'next'
import { AdminDestinationEdit } from './destination-edit-client'

export const metadata: Metadata = {
  title: 'Edit Destination',
  robots: { index: false, follow: false },
}

export default function AdminDestinationEditPage() {
  return <AdminDestinationEdit />
}
