'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { VAULT_CONFIG, CURRENCIES, type VaultType, type Currency } from '@/lib/constants'
import { useRates } from '@/hooks/useRates'
import { formatUSD, formatFiat } from '@/lib/format'
import { haptic } from '@/lib/telegram'

type DepositMethod = 'card' | 'bank'

export default function DepositPage() {
  const router  = useRouter()
  const { data: rates } = useRates()

  const [selectedVault, setSelectedVault]       = useState<VaultType>('autosave')
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('NGN')
  const [amount, setAmount]                     = useState('')
  const [method, setMethod]                     = useState<DepositMethod>('bank')

  const cfg       = VAULT_CONFIG[selectedVault]
  const rate      = rates?.[selectedCurrency] ?? 1
  const amountNum = parseFloat(amount.replace(/,/g, '')) || 0
  const usdAmount = selectedCurrency === 'USD' ? amountNum : amountNum / rate
  const minDeposit = cfg.minDeposit

  const handleContinue = () => {
    if (usdAmount < minDeposit) return
    haptic('medium')
    const params = new URLSearchParams({
      vault:    selectedVault,
      amount:   usdAmount.toFixed(2),
      currency: selectedCurrency,
      fiatAmt:  amountNum.toFixed(2),
    })
    if (method === 'bank') {
      router.push(`/deposit/manual?${params}`)
    } else {
      router.push(`/deposit/confirm?${params}`)
    }
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--bg)' }}>
      <PageHeader title="Deposit" subtitle="Convert fiat to dollar savings" />

      <div className="px-5 pt-6 flex flex-col gap-6">

        {/* Vault selection */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>Choose vault</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.values(VAULT_CONFIG) as typeof VAULT_CONFIG[VaultType][]).map((v) => (
              <button
                key={v.id}
                onClick={() => { setSelectedVault(v.id as VaultType); haptic('select') }}
                className="p-3 rounded-2xl text-left transition-all"
                style={selectedVault === v.id ? {
                  background: `${v.color}12`,
                  border: `1px solid ${v.color}`,
                } : {
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xl">{v.emoji}</span>
                  {selectedVault === v.id && <span className="text-lg" style={{ color: v.color }}>✓</span>}
                </div>
                <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text)' }}>{v.name}</p>
                <p className="text-xs mt-0.5" style={{ color: v.color }}>{v.apy.display} APY</p>
              </button>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>Payment method</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMethod('bank'); haptic('select') }}
              className="p-3 rounded-2xl text-left transition-all"
              style={method === 'bank' ? {
                background: 'var(--gold)' + '12',
                border: '1px solid var(--gold)',
              } : {
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <span className="text-xl">🏦</span>
              <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text)' }}>Bank Transfer</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>1-3 hrs · Free</p>
            </button>
            <button
              onClick={() => { setMethod('card'); haptic('select') }}
              className="p-3 rounded-2xl text-left transition-all relative"
              style={method === 'card' ? {
                background: 'var(--teal)' + '12',
                border: '1px solid var(--teal)',
              } : {
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <span className="text-xl">💳</span>
              <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text)' }}>Card / Paystack</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--teal)' }}>Instant · Coming soon</p>
            </button>
          </div>
        </div>

        {/* Currency selection */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>Currency</p>
          <div className="flex gap-2">
            {(Object.entries(CURRENCIES) as [Currency, typeof CURRENCIES[Currency]][]).map(([code, cur]) => (
              <button
                key={code}
                onClick={() => { setSelectedCurrency(code); haptic('select') }}
                className="flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all"
                style={selectedCurrency === code ? {
                  border: '1px solid var(--gold)',
                  background: 'var(--gold)' + '10',
                  color: 'var(--gold)',
                } : {
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                }}
              >
                {cur.flag} {code}
              </button>
            ))}
          </div>
        </div>

        {/* Amount input */}
        <Input
          label={`Amount (${selectedCurrency})`}
          type="number"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          startIcon={<span className="text-lg">{CURRENCIES[selectedCurrency].symbol}</span>}
          helper={
            amountNum > 0
              ? `≈ ${formatUSD(usdAmount)} · Min ${formatUSD(minDeposit)}`
              : `Min ${formatFiat(minDeposit * rate, selectedCurrency)}`
          }
          error={amountNum > 0 && usdAmount < minDeposit ? `Minimum deposit is ${formatUSD(minDeposit)}` : undefined}
        />

        {/* Live rate */}
        {selectedCurrency !== 'USD' && rates && (
          <div className="flex items-center justify-between p-3 rounded-xl"
               style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Live rate</span>
            <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>
              1 USD = {CURRENCIES[selectedCurrency].symbol}{rates[selectedCurrency].toLocaleString()}
            </span>
          </div>
        )}

        {/* Vault info */}
        <div className="p-4 rounded-2xl"
             style={{ background: `${cfg.color}08`, border: `1px solid ${cfg.color}25` }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{cfg.emoji} {cfg.name}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cfg.description}</p>
          {cfg.lockPeriod && (
            <p className="text-xs mt-2 font-medium" style={{ color: cfg.color }}>
              🔒 Min {cfg.lockPeriod.min}-month lock
            </p>
          )}
        </div>

        <Button fullWidth size="lg" disabled={usdAmount < minDeposit} onClick={handleContinue}>
          {method === 'bank' ? '🏦 ' : '💳 '}
          Continue — {usdAmount > 0 ? formatUSD(usdAmount) : formatUSD(minDeposit)}
        </Button>
      </div>
    </div>
  )
}
