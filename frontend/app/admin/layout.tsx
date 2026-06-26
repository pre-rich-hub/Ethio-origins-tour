import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/sidebar'
import { getApiBaseUrl } from '@/lib/api/client'

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin',
  },
  robots: {
    index: false,
    follow: false,
  },
}

async function hasValidAdminSession() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (!cookieHeader) return false

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/me`, {
      headers: {
        Accept: 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    })

    if (!response.ok) return false

    const payload = (await response.json()) as { success?: boolean }
    return payload.success === true
  } catch {
    return false
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await hasValidAdminSession()

  if (!authenticated) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  )
}
