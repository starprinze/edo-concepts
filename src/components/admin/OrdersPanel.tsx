'use client'
// src/components/admin/OrdersPanel.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOrders } from '@/hooks/useOrders'
import { Toast } from '@/components/ui'
import type { OrderStatus } from '@/types/database'
import clsx from 'clsx'

const ALL_STATUSES: OrderStatus[] = [
  'Order Received',
  'Fabric Cutting',
  'Tailoring & Fit',
  'Dispatched',
  'Delivered',
]

const statusColors: Record<OrderStatus, string> = {
  'Order Received': 'border-silver/40 text-silver',
  'Fabric Cutting': 'border-gold/50 text-gold/70',
  'Tailoring & Fit': 'border-gold text-gold',
  'Dispatched': 'border-green-500/70 text-green-400',
  'Delivered': 'border-green-400 text-green-300',
}

export function OrdersPanel() {
  const { orders, loading, error, updateStatus } = useOrders()
  const [toast, setToast] = useState<string | null>(null)

  const handleStatusChange = async (id: string, status: OrderStatus, name: string) => {
    const ok = await updateStatus(id, status)
    if (ok) setToast(`${name}'s order updated to "${status}"`)
    else setToast('Failed to update status. Please try again.')
  }

  if (error) {
    return (
      <div className="admin-panel">
        <p className="panel-heading">Order Management</p>
        <p className="text-[0.6rem] uppercase text-silver/50 text-center py-8">
          Unable to load orders.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="admin-panel">
        <p className="panel-heading">Order Management</p>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 skeleton" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-[0.6rem] uppercase text-silver/40 text-center py-8">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Orders">
              <thead>
                <tr className="border-b border-border">
                  {['Client', 'Item', 'Tracking', 'Status', 'Action'].map(h => (
                    <th
                      key={h}
                      className="text-left text-[0.5rem] tracking-[0.3em] uppercase text-silver pb-3 pr-4 font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/40 hover:bg-black-mid/30 transition-colors"
                  >
                    <td className="py-3 pr-4 text-[0.65rem] text-white">
                      {order.client_name}
                    </td>
                    <td className="py-3 pr-4 text-[0.6rem] text-silver max-w-[140px] truncate">
                      {order.item_description}
                    </td>
                    <td className="py-3 pr-4 text-[0.55rem] tracking-[0.15em] text-silver/50">
                      {order.tracking_code}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={clsx(
                          'text-[0.45rem] tracking-[0.2em] uppercase border px-2.5 py-1',
                          statusColors[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={e =>
                          handleStatusChange(order.id, e.target.value as OrderStatus, order.client_name)
                        }
                        className="bg-transparent border-b border-border text-silver text-[0.55rem] tracking-[0.1em] py-1 cursor-pointer font-sans outline-none hover:border-gold transition-colors"
                        aria-label={`Update status for ${order.client_name}`}
                      >
                        {ALL_STATUSES.map(s => (
                          <option key={s} value={s} className="bg-black-soft">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  )
}
