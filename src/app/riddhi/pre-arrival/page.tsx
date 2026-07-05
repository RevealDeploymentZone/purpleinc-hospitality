import Link from "next/link";
import { Clock, IdCard, MapPin, FileText, ChevronRight, Gem } from "lucide-react";

export default function RiddhiPreArrivalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-indigo-700 rounded-3xl p-8 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gem className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Riddhi Palace</h1>
          <p className="text-indigo-200 mt-2 text-sm">Your arrival information and digital check-in</p>
        </div>

        {[
          { icon: Clock, title: "Check-in & Check-out", content: "Check-in from 2:00 PM. Early check-in available on request (subject to availability). Check-out by 11:00 AM. Late checkout until 2:00 PM: ₹800." },
          { icon: IdCard, title: "ID Requirements", content: "Please carry a valid government-issued photo ID: Aadhaar Card, PAN Card, Passport, Voter ID, or Driving Licence. Mandatory for all guests including children above 12." },
          { icon: MapPin, title: "How to Reach Us", content: "Hazratganj, Lucknow, UP 226001. 20 min from Lucknow Airport (Chaudhary Charan Singh International). 10 min from Charbagh Railway Station. We offer airport & station pickup — ask at booking." },
          { icon: FileText, title: "Hotel Policies", content: "No outside food/beverages in rooms. Pets not allowed. Smoking only in designated areas. Quiet hours: 10 PM – 8 AM. Visitors allowed in common areas only." },
        ].map(({ icon: Icon, title, content }) => (
          <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="font-bold text-gray-900">{title}</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
          </div>
        ))}

        <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 text-center space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Skip the Queue — Check In Digitally</h2>
          <p className="text-sm text-gray-500">Complete your check-in online before arrival and walk straight to your room.</p>
          <Link href="/riddhi/checkin" className="flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-xl transition-colors">
            Complete Digital Check-In <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
