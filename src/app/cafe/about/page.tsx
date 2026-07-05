import Image from "next/image";
import CafeNavbar from "@/components/cafe/CafeNavbar";
import CafeFooter from "@/components/cafe/CafeFooter";
import CafeChatWidget from "@/components/cafe/CafeChatWidget";

export default function CafeAboutPage() {
  return (
    <>
      <CafeNavbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="mt-3 text-emerald-100 max-w-xl mx-auto">A labour of love, one plate at a time.</p>
        </div>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" alt="Krystal Cafe interior" fill className="object-cover" unoptimized />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Born in Lucknow, for Lucknow</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Krystal Cafe opened its doors in 2015 with a simple dream: to bring authentic Chinese and North Indian flavours together under one roof in a warm, inviting space.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we&apos;re proud to serve over 400 guests daily, with a menu that celebrates both the bold flavours of Chinese cuisine and the rich, aromatic heritage of North Indian cooking.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["2015", "Est."], ["400+", "Guests/Day"], ["4.4★", "Rating"], ["50+", "Menu Items"]].map(([stat, label]) => (
              <div key={label} className="bg-emerald-50 rounded-2xl p-5">
                <div className="text-3xl font-bold text-emerald-700 mb-1">{stat}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <CafeFooter />
      <CafeChatWidget />
    </>
  );
}
