"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, Users, Maximize2, BedDouble, CheckCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { rooms, reviews } from "@/data/hotel";
import { formatPrice } from "@/lib/utils";

export default function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const [imgIdx, setImgIdx] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-amber-600">Rooms</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{room.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="relative rounded-2xl overflow-hidden mb-3 h-72 md:h-[420px]">
                <Image src={room.images[imgIdx]} alt={room.name} fill className="object-cover" unoptimized />
                <button onClick={() => setImgIdx((i) => (i - 1 + room.images.length) % room.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setImgIdx((i) => (i + 1) % room.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={() => setLightbox(imgIdx)} className="absolute bottom-3 right-3 bg-white/80 text-xs font-medium px-3 py-1 rounded-full hover:bg-white">
                  View All Photos
                </button>
              </div>
              <div className="flex gap-2 mb-8">
                {room.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`relative rounded-xl overflow-hidden w-24 h-16 border-2 transition-all ${i === imgIdx ? "border-amber-500" : "border-transparent"}`}>
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>

              {/* Room info */}
              <div className="mb-4">
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">{room.tag}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{room.name}</h1>
              <div className="flex flex-wrap gap-5 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4 text-amber-500" /> {room.size}</div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-amber-500" /> Up to {room.occupancy} guests</div>
                <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-amber-500" /> {room.bed} bed</div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-8">{room.description}</p>

              {/* Amenities */}
              <h2 className="text-xl font-bold text-gray-900 mb-4">Room Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" /> {a}
                  </div>
                ))}
              </div>

              {/* Reviews */}
              <h2 className="text-xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl font-bold text-gray-900">4.6</div>
                <div>
                  <div className="flex">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                  <div className="text-sm text-gray-500 mt-0.5">Based on 842 reviews</div>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.name} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs">{r.avatar}</div>
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{r.name}</div>
                        <div className="flex items-center gap-1">
                          {Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                          <span className="text-xs text-gray-400 ml-1">{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
                <div className="text-3xl font-bold text-amber-700 mb-1">{formatPrice(room.price)}</div>
                <div className="text-sm text-gray-400 mb-5">per night + taxes</div>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Check-In
                    </label>
                    <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Check-Out
                    </label>
                    <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                  </div>
                </div>

                <Link href={`/book?room=${room.id}&checkin=${checkIn}&checkout=${checkOut}`}
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-center py-3.5 rounded-xl transition-colors mb-3">
                  Book Now
                </Link>
                <Link href={`/availability?room=${room.id}&checkin=${checkIn}&checkout=${checkOut}`}
                  className="block w-full border border-amber-200 text-amber-700 font-semibold text-center py-3 rounded-xl hover:bg-amber-50 transition-colors text-sm">
                  Check Availability
                </Link>

                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                  {["Free cancellation (48hr)", "Best price guarantee", "Instant confirmation"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <Image src={room.images[lightbox]} alt="" width={1200} height={800} className="rounded-xl object-contain max-h-[80vh] w-full" unoptimized />
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) - 1 + room.images.length) % room.images.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 text-white hover:bg-white/40">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => ((i ?? 0) + 1) % room.images.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 text-white hover:bg-white/40">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Book Now bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden z-40">
        <div>
          <div className="font-bold text-gray-900 text-lg">{formatPrice(room.price)}<span className="text-xs text-gray-400 font-normal">/night</span></div>
        </div>
        <Link href={`/book?room=${room.id}`} className="bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl">Book Now</Link>
      </div>

      <Footer />
      <ChatWidget />
    </>
  );
}
