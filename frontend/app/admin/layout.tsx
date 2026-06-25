'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<'loading' | 'authenticated' | 'redirecting'>('loading')

  useEffect(() => {
    let cancelled = false

    fetch('/api/v1/auth/me', { credentials: 'include' })
      .then((res) => {
        if (cancelled) return
        if (res.ok) return res.json()
        throw new Error('not authenticated')
      })
      .then((data) => {
        if (cancelled) return
        if (data?.success) setState('authenticated')
        else throw new Error('not authenticated')
      })
      .catch(() => {
        if (!cancelled) {
          setState('redirecting')
          router.replace('/login')
        }
      })

    return () => { cancelled = true }
  }, [router])

  if (state !== 'authenticated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  )
}
