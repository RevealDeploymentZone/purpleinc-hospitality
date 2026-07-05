"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = {
  Rooms: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=80",
  ],
  "Common Areas": [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
  ],
  Dining: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  ],
  Exterior: [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80",
  ],
};

export default function RiddhiGalleryPage() {
  const [active, setActive] = useState("Rooms");
  const [lightbox, setLightbox] = useState<{ imgs: string[]; idx: number } | null>(null);
  const imgs = categories[active as keyof typeof categories];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 py-16 px-4 text-center text-white">
        <div className="text-sm tracking-widest uppercase text-indigo-200 mb-2">Riddhi Palace</div>
        <h1 className="text-4xl font-bold">Gallery</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {Object.keys(categories).map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${active === cat ? "bg-indigo-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <button key={i} onClick={() => setLightbox({ imgs, idx: i })} className="relative aspect-video rounded-2xl overflow-hidden hover:opacity-90 transition-opacity">
              <Image src={src} alt="" fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white"><X className="w-7 h-7" /></button>
          <button onClick={() => setLightbox({ ...lightbox, idx: (lightbox.idx - 1 + lightbox.imgs.length) % lightbox.imgs.length })} className="absolute left-4 text-white"><ChevronLeft className="w-8 h-8" /></button>
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden">
            <Image src={lightbox.imgs[lightbox.idx]} alt="" fill className="object-contain" unoptimized />
          </div>
          <button onClick={() => setLightbox({ ...lightbox, idx: (lightbox.idx + 1) % lightbox.imgs.length })} className="absolute right-4 text-white"><ChevronRight className="w-8 h-8" /></button>
        </div>
      )}
    </div>
  );
}
