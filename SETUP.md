# PurpleInc - Complete Setup Guide

## 🚀 Project Overview

A complete digital ecosystem for PurpleInc's hospitality business:
- **Heera Grand Hotel** (heera-grand)
- **Riddhi Palace Hotel** (riddhi-palace)
- **Krystal Cafe** (krystal-cafe)
- **Admin Hub** (IAH) for centralized management

## 📋 Database Setup (IMPORTANT - DO THIS FIRST!)

### Step 1: Create Tables in Supabase

1. Go to your Supabase project: https://ibiphenyqpaxrspvzuws.supabase.co
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire contents of `init-database.sql` file
5. Paste it into the SQL editor
6. Click **"Run"** to execute

This will create all necessary tables:
- `guests` - Customer CRM data
- `bookings` - Hotel bookings
- `reservations` - Cafe table reservations
- `orders` - Cafe orders
- `service_requests` - Guest service requests

### Step 2: Verify Tables Were Created

1. In Supabase, click "Table Editor" in the left sidebar
2. You should see all 5 tables listed
3. Click on each table to verify the structure

## 🔧 Environment Variables

Already configured in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://ibiphenyqpaxrspvzuws.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🏃 Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 🌐 Live URLs

- **Production**: https://purpleinc.vercel.app/
- **GitHub**: https://github.com/RevealDeploymentZone/purpleinc-hospitality
- **Vercel Dashboard**: https://vercel.com/revealrankus-9518s-projects/purpleinc

## 📁 Project Structure

```
/                     → Heera Grand Hotel homepage
/rooms               → Room listings
/rooms/[slug]        → Room details
/book                → Booking flow
/availability        → Search results
/my-bookings         → Guest dashboard

/riddhi              → Riddhi Palace Hotel (same structure as above)

/cafe                → Krystal Cafe homepage
/cafe/menu           → Full menu with cart
/cafe/reserve        → Table reservation
/cafe/order          → Order checkout
/cafe/table?table=T1 → QR dine-in ordering

/admin               → IAH Admin Hub (login page)
/admin/dashboard     → Group dashboard
/admin/heera         → Heera Grand management
/admin/riddhi        → Riddhi Palace management
/admin/cafe-dashboard → Krystal Cafe management
/admin/crm           → Unified CRM
/admin/inbox         → Unified messages
/admin/analytics     → Analytics & reports
```

## 🗄️ How Data Flows

### Example: Guest Makes a Booking

1. Guest fills booking form on `/book`
2. Form data is POST to `/api/bookings`
3. API creates/finds guest in `guests` table
4. API inserts booking into `bookings` table
5. Guest is redirected to confirmation page
6. Booking appears in:
   - `/my-bookings` (for guest)
   - `/admin/heera` (for hotel manager)
   - `/admin/crm` (for owner)

### Example: Customer Orders at Cafe

1. Customer scans QR code → lands on `/cafe/table?table=T5`
2. Adds items to cart
3. Submits order → POST to `/api/orders`
4. Order goes to `orders` table
5. Order appears in `/admin/cafe-dashboard` for staff

## 🔐 Admin Login Credentials (Demo)

```
Owner Account:
Email: owner@purpleinc.in
Password: admin123

Hotel Manager:
Email: heera@purpleinc.in
Password: manager123

Cafe Manager:
Email: cafe@purpleinc.in
Password: manager123
```

## ✅ Testing the System

### Test Hotel Booking

1. Go to https://purpleinc.vercel.app/
2. Click "View All Rooms"
3. Select any room → Click "Book Now"
4. Fill the form:
   - Name: Test User
   - Phone: 9999999999
   - Email: test@test.com
   - Check-in/out dates
5. Click "Proceed to Payment"
6. Select payment method → "Pay Now"
7. You should see confirmation page with booking reference

### Verify in Database

1. Go to Supabase Table Editor
2. Open `bookings` table
3. Your test booking should appear there
4. Open `guests` table
5. "Test User" should be added to CRM

### Test Cafe Order

1. Go to https://purpleinc.vercel.app/cafe/menu
2. Add items to cart
3. Click cart icon → "Proceed to Order"
4. Fill details and submit
5. Check `orders` table in Supabase

### Test Admin Dashboard

1. Go to https://purpleinc.vercel.app/admin
2. Login with owner credentials
3. Go to `/admin/crm`
4. You should see "Test User" in the customer list
5. Go to `/admin/heera`
6. You should see the test booking

## 🔄 Real-time Updates

All forms submit data to Supabase. To see live data:

1. Open Admin Dashboard
2. Open another tab and make a booking
3. Refresh Admin Dashboard → new booking appears

## 📝 NO Dummy Data!

- All room/menu data is in `/src/config/*-config.ts` (static configuration, not dummy)
- All bookings, orders, guests come from Supabase database
- Reviews link to external Google reviews (no fake reviews)
- Everything is production-ready!

## 🛠️ Troubleshooting

### "Table doesn't exist" Error

Run the `init-database.sql` script in Supabase SQL Editor.

### Booking Not Saving

1. Check browser console for errors
2. Verify Supabase URL and key in `.env.local`
3. Check Supabase logs: Project Settings → API → Logs

### Data Not Showing in Admin

1. Verify RLS policies are enabled (check `init-database.sql`)
2. Check Table Editor in Supabase to confirm data exists
3. Check browser network tab for API errors

## 🚢 Deploying Changes

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy.

## 📞 Support

For issues, check the Supabase logs and browser console first.
Database: https://ibiphenyqpaxrspvzuws.supabase.co
Vercel: https://vercel.com/revealrankus-9518s-projects/purpleinc
