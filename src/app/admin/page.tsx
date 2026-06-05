'use client'
// src/app/admin/page.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UploadPanel } from '@/components/admin/UploadPanel'
import { OrdersPanel } from '@/components/admin/OrdersPanel'
import { CollectionGrid } from '@/components/sections/CollectionGrid'
import { useCollections } from '@/hooks/useCollections'
import { useOrders } from '@/hooks/useOrders'

type Tab = 'overview' | 'collections' | 'orders'

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'collections', label: 'Collections' },
  { id: 'orders', label: 'Orders' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const { collections, refetch } = useCollections()
  const { orders } = useOrders()

  const activeOrders = orders.filter(o => o.status !== 'Delivered').length
  const pendingBookings = 0 // Would come from bespoke_bookings table

  return (
    <div className="pt-24 pb-28">
      <div className="section-inner">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[0.5rem] tracking-ultra uppercase text-gold block mb-2">
            Control Panel
          </span>
          <h1 className="heading-display text-[clamp(2rem,5vw,3rem)]">Admin Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12" style={{ background: 'rgba(212,175,55,0.08)' }}>
          {[
            { label: 'Pieces', value: collections.length },
            { label: 'Active Orders', value: activeOrders },
            { label: 'Pending Bookings', value: pendingBookings },
            { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
          ].map(stat => (
            <div key={stat.label} className="bg-black-soft p-8 text-center">
              <div className="font-serif text-[2.5rem] font-light text-gold leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[0.5rem] tracking-[0.3em] uppercase text-silver">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3.5 text-[0.55rem] tracking-[0.3em] uppercase transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-gold border-b-2 border-gold -mb-px'
                  : 'text-silver hover:text-white border-b-2 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UploadPanel onSuccess={refetch} />
              <div className="space-y-6">
                <OrdersPanel />
              </div>
            </div>
          )}

          {activeTab === 'collections' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <UploadPanel onSuccess={refetch} />
              </div>
              <div className="admin-panel">
                <p className="panel-heading">Live Collection Preview</p>
                <CollectionGrid />
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="max-w-4xl">
              <OrdersPanel />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
