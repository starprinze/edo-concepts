// src/app/api/orders/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const phone = searchParams.get('phone')

  const supabase = await createClient()

  // Tracking lookup (public endpoint)
  if (name || phone) {
    let query = supabase.from('orders').select(
      'id, client_name, item_description, status, tracking_code, created_at, updated_at'
    )

    if (name && phone) {
      query = query.or(`client_name.ilike.%${name}%,client_phone.eq.${phone}`)
    } else if (name) {
      query = query.ilike('client_name', `%${name}%`)
    } else if (phone) {
      query = query.eq('client_phone', phone)
    }

    const { data, error } = await query.limit(1).single()
    if (error) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    return NextResponse.json(data)
  }

  // Admin: return all orders (should be protected in production)
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, status } = body

  if (!id || !status) {
    return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
