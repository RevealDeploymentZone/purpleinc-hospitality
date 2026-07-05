import Link from "next/link";
import { Calendar, MapPin, Edit, XCircle, CheckCircle, Clock } from "lucide-react";

const bookings = [
  { ref: "RP-482019", room: "Palace Suite", checkin: "2025-08-10", checkout: "2025-08-13", nights: 3, amount: 28796, status: "confirmed" },
  { ref: "RP-391045", room: "Royal Deluxe Room", checkin: "2025-06-01", checkout: "2025-06-03", nights: 2, amount: 9437, status: "completed" },
  { ref: "RP-275830", room: "Heritage Room", checkin: "2025-03-15", checkout: "2025-03-17", nights: 2, amount: 6139, status: "cancelled" },
];

const statusStyles: Record<string, { color: string; icon: typeof CheckCircle; label: string }> = {
  confirmed: { color: "bg-green-100 text-green-700", icon: CheckCircle, label: "Confirmed" },
  completed: { color: "bg-gray-100 text-gray-600", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-100 text-red-600", icon: XCircle, label: "Cancelled" },
};

export default function RiddhiMyBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Bookings</h1>
        <div className="space-y-5">
          {bookings.map((b) => {
            const s = statusStyles[b.status];
            const StatusIcon = s.icon;
            return (
              <div key={b.ref} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-gray-900">{b.room}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Ref: {b.ref}</div>
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" /> {s.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {b.checkin} → {b.checkout}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {b.nights} nights</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Riddhi Palace, Lucknow</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="font-bold text-gray-900">₹{b.amount.toLocaleString("en-IN")}</span>
                  {b.status === "confirmed" && (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                        <Edit className="w-3.5 h-3.5" /> Modify
                      </button>
                      <button className="flex items-center gap-1.5 border border-red-200 text-red-500 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/riddhi/book" className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-800 transition-colors">
            Make a New Booking
          </Link>
        </div>
      </div>
    </div>
  );
}
