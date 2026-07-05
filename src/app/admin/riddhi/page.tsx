import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Hotel } from "lucide-react";

export default function RiddhiPalaceDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Hotel className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm font-semibold">Riddhi Palace</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Property Dashboard</h1>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-blue-300 text-sm">
          <p className="font-semibold mb-2">Same interface as Heera Grand</p>
          <p className="text-blue-400">Riddhi Palace dashboard uses the exact same template as Heera Grand (screens reuse pattern as specified in IAH Section D). All features — bookings, housekeeping, channel manager, messaging — are identical, populated with Riddhi Palace data.</p>
          <Link href="/admin/heera" className="inline-block mt-4 bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-700">
            View Heera Grand Template →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[["Occupancy", "82%"], ["Arrivals Today", "6"], ["Departures", "4"], ["Revenue", "₹98,000"]].map(([label, val]) => (
            <div key={label as string} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
              <div className="text-gray-400 text-xs mb-1">{label as string}</div>
              <div className="text-white font-bold text-xl">{val as string}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
