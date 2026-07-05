"use client";
import { useState } from "react";
import Link from "next/link";
import { Utensils, Wrench, Sparkles, HelpCircle, ChevronRight } from "lucide-react";

const tabs = [
  { id: "menu", label: "Menu", icon: Utensils },
  { id: "services", label: "Hotel Services", icon: Wrench },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles },
  { id: "request", label: "Request Something", icon: HelpCircle },
];

const menuItems = [
  { category: "Breakfast", items: ["Aloo Paratha with Curd – ₹180", "Masala Omelette – ₹150", "Pancakes with Honey – ₹200", "Fresh Fruit Bowl – ₹120"] },
  { category: "Mains", items: ["Dal Makhani + 2 Roti – ₹280", "Paneer Butter Masala – ₹320", "Biryani (Veg/Chicken) – ₹350/420", "Lucknowi Galouti Kebab – ₹480"] },
  { category: "Beverages", items: ["Masala Chai – ₹80", "Cold Coffee – ₹150", "Fresh Lime Soda – ₹100", "Mineral Water (1L) – ₹60"] },
];

const services = ["Laundry & Ironing", "Dry Cleaning", "Car Rental", "Airport Transfer", "Doctor on Call", "Newspaper", "Tour Package Assistance"];
const housekeeping = ["Extra Pillows/Blankets", "Room Cleaning (Now)", "Turn-Down Service", "Extra Towels", "Fresh Toiletries", "Baby Cot"];

export default function RiddhiInRoomPage() {
  const [active, setActive] = useState("menu");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 py-10 px-4 text-center text-white">
        <div className="text-sm text-indigo-200 mb-1">Riddhi Palace · Room 304</div>
        <h1 className="text-2xl font-bold">In-Room Directory</h1>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 bg-white border-b border-gray-100 z-10">
        <div className="max-w-2xl mx-auto flex overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActive(id)} className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap px-2 ${active === id ? "border-indigo-700 text-indigo-700" : "border-transparent text-gray-400"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {active === "menu" && (
          <div className="space-y-6">
            {menuItems.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-bold text-gray-900 mb-3">{cat.category}</h3>
                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <div key={item} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item}</span>
                      <Link href="/riddhi/inroom/request" className="text-xs text-indigo-600 font-semibold">Order <ChevronRight className="w-3 h-3 inline" /></Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "services" && (
          <div className="space-y-3">
            {services.map((s) => (
              <Link key={s} href="/riddhi/inroom/request" className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition-colors">
                <span className="text-sm font-medium text-gray-800">{s}</span>
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </Link>
            ))}
          </div>
        )}

        {active === "housekeeping" && (
          <div className="space-y-3">
            {housekeeping.map((s) => (
              <Link key={s} href="/riddhi/inroom/request" className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition-colors">
                <span className="text-sm font-medium text-gray-800">{s}</span>
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </Link>
            ))}
          </div>
        )}

        {active === "request" && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4 text-sm">Need something specific? Submit a custom request below.</p>
            <Link href="/riddhi/inroom/request" className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-800">
              Submit a Request
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
