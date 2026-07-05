import Link from "next/link";
import { Star, Heart, Coffee } from "lucide-react";

export default function CafeThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="text-6xl mb-5">😊</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We hope you loved every bite. It was our pleasure to serve you at Krystal Cafe. Come back soon for more flavourful experiences!
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 mb-6">
          <div className="flex justify-center mb-3">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400" />)}</div>
          <h3 className="font-bold text-gray-900 mb-2">Rate your experience</h3>
          <p className="text-sm text-gray-500 mb-4">A quick review on Google or Zomato means the world to us!</p>
          <div className="flex gap-2">
            <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              Google ⭐
            </a>
            <a href="https://zomato.com" target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              Zomato ⭐
            </a>
          </div>
        </div>

        <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mb-5">
          <Heart className="w-4 h-4 text-red-400 fill-red-400" /> See you next time!
        </div>

        <Link href="/cafe" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:underline">
          <Coffee className="w-4 h-4" /> Back to Krystal Cafe
        </Link>
      </div>
    </div>
  );
}
