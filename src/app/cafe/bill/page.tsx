"use client";
import { Download, Share2, CheckCircle, Coffee } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const lineItems = [
  { label: "Butter Chicken", amount: 440 },
  { label: "Lucknowi Biryani × 2", amount: 960 },
  { label: "Kulfi Falooda", amount: 180 },
  { label: "Masala Chai × 3", amount: 240 },
];

export default function CafeBillPage() {
  const subtotal = lineItems.reduce((s, i) => s + i.amount, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-700 text-white px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Coffee className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Your Bill</div>
            <div className="text-xs text-emerald-200">Krystal Cafe · Table T12</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-emerald-50 px-5 py-4 border-b border-emerald-100">
            <div className="font-bold text-gray-900">Itemised Bill</div>
            <div className="text-xs text-gray-500">Table T12 · {new Date().toLocaleDateString("en-IN")}</div>
          </div>
          <div className="px-5 py-4 space-y-3">
            {lineItems.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{formatPrice(item.amount)}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between text-sm text-gray-400"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm text-gray-400"><span>GST (5%)</span><span>{formatPrice(tax)}</span></div>
          </div>
          <div className="border-t-2 border-dashed border-gray-200 mx-5 my-2" />
          <div className="px-5 pb-5 flex justify-between font-bold text-lg">
            <span>Total</span><span className="text-emerald-700">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          <div className="text-sm font-medium text-green-800">Paid via UPI · TXN202507201234</div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 text-sm">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-green-200 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 text-sm">
            <Share2 className="w-4 h-4" /> Share Bill
          </button>
        </div>
      </div>
    </div>
  );
}
