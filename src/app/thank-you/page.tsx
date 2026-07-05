import Link from "next/link";
import { Crown, Star, Heart } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6 text-5xl">🙏</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You for Staying!</h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          It was our absolute pleasure to host you at Heera Grand. We hope your stay exceeded expectations and that you got to experience the warmth of Lucknow&apos;s hospitality.
        </p>

        {/* Review CTA */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-6">
          <div className="flex justify-center mb-3">
            {Array(5).fill(0).map((_, i) => <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400" />)}
          </div>
          <h3 className="font-bold text-gray-900 mb-2">How was your stay?</h3>
          <p className="text-sm text-gray-500 mb-4">Your review helps other travellers and helps us improve. It only takes 30 seconds!</p>
          <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer"
            className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl transition-colors">
            Leave a Google Review ⭐
          </a>
        </div>

        <div className="text-sm text-gray-400 mb-4 flex items-center justify-center gap-1">
          <Heart className="w-4 h-4 text-red-400 fill-red-400" /> We can&apos;t wait to see you again!
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/rooms" className="text-amber-700 font-semibold hover:underline text-sm">Browse rooms for your next stay →</Link>
          <Link href="/" className="text-gray-400 text-sm hover:text-gray-600">← Back to Home</Link>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 bg-amber-600 rounded-full flex items-center justify-center">
              <Crown className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Heera Grand, Lucknow</span>
          </div>
          <div className="text-xs text-gray-400">A PurpleInc Property</div>
        </div>
      </div>
    </div>
  );
}
