'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { Button } from '@/components/ui/Button'

const FAQS = [
  { q: 'How long do deposits take?', a: 'NGN deposits via Paystack are instant. USD deposits settle within 1 business day.' },
  { q: 'When can I withdraw?', a: 'AutoSave and CryptoFlex vaults allow withdrawals anytime. SafeLock vaults require waiting until the lock period ends.' },
  { q: 'How is yield generated?', a: 'Yield comes from DeFi protocols on Base L2 — primarily AAVE and Compound lending pools.' },
  { q: 'Is my money safe?', a: 'Funds are held in audited smart contracts on Base L2. We never have direct custody of your assets.' },
  { q: 'What are the fees?', a: 'SquirrelFi charges 0.5% on withdrawals. Deposits are free. Gas fees on Base are typically under $0.01.' },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <PageHeader title="Support" subtitle="Help & frequently asked questions" />
      <div className="px-5 pt-4 pb-nav">

        {/* Contact */}
        <div className="card p-4 mb-6">
          <p className="text-sm font-semibold text-white mb-3">Contact us</p>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" fullWidth href="https://t.me/squirrelfi_support">
              💬 Chat on Telegram
            </Button>
            <Button variant="ghost" fullWidth href="mailto:support@squirrelfi.app">
              ✉️ Email support
            </Button>
          </div>
        </div>

        {/* FAQs */}
        <p className="text-sm font-semibold text-white mb-3">Frequently asked questions</p>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="card p-4">
              <p className="text-sm font-medium text-white mb-1.5">{q}</p>
              <p className="text-xs text-[#9999BB] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl text-center">
          <p className="text-xs text-[#6666AA]">Average response time: under 2 hours</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
