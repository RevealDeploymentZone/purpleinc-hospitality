"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle, Users, BedDouble, Calendar } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { rooms } from "@/data/hotel";
import { formatPrice } from "@/lib/utils";

// Simulate sold out for suite on certain dates
function isAvailable(roomId: string) {
  return roomId !== "suite";
}

function AvailabilityContent() {
  const params = useSearchParams();
  const checkIn = params.get("checkin") || "";
  const checkOut = params.get("checkout") || "";
  const guests = Number(params.get("guests") || 2);

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 1;

  return (
    <>
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Available Rooms</h1>
          <div className="flex flex-wrap gap-4 text-sm text-amber-100">
            {checkIn && <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Check-in: {checkIn}</div>}
            {checkOut && <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Check-out: {checkOut}</div>}
            <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {guests} Guest{guests > 1 ? "s" : ""}</div>
            {nights > 1 && <div className="bg-amber-600/50 px-3 py-0.5 rounded-full">{nights} nights</div>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-5">
          {rooms.map((room) => {
            const available = isAvailable(room.id);
            const totalPrice = room.price * nights;

            return (
              <div key={room.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${!available ? "opacity-60" : "hover:shadow-lg"} transition-shadow ${!available ? "border-gray-100" : "border-gray-200"}`}>
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-72 h-48 md:h-auto shrink-0">
                    <Image src={room.image} alt={room.name} fill className="object-cover" unoptimized />
                    {!available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-full text-sm">Sold Out</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                        {available ? (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                            <CheckCircle className="w-4 h-4" /> Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500 text-xs font-semibold">
                            <XCircle className="w-4 h-4" /> Sold Out
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-amber-500" /> {room.occupancy} guests</div>
                        <div className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-amber-500" /> {room.bed}</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {room.amenities.slice(0, 4).map((a) => (
                          <span key={a} className="text-xs bg-amber-50 text-amber-800 border border-amber-100 px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-amber-700 font-bold text-2xl">{formatPrice(room.price)}<span className="text-sm font-normal text-gray-400">/night</span></div>
                        {nights > 1 && <div className="text-sm text-gray-500">{nights} nights = <span className="font-semibold text-gray-800">{formatPrice(totalPrice)}</span></div>}
                      </div>
                      {available ? (
                        <Link href={`/book?room=${room.id}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
                          Select Room
                        </Link>
                      ) : (
                        <button disabled className="bg-gray-200 text-gray-400 font-bold px-6 py-2.5 rounded-xl cursor-not-allowed">
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results banner */}
        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-800 mb-2">Can&apos;t find what you&apos;re looking for?</h3>
          <p className="text-sm text-gray-500 mb-4">Contact us directly and we&apos;ll do our best to accommodate you.</p>
          <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-700">
            Call Us Now
          </a>
        </div>
      </div>
    </>
  );
}

export default function AvailabilityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Checking availability...</div>}>
          <AvailabilityContent />
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
