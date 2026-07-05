import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await supabase.from("service_requests").insert([{
      property: body.property || "heera",
      room_number: body.room_number || "",
      request_type: body.request_type || "general",
      description: body.description,
      status: "open",
    }]).select().single();

    if (error) throw error;
    return NextResponse.json({ success: true, request: data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
