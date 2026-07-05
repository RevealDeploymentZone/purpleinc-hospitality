"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, CalendarPlus, MapPin } from "lucide-react";

function Content() {
  const p = useSearchParams();
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h1>
      <p className="text-gray-500 mb-8">See you at Krystal Cafe, {p.get("name") || "Guest"}!</p>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-gray-500 text-sm">Ref</span>
          <span className="font-bold font-mono text-gray-900">{p.get("ref")}</span>
        </div>
        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-500">Date</span><span className="font-medium">{p.get("date")}</span>
        </div>
        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-500">Time</span><span className="font-medium">{p.get("slot")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Guests</span><span className="font-medium">{p.get("guests")}</span>
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 text-sm">
          <CalendarPlus className="w-4 h-4" /> Add to Calendar
        </button>
        <a href="https://maps.google.com/?q=Charbagh+Lucknow" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 text-sm">
          <MapPin className="w-4 h-4" /> Directions
        </a>
      </div>
      <div className="text-xs text-gray-400 mb-6 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3 text-left">
        <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        To modify or cancel, call us at +91 98765 43211 at least 2 hours in advance.
      </div>
      <Link href="/cafe" className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700">Back to Cafe</Link>
    </div>
  );
}

export default function ReservationConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
