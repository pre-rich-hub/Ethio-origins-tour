import type { Metadata } from 'next'
import { AdminDocuments } from './documents-client'

export const metadata: Metadata = {
  title: 'Admin Documents',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDocumentsPage() {
  return <AdminDocuments />
}
