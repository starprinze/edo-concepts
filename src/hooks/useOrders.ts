'use client'
// src/hooks/useOrders.ts
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Order, OrderStatus } from '@/types/database'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) setError(fetchError.message)
    else setOrders(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateStatus = async (id: string, status: OrderStatus) => {
    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (!updateError) {
      setOrders(prev =>
        prev.map(o => (o.id === id ? { ...o, status } : o))
      )
    }
    return !updateError
  }

  return { orders, loading, error, refetch: fetchOrders, updateStatus }
}

/**
 * Track a single order by client name and phone.
 */
export function useOrderTracker() {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const trackOrder = async (name: string, phone: string) => {
    setLoading(true)
    setError(null)
    setSearched(true)

    const supabase = createClient()
    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .or(
        `client_name.ilike.%${name}%,client_phone.eq.${phone}`
      )
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError) {
      setError('No order found. Please check your details and try again.')
      setOrder(null)
    } else {
      setOrder(data)
    }
    setLoading(false)
  }

  return { order, loading, error, searched, trackOrder }
}
