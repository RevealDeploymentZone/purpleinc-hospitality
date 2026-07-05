import Link from "next/link";
import { CheckCircle, Calendar, MapPin, Share2 } from "lucide-react";

export default function RiddhiBookConfirmationPage() {
  const ref = "RP-" + Math.floor(100000 + Math.random() * 900000);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="text-gray-500 mt-2 text-sm">Your stay at Riddhi Palace is confirmed. We&apos;ll send details to your email & WhatsApp.</p>
        </div>
        <div className="bg-indigo-50 rounded-2xl p-5 text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Booking Reference</span>
            <span className="font-bold text-indigo-700">{ref}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Property</span>
            <span className="font-semibold text-gray-900">Riddhi Palace</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Check-in</span>
            <span className="font-semibold text-gray-900">2:00 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Check-out</span>
            <span className="font-semibold text-gray-900">11:00 AM</span>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
          Please carry a valid government-issued Photo ID at check-in. Digital check-in link sent on WhatsApp.
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="#" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">
            <Calendar className="w-4 h-4" /> Add to Calendar
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">
            <MapPin className="w-4 h-4" /> Get Directions
          </a>
        </div>
        <Link href="/riddhi" className="block w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
