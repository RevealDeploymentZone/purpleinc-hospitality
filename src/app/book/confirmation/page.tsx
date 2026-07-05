"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, MapPin, Download, CalendarPlus } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import ChatWidget from "@/components/hotel/ChatWidget";
import { formatPrice } from "@/lib/utils";

function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "HG123456";
  const room = params.get("room") || "Deluxe Room";
  const name = params.get("name") || "Guest";
  const checkIn = params.get("checkin") || "";
  const checkOut = params.get("checkout") || "";
  const total = Number(params.get("total") || 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-500 mb-8">Thank you, {name}! Your room at Heera Grand is reserved.</p>

      {/* Booking Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">Booking Reference</div>
          <div className="font-bold text-amber-700 text-lg font-mono">{ref}</div>
        </div>
        <div className="border-t border-dashed border-gray-200 my-4" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Room</div>
            <div className="font-semibold capitalize">{room} Room</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Paid</div>
            <div className="font-semibold text-amber-700">{total ? formatPrice(total) : "—"}</div>
          </div>
          {checkIn && (
            <div>
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Check-In</div>
              <div className="font-semibold">{checkIn}</div>
              <div className="text-xs text-gray-400">from 2:00 PM</div>
            </div>
          )}
          {checkOut && (
            <div>
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Check-Out</div>
              <div className="font-semibold">{checkOut}</div>
              <div className="text-xs text-gray-400">by 12:00 PM</div>
            </div>
          )}
        </div>
        <div className="border-t border-dashed border-gray-200 my-4" />
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          Near Charbagh Railway Station, Lucknow, UP 226004
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50">
          <CalendarPlus className="w-4 h-4" /> Add to Calendar
        </button>
        <a href="https://maps.google.com/?q=Charbagh+Railway+Station+Lucknow" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50">
          <MapPin className="w-4 h-4" /> Get Directions
        </a>
        <button className="flex-1 flex items-center justify-center gap-2 border-2 border-amber-200 text-amber-700 font-semibold py-3 rounded-xl hover:bg-amber-50">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* What's next */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-left mb-8">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-600" /> What Happens Next</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {[
            "A booking confirmation has been sent to your email and WhatsApp.",
            "24 hours before check-in, you'll receive a pre-arrival message with directions and check-in instructions.",
            "Use the digital check-in link to skip the front desk queue.",
            "For any changes, call us at +91 98765 43210 or reply to your WhatsApp message.",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
        Back to Home
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-gray-50 min-h-screen">
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <ConfirmationContent />
        </Suspense>
      </main>
      <ChatWidget />
    </>
  );
}
