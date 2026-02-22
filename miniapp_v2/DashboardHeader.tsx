'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePrivy } from '@privy-io/react-auth'
import { useTelegram } from '@/hooks/useTelegram'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function DashboardHeader() {
  const { user: privyUser } = usePrivy()
  const { user: tgUser }    = useTelegram()
  const name = tgUser?.first_name ?? privyUser?.telegram?.firstName ?? 'S'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3"
            style={{ background: 'var(--overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
      {/* Logo */}
      <Link href="/home" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl overflow-hidden gradient-gold flex items-center justify-center">
          <Image
            src="https://i.ibb.co/nMXjPCVT/logov2.jpg"
            alt="SquirrelFi"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>SquirrelFi</span>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link href="/profile">
          <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center font-bold text-sm"
               style={{ color: '#0F0F1A' }}>
            {name[0]?.toUpperCase() ?? 'S'}
          </div>
        </Link>
      </div>
    </header>
  )
}
