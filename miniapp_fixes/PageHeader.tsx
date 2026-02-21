'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode } from 'react'
import { clsx } from 'clsx'
import { Breadcrumb } from './Breadcrumb'

interface PageHeaderProps {
  title:        string
  subtitle?:    string
  back?:        boolean
  backHref?:    string
  action?:      ReactNode
  transparent?: boolean
  className?:   string
  breadcrumb?:  boolean
}

export function PageHeader({ title, subtitle, back = true, backHref, action, transparent, className, breadcrumb = true }: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) router.push(backHref)
    else          router.back()
  }

  return (
    <header className={clsx(
      'sticky top-0 z-30',
      !transparent && 'bg-[#0F0F1A]/95 backdrop-blur-md border-b border-[#2A2A3E]',
      className,
    )}>
      <div className="flex items-center gap-3 px-4 py-3">
        {back && (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-[#1A1A2E] border border-[#2A2A3E] flex items-center justify-center text-[#9999BB] hover:text-white transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-white truncate">{title}</h1>
          {subtitle && <p className="text-xs text-[#9999BB] truncate">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {breadcrumb && back && <Breadcrumb />}
    </header>
  )
}
