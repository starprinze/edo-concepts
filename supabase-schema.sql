-- ============================================================
-- E.D.O CONCEPTS — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ── 1. COLLECTIONS TABLE ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.collections (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  image_url    TEXT NOT NULL,
  image_path   TEXT,
  season       TEXT,
  description  TEXT,
  category     TEXT,
  featured     BOOLEAN NOT NULL DEFAULT false,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Public can read all collections
CREATE POLICY "collections_public_read" ON public.collections
  FOR SELECT USING (true);

-- Only authenticated users (admin) can write
CREATE POLICY "collections_auth_insert" ON public.collections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "collections_auth_update" ON public.collections
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "collections_auth_delete" ON public.collections
  FOR DELETE USING (auth.role() = 'authenticated');


-- ── 2. ORDERS TABLE ───────────────────────────────────────
CREATE TYPE order_status AS ENUM (
  'Order Received',
  'Fabric Cutting',
  'Tailoring & Fit',
  'Dispatched',
  'Delivered'
);

CREATE TABLE IF NOT EXISTS public.orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name      TEXT NOT NULL,
  client_phone     TEXT NOT NULL,
  client_email     TEXT,
  item_description TEXT NOT NULL,
  status           order_status NOT NULL DEFAULT 'Order Received',
  notes            TEXT,
  tracking_code    TEXT NOT NULL DEFAULT upper(substring(gen_random_uuid()::text from 1 for 8)),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Clients can look up their own order by name+phone
CREATE POLICY "orders_public_track" ON public.orders
  FOR SELECT USING (true); -- refine with name/phone match in app layer

-- Only authenticated users can manage orders
CREATE POLICY "orders_auth_all" ON public.orders
  FOR ALL USING (auth.role() = 'authenticated');


-- ── 3. BESPOKE BOOKINGS TABLE ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.bespoke_bookings (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name  TEXT NOT NULL,
  phone      TEXT NOT NULL,
  email      TEXT NOT NULL,
  occasion   TEXT,
  notes      TEXT,
  status     TEXT NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'contacted', 'confirmed', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bespoke_bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a booking
CREATE POLICY "bookings_public_insert" ON public.bespoke_bookings
  FOR INSERT WITH CHECK (true);

-- Only admins can read/update bookings
CREATE POLICY "bookings_auth_manage" ON public.bespoke_bookings
  FOR ALL USING (auth.role() = 'authenticated');


-- ── 4. STORAGE BUCKET ─────────────────────────────────────
-- Run in Supabase Dashboard > Storage, or via API:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('edo-assets', 'edo-assets', true);
--
-- Storage policies (public read, authenticated upload):
-- CREATE POLICY "public_read" ON storage.objects
--   FOR SELECT USING (bucket_id = 'edo-assets');
--
-- CREATE POLICY "auth_upload" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'edo-assets' AND auth.role() = 'authenticated'
--   );


-- ── 5. SEED DATA (optional) ───────────────────────────────
-- INSERT INTO public.orders (client_name, client_phone, client_email, item_description, status)
-- VALUES
--   ('Adebayo Okonkwo', '+2348012345678', 'a.okonkwo@mail.com', 'Midnight Agbada — Bespoke AW25', 'Tailoring & Fit'),
--   ('Chioma Eze',      '+2348023456789', 'c.eze@mail.com',     'Ankara Royale 3-piece Set',      'Dispatched'),
--   ('Emeka Nwachukwu', '+2348034567890', NULL,                 'Classic Navy Bespoke Suit',       'Order Received'),
--   ('Funmi Adeleke',   '+2348045678901', 'f.adeleke@mail.com', 'Ivory Gele & Iro Collection',    'Delivered');
