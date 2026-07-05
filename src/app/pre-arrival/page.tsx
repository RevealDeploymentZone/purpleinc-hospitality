import Link from "next/link";
import { Crown, Clock, FileText, MapPin, Shield, ChevronRight, Phone, Info } from "lucide-react";

export default function PreArrivalPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-amber-700 text-white px-4 py-5">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold">Heera Grand</div>
            <div className="text-xs text-amber-200">Pre-Arrival Information</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <div className="text-amber-600 font-semibold text-sm mb-1">Your Booking</div>
          <div className="font-bold text-gray-900 text-lg">Deluxe Room</div>
          <div className="text-sm text-gray-500">Booking Ref: HG240891 · 2 nights</div>
        </div>

        {[
          { icon: Clock, title: "Check-In & Check-Out", color: "blue", items: ["Check-in from 2:00 PM onwards", "Check-out by 12:00 PM", "Early check-in from 10 AM available for ₹500", "Late checkout till 3 PM available on request"] },
          { icon: FileText, title: "ID Requirements", color: "purple", items: ["1 valid government-issued photo ID per guest (Aadhaar/Passport/Driving License)", "Foreign nationals must present passport + visa", "ID must match the booking name", "Digital ID upload accepted at check-in"] },
          { icon: MapPin, title: "Getting Here", color: "green", items: ["500m from Charbagh Railway Station", "15 mins from Lucknow Airport (Amausi)", "Taxi/auto-rickshaw readily available", "Free parking for all in-house guests"] },
          { icon: Shield, title: "Hotel Policies", color: "red", items: ["No outside food in room", "Checkout: 12 PM sharp", "Smoking prohibited in all rooms", "Pets not allowed"] },
        ].map(({ icon: Icon, title, color, items }) => (
          <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`flex items-center gap-2 mb-3 text-${color}-600`}>
              <Icon className="w-5 h-5" />
              <h3 className="font-bold text-gray-900">{title}</h3>
            </div>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA */}
        <Link href="/checkin" className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-2xl text-center flex items-center justify-center gap-2 transition-colors">
          Complete Digital Check-In <ChevronRight className="w-5 h-5" />
        </Link>

        <div className="text-center">
          <a href="tel:+919876543210" className="inline-flex items-center gap-2 text-sm text-amber-700 font-medium">
            <Phone className="w-4 h-4" /> Need help? Call us
          </a>
        </div>
      </div>
    </div>
  );
}
