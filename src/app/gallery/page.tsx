"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Rooms", "Dining", "Common Areas", "Exterior"];

const photos = [
  { cat: "Rooms", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", alt: "Deluxe Room" },
  { cat: "Rooms", src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", alt: "Classic Room" },
  { cat: "Rooms", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80", alt: "Executive Suite" },
  { cat: "Rooms", src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80", alt: "Twin Room" },
  { cat: "Dining", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Restaurant" },
  { cat: "Dining", src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", alt: "Breakfast Spread" },
  { cat: "Dining", src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Galouti Kebab" },
  { cat: "Common Areas", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", alt: "Lobby" },
  { cat: "Common Areas", src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", alt: "Reception" },
  { cat: "Common Areas", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", alt: "Fitness Center" },
  { cat: "Exterior", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", alt: "Hotel Exterior" },
  { cat: "Exterior", src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80", alt: "Hotel Entrance" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = photos.filter((p) => activeCategory === "All" || p.cat === activeCategory);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-16 px-4 text-center">
          <div className="text-sm font-semibold tracking-widest uppercase text-amber-200 mb-2">Gallery</div>
          <h1 className="text-3xl md:text-5xl font-bold">Photos & Ambience</h1>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === c ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((photo, i) => (
              <button key={i} onClick={() => setLightbox(i)}
                className="relative w-full rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow block group">
                <Image src={photo.src} alt={photo.alt} width={400} height={300} className="object-cover w-full group-hover:scale-105 transition-transform duration-300" unoptimized />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs bg-black/50 px-2 py-0.5 rounded-full">{photo.alt}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/40">
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={filtered[lightbox].src} alt={filtered[lightbox].alt} width={900} height={600} className="rounded-xl object-contain max-h-[80vh] w-full" unoptimized />
            <button onClick={() => setLightbox((l) => ((l ?? 0) - 1 + filtered.length) % filtered.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 text-white hover:bg-white/40">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setLightbox((l) => ((l ?? 0) + 1) % filtered.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 text-white hover:bg-white/40">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-4 text-white/60 text-sm">{lightbox + 1} / {filtered.length}</div>
        </div>
      )}

      <Footer />
      <ChatWidget />
    </>
  );
}
