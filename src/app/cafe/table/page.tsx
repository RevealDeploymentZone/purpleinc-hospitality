"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Send, CheckCircle, Coffee } from "lucide-react";
import { menuItems, menuCategories } from "@/data/cafe";
import { formatPrice } from "@/lib/utils";

type CartItem = { id: string; name: string; price: number; qty: number };

const waiterRequests = [
  { icon: "💧", label: "Water" }, { icon: "🧻", label: "Napkins" }, { icon: "🧾", label: "Bill" },
  { icon: "🙋", label: "Assistance" }, { icon: "🫙", label: "Extra Plate" }, { icon: "🧴", label: "Hand Sanitizer" },
];

function TableContent() {
  const params = useSearchParams();
  const tableNo = params.get("table") || "T12";
  const [activeTab, setActiveTab] = useState("menu");
  const [activeCategory, setActiveCategory] = useState("starters");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderSent, setOrderSent] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart((c) => {
      const ex = c.find((ci) => ci.id === item.id);
      if (ex) return c.map((ci) => ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci);
      return [...c, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (id: string) => setCart((c) => c.map((ci) => ci.id === id ? { ...ci, qty: ci.qty - 1 } : ci).filter((ci) => ci.qty > 0));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartQty = (id: string) => cart.find((c) => c.id === id)?.qty || 0;
  const filtered = menuItems.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Table {tableNo}</div>
              <div className="text-xs text-emerald-200">Krystal Cafe Dine-In</div>
            </div>
          </div>
          {cartCount > 0 && (
            <div className="bg-emerald-500 rounded-full px-3 py-1 text-xs font-bold">{cartCount} items · {formatPrice(cartTotal)}</div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-10">
        <div className="max-w-lg mx-auto flex">
          {[["menu", "Menu"], ["cart", `Order (${cartCount})`], ["waiter", "Call Waiter"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all ${activeTab === id ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-400"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4">
        {activeTab === "menu" && (
          <>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
              {menuCategories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat.id ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-gray-200 text-gray-600"}`}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm flex gap-3 p-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.desc}</div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="text-emerald-700 font-bold text-sm">{formatPrice(item.price)}</div>
                      {cartQty(item.id) === 0 ? (
                        <button onClick={() => addToCart(item)} className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                          <span className="font-bold text-sm text-emerald-700 w-4 text-center">{cartQty(item.id)}</span>
                          <button onClick={() => addToCart(item)} className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "cart" && (
          <div>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🛒</div>
                <div className="font-semibold text-gray-600 mb-2">Your order is empty</div>
                <button onClick={() => setActiveTab("menu")} className="text-emerald-700 font-medium text-sm">Browse Menu →</button>
              </div>
            ) : orderSent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Sent to Kitchen!</h3>
                <p className="text-gray-500 text-sm">Your order is being prepared. Estimated time: 15-20 mins.</p>
                <button onClick={() => { setOrderSent(false); setCart([]); setActiveTab("menu"); }} className="mt-5 text-emerald-700 font-medium text-sm">Add More Items →</button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-5">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400">{formatPrice(item.price)} each</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                          <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                          <button onClick={() => addToCart(item)} className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="font-bold text-emerald-700 text-sm ml-2">{formatPrice(item.price * item.qty)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                  <div className="flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span><span className="text-emerald-700">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
                <button onClick={() => setOrderSent(true)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Send Order to Kitchen
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "waiter" && (
          <div>
            {requestSent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 text-xl mb-2">Request Sent!</h3>
                <p className="text-gray-500 text-sm">A staff member will be with you in 2-3 minutes.</p>
                <button onClick={() => setRequestSent(false)} className="mt-5 text-emerald-700 font-medium text-sm">Make Another Request</button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-gray-900 mb-4">What do you need?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {waiterRequests.map((req) => (
                    <button key={req.label} onClick={() => setRequestSent(true)}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:border-emerald-200 hover:shadow active:scale-95 transition-all">
                      <span className="text-3xl">{req.icon}</span>
                      <span className="text-xs font-semibold text-gray-700">{req.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TablePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading table...</div>}>
      <TableContent />
    </Suspense>
  );
}
