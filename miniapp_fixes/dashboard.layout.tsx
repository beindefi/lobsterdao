import { BottomNav } from '@/components/layout/BottomNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <main className="pb-nav">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
