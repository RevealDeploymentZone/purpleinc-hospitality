import Link from "next/link";
import Image from "next/image";
import { Star, ChevronRight, Clock, MapPin, CheckCircle, Utensils } from "lucide-react";
import CafeNavbar from "@/components/cafe/CafeNavbar";
import CafeFooter from "@/components/cafe/CafeFooter";
import CafeChatWidget from "@/components/cafe/CafeChatWidget";
import { cafeData, menuItems, cafeReviews, menuCategories } from "@/data/cafe";
import { formatPrice } from "@/lib/utils";

export default function CafeHomePage() {
  const specials = menuItems.slice(0, 4);

  return (
    <>
      <CafeNavbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" alt="Krystal Cafe" fill className="object-cover" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </div>
          <div className="relative z-10 text-center text-white px-4 pt-16">
            <div className="text-sm font-semibold tracking-[0.3em] uppercase text-emerald-300 mb-3">Lucknow&apos;s Favourite</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Where Every Meal<br />Tells a Story
            </h1>
            <p className="text-lg text-gray-200 max-w-xl mx-auto mb-8">Chinese & North Indian cuisine crafted with love. Dine in, take away, or get it delivered.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/cafe/menu" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
                View Our Menu
              </Link>
              <Link href="/cafe/reserve" className="bg-white/20 backdrop-blur border border-white/40 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
                Reserve a Table
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-300" /> 11 AM – 11 PM</div>
              <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-300" /> Charbagh, Lucknow</div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.4 (1,240 reviews)
              </div>
            </div>
          </div>
        </section>

        {/* Today's Specials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-2">Chef&apos;s Pick</div>
              <h2 className="text-3xl font-bold text-gray-900">Today&apos;s Specials</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {specials.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
                  <div className="relative h-40">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    <div className="absolute top-2 right-2">
                      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.veg ? "border-green-600 bg-white" : "border-red-600 bg-white"}`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                    <div className="text-emerald-700 font-bold mt-1">{formatPrice(item.price)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/cafe/menu" className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                Full Menu <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cuisine Highlights */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-2">Cuisine</div>
              <h2 className="text-3xl font-bold text-gray-900">What We Serve</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Chinese", desc: "Wok-fired stir fries, dim sum, soups and noodle dishes made with authentic sauces imported from China.", icon: "🥢", color: "red", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80" },
                { title: "North Indian", desc: "Rich curries, tandoor specialties, aromatic biryanis — the soul of subcontinental cooking.", icon: "🍛", color: "amber", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80" },
                { title: "Beverages", desc: "From masala chai to refreshing mocktails, seasonal lassis and freshly squeezed juices.", icon: "🥤", color: "blue", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80" },
              ].map((c) => (
                <div key={c.title} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="relative h-44">
                    <Image src={c.image} alt={c.title} fill className="object-cover" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <div className="text-2xl mb-0.5">{c.icon}</div>
                      <div className="font-bold text-lg">{c.title}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                    <Link href={`/cafe/menu`} className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-sm mt-3 hover:underline">
                      Explore <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ambience Photos */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="text-center">
              <div className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-2">Ambience</div>
              <h2 className="text-3xl font-bold text-gray-900">A Space You&apos;ll Love</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4">
            {["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
              "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80"].map((src, i) => (
              <div key={i} className="relative h-64 w-80 shrink-0 rounded-2xl overflow-hidden">
                <Image src={src} alt="Ambience" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">What Our Guests Say</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
                <span className="font-bold text-gray-800">4.4</span>
                <span className="text-gray-500 text-sm">· 1,240 reviews on Zomato & Google</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cafeReviews.map((r) => (
                <div key={r.name} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex mb-3">{Array(r.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold text-xs">{r.avatar}</div>
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
      <CafeFooter />
      <CafeChatWidget />
    </>
  );
}
