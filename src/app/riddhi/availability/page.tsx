"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle, Users, BedDouble, Maximize2 } from "lucide-react";
import { riddhiRooms } from "@/data/riddhi";
import { formatPrice } from "@/lib/utils";

function AvailabilityContent() {
  const params = useSearchParams();
  const checkin = params.get("checkin") || "";
  const checkout = params.get("checkout") || "";
  const guests = Number(params.get("guests") || 2);

  const nights = checkin && checkout
    ? Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
    : 1;

  const available = riddhiRooms.filter((r) => r.occupancy >= guests);
  const unavailable = riddhiRooms.filter((r) => r.occupancy < guests);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 py-12 px-4 text-center text-white">
        <h1 className="text-3xl font-bold">Available Rooms</h1>
        {checkin && <p className="text-indigo-200 mt-2">{checkin} → {checkout} · {guests} guest{guests > 1 ? "s" : ""} · {nights} night{nights > 1 ? "s" : ""}</p>}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> {available.length} Rooms Available</h2>
        {available.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div className="relative md:w-64 h-48 md:h-auto shrink-0">
              <Image src={room.image} alt={room.name} fill className="object-cover" unoptimized />
              {room.tag && <span className="absolute top-3 left-3 bg-indigo-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{room.tag}</span>}
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {room.size}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Up to {room.occupancy}</span>
                  <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {room.bed}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-indigo-700">{formatPrice(room.price * nights)}</div>
                  <div className="text-xs text-gray-400">for {nights} night{nights > 1 ? "s" : ""} · {formatPrice(room.price)}/night</div>
                </div>
                <Link href={`/riddhi/book?room=${room.slug}&checkin=${checkin}&checkout=${checkout}`}
                  className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        {unavailable.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-gray-400 flex items-center gap-2 mt-8"><XCircle className="w-5 h-5 text-red-400" /> Not available for {guests} guests</h2>
            {unavailable.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row opacity-50">
                <div className="relative md:w-64 h-40 shrink-0">
                  <Image src={room.image} alt={room.name} fill className="object-cover grayscale" unoptimized />
                </div>
                <div className="flex-1 p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-700">{room.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">Max occupancy: {room.occupancy} guests</p>
                  </div>
                  <span className="bg-red-100 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full">Sold Out</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function RiddhiAvailabilityPage() {
  return <Suspense><AvailabilityContent /></Suspense>;
}
