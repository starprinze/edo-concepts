// src/app/api/collections/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured') === 'true'
  const limit = parseInt(searchParams.get('limit') ?? '50', 10)

  const supabase = await createClient()
  let query = supabase
    .from('collections')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (featured) query = query.eq('featured', true)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('collections')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data, { status: 201 })
}
