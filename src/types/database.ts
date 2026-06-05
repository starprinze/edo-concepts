// src/types/database.ts
// Auto-generate these with: npx supabase gen types typescript --project-id YOUR_ID

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type OrderStatus =
  | 'Order Received'
  | 'Fabric Cutting'
  | 'Tailoring & Fit'
  | 'Dispatched'
  | 'Delivered'

export type Database = {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string
          title: string
          image_url: string
          image_path: string | null
          season: string | null
          description: string | null
          category: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          image_url: string
          image_path?: string | null
          season?: string | null
          description?: string | null
          category?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          image_url?: string
          image_path?: string | null
          season?: string | null
          description?: string | null
          category?: string | null
          featured?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          client_name: string
          client_phone: string
          client_email: string | null
          item_description: string
          status: OrderStatus
          notes: string | null
          tracking_code: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_phone: string
          client_email?: string | null
          item_description: string
          status?: OrderStatus
          notes?: string | null
          tracking_code?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_phone?: string
          client_email?: string | null
          item_description?: string
          status?: OrderStatus
          notes?: string | null
          tracking_code?: string
          updated_at?: string
        }
      }
      bespoke_bookings: {
        Row: {
          id: string
          full_name: string
          phone: string
          email: string
          occasion: string | null
          notes: string | null
          status: 'pending' | 'contacted' | 'confirmed' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone: string
          email: string
          occasion?: string | null
          notes?: string | null
          status?: 'pending' | 'contacted' | 'confirmed' | 'completed'
          created_at?: string
        }
        Update: {
          full_name?: string
          phone?: string
          email?: string
          occasion?: string | null
          notes?: string | null
          status?: 'pending' | 'contacted' | 'confirmed' | 'completed'
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      order_status: OrderStatus
    }
  }
}

// Convenience type aliases
export type Collection = Database['public']['Tables']['collections']['Row']
export type CollectionInsert = Database['public']['Tables']['collections']['Insert']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type BespokeBooking = Database['public']['Tables']['bespoke_bookings']['Row']
export type BespokeBookingInsert = Database['public']['Tables']['bespoke_bookings']['Insert']
