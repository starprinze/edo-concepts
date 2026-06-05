'use client'
// src/components/sections/WaybillTracker.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOrderTracker } from '@/hooks/useOrders'
import type { OrderStatus } from '@/types/database'

const STEPS: OrderStatus[] = [
  'Order Received',
  'Fabric Cutting',
  'Tailoring & Fit',
  'Dispatched',
  'Delivered',
]

function getStepIndex(status: OrderStatus) {
  return STEPS.indexOf(status)
}

function StepIcon({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-black" aria-hidden="true">
        <path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (active) {
    return <span className="w-2 h-2 rounded-full bg-gold" />
  }
  return <span className="w-2 h-2 rounded-full bg-border" />
}

export function WaybillTracker() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { order, loading, error, searched, trackOrder } = useOrderTracker()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() && !phone.trim()) return
    trackOrder(name.trim(), phone.trim())
  }

  const currentStep = order ? getStepIndex(order.status) : -1

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="bg-black-soft border border-border p-10 md:p-14">
        <h2 className="heading-display text-[1.8rem] mb-1">Track Your Order</h2>
        <p className="text-[0.6rem] tracking-[0.3em] uppercase text-silver mb-10">
          Enter your details to view live order status
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="track-name" className="field-label">Full Name</label>
              <input
                id="track-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="As on your order"
                className="field-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="track-phone" className="field-label">Phone Number</label>
              <input
                id="track-phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+234 xxx xxxx"
                className="field-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 pointer-events-none" />
            <span className="relative z-10">
              {loading ? 'Searching...' : 'Track Order'}
            </span>
          </button>
        </form>

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-10 pt-8 border-t border-border">
                {error ? (
                  <p className="text-[0.6rem] tracking-wide uppercase text-silver/50 text-center">
                    {error}
                  </p>
                ) : order ? (
                  <>
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <p className="text-[0.5rem] tracking-ultra uppercase text-silver mb-1">
                          Order Status
                        </p>
                        <p className="heading-label text-white text-[0.75rem]">
                          {order.client_name}
                        </p>
                        <p className="text-[0.55rem] tracking-wide text-silver/60 mt-0.5 uppercase">
                          {order.item_description}
                        </p>
                      </div>
                      <span className="text-[0.5rem] tracking-[0.2em] uppercase border border-gold text-gold px-3 py-1">
                        {order.tracking_code}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col gap-0">
                      {STEPS.map((step, i) => {
                        const done = i < currentStep
                        const active = i === currentStep

                        return (
                          <div key={step} className="flex gap-4 relative">
                            {/* Connector line */}
                            {i < STEPS.length - 1 && (
                              <div
                                className="absolute left-[13px] top-8 bottom-0 w-px"
                                style={{
                                  background: done
                                    ? 'var(--gold)'
                                    : 'var(--border)',
                                }}
                              />
                            )}

                            {/* Dot */}
                            <motion.div
                              initial={false}
                              animate={{
                                borderColor: done || active ? 'var(--gold)' : 'var(--border)',
                                backgroundColor: done
                                  ? 'var(--gold)'
                                  : active
                                  ? 'transparent'
                                  : 'transparent',
                                boxShadow: active
                                  ? '0 0 14px rgba(212,175,55,0.35)'
                                  : 'none',
                              }}
                              transition={{ duration: 0.4, delay: i * 0.08 }}
                              className="relative z-10 w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 mt-1"
                            >
                              <StepIcon done={done} active={active} />
                            </motion.div>

                            {/* Text */}
                            <div className="pb-6">
                              <p
                                className="text-[0.65rem] tracking-[0.2em] uppercase font-medium"
                                style={{
                                  color: active
                                    ? 'var(--gold)'
                                    : done
                                    ? 'var(--white)'
                                    : 'rgba(154,154,154,0.5)',
                                }}
                              >
                                {step}
                              </p>
                              <p className="text-[0.5rem] tracking-wide text-silver/40 mt-0.5">
                                {done ? 'Completed' : active ? 'In Progress' : 'Pending'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
