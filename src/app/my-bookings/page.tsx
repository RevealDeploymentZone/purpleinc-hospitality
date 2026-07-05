"use client";
import { useState } from "react";
import Link from "next/link";
import { Crown, Calendar, MapPin, Search, Loader2, XCircle, ChevronRight, Edit2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

type Booking = { id: string; ref: string; room_name: string; checkin: string; checkout: string; nights: number; amount: number; status: string; property: string; };

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function MyBookingsPage() {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const search = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setSearched(false);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("guest_phone", phone.trim())
      .eq("property", "heera")
      .order("checkin", { ascending: false });
    setBookings(data || []);
    setSearched(true);
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings.filter(b => b.checkin >= today && b.status !== "cancelled");
  const past = bookings.filter(b => b.checkin < today || b.status === "cancelled");
  const filtered = tab === "upcoming" ? upcoming : past;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">My Bookings</span>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">Enter your registered phone number to view your bookings</p>
          <div className="flex gap-2">
            <input
              value={phone} onChange={e => setPhone(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()}
              placeholder="e.g. 9876543210"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <button onClick={search} disabled={loading || !phone.trim()}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2 transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Find
            </button>
          </div>
        </div>

        {searched && (
          bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">No bookings found</h3>
              <p className="text-gray-400 text-sm mb-6">No bookings found for this phone number at Heera Grand.</p>
              <Link href="/rooms" className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-700">
                Browse Rooms
              </Link>
            </div>
          ) : (
            <>
              <div className="flex bg-white rounded-xl border border-gray-200 p-1 mb-6">
                {(["upcoming", "past"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-amber-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>
                    {t === "upcoming" ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {filtered.map(b => (
                  <div key={b.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900">{b.room_name}</div>
                        <div className="text-xs font-mono text-gray-400 mt-0.5">Ref: {b.ref}</div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[b.status] || "bg-gray-100 text-gray-600"}`}>{b.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {b.checkin} → {b.checkout}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Heera Grand, Lucknow</div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-400">{b.nights} night{b.nights > 1 ? "s" : ""} · Total</div>
                        <div className="font-bold text-amber-700">{formatPrice(b.amount)}</div>
                      </div>
                      {b.status === "confirmed" && b.checkin >= today && (
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50">
                            <Edit2 className="w-3.5 h-3.5" /> Modify
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50">
                            <XCircle className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      )}
                      {b.checkin < today && (
                        <Link href="/rooms" className="flex items-center gap-1.5 text-xs font-medium text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-50">
                          Book Again <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
