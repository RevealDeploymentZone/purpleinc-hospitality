"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatPrice } from "@/lib/utils";
import { Coffee, CheckCircle, AlertCircle, Edit2, RotateCcw, Clock, MessageSquare } from "lucide-react";

const tables = [
  { no: "T1", status: "occupied", guests: 4, order: "Received" },
  { no: "T2", status: "free", guests: 0, order: null },
  { no: "T3", status: "occupied", guests: 2, order: "Preparing" },
  { no: "T4", status: "reserved", guests: 6, order: null },
  { no: "T5", status: "free", guests: 0, order: null },
  { no: "T6", status: "occupied", guests: 3, order: "Ready" },
  { no: "T7", status: "occupied", guests: 2, order: "Served" },
  { no: "T8", status: "free", guests: 0, order: null },
  { no: "T9", status: "reserved", guests: 4, order: null },
  { no: "T10", status: "occupied", guests: 5, order: "Preparing" },
];

const orders = [
  { id: "ORD001", table: "T1", items: "Butter Chicken, Naan ×3, Dal", status: "Received", time: "2m ago" },
  { id: "ORD002", table: "T3", items: "Chilli Chicken, Fried Rice ×2", status: "Preparing", time: "8m ago" },
  { id: "ORD003", table: "T6", items: "Biryani, Raita, Gulab Jamun", status: "Ready", time: "15m ago" },
  { id: "ORD004", table: "T10", items: "Paneer Tikka, Laccha Paratha", status: "Preparing", time: "12m ago" },
];

const serviceReqs = [
  { table: "T7", type: "Bill", time: "3m ago", status: "open" },
  { table: "T3", type: "Water", time: "5m ago", status: "done" },
  { table: "T1", type: "Napkins", time: "10m ago", status: "done" },
];

