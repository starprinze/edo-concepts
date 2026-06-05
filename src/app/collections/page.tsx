// src/app/collections/page.tsx
import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui'
import { CollectionGrid } from '@/components/sections/CollectionGrid'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse all E.D.O Concepts collections — bespoke tailoring and luxury fashion from Lagos.',
}

export default function CollectionsPage() {
  return (
    <div className="pt-24 pb-28">
      <div className="section-inner">
        <SectionHeader tag="The Archive" title="Collections" className="mb-16" />
        <CollectionGrid />
      </div>
    </div>
  )
}
