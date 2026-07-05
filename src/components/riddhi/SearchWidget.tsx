"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search } from "lucide-react";

export default function RiddhiSearchWidget() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    router.push(`/riddhi/availability?checkin=${checkin}&checkout=${checkout}&guests=${guests}`);
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
        <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
        <div className="flex-1">
          <div className="text-xs text-gray-400 font-medium">Check-in</div>
          <input type="date" value={checkin} min={today} onChange={(e) => setCheckin(e.target.value)} className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent" />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
        <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
        <div className="flex-1">
          <div className="text-xs text-gray-400 font-medium">Check-out</div>
          <input type="date" value={checkout} min={checkin} onChange={(e) => setCheckout(e.target.value)} className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent" />
        </div>
      </div>
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 sm:w-36">
        <Users className="w-4 h-4 text-indigo-600 shrink-0" />
        <div className="flex-1">
          <div className="text-xs text-gray-400 font-medium">Guests</div>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent">
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
          </select>
        </div>
      </div>
      <button onClick={handleSearch} className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
        <Search className="w-4 h-4" /> Search
      </button>
    </div>
  );
}
