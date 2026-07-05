"use client";
import { useState } from "react";
import { Crown, UtensilsCrossed, Wrench, Sparkles, Bell, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "services", label: "Hotel Services", icon: Wrench },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles },
  { id: "request", label: "Request Something", icon: Bell },
];

const menuItems = [
  { category: "Starters", items: [{ name: "Galouti Kebab", price: 380, veg: false }, { name: "Paneer Tikka", price: 320, veg: true }, { name: "Chicken Malai Tikka", price: 420, veg: false }] },
  { category: "Mains", items: [{ name: "Lucknowi Biryani", price: 480, veg: false }, { name: "Dal Makhani", price: 280, veg: true }, { name: "Butter Chicken", price: 440, veg: false }] },
  { category: "Beverages", items: [{ name: "Masala Chai", price: 80, veg: true }, { name: "Fresh Lime Soda", price: 120, veg: true }, { name: "Mango Lassi", price: 150, veg: true }] },
];

const housekeepingItems = [
  { label: "Extra Towels", icon: "🛁" }, { label: "Fresh Bedsheets", icon: "🛏" }, { label: "Room Cleaning", icon: "🧹" },
  { label: "Extra Blanket", icon: "🌡" }, { label: "Extra Pillows", icon: "💤" }, { label: "Do Not Disturb", icon: "🚫" },
];

const serviceItems = [
  { label: "Room Service", icon: "🍽" }, { label: "Laundry", icon: "👔" }, { label: "Iron & Board", icon: "🧺" },
  { label: "Airport Drop", icon: "🚗" }, { label: "Doctor on Call", icon: "🏥" }, { label: "Wake-Up Call", icon: "⏰" },
];

export default function InRoomPage() {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-amber-700 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Room 304 · Heera Grand</div>
              <div className="text-xs text-amber-200">In-Room Directory</div>
            </div>
          </div>
          <a href="tel:+919876543210" className="bg-amber-600 rounded-full p-2">
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[68px] z-10">
        <div className="max-w-lg mx-auto flex overflow-x-auto scrollbar-hide">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 border-b-2 text-xs font-medium transition-all ${activeTab === id ? "border-amber-600 text-amber-700" : "border-transparent text-gray-400"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {activeTab === "menu" && (
          <div className="space-y-6">
            {menuItems.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">{cat.category}</h3>
                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${item.veg ? "border-green-600" : "border-red-600"}`}>
                          <span className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                        </span>
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-amber-700">₹{item.price}</span>
                        <Link href="/inroom/request" className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">Add</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === "housekeeping" || activeTab === "services") && (
          <div className="grid grid-cols-2 gap-3">
            {(activeTab === "housekeeping" ? housekeepingItems : serviceItems).map((item) => (
              <Link key={item.label} href="/inroom/request"
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:border-amber-200 hover:shadow transition-all active:scale-95">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700 text-center">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </Link>
            ))}
          </div>
        )}

        {activeTab === "request" && (
          <Link href="/inroom/request" className="block bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 rounded-2xl text-center transition-colors">
            Make a Custom Request →
          </Link>
        )}
      </div>
    </div>
  );
}
