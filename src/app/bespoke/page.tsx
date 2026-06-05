'use client'
// src/app/bespoke/page.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { SectionHeader, Reveal, Toast } from '@/components/ui'

const occasions = [
  'Wedding / Engagement',
  'Corporate / Black-tie',
  'Cultural Ceremony',
  'Red Carpet / Event',
  'Everyday Luxury',
  'Other',
]

export default function BespokePage() {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    occasion: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name || !form.phone || !form.email) {
      setToast('Please fill in all required fields.')
      return
    }
    setSubmitting(true)

    const supabase = createClient()
    const { error } = await supabase.from('bespoke_bookings').insert({
      full_name: form.full_name,
      phone: form.phone,
      email: form.email,
      occasion: form.occasion || null,
      notes: form.notes || null,
    })

    if (error) {
      setToast('Submission failed. Please try again or contact us directly.')
    } else {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  return (
    <div className="pt-24 pb-28">
      <div className="section-inner" style={{ maxWidth: 680 }}>
        <SectionHeader tag="Tailored for You" title="Bespoke Booking" className="mb-16" />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black-soft border border-gold/30 p-14 text-center"
          >
            <div className="text-4xl text-gold mb-6">✦</div>
            <h3 className="heading-display text-2xl mb-4">Request Received</h3>
            <p className="text-muted max-w-xs mx-auto">
              Thank you, {form.full_name.split(' ')[0]}. A stylist will reach out within
              24 hours to discuss your bespoke journey.
            </p>
          </motion.div>
        ) : (
          <Reveal>
            <div className="bg-black-soft border border-border p-10 md:p-14">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-silver mb-10">
                Complete the form and a stylist will contact you within 24 hours
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="field-label">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.full_name}
                      onChange={set('full_name')}
                      placeholder="Your full name"
                      className="field-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="field-label">
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+234 xxx xxxx"
                      className="field-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="email" className="field-label">
                      Email <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="your@email.com"
                      className="field-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="occasion" className="field-label">Occasion</label>
                    <select
                      id="occasion"
                      value={form.occasion}
                      onChange={set('occasion')}
                      className="field-input bg-transparent cursor-pointer"
                    >
                      <option value="" className="bg-black-soft">Select occasion...</option>
                      {occasions.map(o => (
                        <option key={o} value={o} className="bg-black-soft">{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="field-label">Your Vision</label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={set('notes') as React.ChangeEventHandler<HTMLTextAreaElement>}
                    placeholder="Describe your dream piece, colour preferences, inspirations..."
                    rows={4}
                    className="field-input resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 pointer-events-none" />
                  <span className="relative z-10">
                    {submitting ? 'Submitting...' : 'Submit Booking Request'}
                  </span>
                </button>
              </form>
            </div>
          </Reveal>
        )}
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  )
}
