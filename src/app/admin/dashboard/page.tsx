import Link from "next/link";
import { TrendingUp, Hotel, Coffee, AlertCircle, ArrowUpRight, CheckCircle, Clock } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatPrice } from "@/lib/utils";

const propertyCards = [
  { name: "Heera Grand", href: "/admin/heera", color: "amber", arrivals: 8, departures: 5, occupancy: 78, revenue: 125000, alert: null },
  { name: "Riddhi Palace", href: "/admin/riddhi", color: "blue", arrivals: 6, departures: 4, occupancy: 82, revenue: 98000, alert: "OTA sync failed 2h ago" },
  { name: "Krystal Cafe", href: "/admin/cafe-dashboard", color: "emerald", liveOrders: 12, tables: "6/10", openTickets: 3, revenue: 42000, alert: null },
];

const recentAlerts = [
  { type: "error", property: "Riddhi Palace", msg: "Booking.com sync failed — check channel manager", time: "2h ago" },
  { type: "warning", property: "Heera Grand", msg: "New 3-star review posted — response pending", time: "4h ago" },
  { type: "info", property: "Krystal Cafe", msg: "Zomato menu update pushed successfully", time: "6h ago" },
  { type: "success", property: "Heera Grand", msg: "Campaign 'Monsoon Offer' reached 1,200 contacts", time: "1d ago" },
];

export default function GroupDashboardPage() {
  const totalRevenue = 265000;

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-white">Group Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5">Saturday, 5 July 2025 · Good morning, Owner Verma!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> 2 alerts
            </div>
            <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">OV</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-7">
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl p-5">
            <div className="text-purple-300 text-xs font-semibold uppercase tracking-wide mb-1">Today Revenue</div>
            <div className="text-2xl font-bold text-white">{formatPrice(totalRevenue)}</div>
            <div className="flex items-center gap-1 text-green-400 text-xs mt-1"><TrendingUp className="w-3.5 h-3.5" /> +12% vs last week</div>
          </div>
          {[["Total Guests", "23"], ["Open Tickets", "9"], ["Avg Rating", "4.5 ★"]].map(([label, val]) => (
            <div key={label} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">{label}</div>
              <div className="text-2xl font-bold text-white">{val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
          {propertyCards.map((p) => (
            <Link key={p.name} href={p.href}
              className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 hover:bg-gray-800 hover:border-gray-600 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gray-700 rounded-xl flex items-center justify-center">
                    {"arrivals" in p ? <Hotel className="w-4 h-4 text-gray-300" /> : <Coffee className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-white font-bold text-sm">{p.name}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
              </div>

              {"arrivals" in p ? (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div><div className="text-gray-500 text-xs">Arrivals</div><div className="text-white font-bold">{p.arrivals}</div></div>
                  <div><div className="text-gray-500 text-xs">Departures</div><div className="text-white font-bold">{p.departures}</div></div>
                  <div><div className="text-gray-500 text-xs">Occupancy</div><div className="text-white font-bold">{p.occupancy}%</div></div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div><div className="text-gray-500 text-xs">Live Orders</div><div className="text-white font-bold">{p.liveOrders}</div></div>
                  <div><div className="text-gray-500 text-xs">Tables</div><div className="text-white font-bold">{p.tables}</div></div>
                  <div><div className="text-gray-500 text-xs">Requests</div><div className="text-white font-bold">{p.openTickets}</div></div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                <div>
                  <div className="text-gray-400 text-xs">Revenue Today</div>
                  <div className="font-bold text-green-400">{formatPrice(p.revenue)}</div>
                </div>
                {p.alert && (
                  <div className="flex items-center gap-1 text-red-400 text-xs font-medium bg-red-500/10 px-2 py-1 rounded-full">
                    <AlertCircle className="w-3 h-3" /> Alert
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Recent Alerts</h3>
            <Link href="/admin/notifications" className="text-xs text-purple-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/50">
                {alert.type === "error" && <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                {alert.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
                {alert.type === "info" && <Clock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />}
                {alert.type === "success" && <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-200">{alert.msg}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{alert.property}</span>
                    <span className="text-xs text-gray-500">· {alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
