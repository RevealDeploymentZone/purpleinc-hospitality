"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Star, Maximize2, Users, BedDouble, Calendar } from "lucide-react";
import { riddhiRooms, riddhiReviews } from "@/data/riddhi";
import { formatPrice } from "@/lib/utils";

export default function RiddhiRoomDetailPage() {
  const { slug } = useParams();
  const room = riddhiRooms.find((r) => r.slug === slug) ?? riddhiRooms[0];
  const [activeImg, setActiveImg] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);

  const nights = Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gallery */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="relative h-[50vh] rounded-2xl overflow-hidden">
            <Image src={room.images[activeImg]} alt={room.name} fill className="object-cover" unoptimized />
          </div>
          <div className="flex gap-3 mt-3">
            {room.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-indigo-400" : "border-transparent"}`}>
                <Image src={img} alt="" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            {room.tag && <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">{room.tag}</span>}
            <h1 className="text-3xl font-bold text-gray-900 mt-3">{room.name}</h1>
            <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> {room.size}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Up to {room.occupancy} guests</span>
              <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {room.bed}</span>
            </div>
            <p className="text-gray-600 mt-5 leading-relaxed">{room.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Room Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
            <div className="space-y-4">
              {riddhiReviews.slice(0, 3).map((r) => (
                <div key={r.name} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm text-gray-700 italic">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-2 text-xs text-gray-500">{r.name} · {r.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:sticky lg:top-24 self-start bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
          <div className="text-center">
            <span className="text-3xl font-bold text-indigo-700">{formatPrice(room.price)}</span>
            <span className="text-sm text-gray-400"> / night</span>
          </div>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl px-4 py-2.5">
              <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Check-in</div>
              <input type="date" value={checkin} min={today} onChange={(e) => setCheckin(e.target.value)} className="w-full text-sm font-semibold text-gray-800 outline-none mt-1" />
            </div>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5">
              <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Check-out</div>
              <input type="date" value={checkout} min={checkin} onChange={(e) => setCheckout(e.target.value)} className="w-full text-sm font-semibold text-gray-800 outline-none mt-1" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{formatPrice(room.price)} × {nights} night{nights > 1 ? "s" : ""}</span>
              <span>{formatPrice(room.price * nights)}</span>
            </div>
            <div className="flex justify-between text-gray-600"><span>Taxes (18% GST)</span><span>{formatPrice(Math.round(room.price * nights * 0.18))}</span></div>
            <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
              <span>Total</span><span>{formatPrice(Math.round(room.price * nights * 1.18))}</span>
            </div>
          </div>

          <Link href={`/riddhi/book?room=${room.slug}&checkin=${checkin}&checkout=${checkout}`}
            className="block w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl text-center transition-colors">
            Book Now
          </Link>
          <p className="text-xs text-center text-gray-400">Free cancellation up to 24 hours before check-in</p>
        </div>
      </div>

      {/* Sticky mobile bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-40">
        <div>
          <span className="text-xl font-bold text-indigo-700">{formatPrice(room.price)}</span>
          <span className="text-xs text-gray-400"> /night</span>
        </div>
        <Link href={`/riddhi/book?room=${room.slug}`} className="bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl">
          Book Now
        </Link>
      </div>
    </div>
  );
}
