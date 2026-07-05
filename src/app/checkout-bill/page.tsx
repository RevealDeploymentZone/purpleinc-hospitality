"use client";
import { Crown, Download, Share2, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const lineItems = [
  { label: "Deluxe Room × 2 nights", amount: 6998 },
  { label: "Room Service (Jul 19)", amount: 850 },
  { label: "Mini Bar", amount: 420 },
  { label: "Laundry Service", amount: 280 },
  { label: "Early Check-In", amount: 500 },
];

export default function CheckoutBillPage() {
  const subtotal = lineItems.reduce((s, i) => s + i.amount, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-amber-700 text-white px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Checkout Bill</div>
            <div className="text-xs text-amber-200">Heera Grand · Room 304 · Booking HG240891</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-5">
        {/* Bill card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-amber-50 px-5 py-4 border-b border-amber-100">
            <div className="font-bold text-gray-900">Itemised Bill</div>
            <div className="text-xs text-gray-500">Stay: Jul 18–20, 2025 · Room 304</div>
          </div>
          <div className="px-5 py-4">
            <div className="space-y-3">
              {lineItems.map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-800">{formatPrice(item.amount)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex justify-between text-sm text-gray-500">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>CGST + SGST (12%)</span><span>{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg">
              <span className="text-gray-900">Total</span>
              <span className="text-amber-700">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment status */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <div className="font-bold text-green-800 text-sm">Payment Received</div>
            <div className="text-xs text-green-600">Paid via UPI · TXN: UPI202507200123</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 text-sm">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-green-200 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 text-sm">
            <Share2 className="w-4 h-4" /> Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
