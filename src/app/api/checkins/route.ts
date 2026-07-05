import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await supabase.from("checkins").insert([{
      booking_ref: body.booking_ref || "",
      property: body.property || "heera",
      guest_name: body.guest_name,
      guest_phone: body.guest_phone,
      guest_email: body.guest_email,
      id_type: body.id_type,
      consent: body.consent || true,
      status: "checked_in",
    }]).select().single();

    if (error) throw error;
    return NextResponse.json({ success: true, checkin: data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
