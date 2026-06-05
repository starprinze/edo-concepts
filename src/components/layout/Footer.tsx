// src/components/layout/Footer.tsx
import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/bespoke', label: 'Bespoke Booking' },
  { href: '/waybill', label: 'Waybill Tracker' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href: 'https://twitter.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-black-soft border-t border-border pt-16 pb-10 mt-0">
      <div className="section-inner">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display font-bold tracking-ultra text-gold text-[1.15rem] uppercase mb-4">
              E.D.O Concepts
            </div>
            <p className="text-[0.65rem] text-silver leading-[2] tracking-wide max-w-xs mb-8">
              A premium fashion house dedicated to the art of bespoke tailoring.
              Every piece tells a story — yours.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-border flex items-center justify-center text-silver
                             hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[0.5rem] tracking-ultra uppercase text-gold mb-4">Navigate</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.6rem] tracking-wide text-silver hover:text-white
                               no-underline transition-colors duration-300 uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.5rem] tracking-ultra uppercase text-gold mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              {['Lagos, Nigeria', 'info@edoconcepts.com', '+234 800 EDO 000'].map(item => (
                <li key={item} className="text-[0.6rem] tracking-wide text-silver uppercase">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-[0.55rem] tracking-ultra uppercase text-gold/40">
            Thanks for your patronage
          </span>
          <span className="text-[0.5rem] tracking-wide text-silver/30 uppercase">
            © {new Date().getFullYear()} E.D.O Concepts. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
