"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, Trash2, Shield, CheckCircle } from "lucide-react";
import CafeNavbar from "@/components/cafe/CafeNavbar";
import CafeFooter from "@/components/cafe/CafeFooter";
import { formatPrice } from "@/lib/utils";

const sampleCart = [
  { id: "9", name: "Butter Chicken", price: 440, qty: 1 },
  { id: "11", name: "Lucknowi Biryani", price: 480, qty: 2 },
  { id: "16", name: "Kulfi Falooda", price: 180, qty: 1 },
];

export default function OrderPage() {
  const router = useRouter();
  const [cart, setCart] = useState<typeof sampleCart>([]);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [pickupTime, setPickupTime] = useState("30");
  const [payMethod, setPayMethod] = useState("upi");
  const [step, setStep] = useState<"cart" | "payment">("cart");

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const taxes = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + taxes;

  const add = (id: string) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const remove = (id: string) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter((i) => i.qty > 0));

  const handlePay = () => {
    router.push(`/cafe/order/confirmation?ref=ORD${Date.now().toString().slice(-5)}&total=${total}&pickup=${pickupTime}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <Link href="/cafe/menu" className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <CafeNavbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />
      <main className="pt-16 bg-gray-50 min-h-screen">
        {/* Progress */}
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            {[["cart", "Cart"], ["payment", "Payment"]].map(([id, label], idx) => (
              <div key={id} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === id || (id === "cart" && step === "payment") ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"}`}>{idx + 1}</div>
                <span className={`text-sm font-medium ${step === id ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
                {idx < 1 && <div className={`h-0.5 w-12 ${step === "payment" ? "bg-emerald-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              {step === "cart" && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Your Order</h2>
                  <div className="space-y-3 mb-5">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-400">{formatPrice(item.price)} each</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => remove(item.id)} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                            <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                            <button onClick={() => add(item.id)} className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="font-bold text-emerald-700 w-16 text-right">{formatPrice(item.price * item.qty)}</span>
                          <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-gray-200 mb-5">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Pickup Time</label>
                    <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400">
                      <option value="20">ASAP (~20 mins)</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>

                  <button onClick={() => setStep("payment")} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl">
                    Continue to Payment →
                  </button>
                </>
              )}

              {step === "payment" && (
                <>
                  <button onClick={() => setStep("cart")} className="text-sm text-emerald-700 mb-5 flex items-center gap-1">← Back</button>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Payment</h2>

                  <div className="mb-5">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                      <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="CAFE10"
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                      <button onClick={() => { if (promo === "CAFE10") setPromoApplied(true); }}
                        className="bg-emerald-100 text-emerald-800 font-semibold px-4 py-2.5 rounded-xl text-sm">Apply</button>
                    </div>
                    {promoApplied && <p className="text-green-600 text-xs mt-1 font-medium">10% off applied!</p>}
                  </div>

                  <div className="space-y-3 mb-5">
                    {[{ id: "upi", label: "UPI" }, { id: "card", label: "Card" }, { id: "cash", label: "Pay at Counter" }].map((m) => (
                      <label key={m.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${payMethod === m.id ? "border-emerald-400 bg-emerald-50" : "border-gray-200"}`}>
                        <span className="font-medium text-sm text-gray-800">{m.label}</span>
                        <input type="radio" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="accent-emerald-600" />
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {["256-bit SSL", "PCI DSS", "FSSAI Certified"].map((b) => (
                      <div key={b} className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                        <Shield className="w-3 h-3 text-green-500" /> {b}
                      </div>
                    ))}
                  </div>

                  <button onClick={handlePay} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg">
                    Pay {formatPrice(total)} →
                  </button>
                </>
              )}
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-emerald-600" /> Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {cart.map((i) => (
                    <div key={i.id} className="flex justify-between text-gray-600">
                      <span>{i.name} ×{i.qty}</span><span>{formatPrice(i.price * i.qty)}</span>
                    </div>
                  ))}
                  {promoApplied && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                  <div className="flex justify-between text-gray-400"><span>GST (5%)</span><span>{formatPrice(taxes)}</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900"><span>Total</span><span className="text-emerald-700">{formatPrice(total)}</span></div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Pickup in ~{pickupTime} mins
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CafeFooter />
    </>
  );
}
