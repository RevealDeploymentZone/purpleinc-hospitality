-- PurpleInc Hospitality — Supabase Database Setup
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New Query → Paste → Run

-- Guests / CRM
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE,
  email TEXT,
  property TEXT,
  last_visit DATE,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel Bookings (Heera Grand + Riddhi Palace)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ref TEXT UNIQUE,
  property TEXT NOT NULL,
  room_name TEXT,
  room_slug TEXT,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  guest_email TEXT,
  checkin DATE,
  checkout DATE,
  nights INTEGER,
  guests INTEGER DEFAULT 1,
  amount NUMERIC,
  payment_method TEXT,
  early_checkin BOOLEAN DEFAULT FALSE,
  airport_pickup BOOLEAN DEFAULT FALSE,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Digital Check-ins
CREATE TABLE IF NOT EXISTS checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref TEXT,
  property TEXT,
  guest_name TEXT,
  guest_phone TEXT,
  guest_email TEXT,
  id_type TEXT,
  consent BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'checked_in',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property TEXT,
  name TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cafe Table Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ref TEXT UNIQUE,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  guest_email TEXT,
  date DATE,
  time TEXT,
  party_size INTEGER,
  occasion TEXT,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cafe Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ref TEXT UNIQUE,
  order_type TEXT DEFAULT 'dine-in',
  table_number TEXT,
  items JSONB,
  total NUMERIC,
  payment_method TEXT,
  status TEXT DEFAULT 'received',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- In-Room Service Requests
CREATE TABLE IF NOT EXISTS service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property TEXT,
  room_number TEXT,
  request_type TEXT,
  description TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for all tables (dev mode — data accessible with anon key)
ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE checkins DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests DISABLE ROW LEVEL SECURITY;

-- Done! All 7 tables created.
