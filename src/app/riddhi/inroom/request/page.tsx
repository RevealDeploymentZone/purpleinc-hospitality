"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";

export default function RiddhiServiceRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [req, setReq] = useState("");

  if (submitted) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-5">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Request Logged!</h1>
        <p className="text-gray-500 text-sm">Our team has received your request and will respond shortly.</p>
        <div className="flex items-center justify-center gap-2 bg-indigo-50 rounded-xl p-3 text-sm text-indigo-700">
          <Clock className="w-4 h-4" /> Estimated response: <strong>10–15 minutes</strong>
        </div>
        <Link href="/riddhi/inroom" className="block bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
          Back to Directory
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Submit a Request</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {["Extra Towels", "Water Refill", "Room Cleaning", "Assist Me", "Late Checkout", "Bill Please"].map((r) => (
              <button key={r} onClick={() => setReq(r)} className={`border-2 rounded-xl py-3 text-sm font-semibold transition-colors ${req === r ? "border-indigo-700 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-700 hover:border-indigo-300"}`}>
                {r}
              </button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Or describe your request</label>
            <textarea rows={3} value={req} onChange={(e) => setReq(e.target.value)} placeholder="e.g. Please send an extra blanket to Room 304"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none" />
          </div>
          <button onClick={() => req && setSubmitted(true)} disabled={!req}
            className="w-full bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
