'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex flex-col items-center justify-center px-5 text-center">
      <div className="mb-6 relative">
        <div className="text-8xl animate-bounce">🐿</div>
        <div className="absolute -top-2 -right-4 text-3xl">❓</div>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Lost in the forest</h1>
      <p className="text-sm text-[#9999BB] mb-2">This page doesn't exist or has been moved.</p>
      <p className="text-xs text-[#6666AA] mb-8 font-mono">404 — Page not found</p>
      <div className="flex flex-col gap-3 w-full max-w-[240px]">
        <Button href="/home" variant="primary" fullWidth>
          Go home
        </Button>
        <Button href="/deposit" variant="ghost" fullWidth>
          Make a deposit
        </Button>
      </div>
    </div>
  )
}
