import { Download, Share2, CheckCircle } from "lucide-react";

const lineItems = [
  { desc: "Palace Suite × 3 nights", amount: 23997 },
  { desc: "In-room dining (2 orders)", amount: 1480 },
  { desc: "Laundry service", amount: 350 },
  { desc: "Airport Transfer", amount: 800 },
  { desc: "GST (18%)", amount: 4791 },
];
const total = lineItems.reduce((s, i) => s + i.amount, 0);

export default function RiddhiCheckoutBillPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Itemised Bill</h1>
              <p className="text-sm text-gray-400">Riddhi Palace · Ref: RP-482019</p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> Paid
            </div>
          </div>

          <div className="space-y-3 mb-5">
            {lineItems.map((item) => (
              <div key={item.desc} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.desc}</span>
                <span className="font-medium text-gray-900">₹{item.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-4 text-lg">
            <span>Total Paid</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mt-5 text-xs text-gray-500 space-y-1">
            <div className="flex justify-between"><span>Payment Method</span><span className="font-medium text-gray-700">UPI (GPay)</span></div>
            <div className="flex justify-between"><span>Transaction ID</span><span className="font-medium text-gray-700">UPI2025070512345</span></div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-700 text-white font-semibold py-3 rounded-xl text-sm hover:bg-indigo-800">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
