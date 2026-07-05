import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, Wifi, Car, Coffee, Utensils, Dumbbell, Wind, Shield, TrendingDown, MapPin, ChevronRight, BadgePercent } from "lucide-react";
import RiddhiSearchWidget from "@/components/riddhi/SearchWidget";
import { riddhiData, riddhiRooms, riddhiReviews, riddhiAttractions } from "@/data/riddhi";
import { formatPrice } from "@/lib/utils";

const amenities = [
  { icon: Wifi, label: "Free High-Speed WiFi" },
  { icon: Car, label: "Free Parking" },
  { icon: Coffee, label: "Complimentary Breakfast" },
  { icon: Utensils, label: "Multi-Cuisine Restaurant" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Wind, label: "24hr Room Service" },
  { icon: Shield, label: "24hr Security" },
  { icon: BadgePercent, label: "Best Price Guarantee" },
];

export default function RiddhiHomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80"
            alt="Riddhi Palace" fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-indigo-900/30 to-indigo-950/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center gap-8 pt-16">
          <div>
            <div className="text-sm font-semibold tracking-[0.3em] uppercase text-indigo-300 mb-3">Welcome to Hazratganj</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              Royal Comfort in the<br />Heart of Lucknow
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Experience regal hospitality, curated luxury, and the timeless charm of Nawabi Lucknow at Riddhi Palace.
            </p>
          </div>
          <RiddhiSearchWidget />
          <div className="flex items-center gap-2 text-indigo-300 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Best price guarantee when you book direct — save up to 15% vs OTAs</span>
          </div>
        </div>
      </section>

      {/* Rooms Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Accommodations</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Rooms & Suites</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Four distinct room categories, each designed for a different kind of royal experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {riddhiRooms.map((room) => (
              <Link key={room.id} href={`/riddhi/rooms/${room.slug}`} className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  {room.tag && <span className="absolute top-3 left-3 bg-indigo-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{room.tag}</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{room.bed} · {room.occupancy} guests · {room.size}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-indigo-700">{formatPrice(room.price)}</span>
                      <span className="text-xs text-gray-400">/night</span>
                    </div>
                    <span className="text-xs text-indigo-600 font-semibold flex items-center gap-0.5">View <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/riddhi/rooms" className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-xl inline-block transition-colors">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Strip */}
      <section className="py-12 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {amenities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book Direct */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Why Book Direct</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Save More, Get More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: TrendingDown, title: "Up to 15% Cheaper", desc: "Always cheaper than Booking.com, MakeMyTrip & Agoda when you book directly." },
              { icon: BadgePercent, title: "Free Breakfast", desc: "Complimentary breakfast for direct bookings. Save ₹600+ per person per day." },
              { icon: CheckCircle, title: "Free Upgrade", desc: "Subject to availability — direct guests get priority for complimentary room upgrades." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-indigo-50 rounded-2xl p-6 text-left">
                <Icon className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Nearby</div>
            <h2 className="text-3xl font-bold text-gray-900">Explore Lucknow</h2>
            <p className="text-gray-500 mt-2">Riddhi Palace sits at the heart of everything beautiful in Lucknow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {riddhiAttractions.slice(0, 3).map((a) => (
              <div key={a.name} className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40">
                  <Image src={a.image} alt={a.name} fill className="object-cover" unoptimized />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold mb-1">
                    <MapPin className="w-3 h-3" /> {a.distance} away
                  </div>
                  <h3 className="font-bold text-gray-900">{a.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/riddhi/explore" className="text-indigo-700 font-semibold hover:underline flex items-center gap-1 justify-center">
              View All Attractions <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Guest Reviews</div>
            <h2 className="text-3xl font-bold text-gray-900">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="font-bold text-gray-900 ml-1">{riddhiData.rating}</span>
              <span className="text-gray-400 text-sm">({riddhiData.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {riddhiReviews.map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-700 italic mb-3">&ldquo;{r.text}&rdquo;</p>
                <div className="text-xs font-semibold text-gray-900">{r.name}</div>
                <div className="text-xs text-gray-400">{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-indigo-700">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for a Royal Stay?</h2>
          <p className="text-indigo-200 mb-8">Book directly for the best rates, free breakfast, and priority upgrades.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/riddhi/book" className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
              Book Now
            </Link>
            <Link href="/riddhi/rooms" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              View Rooms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
