import Image from "next/image";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { Crown, MapPin, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-16 px-4 text-center">
          <div className="text-sm font-semibold tracking-widest uppercase text-amber-200 mb-2">Our Story</div>
          <h1 className="text-3xl md:text-5xl font-bold">About Heera Grand</h1>
        </div>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm mb-4">
                <Crown className="w-4 h-4" /> Est. 2008
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">A Legacy of Nawabi Hospitality</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2008 by the Verma family, Heera Grand was born from a singular vision: to bring the warmth, elegance, and graciousness of Lucknow&apos;s Nawabi culture to every guest who walks through our doors.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Strategically located just 500 metres from Charbagh Railway Station, we have been the preferred home for business travellers, leisure guests, and families visiting the City of Nawabs for over 15 years.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Heera Grand stands as part of the PurpleInc hospitality group, alongside Riddhi Palace and Krystal Cafe — all united by one promise: <em>Exceptional hospitality, every single time.</em>
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" alt="Heera Grand" fill className="object-cover" unoptimized />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[["15+", "Years of Service"], ["4,000+", "Happy Guests/Year"], ["4.6★", "Average Rating"], ["3", "PurpleInc Properties"]].map(([stat, label]) => (
              <div key={label} className="text-center bg-amber-50 rounded-2xl p-5">
                <div className="text-3xl font-bold text-amber-700 mb-1">{stat}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80" alt="Hotel interior" fill className="object-cover" unoptimized />
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm mb-4">
                <MapPin className="w-4 h-4" /> Location Advantage
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Heart of Lucknow</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Situated in Charbagh — the cultural and transport hub of Lucknow — Heera Grand places you within minutes of the city&apos;s most iconic landmarks: Bara Imambara, Rumi Darwaza, Hazratganj Market, and the legendary Tunday Kababi.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" /> Owned and operated by the Verma Family, Lucknow
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
