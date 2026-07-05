"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import CafeNavbar from "@/components/cafe/CafeNavbar";
import CafeFooter from "@/components/cafe/CafeFooter";
import CafeChatWidget from "@/components/cafe/CafeChatWidget";
import { menuItems, menuCategories } from "@/data/cafe";
import { formatPrice } from "@/lib/utils";

type CartItem = { id: string; name: string; price: number; qty: number };

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("starters");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState<string | null>(null);

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart((c) => {
      const existing = c.find((ci) => ci.id === item.id);
      if (existing) return c.map((ci) => ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci);
      return [...c, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (id: string) => setCart((c) => c.map((ci) => ci.id === id ? { ...ci, qty: ci.qty - 1 } : ci).filter((ci) => ci.qty > 0));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = menuItems.filter((i) => i.category === activeCategory);
  const modalItem = menuItems.find((i) => i.id === showModal);
  const cartQty = (id: string) => cart.find((c) => c.id === id)?.qty || 0;

  return (
    <>
      <CafeNavbar cartCount={cartCount} />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Our Menu</h1>
          <p className="mt-2 text-emerald-100">Fresh, flavourful, made with love.</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
            {menuCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold border transition-all ${activeCategory === cat.id ? "bg-emerald-600 text-white border-emerald-600" : "bg-white border-gray-200 text-gray-600 hover:border-emerald-300"}`}>
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 p-4">
                <button onClick={() => setShowModal(item.id)} className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-105 transition-transform" unoptimized />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${item.veg ? "border-green-600" : "border-red-600"}`}>
                          <span className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.desc}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array(item.spice).fill(0).map((_, i) => <span key={i} className="text-red-500 text-xs">🌶</span>)}
                        {Array(3 - item.spice).fill(0).map((_, i) => <span key={i} className="text-gray-200 text-xs">🌶</span>)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-emerald-700 text-sm">{formatPrice(item.price)}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    {cartQty(item.id) === 0 ? (
                      <button onClick={() => addToCart(item)} className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-emerald-700 text-sm w-4 text-center">{cartQty(item.id)}</span>
                        <button onClick={() => addToCart(item)} className="w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cart bar */}
        {cartCount > 0 && (
          <div className="fixed bottom-20 left-4 right-4 z-40">
            <Link href="/cafe/order" className="flex items-center justify-between bg-emerald-700 text-white px-5 py-3.5 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">{cartCount}</div>
                <span className="font-semibold">View Order</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatPrice(cartTotal)}</span>
                <ShoppingCart className="w-5 h-5" />
              </div>
            </Link>
          </div>
        )}
      </main>

      {/* Item detail modal */}
      {showModal && modalItem && (
        <div onClick={() => setShowModal(null)} className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-52">
              <Image src={modalItem.image} alt={modalItem.name} fill className="object-cover" unoptimized />
              <button onClick={() => setShowModal(null)} className="absolute top-3 right-3 bg-white/80 rounded-full p-1.5"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900 text-lg">{modalItem.name}</h3>
                <div className="text-emerald-700 font-bold">{formatPrice(modalItem.price)}</div>
              </div>
              <p className="text-gray-500 text-sm mb-4">{modalItem.desc}</p>
              <button onClick={() => { addToCart(modalItem); setShowModal(null); }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl">
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      <CafeFooter />
      <CafeChatWidget />
    </>
  );
}
