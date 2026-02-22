'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LABELS: Record<string, string> = {
  home: 'Home', vaults: 'Vaults', deposit: 'Deposit',
  confirm: 'Confirm', success: 'Success', history: 'History',
  profile: 'Profile', bank: 'Bank Accounts', referral: 'Referral',
  security: 'Security', notifications: 'Notifications',
  support: 'Support', withdraw: 'Withdraw',
}

export function Breadcrumb() {
  const pathname  = usePathname()
  const segments  = pathname.split('/').filter(Boolean)
  if (segments.length <= 1) return null

  const crumbs = segments.map((seg, i) => ({
    label: LABELS[seg] ?? seg,
    href:  '/' + segments.slice(0, i + 1).join('/'),
    last:  i === segments.length - 1,
  }))

  return (
    <nav className="flex items-center gap-1.5 px-5 py-1.5">
      {crumbs.map(({ label, href, last }, i) => (
        <span key={href} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                 style={{ color: 'var(--muted)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
          {last ? (
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
          ) : (
            <Link href={href} className="text-xs transition-colors" style={{ color: 'var(--text-dim)' }}>
              {label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
