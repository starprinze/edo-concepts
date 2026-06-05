'use client'
// src/components/sections/HeroSection.tsx
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const lineGrow = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 bg-hero-radial pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-border/40" />
        <div className="absolute right-[10%] top-0 bottom-0 w-px bg-border/40" />
        <div className="absolute left-0 right-0 top-[20%] h-px bg-border/20" />
        <div className="absolute left-0 right-0 bottom-[20%] h-px bg-border/20" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-block text-[0.55rem] tracking-ultra uppercase text-gold border border-gold/30 px-5 py-1.5 mb-10">
            Lagos · London · New York
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="heading-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.95] mb-4"
        >
          E.D.O
          <br />
          <em className="italic text-gold not-italic" style={{ fontStyle: 'italic' }}>
            Concepts
          </em>
        </motion.h1>

        {/* Gold line */}
        <motion.div
          variants={lineGrow}
          className="w-16 h-px bg-gold origin-center mb-8"
        />

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-[0.65rem] tracking-[0.35em] uppercase text-silver mb-12 max-w-sm"
        >
          A bespoke atelier for the discerning individual
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/collections">
            <Button>Explore Collections</Button>
          </Link>
          <Link href="/bespoke">
            <Button variant="ghost">Book Bespoke</Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-gold/80 to-transparent animate-scroll-line" />
        <span className="text-[0.45rem] tracking-ultra uppercase text-silver/50">Scroll</span>
      </motion.div>
    </section>
  )
}
