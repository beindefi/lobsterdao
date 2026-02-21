'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { BottomNav } from '@/components/layout/BottomNav'

interface Toggle {
  label: string
  desc:  string
  emoji: string
  key:   string
}

const TOGGLES: Toggle[] = [
  { label: 'Yield updates',       desc: 'Daily yield credited to your vaults',    emoji: '📈', key: 'yield' },
  { label: 'Deposit confirmed',   desc: 'When your deposit is processed',          emoji: '💳', key: 'deposit' },
  { label: 'Withdrawal sent',     desc: 'When funds are sent to your bank',        emoji: '💸', key: 'withdraw' },
  { label: 'Rate alerts',         desc: 'When NGN/USD rate changes significantly', emoji: '📊', key: 'rates' },
  { label: 'Security alerts',     desc: 'New login or suspicious activity',        emoji: '🔐', key: 'security' },
  { label: 'Referral earnings',   desc: 'When a referral earns you rewards',       emoji: '🎁', key: 'referral' },
]

export default function NotificationsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    yield: true, deposit: true, withdraw: true, rates: false, security: true, referral: true,
  })

  const toggle = (key: string) => setEnabled(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <PageHeader title="Notifications" subtitle="Manage your alert preferences" />
      <div className="px-5 pt-4 pb-nav">
        <div className="card overflow-hidden mb-6">
          {TOGGLES.map(({ label, desc, emoji, key }, i) => (
            <div key={key} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-[#2A2A3E]' : ''}`}>
              <span className="text-xl">{emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-[#9999BB]">{desc}</p>
              </div>
              <button
                onClick={() => toggle(key)}
                className={`w-11 h-6 rounded-full transition-colors relative ${enabled[key] ? 'bg-[#F5A623]' : 'bg-[#2A2A3E]'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#6666AA] text-center">
          Notifications are sent via Telegram bot. Make sure you've started @squirrelfibot.
        </p>
      </div>
      <BottomNav />
    </div>
  )
}
