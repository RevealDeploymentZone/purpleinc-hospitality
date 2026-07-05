import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ref = `ORD-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase.from("orders").insert([{
      ref,
      order_type: body.order_type || "dine-in",
      table_number: body.table_number || "",
      items: body.items || [],
      total: body.total,
      payment_method: body.payment_method || "upi",
      status: "received",
    }]).select().single();

    if (error) throw error;
    return NextResponse.json({ success: true, ref, order: data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}
