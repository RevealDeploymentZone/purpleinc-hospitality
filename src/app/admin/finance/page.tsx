import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatPrice } from "@/lib/utils";
import { Download } from "lucide-react";

const data = [
  { property: "Heera Grand", direct: 580000, otaBooking: 320000, otaMmt: 185000, walkin: 92000, total: 1177000 },
  { property: "Riddhi Palace", direct: 420000, otaBooking: 265000, otaMmt: 145000, walkin: 68000, total: 898000 },
  { property: "Krystal Cafe", direct: 0, otaBooking: 0, otaMmt: 0, walkin: 580000, total: 580000, zomato: 220000, swiggy: 90000 },
];

export default function FinancePage() {
  const grandTotal = data.reduce((s, d) => s + d.total, 0);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Revenue & Finance</h1>
          <button className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-700">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 mb-5">
          <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Group Revenue (YTD 2025)</div>
          <div className="text-4xl font-bold text-white">{formatPrice(grandTotal)}</div>
          <div className="text-green-400 text-sm mt-1 font-medium">+18% vs 2024</div>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-gray-700/50">
                {["Property", "Direct Booking", "Booking.com", "MakeMyTrip", "Walk-in / Aggregator", "Total"].map((h) => (
                  <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {data.map((row) => (
                <tr key={row.property} className="hover:bg-gray-700/20">
                  <td className="py-4 px-4 font-medium text-white">{row.property}</td>
                  <td className="py-4 px-4 text-green-400">{row.direct ? formatPrice(row.direct) : "—"}</td>
                  <td className="py-4 px-4 text-gray-300">{row.otaBooking ? formatPrice(row.otaBooking) : row.zomato ? formatPrice(row.zomato as number) : "—"}</td>
                  <td className="py-4 px-4 text-gray-300">{row.otaMmt ? formatPrice(row.otaMmt) : row.swiggy ? formatPrice(row.swiggy as number) : "—"}</td>
                  <td className="py-4 px-4 text-gray-300">{formatPrice(row.walkin)}</td>
                  <td className="py-4 px-4 font-bold text-amber-400">{formatPrice(row.total)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-600">
                <td className="py-4 px-4 font-bold text-white">TOTAL</td>
                <td className="py-4 px-4 font-bold text-green-400">{formatPrice(1000000)}</td>
                <td className="py-4 px-4 font-bold text-gray-300">{formatPrice(805000)}</td>
                <td className="py-4 px-4 font-bold text-gray-300">{formatPrice(420000)}</td>
                <td className="py-4 px-4 font-bold text-gray-300">{formatPrice(830000)}</td>
                <td className="py-4 px-4 font-bold text-purple-400 text-lg">{formatPrice(grandTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
