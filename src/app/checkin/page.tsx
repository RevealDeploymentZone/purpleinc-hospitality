"use client";
import { useState } from "react";
import { Crown, Upload, CheckCircle, Pen } from "lucide-react";

export default function CheckInPage() {
  const [form, setForm] = useState({ name: "Rahul Sharma", phone: "9876543210", email: "rahul@email.com", idType: "Aadhaar" });
  const [idUploaded, setIdUploaded] = useState(false);
  const [signed, setSigned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-In Complete!</h2>
          <p className="text-gray-500 mb-6">Your digital check-in has been submitted. Head straight to your room — no front desk queue needed!</p>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100 text-left mb-6">
            <div className="text-sm text-gray-500 mb-1">Room Assignment</div>
            <div className="font-bold text-2xl text-gray-900">Room 304</div>
            <div className="text-sm text-gray-500">3rd Floor · Deluxe Room</div>
          </div>
          <p className="text-sm text-gray-400">Your digital key will be shared on WhatsApp shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-amber-700 text-white px-4 py-5">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold">Digital Check-In</div>
            <div className="text-xs text-amber-200">Heera Grand · Booking HG240891</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-5">
        {/* Pre-filled details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Confirm Your Details</h3>
          <div className="space-y-3">
            {[["Full Name", "name", "text"], ["Phone", "phone", "tel"], ["Email", "email", "email"]].map(([label, key, type]) => (
              <div key={key}>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">{label}</label>
                <input type={type} value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
              </div>
            ))}
          </div>
        </div>

        {/* ID Upload */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Upload ID Proof</h3>
          <select value={form.idType} onChange={(e) => setForm({ ...form, idType: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-amber-400">
            {["Aadhaar Card", "PAN Card", "Passport", "Driving License"].map((t) => <option key={t}>{t}</option>)}
          </select>
          <button onClick={() => setIdUploaded(true)}
            className={`w-full border-2 border-dashed rounded-xl py-8 flex flex-col items-center gap-2 transition-all ${idUploaded ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-amber-300"}`}>
            {idUploaded ? <CheckCircle className="w-8 h-8 text-green-500" /> : <Upload className="w-8 h-8 text-gray-400" />}
            <span className={`text-sm font-medium ${idUploaded ? "text-green-600" : "text-gray-500"}`}>
              {idUploaded ? "ID Uploaded Successfully" : "Tap to upload or capture ID"}
            </span>
          </button>
        </div>

        {/* E-Signature */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Consent & E-Signature</h3>
          <p className="text-xs text-gray-500 mb-4">By signing, you agree to the hotel&apos;s terms, policies, and that the information provided is accurate.</p>
          <button onClick={() => setSigned(true)}
            className={`w-full border-2 border-dashed rounded-xl py-6 flex flex-col items-center gap-2 transition-all ${signed ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-amber-300"}`}>
            {signed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Pen className="w-6 h-6 text-gray-400" />}
            <span className={`text-sm font-medium ${signed ? "text-green-600" : "text-gray-500"}`}>
              {signed ? "Signed ✓" : "Tap to e-sign"}
            </span>
          </button>
        </div>

        <button onClick={() => setSubmitted(true)} disabled={!idUploaded || !signed}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl transition-colors">
          Submit Check-In
        </button>
      </div>
    </div>
  );
}
