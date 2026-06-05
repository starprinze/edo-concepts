// src/app/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/sections/HeroSection'
import { CollectionGrid } from '@/components/sections/CollectionGrid'
import { SectionHeader, Reveal, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'E.D.O Concepts — Premium Fashion House',
}

const processSteps = [
  {
    num: '01',
    title: 'Consultation',
    body: 'Vision meets expertise. We discuss your aesthetic, occasion, and personal narrative in depth.',
  },
  {
    num: '02',
    title: 'Selection',
    body: 'Curated fabrics sourced globally. You choose with our expert guidance and discernment.',
  },
  {
    num: '03',
    title: 'Creation',
    body: 'Master tailors construct your garment with obsessive attention to every stitch and silhouette.',
  },
  {
    num: '04',
    title: 'Delivery',
    body: 'Your piece arrives, tracked and insured, wrapped in the E.D.O signature manner.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About ── */}
      <section className="py-28 bg-black-soft">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Visual placeholder */}
            <Reveal direction="left">
              <div className="aspect-[4/5] bg-black-mid border border-border relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-purple-veil"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center font-serif text-[6rem] text-gold/8 tracking-[0.3em] select-none"
                  aria-hidden="true"
                >
                  E.D.O
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <span className="text-[0.5rem] tracking-ultra uppercase text-gold mb-6 block">
                The House
              </span>
              <h2 className="heading-display text-[clamp(2rem,4vw,3rem)] mb-6">
                Crafted with Intentional{' '}
                <em className="italic text-gold">Excellence</em>
              </h2>
              <p className="text-muted mb-5">
                E.D.O Concepts is not simply a fashion label — it is a philosophy of dressing.
                Every silhouette is an architectural study, every fabric a deliberate choice,
                every stitch a testament to our devotion to the craft.
              </p>
              <p className="text-muted mb-10">
                From initial consultation to final fitting, we orchestrate an experience as
                refined as the garments themselves. Based in Lagos, reaching the world.
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { num: '12+', label: 'Years of craft' },
                  { num: '500+', label: 'Bespoke pieces' },
                  { num: '3', label: 'Continents' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <span className="font-serif text-[2.2rem] font-light text-gold block leading-none mb-1">
                      {stat.num}
                    </span>
                    <span className="text-[0.5rem] tracking-[0.25em] uppercase text-silver">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Featured Collections ── */}
      <section className="py-28">
        <div className="section-inner">
          <SectionHeader tag="Latest Work" title="Featured Pieces" />
          <CollectionGrid featuredOnly limit={3} />
          <div className="text-center mt-12">
            <Link href="/collections">
              <Button>View All Collections</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-28 bg-black-soft">
        <div className="section-inner">
          <SectionHeader tag="The Process" title="Bespoke Journey" />
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: 'rgba(212,175,55,0.08)' }}
          >
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="bg-black-soft p-10 text-center h-full">
                  <div className="font-serif text-[2.5rem] font-light text-gold mb-5 leading-none">
                    {step.num}
                  </div>
                  <div className="text-[0.6rem] tracking-[0.3em] uppercase mb-3">{step.title}</div>
                  <p className="text-[0.65rem] text-silver leading-[1.9]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-hero-radial pointer-events-none"
          aria-hidden="true"
        />
        <div className="section-inner text-center relative z-10">
          <Reveal>
            <span className="text-[0.5rem] tracking-ultra uppercase text-gold mb-6 block">
              Begin Your Journey
            </span>
            <h2 className="heading-display text-[clamp(2rem,5vw,4rem)] mb-6">
              Ready to be Dressed<br />
              <em className="italic text-gold">Exceptionally?</em>
            </h2>
            <div className="gold-line mx-auto mb-8" />
            <p className="text-muted mb-12 max-w-md mx-auto">
              Each bespoke piece begins with a conversation. Tell us your vision and
              let our master tailors bring it to life.
            </p>
            <Link href="/bespoke">
              <Button>Book a Consultation</Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
