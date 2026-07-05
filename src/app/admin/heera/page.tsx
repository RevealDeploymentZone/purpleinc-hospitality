"use client";
import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, Clock, AlertCircle, Users, Edit2, Calendar, Wifi, RotateCcw, Hotel, MessageSquare } from "lucide-react";

const arrivals = [
  { ref: "HG240891", guest: "Rahul Sharma", room: "Deluxe 304", time: "2:00 PM", status: "pending" },
  { ref: "HG240892", guest: "Priya Verma", room: "Suite 501", time: "3:30 PM", status: "checked-in" },
  { ref: "HG240893", guest: "Ankit Gupta", room: "Classic 201", time: "4:00 PM", status: "pending" },
];

const rooms = [
  { no: "101", type: "Classic", status: "clean", guest: null },
  { no: "102", type: "Classic", status: "occupied", guest: "Meera Singh" },
  { no: "201", type: "Classic", status: "dirty", guest: null },
  { no: "202", type: "Classic", status: "inspecting", guest: null },
  { no: "301", type: "Deluxe", status: "clean", guest: null },
  { no: "302", type: "Deluxe", status: "occupied", guest: "Raj Kumar" },
  { no: "303", type: "Deluxe", status: "occupied", guest: "Sneha Patel" },
  { no: "304", type: "Deluxe", status: "clean", guest: null },
  { no: "401", type: "Twin", status: "occupied", guest: "Vikram & Amit" },
  { no: "501", type: "Suite", status: "occupied", guest: "Priya Verma" },
  { no: "502", type: "Suite", status: "dirty", guest: null },
];

const requests = [
  { id: "REQ001", room: "302", guest: "Raj Kumar", type: "Extra Towels", time: "10 mins ago", status: "open" },
  { id: "REQ002", room: "401", guest: "Vikram & Amit", type: "Room Cleaning", time: "25 mins ago", status: "in-progress" },
  { id: "REQ003", room: "303", guest: "Sneha Patel", type: "Airport Drop", time: "1h ago", status: "resolved" },
];

const statusColors: Record<string, string> = {
  clean: "bg-green-500",
  occupied: "bg-blue-500",
  dirty: "bg-red-500",
  inspecting: "bg-amber-500",
};

