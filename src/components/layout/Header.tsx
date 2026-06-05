'use client'
// src/components/layout/Header.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/bespoke', label: 'Bespoke' },
  { href: '/waybill', label: 'Waybill' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 transition-all duration-500',
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-border-gold'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        {/* Logo */}
        <Link href="/" className="font-display font-bold tracking-luxe text-gold text-[1.05rem] uppercase no-underline">
          E.D.O
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'font-sans text-[0.6rem] tracking-[0.25em] uppercase no-underline transition-colors duration-300',
                pathname === link.href ? 'text-gold' : 'text-silver hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className={clsx(
              'font-sans text-[0.6rem] tracking-[0.25em] uppercase no-underline border px-4 py-1.5 transition-all duration-300',
              pathname.startsWith('/admin')
                ? 'border-gold text-gold'
                : 'border-border text-silver hover:border-gold hover:text-gold'
            )}
          >
            Admin
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={clsx('block w-6 h-px bg-silver transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={clsx('block w-6 h-px bg-silver transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={clsx('block w-6 h-px bg-silver transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black-soft/95 backdrop-blur-xl border-b border-border-gold px-8 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-sans text-[0.65rem] tracking-[0.3em] uppercase no-underline transition-colors duration-300',
                  pathname === link.href ? 'text-gold' : 'text-silver'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" className="font-sans text-[0.65rem] tracking-[0.3em] uppercase no-underline text-gold">
              Admin ↗
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
