'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { Button } from '@/components/ui/Button'

export default function BankAccountsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <PageHeader title="Bank Accounts" subtitle="Manage withdrawal destinations" />
      <div className="px-5 pt-4 pb-nav">
        <div className="card p-8 text-center mt-4">
          <p className="text-4xl mb-3">🏦</p>
          <p className="text-base font-semibold text-white mb-1">No bank accounts yet</p>
          <p className="text-sm text-[#9999BB] mb-6">Add a bank account to withdraw your savings directly to your local currency</p>
          <Button variant="primary" fullWidth>
            Add bank account
          </Button>
        </div>
        <div className="mt-6 p-4 bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl">
          <p className="text-xs text-[#6666AA] leading-relaxed">
            Bank account withdrawals are processed within 1-3 business days. Supported: Nigerian banks (NGN), Ghanaian banks (GHS), Kenyan M-Pesa (KES).
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
