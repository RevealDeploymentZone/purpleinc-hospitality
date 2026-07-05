"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatPrice } from "@/lib/utils";
import { Download } from "lucide-react";

const revenueData = [
  { month: "Jan", hg: 280000, rp: 190000, kc: 95000 },
  { month: "Feb", hg: 260000, rp: 175000, kc: 88000 },
  { month: "Mar", hg: 320000, rp: 210000, kc: 112000 },
  { month: "Apr", hg: 295000, rp: 198000, kc: 105000 },
  { month: "May", hg: 315000, rp: 220000, kc: 118000 },
  { month: "Jun", hg: 340000, rp: 235000, kc: 125000 },
  { month: "Jul", hg: 265000, rp: 180000, kc: 42000 },
];

export default function AnalyticsPage() {
  const [view, setView] = useState<"combined" | "property">("combined");
  const maxVal = Math.max(...revenueData.map((d) => d.hg + d.rp + d.kc));

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Analytics & Reporting</h1>
          <div className="flex items-center gap-3">
            <select className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
            <button className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {[
            ["Group Revenue (YTD)", formatPrice(2875000), "+18%"],
            ["Total Guests", "8,420", "+12%"],
            ["Avg Occupancy", "76%", "+5%"],
            ["Repeat Guests", "34%", "+8%"],
          ].map(([label, val, trend]) => (
            <div key={label as string} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">{label as string}</div>
              <div className="text-2xl font-bold text-white">{val as string}</div>
              <div className="text-green-400 text-xs mt-1 font-medium">{trend as string} vs last year</div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold">Revenue by Month</h3>
            <div className="flex bg-gray-700 rounded-xl overflow-hidden">
              {(["combined", "property"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-semibold transition-all ${view === v ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}>
                  {v === "combined" ? "Combined" : "By Property"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {revenueData.map((d) => {
              const combined = d.hg + d.rp + d.kc;
              const height = (combined / maxVal) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  {view === "combined" ? (
                    <div className="w-full bg-purple-500/80 rounded-t-lg hover:bg-purple-400 transition-colors cursor-pointer" style={{ height: `${height}%` }} title={formatPrice(combined)} />
                  ) : (
                    <div className="w-full flex flex-col rounded-t-lg overflow-hidden" style={{ height: `${height}%` }}>
                      <div className="flex-1 bg-amber-500/70" style={{ flexBasis: `${(d.hg / combined) * 100}%` }} />
                      <div className="flex-1 bg-blue-500/70" style={{ flexBasis: `${(d.rp / combined) * 100}%` }} />
                      <div className="flex-1 bg-emerald-500/70" style={{ flexBasis: `${(d.kc / combined) * 100}%` }} />
                    </div>
                  )}
                  <span className="text-xs text-gray-400">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-5 mt-4">
            {[["Heera Grand", "bg-amber-500"], ["Riddhi Palace", "bg-blue-500"], ["Krystal Cafe", "bg-emerald-500"]].map(([label, color]) => (
              <div key={label as string} className="flex items-center gap-2 text-xs text-gray-400">
                <span className={`w-3 h-3 rounded-sm ${color as string}`} />{label as string}
              </div>
            ))}
          </div>
        </div>

        {/* Occupancy trend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-4">Hotel Occupancy Trend</h3>
            <div className="space-y-3">
              {[["Heera Grand", 78, "amber"], ["Riddhi Palace", 82, "blue"]].map(([name, pct, color]) => (
                <div key={name as string}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{name as string}</span>
                    <span className="text-white font-bold">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-${color as string}-500 rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
            <h3 className="text-white font-bold mb-4">Top Source Channels</h3>
            <div className="space-y-2">
              {[["Direct Booking", 38, "purple"], ["Booking.com", 27, "blue"], ["MakeMyTrip", 18, "red"], ["Walk-in", 10, "amber"], ["Agoda", 7, "green"]].map(([name, pct, color]) => (
                <div key={name as string} className="flex items-center gap-3">
                  <div className="text-gray-300 text-sm w-28 truncate">{name as string}</div>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-${color as string}-500 rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-gray-400 text-xs w-8 text-right">{pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
