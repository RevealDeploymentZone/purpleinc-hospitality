"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Hotel, Coffee, AlertCircle, ArrowUpRight, RefreshCw } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabase";

type Stats = { totalBookings: number; totalGuests: number; totalRevenue: number; openRequests: number; openContacts: number; heeraBookings: number; riddhiBookings: number; cafeReservations: number; cafeOrders: number; };

export default function GroupDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [
      { data: bookings },
      { data: guests },
      { data: requests },
      { data: contacts },
      { data: reservations },
      { data: orders },
    ] = await Promise.all([
      supabase.from("bookings").select("property, amount, status"),
      supabase.from("guests").select("id"),
      supabase.from("service_requests").select("status"),
      supabase.from("contacts").select("status"),
      supabase.from("reservations").select("id"),
      supabase.from("orders").select("id"),
    ]);

    const heeraB = (bookings || []).filter(b => b.property === "heera");
    const riddhiB = (bookings || []).filter(b => b.property === "riddhi");
    const totalRevenue = (bookings || []).reduce((s, b) => s + (b.amount || 0), 0);
    const openRequests = (requests || []).filter(r => r.status === "open").length;
    const openContacts = (contacts || []).filter(c => c.status === "open").length;

    setStats({
      totalBookings: (bookings || []).length,
      totalGuests: (guests || []).length,
      totalRevenue,
      openRequests,
      openContacts,
      heeraBookings: heeraB.length,
      riddhiBookings: riddhiB.length,
      cafeReservations: (reservations || []).length,
      cafeOrders: (orders || []).length,
    });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-white">Group Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5">Live data — Heera Grand · Riddhi Palace · Krystal Cafe</p>
          </div>
          <button onClick={load} className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-2 rounded-lg transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {loading || !stats ? (
          <div className="text-center py-20 text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 opacity-50" />
            <p className="text-sm">Loading from Supabase...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-7">
              <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl p-5">
                <div className="text-purple-300 text-xs font-semibold uppercase tracking-wide mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-white">₹{stats.totalRevenue.toLocaleString("en-IN")}</div>
                <div className="flex items-center gap-1 text-green-400 text-xs mt-1"><TrendingUp className="w-3.5 h-3.5" /> All time</div>
              </div>
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">Total Guests</div>
                <div className="text-2xl font-bold text-white">{stats.totalGuests}</div>
              </div>
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">Total Bookings</div>
                <div className="text-2xl font-bold text-white">{stats.totalBookings}</div>
              </div>
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">Open Requests</div>
                <div className="text-2xl font-bold text-white">{stats.openRequests + stats.openContacts}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Link href="/admin/heera" className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800 hover:border-gray-600 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <Hotel className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-white font-bold text-sm">Heera Grand</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div><div className="text-gray-500 text-xs">Bookings</div><div className="text-white font-bold text-lg">{stats.heeraBookings}</div></div>
                  <div><div className="text-gray-500 text-xs">Open Requests</div><div className="text-white font-bold text-lg">{stats.openRequests}</div></div>
                </div>
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="text-gray-400 text-xs">View bookings, service requests</div>
                </div>
              </Link>

              <Link href="/admin/riddhi" className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800 hover:border-gray-600 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Hotel className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-white font-bold text-sm">Riddhi Palace</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div><div className="text-gray-500 text-xs">Bookings</div><div className="text-white font-bold text-lg">{stats.riddhiBookings}</div></div>
                  <div><div className="text-gray-500 text-xs">Open Contacts</div><div className="text-white font-bold text-lg">{stats.openContacts}</div></div>
                </div>
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="text-gray-400 text-xs">View bookings, service requests</div>
                </div>
              </Link>

              <Link href="/admin/cafe-dashboard" className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800 hover:border-gray-600 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Coffee className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-white font-bold text-sm">Krystal Cafe</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div><div className="text-gray-500 text-xs">Reservations</div><div className="text-white font-bold text-lg">{stats.cafeReservations}</div></div>
                  <div><div className="text-gray-500 text-xs">Orders</div><div className="text-white font-bold text-lg">{stats.cafeOrders}</div></div>
                </div>
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="text-gray-400 text-xs">View reservations, orders</div>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
