"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Clock, Package, ChefHat } from "lucide-react";
import { formatPrice } from "@/lib/utils";

function Content() {
  const p = useSearchParams();
  const ref = p.get("ref") || "ORD12345";
  const total = Number(p.get("total") || 0);
  const pickup = p.get("pickup") || "30";
  const [status] = useState(0); // 0=Received, 1=Preparing, 2=Ready

  const stages = ["Order Received", "Preparing", "Ready for Pickup"];

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500">Your food is on its way to the kitchen.</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-5">
        <div className="flex justify-between mb-4">
          <span className="text-gray-500 text-sm">Order #</span>
          <span className="font-bold font-mono text-gray-900">{ref}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <span className="text-gray-500">Total</span>
          <span className="font-bold text-emerald-700">{total ? formatPrice(total) : "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4" /> Estimated pickup: ~{pickup} minutes
        </div>
      </div>

      {/* Status tracker */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
        <div className="space-y-3">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${i <= status ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                {i === 0 && <Package className="w-4 h-4" />}
                {i === 1 && <ChefHat className="w-4 h-4" />}
                {i === 2 && <CheckCircle className="w-4 h-4" />}
              </div>
              <div className={`flex-1 ${i <= status ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                {stage}
                {i === status && <div className="text-xs text-emerald-600 font-normal mt-0.5">In progress...</div>}
              </div>
              {i < stages.length - 1 && (
                <div className={`w-0.5 h-4 ml-3.5 mt-1 ${i < status ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Link href="/cafe/menu" className="block w-full text-center bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 mb-3">
        Add More Items
      </Link>
      <Link href="/cafe" className="block text-center text-gray-400 text-sm hover:text-gray-600">Back to Cafe Home</Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
