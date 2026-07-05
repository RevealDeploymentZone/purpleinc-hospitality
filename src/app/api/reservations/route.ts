import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ref = `KC-${Date.now().toString().slice(-5)}`;

    const { data, error } = await supabase.from("reservations").insert([{
      ref,
      guest_name: body.guest_name,
      guest_phone: body.guest_phone,
      guest_email: body.guest_email || "",
      date: body.date,
      time: body.time,
      party_size: body.party_size,
      occasion: body.occasion || "",
      special_requests: body.special_requests || "",
      status: "confirmed",
    }]).select().single();

    if (error) throw error;

    // Upsert guest to CRM
    if (body.guest_phone) {
      await supabase.from("guests").upsert([{
        name: body.guest_name,
        phone: body.guest_phone,
        email: body.guest_email || "",
        property: "cafe",
        last_visit: new Date().toISOString().split("T")[0],
      }], { onConflict: "phone" });
    }

    return NextResponse.json({ success: true, ref, reservation: data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reservations: data });
}