export default function CafeDashboard() {
  const [activeTab, setActiveTab] = useState<"ops" | "menu" | "channel" | "messaging">("ops");

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Coffee className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-semibold">Krystal Cafe</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Cafe Dashboard</h1>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">{formatPrice(42000)}</div>
            <div className="text-gray-400 text-xs">Revenue Today</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[["Live Orders", "4", "text-green-400"], ["Tables Occupied", "6/10", "text-blue-400"], ["Service Requests", "1", "text-red-400"], ["Avg Order Value", "₹480", "text-emerald-400"]].map(([label, val, color]) => (
            <div key={label as string} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">{label as string}</div>
              <div className={`text-2xl font-bold ${color as string}`}>{val as string}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="flex border-b border-gray-700/50">
            {[["ops", "Table & Orders"], ["menu", "Menu CMS"], ["channel", "Aggregators"], ["messaging", "Messaging"]].map(([id, label]) => (
              <button key={id as string} onClick={() => setActiveTab(id as typeof activeTab)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === id ? "border-emerald-500 text-emerald-400" : "border-transparent text-gray-400 hover:text-gray-200"}`}>
                {label as string}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === "ops" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table map */}
                <div>
                  <h3 className="text-white font-bold mb-3">Table Map</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {tables.map((t) => (
                      <div key={t.no} className={`rounded-xl p-3 border ${t.status === "occupied" ? "bg-blue-500/10 border-blue-500/30" : t.status === "reserved" ? "bg-amber-500/10 border-amber-500/30" : "bg-green-500/10 border-green-500/30"}`}>
                        <div className="flex justify-between items-center">
                          <div className="text-white font-bold text-sm">{t.no}</div>
                          <div className={`w-2 h-2 rounded-full ${t.status === "occupied" ? "bg-blue-500" : t.status === "reserved" ? "bg-amber-500" : "bg-green-500"}`} />
                        </div>
                        <div className="text-xs text-gray-400 mt-1 capitalize">{t.status}</div>
                        {t.order && <div className="text-xs text-emerald-400 mt-0.5">{t.order}</div>}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-3">
                    {[["occupied", "Occupied", "bg-blue-500"], ["reserved", "Reserved", "bg-amber-500"], ["free", "Free", "bg-green-500"]].map(([k, l, c]) => (
                      <div key={k as string} className="flex items-center gap-1 text-xs text-gray-400">
                        <span className={`w-2 h-2 rounded-full ${c as string}`} />{l as string}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order queue */}
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /> Kitchen Queue</h3>
                  <div className="space-y-2">
                    {orders.map((o) => (
                      <div key={o.id} className="bg-gray-900/50 rounded-xl p-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-white text-sm font-medium">Table {o.table} · {o.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${o.status === "Received" ? "bg-amber-500/20 text-amber-400" : o.status === "Preparing" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>{o.status}</span>
                        </div>
                        <div className="text-gray-400 text-xs">{o.items}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{o.time}</div>
                        <div className="flex gap-2 mt-2">
                          {o.status === "Received" && <button className="text-xs text-blue-400 hover:underline">Start Preparing</button>}
                          {o.status === "Preparing" && <button className="text-xs text-green-400 hover:underline">Mark Ready</button>}
                          {o.status === "Ready" && <button className="text-xs text-gray-400 hover:underline">Mark Served</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service requests */}
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Service Requests</h3>
                  <div className="space-y-2">
                    {serviceReqs.map((r, i) => (
                      <div key={i} className="bg-gray-900/50 rounded-xl p-3">
                        <div className="flex justify-between">
                          <span className="text-white text-sm font-medium">Table {r.table}: {r.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "open" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>{r.status}</span>
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5">{r.time}</div>
                        {r.status === "open" && <button className="text-xs text-emerald-400 hover:underline mt-1">Resolve →</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div>
                <div className="flex justify-between mb-4">
                  <h3 className="text-white font-bold">Menu Items</h3>
                  <button className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg">+ Add Item</button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Butter Chicken", category: "North Indian", price: 440, status: "available" },
                    { name: "Chilli Chicken", category: "Chinese", price: 380, status: "available" },
                    { name: "Lucknowi Biryani", category: "North Indian", price: 480, status: "available" },
                    { name: "Veg Fried Rice", category: "Chinese", price: 260, status: "86d" },
                    { name: "Gulab Jamun", category: "Dessert", price: 120, status: "available" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between bg-gray-900/50 rounded-xl p-4">
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-400 text-xs">{item.category}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-emerald-400 font-bold">{formatPrice(item.price)}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${item.status === "available" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{item.status === "86d" ? "86'd" : "Available"}</span>
                        <button className="text-xs text-amber-400 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" /> Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "channel" && (
              <div>
                <h3 className="text-white font-bold mb-4">Aggregator Sync</h3>
                <div className="space-y-3">
                  {[
                    { name: "Zomato", status: "synced", lastSync: "5 mins ago" },
                    { name: "Swiggy", status: "synced", lastSync: "10 mins ago" },
                    { name: "EatSure", status: "error", lastSync: "3 hours ago" },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between bg-gray-900/50 rounded-xl p-4">
                      <div>
                        <div className="text-white font-medium">{c.name}</div>
                        <div className="text-gray-400 text-xs">Last sync: {c.lastSync}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === "synced" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {c.status === "synced" ? "Synced" : "Error"}
                        </span>
                        <button className="text-xs text-emerald-400 hover:underline flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Sync</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messaging" && (
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-emerald-400" /> Customer Messaging Automation</h3>
                <div className="flex items-center gap-3 overflow-x-auto pb-4">
                  {[
                    { label: "Reservation Confirm", status: "active", icon: "✅" },
                    { label: "Day-Before Reminder", status: "active", icon: "📩" },
                    { label: "Welcome Offer", status: "active", icon: "🎉" },
                    { label: "Review / Loyalty", status: "inactive", icon: "⭐" },
                  ].map((s) => (
                    <div key={s.label} className="flex-shrink-0 flex flex-col items-center min-w-24">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 ${s.status === "active" ? "border-green-500 bg-green-500/10" : "border-gray-600 bg-gray-800"}`}>{s.icon}</div>
                      <div className="text-xs text-gray-400 mt-2 text-center">{s.label}</div>
                      <div className={`text-xs mt-1 font-medium ${s.status === "active" ? "text-green-400" : "text-gray-500"}`}>{s.status}</div>
                      <button className="text-xs text-emerald-400 hover:underline mt-1">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
