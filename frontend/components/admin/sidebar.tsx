'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Compass,
  MapPin,
  FileText,
  CalendarCheck,
  MessageSquare,
  Image as ImageIcon,
  Star,
  Users,
  File,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tours', label: 'Tours', icon: Compass },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/documents', label: 'Documents', icon: File },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    try {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // ignore
    }
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-forest flex flex-col z-50">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-cream/10">
        <Image
          src="/brand/logo-header.png"
          alt="Ethio Origins"
          width={140}
          height={45}
          className="h-8 w-auto"
          priority
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-gold/15 text-gold'
                  : 'text-cream/70 hover:text-cream hover:bg-cream/5'
              )}
            >
              <item.icon size={18} className={isActive ? 'text-gold' : ''} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-gold" />}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pb-4 border-t border-cream/10 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-cream/60 hover:text-cream hover:bg-cream/5 transition-all"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
