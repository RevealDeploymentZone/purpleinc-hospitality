import Image from "next/image";
import { MapPin, Star, Users, Award } from "lucide-react";

export default function RiddhiAboutPage() {
  return (
    <div className="min-h-screen">
      <div className="relative h-72">
        <Image src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80" alt="Riddhi Palace" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-indigo-950/60 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-sm tracking-widest uppercase text-indigo-300 mb-2">Our Story</div>
            <h1 className="text-4xl font-bold">About Riddhi Palace</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Heritage</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">A Palace in the Heart of Hazratganj</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Riddhi Palace was founded with a singular vision: to offer the grandeur of Nawabi Lucknow in a setting that feels both regal and warmly personal. Located in the prestigious Hazratganj neighbourhood, we are mere steps away from Lucknow&apos;s finest heritage monuments, restaurants, and shopping streets.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every detail — from the hand-painted murals in our corridors to the curated local artwork in each room — reflects our deep love for Lucknow&apos;s culture, craftsmanship, and legendary hospitality. A PurpleInc property, Riddhi Palace has been welcoming guests since 2018.
            </p>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80" alt="Hotel interior" fill className="object-cover" unoptimized />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Star, value: "4.5★", label: "Average Rating" },
            { icon: Users, value: "600+", label: "Happy Guests/Month" },
            { icon: Award, value: "7+", label: "Years of Excellence" },
            { icon: MapPin, value: "0.3 km", label: "From Hazratganj Market" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-indigo-50 rounded-2xl p-6 text-center">
              <Icon className="w-6 h-6 text-indigo-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-indigo-700">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
          ].map((src, i) => (
            <div key={i} className="relative h-52 rounded-2xl overflow-hidden">
              <Image src={src} alt="Property" fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
            </div>
          ))}
        </div>

        <div className="bg-indigo-700 rounded-3xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">PurpleInc Hospitality Group</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">Riddhi Palace is a proud member of PurpleInc Hospitality, alongside Hotel Heera Grand (Charbagh) and Krystal Cafe (Hazratganj). We are committed to redefining guest experiences across Lucknow.</p>
        </div>
      </div>
    </div>
  );
}
