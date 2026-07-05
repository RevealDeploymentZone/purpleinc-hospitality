"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Search, Users, Star, RefreshCw, Phone, Mail, Calendar, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Guest = { id: string; name: string; phone: string; email: string; property: string; last_visit: string; };
type Booking = { id: string; ref: string; property: string; room_name: string; guest_name: string; guest_phone: string; checkin: string; checkout: string; amount: number; status: string; created_at: string; };

const propLabel: Record<string, string> = { heera: "Heera Grand", riddhi: "Riddhi Palace", cafe: "Krystal Cafe" };
const propColor: Record<string, string> = { heera: "bg-amber-500/20 text-amber-400", riddhi: "bg-blue-500/20 text-blue-400", cafe: "bg-emerald-500/20 text-emerald-400" };

export default function CRMPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Guest | null>(null);
  const [tab, setTab] = useState<"guests" | "bookings">("guests");

  const load = async () => {
    setLoading(true);
    const [{ data: g }, { data: b }] = await Promise.all([
      supabase.from("guests").select("*").order("last_visit", { ascending: false }),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
    ]);
    setGuests(g || []);
    setBookings(b || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filteredGuests = guests.filter(g =>
    g.name?.toLowerCase().includes(search.toLowerCase()) ||
    g.phone?.includes(search) || g.email?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredBookings = bookings.filter(b =>
    b.guest_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.ref?.includes(search) || b.guest_phone?.includes(search)
  );
  const guestBookings = selected
    ? bookings.filter(b => b.guest_phone === selected.phone || b.guest_name === selected.name)
    : [];

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Group CRM</h1>
            <p className="text-gray-400 text-sm mt-0.5">Live data — Heera Grand · Riddhi Palace · Krystal Cafe</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">{guests.length} guests · {bookings.length} bookings</span>
            <button onClick={load} className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-2 rounded-lg transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {(["guests", "bookings"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
              {t === "guests" ? `Guests (${guests.length})` : `Bookings (${bookings.length})`}
            </button>
          ))}
        </div>

        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, email, ref..."
            className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-purple-500" />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 opacity-50" />
            <p className="text-sm">Loading from Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
              {tab === "guests" ? (
                filteredGuests.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <Users className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No guests yet. Bookings automatically add guests here.</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-700/50">
                      {["Guest", "Property", "Last Visit", "Phone"].map(h => (
                        <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody className="divide-y divide-gray-700/30">
                      {filteredGuests.map(g => (
                        <tr key={g.id} onClick={() => setSelected(g)}
                          className={`cursor-pointer hover:bg-gray-700/30 transition-all ${selected?.id === g.id ? "bg-purple-600/10" : ""}`}>
                          <td className="py-3 px-4">
                            <div className="font-medium text-white text-sm">{g.name}</div>
                            <div className="text-gray-500 text-xs">{g.email || "—"}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${propColor[g.property] || "bg-gray-700 text-gray-300"}`}>
                              {propLabel[g.property] || g.property}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400 text-sm">{g.last_visit || "—"}</td>
                          <td className="py-3 px-4 text-gray-400 text-sm">{g.phone || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              ) : (
                filteredBookings.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <Calendar className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No bookings yet.</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-700/50">
                      {["Ref", "Guest", "Property", "Room", "Dates", "Amount", "Status"].map(h => (
                        <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody className="divide-y divide-gray-700/30">
                      {filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-gray-700/30">
                          <td className="py-3 px-4 text-purple-400 text-xs font-mono font-bold">{b.ref}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-white text-sm">{b.guest_name}</div>
                            <div className="text-gray-500 text-xs">{b.guest_phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${propColor[b.property] || "bg-gray-700 text-gray-300"}`}>
                              {propLabel[b.property] || b.property}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{b.room_name}</td>
                          <td className="py-3 px-4 text-gray-400 text-xs">{b.checkin} → {b.checkout}</td>
                          <td className="py-3 px-4 text-green-400 text-sm font-bold">₹{b.amount?.toLocaleString("en-IN")}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === "confirmed" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>

            {/* Profile */}
            <div>
              {selected ? (
                <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 sticky top-6 space-y-4">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-300 font-bold text-xl">
                      {selected.name?.split(" ").map((n: string) => n[0]).join("") || "?"}
                    </div>
                    <div className="text-white font-bold">{selected.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium mt-1 inline-block ${propColor[selected.property] || "bg-gray-700 text-gray-300"}`}>
                      {propLabel[selected.property] || selected.property}
                    </span>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    {selected.phone && <div className="flex items-center gap-2.5 text-gray-300"><Phone className="w-3.5 h-3.5 text-gray-500" />{selected.phone}</div>}
                    {selected.email && <div className="flex items-center gap-2.5 text-gray-300"><Mail className="w-3.5 h-3.5 text-gray-500" />{selected.email}</div>}
                    {selected.last_visit && <div className="flex items-center gap-2.5 text-gray-300"><Calendar className="w-3.5 h-3.5 text-gray-500" />Last visit: {selected.last_visit}</div>}
                  </div>
                  {guestBookings.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" /> Bookings ({guestBookings.length})
                      </div>
                      <div className="space-y-2">
                        {guestBookings.map(b => (
                          <div key={b.id} className="bg-gray-700/40 rounded-lg p-3 text-xs">
                            <div className="flex justify-between">
                              <span className="text-purple-400 font-mono font-bold">{b.ref}</span>
                              <span className="text-green-400 font-bold">₹{b.amount?.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="text-gray-400 mt-1">{b.room_name} · {b.checkin} → {b.checkout}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-700 space-y-2">
                    <button className="w-full bg-purple-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2">
                      <Star className="w-3.5 h-3.5" /> Send Campaign
                    </button>
                    <textarea placeholder="Add internal note..." rows={3} className="w-full bg-gray-700 border border-gray-600 text-gray-300 text-xs rounded-xl p-3 focus:outline-none focus:border-purple-500 resize-none" />
                    <button className="w-full border border-gray-600 text-gray-300 text-xs py-2 rounded-xl hover:bg-gray-700">Save Note</button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8 text-center text-gray-500">
                  <Users className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Kisi bhi guest pe click karo profile dekhne ke liye</p>
                  <p className="text-xs mt-2 text-gray-600">{guests.length} records Supabase mein hain</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
