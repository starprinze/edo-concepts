'use client'
// src/components/ui/index.tsx
// Reusable luxury UI primitives

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import clsx from 'clsx'

// ─── Button ──────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'admin'
  children: React.ReactNode
  asSpan?: boolean
}

export function Button({ variant = 'primary', children, className, asSpan, ...props }: ButtonProps) {
  const base = clsx(
    'relative overflow-hidden font-display uppercase tracking-luxe text-[0.6rem] cursor-pointer transition-colors duration-300',
    {
      'px-10 py-4 border border-gold text-gold bg-transparent hover:text-black': variant === 'primary',
      'px-6 py-3 border border-border text-silver bg-transparent hover:border-gold hover:text-gold': variant === 'ghost',
      'px-6 py-3 bg-gold text-black font-bold text-[0.55rem] hover:opacity-85 transition-opacity': variant === 'admin',
    },
    className
  )

  const fill =
    variant === 'primary' ? (
      <span className="absolute inset-0 bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 pointer-events-none" />
    ) : null

  if (asSpan) {
    return (
      <span className={clsx(base, 'group inline-block')}>
        {fill}
        <span className="relative z-10">{children}</span>
      </span>
    )
  }

  return (
    <button className={clsx(base, 'group')} {...props}>
      {fill}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// ─── Section Header ───────────────────────────────────────
interface SectionHeaderProps {
  tag?: string
  title: string
  className?: string
}

export function SectionHeader({ tag, title, className }: SectionHeaderProps) {
  return (
    <div className={clsx('text-center mb-16', className)}>
      {tag && (
        <span className="block text-[0.55rem] tracking-ultra uppercase text-gold mb-3">
          {tag}
        </span>
      )}
      <h2 className="heading-display text-[clamp(2rem,5vw,3.5rem)]">{title}</h2>
      <div className="gold-line mx-auto mt-5" />
    </div>
  )
}

// ─── Reveal on Scroll ─────────────────────────────────────
interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'none'
}

export function Reveal({ children, delay = 0, className, direction = 'up' }: RevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 30 : 0,
    x: direction === 'left' ? -30 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Gold Badge ───────────────────────────────────────────
export function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[0.55rem] tracking-ultra uppercase text-gold border border-gold/30 px-5 py-1.5">
      {children}
    </span>
  )
}

// ─── Skeleton ─────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('skeleton rounded-none', className)} />
}

// ─── Divider ──────────────────────────────────────────────
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={clsx('flex items-center gap-4', className)}>
      <div className="flex-1 h-px bg-border" />
      <div className="w-1 h-1 rotate-45 bg-gold" />
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────
import { AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string | null
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-[200] bg-black-soft border border-gold px-6 py-4 max-w-xs"
        >
          <p className="text-[0.6rem] tracking-wide uppercase text-gold leading-relaxed">
            {message}
          </p>
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-silver/50 hover:text-silver text-xs"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
