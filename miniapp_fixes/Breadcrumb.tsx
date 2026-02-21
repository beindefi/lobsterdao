'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LABELS: Record<string, string> = {
  home:          'Home',
  vaults:        'Vaults',
  deposit:       'Deposit',
  confirm:       'Confirm',
  success:       'Success',
  history:       'History',
  profile:       'Profile',
  bank:          'Bank Accounts',
  referral:      'Referral',
  security:      'Security',
  notifications: 'Notifications',
  support:       'Support',
  withdraw:      'Withdraw',
  onboarding:    'Onboarding',
  kyc:           'KYC',
}

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length <= 1) return null

  const crumbs = segments.map((seg, i) => ({
    label: LABELS[seg] ?? seg,
    href:  '/' + segments.slice(0, i + 1).join('/'),
    last:  i === segments.length - 1,
  }))

  return (
    <nav className="flex items-center gap-1.5 px-5 py-2">
      {crumbs.map(({ label, href, last }, i) => (
        <span key={href} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg className="w-3 h-3 text-[#3A3A5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
          {last ? (
            <span className="text-xs font-medium text-[#9999BB]">{label}</span>
          ) : (
            <Link href={href} className="text-xs text-[#6666AA] hover:text-[#9999BB] transition-colors">
              {label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
