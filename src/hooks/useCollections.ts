'use client'
// src/hooks/useCollections.ts
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Collection } from '@/types/database'

interface UseCollectionsOptions {
  featuredOnly?: boolean
  limit?: number
}

export function useCollections(options: UseCollectionsOptions = {}) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCollections = useCallback(async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    let query = supabase
      .from('collections')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (options.featuredOnly) {
      query = query.eq('featured', true)
    }
    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setCollections(data ?? [])
    }
    setLoading(false)
  }, [options.featuredOnly, options.limit])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  return { collections, loading, error, refetch: fetchCollections }
}
