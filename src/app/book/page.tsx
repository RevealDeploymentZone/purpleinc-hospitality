"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, User, Phone, Mail, Car, Clock, Shield } from "lucide-react";
import Navbar from "@/components/hotel/Navbar";
import ChatWidget from "@/components/hotel/ChatWidget";
import { rooms } from "@/data/hotel";
import { formatPrice } from "@/lib/utils";

function BookingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const roomId = params.get("room") || "deluxe";
  const checkIn = params.get("checkin") || "";
  const checkOut = params.get("checkout") || "";
  const room = rooms.find((r) => r.id === roomId) || rooms[0];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", requests: "" });
  const [addons, setAddons] = useState({ earlyCheckin: false, airportPickup: false });
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 1;
  const subtotal = room.price * nights;
  const addonTotal = (addons.earlyCheckin ? 500 : 0) + (addons.airportPickup ? 800 : 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const taxes = Math.round((subtotal + addonTotal - discount) * 0.12);
  const total = subtotal + addonTotal - discount + taxes;

  const handlePay = () => {
    router.push(`/book/confirmation?ref=HG${Date.now().toString().slice(-6)}&room=${roomId}&name=${encodeURIComponent(form.name)}&checkin=${checkIn}&checkout=${checkOut}&total=${total}`);
  };

  return (
    <>
      {/* Progress */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? "text-gray-800" : "text-gray-400"}`}>
                {s === 1 ? "Guest Details" : "Payment"}
              </span>
              {s < 2 && <div className={`flex-1 h-0.5 w-16 ${step > s ? "bg-amber-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest & Room Details</h2>

                {/* Room summary card */}
                <div className="flex gap-4 bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-100">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={room.image} alt={room.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{room.name}</div>
                    <div className="text-sm text-gray-500">{checkIn} → {checkOut} · {nights} night{nights > 1 ? "s" : ""}</div>
                    <div className="text-amber-700 font-bold">{formatPrice(room.price)}/night</div>
                  </div>
                </div>

                {/* Guest form */}
                <div className="space-y-4 mb-6">
                  {[
                    { id: "name", label: "Full Name", icon: User, placeholder: "Rahul Sharma", type: "text" },
                    { id: "phone", label: "Phone Number", icon: Phone, placeholder: "+91 98765 43210", type: "tel" },
                    { id: "email", label: "Email Address", icon: Mail, placeholder: "rahul@email.com", type: "email" },
                  ].map(({ id, label, icon: Icon, placeholder, type }) => (
                    <div key={id}>
                      <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><Icon className="w-3.5 h-3.5 text-amber-500" /> {label}</label>
                      <input type={type} placeholder={placeholder}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Special Requests <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <textarea rows={3} placeholder="e.g. High floor, extra pillows, anniversary decoration..."
                      value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none" />
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Enhance Your Stay</h3>
                  <div className="space-y-3">
                    {[
                      { key: "earlyCheckin", icon: Clock, label: "Early Check-In (from 10 AM)", price: 500 },
                      { key: "airportPickup", icon: Car, label: "Airport / Station Pickup", price: 800 },
                    ].map(({ key, icon: Icon, label, price }) => (
                      <label key={key} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${addons[key as keyof typeof addons] ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-amber-200"}`}>
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-amber-600" />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-amber-700">+{formatPrice(price)}</span>
                          <input type="checkbox" checked={addons[key as keyof typeof addons]}
                            onChange={(e) => setAddons({ ...addons, [key]: e.target.checked })}
                            className="w-4 h-4 accent-amber-600" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep(2)} disabled={!form.name || !form.phone || !form.email}
                  className="w-full mt-8 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} className="text-sm text-amber-700 mb-5 flex items-center gap-1">← Back to Guest Details</button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter code (try HEERA10)"
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                    <button onClick={() => { if (promo === "HEERA10") setPromoApplied(true); }}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold px-4 py-2.5 rounded-xl text-sm">
                      Apply
                    </button>
                  </div>
                  {promoApplied && <p className="text-green-600 text-xs mt-1.5 font-medium">Promo applied! 10% discount added.</p>}
                </div>

                {/* Payment options */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Select Payment Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: "upi", label: "UPI (GPay, PhonePe, Paytm)", detail: "Instant, zero charges" },
                      { id: "card", label: "Credit / Debit Card", detail: "Visa, Mastercard, RuPay" },
                      { id: "netbanking", label: "Net Banking", detail: "All major banks supported" },
                    ].map((m) => (
                      <label key={m.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${payMethod === m.id ? "border-amber-400 bg-amber-50" : "border-gray-200"}`}>
                        <div>
                          <div className="font-medium text-sm text-gray-800">{m.label}</div>
                          <div className="text-xs text-gray-400">{m.detail}</div>
                        </div>
                        <input type="radio" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="accent-amber-600" />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {["256-bit SSL", "RBI Compliant", "PCI DSS Secured"].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                      <Shield className="w-3.5 h-3.5 text-green-500" /> {b}
                    </div>
                  ))}
                </div>

                <button onClick={handlePay}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                  Pay {formatPrice(total)} Securely →
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{room.name} × {nights} night{nights > 1 ? "s" : ""}</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {addons.earlyCheckin && (
                  <div className="flex justify-between text-gray-600">
                    <span>Early Check-In</span><span className="font-medium">{formatPrice(500)}</span>
                  </div>
                )}
                {addons.airportPickup && (
                  <div className="flex justify-between text-gray-600">
                    <span>Airport Pickup</span><span className="font-medium">{formatPrice(800)}</span>
                  </div>
                )}
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span><span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Taxes (12% GST)</span><span>{formatPrice(taxes)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span><span className="text-amber-700">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Free cancellation up to 48 hours before check-in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-gray-50 min-h-screen">
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
          <BookingContent />
        </Suspense>
      </main>
      <ChatWidget />
    </>
  );
}
