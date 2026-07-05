"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { RefreshCw, Hotel, Calendar, Phone, IndianRupee, Wrench, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Booking = { id: string; ref: string; guest_name: string; guest_phone: string; room_name: string; checkin: string; checkout: string; amount: number; status: string; created_at: string; };
type ServiceReq = { id: string; room_number: string; request_type: string; description: string; status: string; created_at: string; };

const statusColors: Record<string, string> = {
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  completed: "bg-gray-500/20 text-gray-400",
  open: "bg-amber-500/20 text-amber-400",
  "in-progress": "bg-blue-500/20 text-blue-400",
  resolved: "bg-green-500/20 text-green-400",
};

export default function RiddhiPalaceDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [requests, setRequests] = useState<ServiceReq[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "requests">("bookings");

  const load = async () => {
    setLoading(true);
    const [{ data: b }, { data: r }] = await Promise.all([
      supabase.from("bookings").select("*").eq("property", "riddhi").order("created_at", { ascending: false }),
      supabase.from("service_requests").select("*").eq("property", "riddhi").order("created_at", { ascending: false }),
    ]);
    setBookings(b || []);
    setRequests(r || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const totalRevenue = bookings.reduce((s, b) => s + (b.amount || 0), 0);
  const openRequests = requests.filter(r => r.status === "open").length;

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Riddhi Palace</h1>
              <p className="text-gray-400 text-sm">Live data from Supabase</p>
            </div>
          </div>
          <button onClick={load} className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-2 rounded-lg transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            ["Bookings", bookings.length.toString()],
            ["Revenue", `₹${totalRevenue.toLocaleString("en-IN")}`],
            ["Open Requests", openRequests.toString()],
            ["Resolved", requests.filter(r => r.status === "resolved").length.toString()],
          ].map(([label, val]) => (
            <div key={label} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
              <div className="text-gray-400 text-xs mb-1">{label}</div>
              <div className="text-white font-bold text-xl">{val}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {(["bookings", "requests"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
              {t === "bookings" ? `Bookings (${bookings.length})` : `Service Requests (${requests.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 opacity-50" />
            <p className="text-sm">Loading...</p>
          </div>
        ) : tab === "bookings" ? (
          bookings.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-800/40 rounded-2xl">
              <Calendar className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No bookings yet. They&apos;ll appear here when guests book.</p>
            </div>
          ) : (
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-gray-700/50">
                  {["Ref", "Guest", "Room", "Dates", "Amount", "Status"].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                  ))}
                </tr></thead>
                <tbody className="divide-y divide-gray-700/30">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-700/30">
                      <td className="py-3 px-4 text-blue-400 text-xs font-mono font-bold">{b.ref}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-white text-sm">{b.guest_name}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1"><Phone className="w-3 h-3" />{b.guest_phone}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{b.room_name}</td>
                      <td className="py-3 px-4 text-gray-400 text-xs">{b.checkin} → {b.checkout}</td>
                      <td className="py-3 px-4 text-green-400 text-sm font-bold flex items-center gap-0.5">
                        <IndianRupee className="w-3 h-3" />{b.amount?.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[b.status] || "bg-gray-500/20 text-gray-400"}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          requests.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-800/40 rounded-2xl">
              <Wrench className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No service requests yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map(r => (
                <div key={r.id} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm">{r.request_type}</span>
                      {r.room_number && <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">Room {r.room_number}</span>}
                    </div>
                    {r.description && <p className="text-gray-400 text-sm">{r.description}</p>}
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <Clock className="w-3 h-3" />{new Date(r.created_at).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ml-3 ${statusColors[r.status] || "bg-gray-500/20 text-gray-400"}`}>{r.status}</span>
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}
