"use client";
import { useState } from "react";
import { CheckCircle, Upload, PenLine } from "lucide-react";

export default function RiddhiCheckinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "Priya Agarwal", phone: "9876511100", email: "priya@email.com", idType: "aadhaar", consent: false });

  if (submitted) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-5">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Check-In Complete!</h1>
        <p className="text-gray-500 text-sm">Your digital check-in is confirmed. Head straight to the reception to collect your key — no waiting in queue.</p>
        <div className="bg-indigo-50 rounded-xl p-4 text-sm text-indigo-800">Your room will be ready from <strong>2:00 PM</strong>. We&apos;ll send you a WhatsApp notification when it&apos;s ready.</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Digital Check-In</h1>
          <p className="text-gray-500 text-sm mt-1">Riddhi Palace · Confirm your details below</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          {[["Full Name", "name"], ["Phone Number", "phone"], ["Email Address", "email"]].map(([label, key]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
              <input type="text" value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">ID Type</label>
            <select value={form.idType} onChange={(e) => setForm({ ...form, idType: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400">
              {["aadhaar", "pan", "passport", "voter_id", "driving_licence"].map((v) => (
                <option key={v} value={v}>{v.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Upload ID</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Tap to upload ID photo</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF · Max 5MB</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 w-4 h-4 accent-indigo-700" />
              <span className="text-sm text-gray-600">I confirm the above details are accurate and consent to Riddhi Palace collecting and processing this information for check-in purposes.</span>
            </label>
          </div>

          <button onClick={() => form.consent && setSubmitted(true)} disabled={!form.consent}
            className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors">
            <PenLine className="w-4 h-4" /> Submit Check-In
          </button>
        </div>
      </div>
    </div>
  );
}
