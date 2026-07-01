import type { Metadata } from 'next'
import { AdminContacts } from './contacts-client'

export const metadata: Metadata = { title: 'Contacts' }

export default function AdminContactsPage() {
  return <AdminContacts />
}
