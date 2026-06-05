// src/app/waybill/page.tsx
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { WaybillTracker } from '@/components/sections/WaybillTracker'

export const metadata: Metadata = {
  title: 'Waybill Tracker',
  description: 'Track your E.D.O Concepts bespoke order in real time.',
}

export default function WaybillPage() {
  return (
    <div className="pt-24 pb-28">
      <div className="section-inner">
        <SectionHeader tag="Order Tracking" title="Waybill Tracker" className="mb-16" />
        <WaybillTracker />
      </div>
    </div>
  )
}
