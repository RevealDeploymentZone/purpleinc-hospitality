"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Users, Maximize2, BedDouble, ChevronRight, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { rooms } from "@/data/hotel";
import { formatPrice } from "@/lib/utils";

export default function RoomsPage() {
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minOccupancy, setMinOccupancy] = useState(1);
  const [bedFilter, setBedFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = rooms.filter(
    (r) => r.price <= maxPrice && r.occupancy >= minOccupancy && (bedFilter === "All" || r.bed.includes(bedFilter))
  );

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-16 px-4 text-center">
          <div className="text-sm font-semibold tracking-widest uppercase text-amber-200 mb-2">Accommodations</div>
          <h1 className="text-3xl md:text-5xl font-bold">Rooms & Rates</h1>
          <p className="mt-3 text-amber-100 max-w-xl mx-auto">Four distinct room types, all crafted for comfort, elegance, and the warmth of Nawabi hospitality.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-8">
            <div className="flex items-center justify-between md:hidden mb-3">
              <span className="font-semibold text-gray-700">Filters</span>
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-amber-700 text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4" /> {showFilters ? "Hide" : "Show"}
              </button>
            </div>
            <div className={`flex flex-col md:flex-row gap-5 ${showFilters ? "flex" : "hidden md:flex"}`}>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Max Price: {formatPrice(maxPrice)}/night</label>
                <input type="range" min={2000} max={10000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-600" />
              </div>
              <div className="w-full md:w-40">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Min Guests</label>
                <select value={minOccupancy} onChange={(e) => setMinOccupancy(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400">
                  {[1, 2, 3].map((n) => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>
              <div className="w-full md:w-48">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Bed Type</label>
                <select value={bedFilter} onChange={(e) => setBedFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400">
                  {["All", "King", "Double", "Single"].map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No rooms match your filters</h3>
              <p className="text-gray-500">Try adjusting the price range or occupancy.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((room) => (
                <div key={room.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Image carousel (simplified) */}
                    <div className="relative md:w-80 h-56 md:h-auto shrink-0">
                      <Image src={room.image} alt={room.name} fill className="object-cover" unoptimized />
                      <div className="absolute top-3 left-3">
                        <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{room.tag}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4 text-amber-500" /> {room.size}</div>
                          <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-amber-500" /> {room.occupancy} Guests</div>
                          <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-amber-500" /> {room.bed}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.slice(0, 5).map((a) => (
                            <span key={a} className="text-xs bg-amber-50 text-amber-800 border border-amber-100 px-2.5 py-1 rounded-full">{a}</span>
                          ))}
                          {room.amenities.length > 5 && (
                            <span className="text-xs text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">+{room.amenities.length - 5} more</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-amber-700 font-bold text-2xl">{formatPrice(room.price)}</div>
                          <div className="text-xs text-gray-400">per night + taxes</div>
                        </div>
                        <div className="flex gap-3">
                          <Link href={`/rooms/${room.slug}`}
                            className="flex items-center gap-1 text-amber-700 border border-amber-200 font-medium text-sm px-4 py-2 rounded-xl hover:bg-amber-50 transition-colors">
                            Details <ChevronRight className="w-4 h-4" />
                          </Link>
                          <Link href={`/book?room=${room.id}`}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors">
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
