'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { BottomNav } from '@/components/layout/BottomNav'

const SECURITY_ITEMS = [
  { label: 'Two-factor authentication', value: 'Via Telegram', emoji: '🔐', enabled: true },
  { label: 'Login notifications', value: 'Enabled', emoji: '🔔', enabled: true },
  { label: 'Withdrawal confirmation', value: 'Required', emoji: '✅', enabled: true },
  { label: 'Session timeout', value: '30 minutes', emoji: '⏱', enabled: true },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <PageHeader title="Security" subtitle="Your account protection settings" />
      <div className="px-5 pt-4 pb-nav">

        <div className="card p-4 mb-4 flex items-center gap-3"
             style={{ background: 'linear-gradient(135deg, #00B8A9/10, #4ECDC4/5)', border: '1px solid #00B8A9/20' }}>
          <span className="text-2xl">🛡️</span>
          <div>
            <p className="text-sm font-semibold text-white">Your account is secure</p>
            <p className="text-xs text-[#9999BB]">All security features are active</p>
          </div>
        </div>

        <div className="card overflow-hidden mb-6">
          {SECURITY_ITEMS.map(({ label, value, emoji, enabled }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-[#2A2A3E]' : ''}`}>
              <span className="text-xl">{emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-[#9999BB]">{value}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-[#00B8A9]' : 'bg-[#3A3A5C]'}`} />
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl">
          <p className="text-xs text-[#6666AA] leading-relaxed">
            SquirrelFi uses your Telegram account for authentication. We never store passwords. Your funds are secured by smart contracts on Base L2.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
