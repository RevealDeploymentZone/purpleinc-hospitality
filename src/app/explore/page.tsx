import Image from "next/image";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { MapPin, ExternalLink } from "lucide-react";
import { attractions } from "@/data/hotel";

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-16 px-4 text-center">
          <div className="text-sm font-semibold tracking-widest uppercase text-amber-200 mb-2">Lucknow</div>
          <h1 className="text-3xl md:text-5xl font-bold">Explore the City of Nawabs</h1>
          <p className="mt-3 text-amber-100 max-w-xl mx-auto">All distances from Heera Grand, Charbagh</p>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((a) => (
              <div key={a.name} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-52">
                  <Image src={a.image} alt={a.name} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <MapPin className="w-3 h-3" /> {a.distance} away
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{a.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{a.desc}</p>
                  <a href={a.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-700 text-sm font-semibold hover:underline">
                    <ExternalLink className="w-4 h-4" /> Open in Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
