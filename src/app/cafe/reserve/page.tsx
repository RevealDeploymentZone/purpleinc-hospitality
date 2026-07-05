"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import CafeNavbar from "@/components/cafe/CafeNavbar";
import CafeFooter from "@/components/cafe/CafeFooter";
import CafeChatWidget from "@/components/cafe/CafeChatWidget";

const slots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];
const unavailableSlots = ["1:00 PM", "8:00 PM"];

export default function ReservePage() {
  const router = useRouter();
  const [form, setForm] = useState({ date: "", slot: "", guests: 2, occasion: "", name: "", phone: "" });
  const [step, setStep] = useState(1);

  const handleSubmit = async () => {
    const ref = `KC-${Date.now().toString().slice(-5)}`;
    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guest_name: form.name, guest_phone: form.phone, date: form.date, time: form.slot, party_size: form.guests, occasion: form.occasion }),
      });
    } catch {}
    router.push(`/cafe/reserve/confirmation?ref=${ref}&slot=${form.slot}&date=${form.date}&guests=${form.guests}&name=${encodeURIComponent(form.name)}`);
  };

  return (
    <>
      <CafeNavbar />
      <main className="pt-16 bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-12 px-4 text-center">
          <h1 className="text-3xl font-bold">Reserve a Table</h1>
          <p className="mt-2 text-emerald-100">Choose your preferred date, time, and party size.</p>
        </div>

        <div className="max-w-xl mx-auto px-4 py-10 space-y-5">
          {/* Date & Guests */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-600" /> Date & Party Size</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Date</label>
                <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Guests</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })} className="px-3 py-2.5 text-gray-600 hover:bg-gray-50"><span className="text-lg">−</span></button>
                  <span className="flex-1 text-center font-bold text-gray-900">{form.guests}</span>
                  <button onClick={() => setForm({ ...form, guests: Math.min(12, form.guests + 1) })} className="px-3 py-2.5 text-gray-600 hover:bg-gray-50"><span className="text-lg">+</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Time slots */}
          {form.date && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" /> Available Time Slots</h3>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => {
                  const unavail = unavailableSlots.includes(slot);
                  return (
                    <button key={slot} disabled={unavail} onClick={() => setForm({ ...form, slot })}
                      className={`py-2 rounded-xl text-sm font-medium border transition-all ${unavail ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed" : form.slot === slot ? "bg-emerald-600 text-white border-emerald-600" : "border-gray-200 text-gray-700 hover:border-emerald-300"}`}>
                      {unavail ? <span>{slot}<br /><span className="text-xs">Full</span></span> : slot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Occasion & Guest details */}
          {form.slot && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="font-bold text-gray-900 mb-2">Your Details</h3>
              {[["name", "Full Name", "text", "Rahul Sharma"], ["phone", "Phone Number", "tel", "+91 98765 43210"]].map(([id, label, type, placeholder]) => (
                <div key={id}>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{label}</label>
                  <input type={type} placeholder={placeholder} value={form[id as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Special Occasion? <span className="text-gray-400 font-normal">(Optional)</span></label>
                <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400">
                  {["None", "Birthday", "Anniversary", "Date Night", "Business Dinner", "Family Celebration"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          <button onClick={handleSubmit} disabled={!form.date || !form.slot || !form.name || !form.phone}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <CheckCircle className="w-5 h-5" /> Confirm Reservation
          </button>
        </div>
      </main>
      <CafeFooter />
      <CafeChatWidget />
    </>
  );
}
