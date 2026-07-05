-- PurpleInc Database Schema
-- Copy and run this in Supabase SQL Editor

-- Guests/Customers CRM table
CREATE TABLE IF NOT EXISTS guests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  property TEXT, -- 'heera', 'riddhi', 'cafe'
  last_visit DATE,
  visits_count INT DEFAULT 1,
  total_spent INT DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hotel Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  ref TEXT UNIQUE NOT NULL,
  property TEXT NOT NULL, -- 'heera' or 'riddhi'
  room_name TEXT NOT NULL,
  room_slug TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  nights INT NOT NULL,
  guests INT DEFAULT 1,
  amount INT NOT NULL,
  payment_method TEXT DEFAULT 'upi',
  early_checkin BOOLEAN DEFAULT false,
  airport_pickup BOOLEAN DEFAULT false,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cafe Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  ref TEXT UNIQUE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  party_size INT NOT NULL,
  occasion TEXT,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cafe Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  ref TEXT UNIQUE NOT NULL,
  order_type TEXT NOT NULL, -- 'dine-in', 'takeaway'
  table_number TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  items JSONB NOT NULL,
  total INT NOT NULL,
  payment_method TEXT DEFAULT 'upi',
  status TEXT DEFAULT 'received',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Service Requests table
CREATE TABLE IF NOT EXISTS service_requests (
  id SERIAL PRIMARY KEY,
  property TEXT NOT NULL,
  room_number TEXT,
  request_type TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow all guests" ON guests FOR ALL USING (true);
CREATE POLICY "Allow all bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all reservations" ON reservations FOR ALL USING (true);
CREATE POLICY "Allow all orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all service_requests" ON service_requests FOR ALL USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_guests_phone ON guests(phone);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(ref);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_phone ON bookings(guest_phone);
CREATE INDEX IF NOT EXISTS idx_reservations_ref ON reservations(ref);
CREATE INDEX IF NOT EXISTS idx_orders_ref ON orders(ref);
