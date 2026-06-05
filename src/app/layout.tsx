// src/app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, League_Spartan } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-league',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'E.D.O Concepts — Premium Fashion House',
    template: '%s | E.D.O Concepts',
  },
  description:
    'A bespoke atelier for the discerning individual. Premium tailoring, curated collections, and a cinematic fashion experience.',
  keywords: ['bespoke tailoring', 'luxury fashion', 'Nigerian fashion', 'agbada', 'fashion house'],
  openGraph: {
    title: 'E.D.O Concepts — Premium Fashion House',
    description: 'Crafted with intentional excellence.',
    type: 'website',
    locale: 'en_NG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${leagueSpartan.variable}`}
    >
      <body>
        <Header />
        <PageTransition>
          <main className="page-wrapper">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
