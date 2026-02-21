'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { Button } from '@/components/ui/Button'
import { usePrivy } from '@privy-io/react-auth'
import { useTelegram } from '@/hooks/useTelegram'

export default function ReferralPage() {
  const { user: privyUser } = usePrivy()
  const { user: tgUser } = useTelegram()
  const [copied, setCopied] = useState(false)

  const userId = privyUser?.id?.slice(-8) ?? 'xxxxxxxx'
  const referralCode = `SQ${userId.toUpperCase()}`
  const referralLink = `https://t.me/squirrelfibot/squirrelfi?start=${referralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <PageHeader title="Referral" subtitle="Earn $5 for every friend you invite" />
      <div className="px-5 pt-4 pb-nav">

        {/* Earnings banner */}
        <div className="card p-5 mb-6 text-center"
             style={{ background: 'linear-gradient(135deg, #8B5CF6/20, #A78BFA/10)', border: '1px solid #8B5CF6/30' }}>
          <p className="text-4xl mb-2">🎁</p>
          <p className="text-2xl font-bold text-white mb-1">$0.00</p>
          <p className="text-sm text-[#9999BB]">Total referral earnings</p>
          <div className="flex justify-center gap-6 mt-4">
            <div>
              <p className="text-lg font-bold text-white">0</p>
              <p className="text-xs text-[#9999BB]">Invited</p>
            </div>
            <div className="w-px bg-[#2A2A3E]" />
            <div>
              <p className="text-lg font-bold text-[#00B8A9]">0</p>
              <p className="text-xs text-[#9999BB]">Active</p>
            </div>
            <div className="w-px bg-[#2A2A3E]" />
            <div>
              <p className="text-lg font-bold text-[#F5A623]">$5</p>
              <p className="text-xs text-[#9999BB]">Per referral</p>
            </div>
          </div>
        </div>

        {/* Referral link */}
        <div className="card p-4 mb-4">
          <p className="text-xs font-medium text-[#9999BB] mb-2">Your referral code</p>
          <div className="flex items-center gap-3 p-3 bg-[#0F0F1A] rounded-xl border border-[#2A2A3E]">
            <span className="text-sm font-mono text-[#F5A623] flex-1">{referralCode}</span>
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-[#9999BB] hover:text-white transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy link'}
            </button>
          </div>
        </div>

        <Button variant="primary" fullWidth onClick={handleCopy}>
          {copied ? '✓ Link copied!' : 'Share referral link'}
        </Button>

        {/* How it works */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-white mb-3">How it works</p>
          <div className="flex flex-col gap-3">
            {[
              { step: '1', text: 'Share your unique referral link with friends' },
              { step: '2', text: 'They sign up and make their first deposit' },
              { step: '3', text: 'You both earn $5 credited to your vaults' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center text-xs font-bold text-[#0F0F1A] shrink-0 mt-0.5">
                  {step}
                </div>
                <p className="text-sm text-[#9999BB]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
