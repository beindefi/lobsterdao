import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { BottomNav } from '@/components/layout/BottomNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <DashboardHeader />
      <main className="pb-nav">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
