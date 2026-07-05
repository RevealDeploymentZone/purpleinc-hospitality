"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Search, Users, Star, RotateCcw } from "lucide-react";

const customers = [
  { name: "Rahul Sharma", phone: "+91 98765 43210", lastVisit: "2025-07-05", properties: ["Heera Grand", "Krystal Cafe"], tags: ["VIP", "Repeat"], visits: 6 },
  { name: "Priya Verma", phone: "+91 98765 43211", lastVisit: "2025-07-04", properties: ["Riddhi Palace"], tags: ["Repeat"], visits: 3 },
  { name: "Neha Gupta", phone: "+91 98765 43212", lastVisit: "2025-01-15", properties: ["Krystal Cafe"], tags: ["Regular"], visits: 12 },
  { name: "Amit Singh", phone: "+91 98765 43213", lastVisit: "2024-12-20", properties: ["Heera Grand"], tags: [], visits: 1 },
  { name: "Sunita Jain", phone: "+91 98765 43214", lastVisit: "2025-06-30", properties: ["Heera Grand", "Riddhi Palace"], tags: ["VIP", "Repeat"], visits: 8 },
  { name: "Rohit Mehta", phone: "+91 98765 43215", lastVisit: "2025-05-10", properties: ["Krystal Cafe"], tags: ["Regular"], visits: 5 },
];

const tagColors: Record<string, string> = {
  VIP: "bg-amber-500/20 text-amber-400",
  Repeat: "bg-purple-500/20 text-purple-400",
  Regular: "bg-blue-500/20 text-blue-400",
};

const propertyColors: Record<string, string> = {
  "Heera Grand": "bg-amber-500/20 text-amber-400",
  "Riddhi Palace": "bg-blue-500/20 text-blue-400",
  "Krystal Cafe": "bg-emerald-500/20 text-emerald-400",
};

export default function CRMPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Group CRM</h1>
            <p className="text-gray-400 text-sm mt-0.5">All customers across all 3 properties</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Users className="w-4 h-4" /> {customers.length} total customers
          </div>
        </div>

        <div className="flex gap-4 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone..."
              className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Customer list */}
          <div className="lg:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  {["Guest", "Properties", "Tags", "Last Visit", "Visits"].map((h) => (
                    <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {filtered.map((c) => (
                  <tr key={c.name} onClick={() => setSelected(c)} className={`cursor-pointer hover:bg-gray-700/30 transition-all ${selected?.name === c.name ? "bg-purple-600/10" : ""}`}>
                    <td className="py-3 px-4">
                      <div className="font-medium text-white text-sm">{c.name}</div>
                      <div className="text-gray-500 text-xs">{c.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {c.properties.map((p) => (
                          <span key={p} className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${propertyColors[p]}`}>{p.split(" ")[0]}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t) => (
                          <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[t]}`}>{t}</span>
                        ))}
                        {c.tags.length === 0 && <span className="text-xs text-gray-500">—</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{c.lastVisit}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-gray-300 text-sm">
                        <RotateCcw className="w-3 h-3 text-purple-400" /> {c.visits}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer profile */}
          <div>
            {selected ? (
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 sticky top-6">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-300 font-bold text-xl">
                    {selected.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-white font-bold">{selected.name}</div>
                  <div className="text-gray-400 text-sm">{selected.phone}</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {selected.tags.map((t) => <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${tagColors[t]}`}>{t}</span>)}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300"><span className="text-gray-500">Total Visits</span><span className="font-bold text-white">{selected.visits}</span></div>
                  <div className="flex justify-between text-gray-300"><span className="text-gray-500">Last Visit</span><span>{selected.lastVisit}</span></div>
                  <div className="text-gray-500 mb-1">Properties Visited</div>
                  {selected.properties.map((p) => (
                    <div key={p} className={`px-3 py-2 rounded-lg text-xs font-medium ${propertyColors[p]}`}>{p}</div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-700 space-y-2">
                  <button className="w-full bg-purple-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2">
                    <Star className="w-3.5 h-3.5" /> Send Campaign
                  </button>
                  <textarea placeholder="Add internal note..." rows={3} className="w-full bg-gray-700 border border-gray-600 text-gray-300 text-xs rounded-xl p-3 focus:outline-none focus:border-purple-500 resize-none" />
                  <button className="w-full border border-gray-600 text-gray-300 text-xs py-2 rounded-xl hover:bg-gray-700">Save Note</button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8 text-center text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Select a customer to view their profile</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
