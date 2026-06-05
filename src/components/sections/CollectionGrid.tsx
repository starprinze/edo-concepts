'use client'
// src/components/sections/CollectionGrid.tsx
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCollections } from '@/hooks/useCollections'
import { Reveal, Skeleton } from '@/components/ui'
import type { Collection } from '@/types/database'

interface CollectionGridProps {
  featuredOnly?: boolean
  limit?: number
}

// ─── Individual Card ──────────────────────────────────────
function CollectionCard({ item, index }: { item: Collection; index: number }) {
  return (
    <Reveal delay={index * 0.07} direction="up">
      <motion.article
        className="collection-card group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative w-full h-full">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="collection-card-img"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          />
        </div>

        {/* Hover overlay */}
        <div className="card-overlay" aria-hidden="true" />

        {/* Info */}
        <div className="card-info">
          <p className="heading-label text-white mb-1">{item.title}</p>
          <p className="text-[0.55rem] tracking-[0.2em] text-gold uppercase">
            {item.season || 'Collection'}
            {item.category && ` · ${item.category}`}
          </p>
        </div>
      </motion.article>
    </Reveal>
  )
}

// ─── Skeleton Placeholder ──────────────────────────────────
function CardSkeleton() {
  return <div className="aspect-[3/4] skeleton" />
}

// ─── Main Grid ────────────────────────────────────────────
export function CollectionGrid({ featuredOnly, limit }: CollectionGridProps) {
  const { collections, loading, error } = useCollections({ featuredOnly, limit })

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-[0.65rem] tracking-wide text-silver/50 uppercase">
          Unable to load collections. Please try again.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-gold">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-border-gold">
        <p className="text-[0.65rem] tracking-wide uppercase text-silver/40 mb-3">
          No collections yet
        </p>
        <p className="text-[0.55rem] tracking-wide text-silver/25 uppercase">
          Add pieces via the Admin dashboard
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-gold">
      {collections.map((item, index) => (
        <CollectionCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
