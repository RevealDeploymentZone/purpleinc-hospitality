"use client";
import { useState } from "react";
import Link from "next/link";
import { Crown, Calendar, MapPin, Edit2, XCircle, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const mockBookings = [
  { ref: "HG240891", room: "Deluxe Room", checkIn: "2025-07-20", checkOut: "2025-07-22", nights: 2, total: 7698, status: "upcoming" },
  { ref: "HG240765", room: "Classic Room", checkIn: "2025-06-10", checkOut: "2025-06-11", nights: 1, total: 2575, status: "completed" },
  { ref: "HG240612", room: "Executive Suite", checkIn: "2025-04-15", checkOut: "2025-04-18", nights: 3, total: 23597, status: "completed" },
];

const statusColors: Record<string, string> = {
  upcoming: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function MyBookingsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const filtered = mockBookings.filter((b) => tab === "upcoming" ? b.status === "upcoming" : b.status !== "upcoming");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">My Bookings</span>
          </Link>
          <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm">RS</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex bg-white rounded-xl border border-gray-200 p-1 mb-6">
          {(["upcoming", "past"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-amber-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>
              {t === "upcoming" ? "Upcoming" : "Past Bookings"}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">No {tab} bookings</h3>
            <p className="text-gray-400 text-sm mb-6">Time to plan your next Lucknow visit!</p>
            <Link href="/rooms" className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-700">
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div key={b.ref} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-gray-900">{b.room}</div>
                    <div className="text-xs font-mono text-gray-400 mt-0.5">Ref: {b.ref}</div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[b.status]}`}>{b.status}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {b.checkIn} → {b.checkOut}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Heera Grand, Lucknow</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-400">{b.nights} night{b.nights > 1 ? "s" : ""} · Total</div>
                    <div className="font-bold text-amber-700">{formatPrice(b.total)}</div>
                  </div>
                  {b.status === "upcoming" && (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50">
                        <Edit2 className="w-3.5 h-3.5" /> Modify
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  )}
                  {b.status === "completed" && (
                    <button className="flex items-center gap-1.5 text-xs font-medium text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-50">
                      Book Again <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
