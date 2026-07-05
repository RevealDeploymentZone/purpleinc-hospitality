"use client";
import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Search, Loader2, XCircle, CheckCircle, Edit } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Booking = { id: string; ref: string; room_name: string; checkin: string; checkout: string; nights: number; amount: number; status: string; };

const statusStyles: Record<string, { color: string; icon: typeof CheckCircle; label: string }> = {
  confirmed: { color: "bg-green-100 text-green-700", icon: CheckCircle, label: "Confirmed" },
  completed: { color: "bg-gray-100 text-gray-600", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-100 text-red-600", icon: XCircle, label: "Cancelled" },
};

export default function RiddhiMyBookingsPage() {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setSearched(false);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("guest_phone", phone.trim())
      .eq("property", "riddhi")
      .order("checkin", { ascending: false });
    setBookings(data || []);
    setSearched(true);
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">Enter your registered phone number to view your bookings</p>
          <div className="flex gap-2">
            <input
              value={phone} onChange={e => setPhone(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search()}
              placeholder="e.g. 9876511100"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
            />
            <button onClick={search} disabled={loading || !phone.trim()}
              className="bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2 transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Find
            </button>
          </div>
        </div>

        {searched && (
          bookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-gray-500 text-sm mb-4">No bookings found for this number at Riddhi Palace.</p>
              <Link href="/riddhi/book" className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-800 transition-colors">
                Make a Booking
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {bookings.map(b => {
                const s = statusStyles[b.status] || statusStyles.completed;
                const StatusIcon = s.icon;
                return (
                  <div key={b.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-bold text-gray-900">{b.room_name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Ref: {b.ref}</div>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" /> {s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {b.checkin} → {b.checkout}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Riddhi Palace, Lucknow</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="font-bold text-gray-900">₹{b.amount?.toLocaleString("en-IN")}</span>
                      {b.status === "confirmed" && b.checkin >= today && (
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                            <Edit className="w-3.5 h-3.5" /> Modify
                          </button>
                          <button className="flex items-center gap-1.5 border border-red-200 text-red-500 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50">
                            <XCircle className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        <div className="mt-8 text-center">
          <Link href="/riddhi/book" className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-800 transition-colors">
            Make a New Booking
          </Link>
        </div>
      </div>
    </div>
  );
}
