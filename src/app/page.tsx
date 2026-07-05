import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, Wifi, Car, Coffee, Utensils, Dumbbell, Wind, Shield, TrendingDown, MapPin, ChevronRight, BadgePercent } from "lucide-react";
import SearchWidget from "@/components/hotel/SearchWidget";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { rooms, reviews, attractions } from "@/data/hotel";
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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
              alt="Heera Grand Hotel" fill className="object-cover" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </div>
          <div className="relative z-10 text-center text-white px-4 flex flex-col items-center gap-8 pt-16">
            <div>
              <div className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-300 mb-3">Welcome to Lucknow</div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                Luxury in the Heart<br />of the City of Nawabs
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Experience royal hospitality, modern comforts, and the timeless charm of Lucknow at Heera Grand.
              </p>
            </div>
            <SearchWidget />
            <div className="flex items-center gap-2 text-amber-300 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Best price guarantee when you book direct — save up to 15% vs OTAs</span>
            </div>
          </div>
        </section>

        {/* Room Type Teaser Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Accommodations</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Rooms & Suites</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">Four distinct room types, each crafted for a different kind of traveller.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rooms.map((room) => (
                <Link key={room.id} href={`/rooms/${room.slug}`}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{room.tag}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{room.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-amber-700 font-bold text-lg">{formatPrice(room.price)}</div>
                        <div className="text-xs text-gray-400">per night</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/rooms" className="inline-flex items-center gap-2 border-2 border-amber-600 text-amber-700 font-semibold px-6 py-3 rounded-xl hover:bg-amber-600 hover:text-white transition-all">
                View All Rooms <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Amenities Strip */}
        <section className="py-12 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {amenities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Book Direct */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">Book Smart</div>
              <h2 className="text-3xl md:text-4xl font-bold">Why Book Direct?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { label: "Booking.com", price: "₹4,199", saving: "Save ₹700", ours: "₹3,499" },
                { label: "MakeMyTrip", price: "₹4,099", saving: "Save ₹600", ours: "₹3,499" },
                { label: "Agoda", price: "₹3,899", saving: "Save ₹400", ours: "₹3,499" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-800 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="line-through text-gray-500 text-sm">{item.price}</div>
                      <div className="text-2xl font-bold text-white">{item.ours}</div>
                    </div>
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">{item.saving}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Guaranteed lowest price", "Free flexible cancellation", "Early check-in priority", "Welcome drink on arrival"].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" /> {b}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lucknow Attractions Teaser */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Explore</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Discover Lucknow</h2>
              <p className="text-gray-500 mt-3">The City of Nawabs has so much to offer, right at your doorstep.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {attractions.slice(0, 3).map((a) => (
                <a key={a.name} href={a.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="relative h-44">
                    <Image src={a.image} alt={a.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-bold">{a.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <MapPin className="w-3 h-3" /> {a.distance} from hotel
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/explore" className="text-amber-700 font-semibold hover:underline">See all attractions →</Link>
            </div>
          </div>
        </section>

        {/* Guest Reviews Carousel */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Guest Love</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Guests Say</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
                <span className="font-bold text-gray-800">4.6/5</span>
                <span className="text-gray-500 text-sm">· 842 reviews</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((r) => (
                <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex mb-3">
                    {Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs">{r.avatar}</div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">{r.name}</div>
                      <div className="text-xs text-gray-400">{r.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
