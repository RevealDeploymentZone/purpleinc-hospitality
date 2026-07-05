import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const [guestsRes, bookingsRes, contactsRes, reservationsRes, ordersRes, requestsRes] = await Promise.all([
    supabase.from("guests").select("*").order("last_visit", { ascending: false }).limit(200),
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("reservations").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("service_requests").select("*").order("created_at", { ascending: false }).limit(100),
  ]);

  return NextResponse.json({
    guests: guestsRes.data || [],
    bookings: bookingsRes.data || [],
    contacts: contactsRes.data || [],
    reservations: reservationsRes.data || [],
    orders: ordersRes.data || [],
    service_requests: requestsRes.data || [],
    stats: {
      total_guests: guestsRes.data?.length || 0,
      total_bookings: bookingsRes.data?.length || 0,
      total_contacts: contactsRes.data?.length || 0,
      total_orders: ordersRes.data?.length || 0,
    },
  });
}
