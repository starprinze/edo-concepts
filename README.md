# E.D.O Concepts — Digital Showroom

A premium fashion house platform built with Next.js 14, Supabase, Framer Motion, and Tailwind CSS.

---

## Tech Stack

| Layer        | Technology                     |
|--------------|-------------------------------|
| Framework    | Next.js 14 (App Router)       |
| Styling      | Tailwind CSS (custom design system) |
| Animation    | Framer Motion                 |
| Database     | Supabase (PostgreSQL)         |
| Storage      | Supabase Storage              |
| Auth         | Supabase Auth (for admin)     |
| Upload       | React Dropzone                |
| Deployment   | Vercel                        |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-org/edo-concepts.git
cd edo-concepts
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run `supabase-schema.sql` (in the root of this repo)
3. Create the storage bucket:
   - Dashboard → Storage → New bucket
   - Name: `edo-assets`
   - Public: ✅ enabled
   - Create folders: `collections/`, `hero/`, `lookbooks/`

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage (Hero + Featured Collections + Process)
│   ├── collections/page.tsx      # Full collections grid
│   ├── waybill/page.tsx          # Order tracking
│   ├── bespoke/page.tsx          # Bespoke booking form
│   ├── admin/page.tsx            # CMS dashboard
│   └── api/
│       ├── collections/route.ts  # Collections API
│       └── orders/route.ts       # Orders API
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky nav with scroll blur
│   │   ├── Footer.tsx            # Footer with social links
│   │   └── PageTransition.tsx    # Framer Motion page wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx       # Cinematic hero with stagger animation
│   │   ├── CollectionGrid.tsx    # CMS-driven grid (Supabase)
│   │   └── WaybillTracker.tsx    # Order tracking with animated timeline
│   ├── admin/
│   │   ├── UploadPanel.tsx       # Drag-and-drop upload + Supabase Storage
│   │   └── OrdersPanel.tsx       # Order management table
│   └── ui/
│       └── index.tsx             # Button, SectionHeader, Reveal, Toast, etc.
├── hooks/
│   ├── useCollections.ts         # Supabase collections hook
│   └── useOrders.ts              # Supabase orders hook + tracker
├── lib/supabase/
│   ├── client.ts                 # Browser Supabase client
│   ├── server.ts                 # Server Supabase client (RSC + API routes)
│   └── storage.ts                # Upload/delete/URL helpers
└── types/
    └── database.ts               # Full TypeScript types for all tables
```

---

## Pages

| Route           | Description                              |
|-----------------|------------------------------------------|
| `/`             | Homepage — hero, about, featured pieces  |
| `/collections`  | All collections (CMS-driven)             |
| `/bespoke`      | Bespoke booking form                     |
| `/waybill`      | Order tracking with live timeline        |
| `/admin`        | Admin CMS dashboard                      |

---

## Admin Features

- **Upload Panel** — Drag-and-drop images → Supabase Storage → DB insert
- **Collections Manager** — Live preview grid, delete, reorder
- **Order Management** — Update waybill status per client, dropdown inline
- **Stats Dashboard** — Pieces, active orders, deliveries at a glance

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` (set to your production domain)

---

## Design System

| Token        | Value                     |
|--------------|---------------------------|
| Background   | `#0e0e0e` (matte black)   |
| Gold accent  | `#D4AF37`                 |
| Silver text  | `#9a9a9a`                 |
| Border       | `#2a2a2a`                 |
| Font — body  | Montserrat (300/400/500)  |
| Font — serif | Cormorant Garamond        |
| Font — display | League Spartan           |

---

## License

Private — E.D.O Concepts. All rights reserved.
