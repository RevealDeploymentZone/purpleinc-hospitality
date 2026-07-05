import Link from "next/link";
import { Crown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-8xl font-bold text-amber-100 mb-4">404</div>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">This page seems to have checked out. Let us help you find what you&apos;re looking for.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-700">Go Home</Link>
          <Link href="/rooms" className="border-2 border-amber-200 text-amber-700 font-bold px-6 py-3 rounded-xl hover:bg-amber-50">Browse Rooms</Link>
        </div>
      </div>
    </div>
  );
}
