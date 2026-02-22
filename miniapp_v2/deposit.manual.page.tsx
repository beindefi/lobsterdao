'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { VAULT_CONFIG, type VaultType } from '@/lib/constants'
import { formatUSD } from '@/lib/format'
import { usePrivy } from '@privy-io/react-auth'
import { useWallets } from '@privy-io/react-auth'

const BANK_DETAILS = {
  bankName:      'Providus Bank',
  accountName:   'SquirrelFi Limited',
  accountNumber: '5401234567',
  sortCode:      '000031',
}

export default function ManualDepositPage() {
  const params       = useSearchParams()
  const vault        = (params.get('vault') ?? 'autosave') as VaultType
  const amount       = params.get('amount') ?? '0'
  const currency     = params.get('currency') ?? 'NGN'
  const fiatAmt      = params.get('fiatAmt') ?? '0'
  const cfg          = VAULT_CONFIG[vault]
  const { wallets }  = useWallets()
  const walletAddr   = wallets?.[0]?.address

  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const CopyRow = ({ label, value, copyKey }: { label: string; value: string; copyKey: string }) => (
    <div className="flex items-center justify-between py-3"
         style={{ borderBottom: '1px solid var(--border)' }}>
      <div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text)' }}>{value}</p>
      </div>
      <button
        onClick={() => copy(value, copyKey)}
        className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
        style={{
          background: copied === copyKey ? 'var(--teal)' + '20' : 'var(--bg-card)',
          color: copied === copyKey ? 'var(--teal)' : 'var(--text-muted)',
          border: '1px solid var(--border)'
        }}
      >
        {copied === copyKey ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <PageHeader title="Bank Transfer" subtitle="Pay via bank transfer to deposit" />

      <div className="px-5 pt-4 pb-8 flex flex-col gap-5">

        {/* Amount to pay */}
        <div className="p-4 rounded-2xl text-center"
             style={{ background: `${cfg.color}10`, border: `1px solid ${cfg.color}30` }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Transfer exactly</p>
          <p className="text-3xl font-bold" style={{ color: cfg.color }}>
            {currency === 'NGN' ? '₦' : currency === 'GHS' ? '₵' : '$'}{parseFloat(fiatAmt).toLocaleString()}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>≈ {formatUSD(parseFloat(amount))} → {cfg.emoji} {cfg.name}</p>
        </div>

        {/* Bank details */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div className="px-4 pt-4 pb-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Bank details</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Transfer to this account</p>
          </div>
          <div className="px-4">
            <CopyRow label="Bank"           value={BANK_DETAILS.bankName}      copyKey="bank" />
            <CopyRow label="Account name"   value={BANK_DETAILS.accountName}   copyKey="name" />
            <CopyRow label="Account number" value={BANK_DETAILS.accountNumber} copyKey="acct" />
            <div className="py-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sort code</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text)' }}>{BANK_DETAILS.sortCode}</p>
            </div>
          </div>
        </div>

        {/* Wallet address */}
        {walletAddr && (
          <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Your wallet address</p>
            <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Powered by Privy — your embedded wallet on Base L2</p>
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-mono flex-1 truncate" style={{ color: 'var(--gold)' }}>{walletAddr}</p>
              <button
                onClick={() => copy(walletAddr, 'wallet')}
                className="text-xs font-medium shrink-0"
                style={{ color: copied === 'wallet' ? 'var(--teal)' : 'var(--text-muted)' }}
              >
                {copied === 'wallet' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text)' }}>How it works</p>
          {[
            { step: '1', text: `Transfer exactly ${currency === 'NGN' ? '₦' : ''}${parseFloat(fiatAmt).toLocaleString()} to the account above` },
            { step: '2', text: 'Use your name or Telegram username as the transfer reference' },
            { step: '3', text: 'We verify and credit your vault within 1-3 hours' },
            { step: '4', text: 'You\'ll get a Telegram notification when funds arrive' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                   style={{ color: '#0F0F1A' }}>
                {step}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl flex items-start gap-2"
             style={{ background: 'var(--gold)' + '10', border: '1px solid ' + 'var(--gold)' + '30' }}>
          <span className="text-lg">⚠️</span>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Always transfer the exact amount shown. Incorrect amounts may cause delays. Contact support if funds don't arrive within 3 hours.
          </p>
        </div>

        <Button variant="primary" fullWidth href="/home">
          Done — I've made the transfer
        </Button>
      </div>
    </div>
  )
}
