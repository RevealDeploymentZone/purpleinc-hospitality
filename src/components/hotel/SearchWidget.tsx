"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, Users } from "lucide-react";

export default function SearchWidget() {
  const router = useRouter();
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(fmt(today));
  const [checkOut, setCheckOut] = useState(fmt(tomorrow));
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    router.push(`/availability?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-5 w-full max-w-3xl">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3" /> Check-In
          </label>
          <input type="date" value={checkIn} min={fmt(today)}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3" /> Check-Out
          </label>
          <input type="date" value={checkOut} min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400" />
        </div>
        <div className="w-full md:w-36">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Users className="w-3 h-3" /> Guests
          </label>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400">
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
          </select>
        </div>
        <button onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl transition-colors md:self-end">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
    </div>
  );
}
