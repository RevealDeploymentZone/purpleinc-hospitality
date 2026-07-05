import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ref = `${body.property === "riddhi" ? "RP" : "HG"}-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase.from("bookings").insert([{
      ref,
      property: body.property || "heera",
      room_name: body.room_name,
      room_slug: body.room_slug,
      guest_name: body.guest_name,
      guest_phone: body.guest_phone,
      guest_email: body.guest_email,
      checkin: body.checkin,
      checkout: body.checkout,
      nights: body.nights,
      guests: body.guests || 1,
      amount: body.amount,
      payment_method: body.payment_method || "upi",
      early_checkin: body.early_checkin || false,
      airport_pickup: body.airport_pickup || false,
      special_requests: body.special_requests || "",
      status: "confirmed",
    }]).select().single();

    if (error) throw error;

    // Also upsert guest into CRM
    await supabase.from("guests").upsert([{
      name: body.guest_name,
      phone: body.guest_phone,
      email: body.guest_email,
      property: body.property || "heera",
      last_visit: new Date().toISOString().split("T")[0],
    }], { onConflict: "phone" });

    return NextResponse.json({ success: true, ref, booking: data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data });
}
