import Link from "next/link";
import { Heart, Star, Gem } from "lucide-react";

export default function RiddhiThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10 text-indigo-600 fill-indigo-200" />
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center">
              <Gem className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Riddhi Palace</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thank You for Staying With Us!</h1>
          <p className="text-gray-500 mt-3 leading-relaxed">
            It was a pleasure hosting you at Riddhi Palace. We hope every moment of your stay felt truly royal. Safe travels — we can&apos;t wait to welcome you back to Lucknow!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-5">
          <h2 className="font-bold text-gray-900">Enjoyed your stay?</h2>
          <p className="text-sm text-gray-500">Your review helps other travellers discover Riddhi Palace and inspires our team to keep doing better.</p>
          <div className="flex justify-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-yellow-400" />)}
          </div>
          <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer"
            className="block w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
            Leave a Google Review
          </a>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 space-y-3">
          <p className="text-sm font-semibold text-gray-800">See you again at PurpleInc properties!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/riddhi/book" className="text-sm text-indigo-700 font-semibold hover:underline">Book Riddhi Palace Again</Link>
            <span className="text-gray-300 hidden sm:block">|</span>
            <Link href="/book" className="text-sm text-indigo-700 font-semibold hover:underline">Try Heera Grand</Link>
            <span className="text-gray-300 hidden sm:block">|</span>
            <Link href="/cafe" className="text-sm text-indigo-700 font-semibold hover:underline">Visit Krystal Cafe</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
