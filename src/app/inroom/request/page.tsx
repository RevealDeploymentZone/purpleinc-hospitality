"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, CheckCircle, Clock } from "lucide-react";

export default function ServiceRequestPage() {
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Logged!</h2>
          <p className="text-gray-500 mb-6">Our team has been notified and will attend to your request shortly.</p>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 mb-6 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Request ID</span>
              <span className="font-mono font-bold text-gray-900">REQ-{Date.now().toString().slice(-5)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Room</span>
              <span className="font-medium text-gray-800">304</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Est. Response</span>
              <div className="flex items-center gap-1 text-amber-700 font-medium">
                <Clock className="w-3.5 h-3.5" /> 10-15 mins
              </div>
            </div>
          </div>
          <button onClick={() => router.push("/inroom")} className="w-full bg-amber-600 text-white font-bold py-3.5 rounded-xl hover:bg-amber-700">
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-amber-700 text-white px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Request Something</div>
            <div className="text-xs text-amber-200">Room 304 · Heera Grand</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-5">What do you need?</h3>

          {/* Quick options */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {["Extra Towels", "Water Bottles", "Napkins", "Bill Please", "Assistance", "Room Cleaning"].map((q) => (
              <button key={q} onClick={() => setDesc(q)}
                className={`text-xs font-medium py-2 px-3 rounded-xl border transition-all ${desc === q ? "bg-amber-600 text-white border-amber-600" : "border-gray-200 text-gray-600 hover:border-amber-300"}`}>
                {q}
              </button>
            ))}
          </div>

          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4}
            placeholder="Or describe what you need in detail..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none mb-5" />

          <button onClick={() => setSubmitted(true)} disabled={!desc}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
