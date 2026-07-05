"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { riddhiRooms } from "@/data/riddhi";
import { formatPrice } from "@/lib/utils";
import { Check, CreditCard, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const paymentOptions: { val: string; label: string; icon: LucideIcon }[] = [
  { val: "upi", label: "UPI / BHIM / GPay / PhonePe", icon: Smartphone },
  { val: "card", label: "Credit / Debit Card", icon: CreditCard },
];

function BookingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("room") || riddhiRooms[0].slug;
  const room = riddhiRooms.find((r) => r.slug === slug) ?? riddhiRooms[0];
  const checkin = params.get("checkin") || new Date().toISOString().split("T")[0];
  const checkout = params.get("checkout") || new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const nights = Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000));
  const total = Math.round(room.price * nights * 1.18);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", requests: "", earlyCheckin: false, airportPickup: false });
  const [payment, setPayment] = useState("upi");
  const [promo, setPromo] = useState("");

  const steps = ["Guest Details", "Payment"];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-500"}`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${step === i + 1 ? "text-indigo-700" : "text-gray-400"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-16 h-0.5 ${step > i + 1 ? "bg-green-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Guest Details</h2>
                {[["Full Name", "name", "text"], ["Phone Number", "phone", "tel"], ["Email Address", "email", "email"]].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
                    <input type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Special Requests (optional)</label>
                  <textarea value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })} rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" placeholder="Early check-in, dietary requirements, etc." />
                </div>
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">Add-ons</p>
                  {[["earlyCheckin", "Early Check-In (12 PM)", "₹500"], ["airportPickup", "Airport Pickup (Lucknow Airport)", "₹800"]].map(([key, label, price]) => (
                    <label key={key as string} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={(form as any)[key as string]} onChange={(e) => setForm({ ...form, [key as string]: e.target.checked })}
                        className="w-4 h-4 accent-indigo-700" />
                      <span className="text-sm text-gray-700">{label}</span>
                      <span className="text-sm text-indigo-600 font-semibold ml-auto">{price}</span>
                    </label>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Payment</h2>
                <div className="space-y-3">
                  {paymentOptions.map(({ val, label, icon: Icon }) => (
                    <label key={val} className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${payment === val ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}>
                      <input type="radio" name="payment" value={val} checked={payment === val} onChange={() => setPayment(val)} className="accent-indigo-700" />
                      <Icon className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium text-gray-800">{label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Promo Code</label>
                  <div className="flex gap-2">
                    <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter promo code"
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400" />
                    <button className="bg-indigo-100 text-indigo-700 font-semibold px-4 py-2.5 rounded-xl text-sm">Apply</button>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Secure payment · 256-bit SSL encrypted</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm">Back</button>
                  <button onClick={async () => { try { await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ property: "riddhi", room_name: room.name, room_slug: slug, guest_name: form.name, guest_phone: form.phone, guest_email: form.email, checkin, checkout, nights, amount: total, payment_method: payment, early_checkin: form.earlyCheckin, airport_pickup: form.airportPickup, special_requests: form.requests }) }); } catch {} router.push("/riddhi/book/confirmation"); }} className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
                    Pay {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start space-y-4">
            <h3 className="font-bold text-gray-900">Order Summary</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="font-semibold text-gray-900">{room.name}</div>
              <div className="text-sm text-gray-500 mt-1">{checkin} → {checkout} · {nights} night{nights > 1 ? "s" : ""}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Room ({nights} nights)</span><span>{formatPrice(room.price * nights)}</span></div>
              {form.earlyCheckin && <div className="flex justify-between text-gray-600"><span>Early Check-In</span><span>₹500</span></div>}
              {form.airportPickup && <div className="flex justify-between text-gray-600"><span>Airport Pickup</span><span>₹800</span></div>}
              <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>{formatPrice(Math.round(room.price * nights * 0.18))}</span></div>
              <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RiddhiBookPage() {
  return <Suspense><BookingContent /></Suspense>;
}