export default function HeeraGrandDashboard() {
  const [activeTab, setActiveTab] = useState<"ops" | "bookings" | "cms" | "channel" | "messaging">("ops");

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Hotel className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">Heera Grand</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Property Dashboard</h1>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">{formatPrice(125000)}</div>
            <div className="text-gray-400 text-xs">Revenue Today</div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[["Occupancy", "78%", "text-green-400"], ["Arrivals Today", "8", "text-blue-400"], ["Departures", "5", "text-amber-400"], ["Open Requests", "2", "text-red-400"]].map(([label, val, color]) => (
            <div key={label as string} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">{label as string}</div>
              <div className={`text-2xl font-bold ${color as string}`}>{val as string}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="flex border-b border-gray-700/50 overflow-x-auto">
            {[["ops", "Staff & Ops"], ["bookings", "Bookings"], ["cms", "Room CMS"], ["channel", "Channels"], ["messaging", "Messaging"]].map(([id, label]) => (
              <button key={id as string} onClick={() => setActiveTab(id as typeof activeTab)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === id ? "border-amber-500 text-amber-400 bg-amber-500/5" : "border-transparent text-gray-400 hover:text-gray-200"}`}>
                {label as string}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === "ops" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Arrivals */}
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-amber-400" /> Arrivals Today</h3>
                  <div className="space-y-2">
                    {arrivals.map((a) => (
                      <div key={a.ref} className="bg-gray-900/50 rounded-xl p-3">
                        <div className="flex justify-between items-start mb-1">
                          <div className="text-white text-sm font-medium">{a.guest}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.status === "checked-in" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>
                            {a.status}
                          </span>
                        </div>
                        <div className="text-gray-400 text-xs">{a.room} · ETA {a.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Housekeeping */}
                <div>
                  <h3 className="text-white font-bold mb-3">Housekeeping</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {rooms.map((r) => (
                      <div key={r.no} className={`rounded-xl p-2.5 text-center ${r.status === "clean" ? "bg-green-500/10 border border-green-500/30" : r.status === "occupied" ? "bg-blue-500/10 border border-blue-500/30" : r.status === "dirty" ? "bg-red-500/10 border border-red-500/30" : "bg-amber-500/10 border border-amber-500/30"}`}>
                        <div className="text-white font-bold text-sm">{r.no}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{r.type}</div>
                        <div className={`w-2 h-2 rounded-full mx-auto mt-1.5 ${statusColors[r.status]}`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[["clean", "Clean", "bg-green-500"], ["occupied", "Occupied", "bg-blue-500"], ["dirty", "Dirty", "bg-red-500"], ["inspecting", "Inspecting", "bg-amber-500"]].map(([key, label, color]) => (
                      <div key={key as string} className="flex items-center gap-1 text-xs text-gray-400">
                        <span className={`w-2 h-2 rounded-full ${color as string}`} /> {label as string}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requests */}
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Open Requests</h3>
                  <div className="space-y-2">
                    {requests.map((req) => (
                      <div key={req.id} className="bg-gray-900/50 rounded-xl p-3">
                        <div className="flex justify-between mb-1">
                          <div className="text-white text-sm font-medium">Room {req.room}: {req.type}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${req.status === "open" ? "bg-red-500/20 text-red-400" : req.status === "in-progress" ? "bg-amber-500/20 text-amber-400" : "bg-green-500/20 text-green-400"}`}>
                            {req.status}
                          </span>
                        </div>
                        <div className="text-gray-400 text-xs">{req.guest} · {req.time}</div>
                        {req.status !== "resolved" && (
                          <button className="mt-2 text-xs text-emerald-400 hover:underline font-medium">Mark Resolved →</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" /> Booking Calendar & Reservations</h3>
                {/* Simplified table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {["Ref", "Guest", "Room", "Check-In", "Check-Out", "Status", "Actions"].map((h) => (
                          <th key={h} className="text-left text-gray-400 font-semibold py-3 px-3 text-xs uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[
                        { ref: "HG240891", guest: "Rahul Sharma", room: "Deluxe 304", in: "2025-07-05", out: "2025-07-07", status: "confirmed" },
                        { ref: "HG240892", guest: "Priya Verma", room: "Suite 501", in: "2025-07-04", out: "2025-07-06", status: "checked-in" },
                        { ref: "HG240893", guest: "Ankit Gupta", room: "Classic 201", in: "2025-07-05", out: "2025-07-06", status: "confirmed" },
                        { ref: "HG240890", guest: "Meera Singh", room: "Classic 102", in: "2025-07-03", out: "2025-07-05", status: "completed" },
                      ].map((b) => (
                        <tr key={b.ref} className="text-gray-300 hover:bg-gray-800/30">
                          <td className="py-3 px-3 font-mono text-xs text-gray-400">{b.ref}</td>
                          <td className="py-3 px-3 font-medium text-white">{b.guest}</td>
                          <td className="py-3 px-3">{b.room}</td>
                          <td className="py-3 px-3">{b.in}</td>
                          <td className="py-3 px-3">{b.out}</td>
                          <td className="py-3 px-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === "checked-in" ? "bg-green-500/20 text-green-400" : b.status === "confirmed" ? "bg-blue-500/20 text-blue-400" : "bg-gray-600/50 text-gray-400"}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex gap-2">
                              <button className="text-xs text-amber-400 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" /> Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "cms" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Room & Rate CMS</h3>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-lg">+ Add Room Type</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Deluxe Room", price: 3499, occupancy: 2, rooms: 8, status: "active" },
                    { name: "Classic Room", price: 2299, occupancy: 2, rooms: 6, status: "active" },
                    { name: "Executive Suite", price: 6999, occupancy: 3, rooms: 2, status: "active" },
                    { name: "Twin Room", price: 2799, occupancy: 2, rooms: 4, status: "inactive" },
                  ].map((r) => (
                    <div key={r.name} className="flex items-center justify-between bg-gray-900/50 rounded-xl p-4">
                      <div>
                        <div className="text-white font-medium">{r.name}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{r.rooms} rooms · Max {r.occupancy} guests</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-amber-400 font-bold">{formatPrice(r.price)}/night</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${r.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-600/50 text-gray-400"}`}>{r.status}</span>
                        <button className="text-xs text-amber-400 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" /> Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "channel" && (
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Wifi className="w-4 h-4 text-amber-400" /> OTA Channel Manager</h3>
                <div className="space-y-3">
                  {[
                    { name: "Booking.com", status: "synced", lastSync: "5 mins ago", rooms: 20 },
                    { name: "MakeMyTrip", status: "synced", lastSync: "8 mins ago", rooms: 18 },
                    { name: "Agoda", status: "error", lastSync: "2 hours ago", rooms: 0 },
                    { name: "Goibibo", status: "synced", lastSync: "12 mins ago", rooms: 16 },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between bg-gray-900/50 rounded-xl p-4">
                      <div>
                        <div className="text-white font-medium">{c.name}</div>
                        <div className="text-gray-400 text-xs mt-0.5">Last sync: {c.lastSync} · {c.rooms} rooms synced</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === "synced" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {c.status === "synced" ? <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Synced</span> : <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Error</span>}
                        </span>
                        <button className="text-xs text-amber-400 hover:underline flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Sync Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messaging" && (
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-amber-400" /> Automated Guest Messaging</h3>
                <div className="relative">
                  <div className="flex items-center gap-3 overflow-x-auto pb-4">
                    {[
                      { label: "Booking Confirmation", status: "active", icon: "✅" },
                      { label: "Pre-Arrival (24hr)", status: "active", icon: "📩" },
                      { label: "Welcome Message", status: "active", icon: "👋" },
                      { label: "Checkout Reminder", status: "active", icon: "🔔" },
                      { label: "Review Request", status: "inactive", icon: "⭐" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex-shrink-0 flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 ${s.status === "active" ? "border-green-500 bg-green-500/10" : "border-gray-600 bg-gray-800"}`}>
                          {s.icon}
                        </div>
                        {i < 4 && <div className="w-12 h-0.5 bg-gray-600 mt-7 -ml-12 absolute" style={{ left: `${i * 120 + 70}px` }} />}
                        <div className="text-xs text-gray-400 mt-2 text-center max-w-16">{s.label}</div>
                        <div className={`text-xs mt-1 font-medium ${s.status === "active" ? "text-green-400" : "text-gray-500"}`}>{s.status}</div>
                        <button className="text-xs text-amber-400 hover:underline mt-1">Edit</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
