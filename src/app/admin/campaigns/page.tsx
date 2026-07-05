"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Megaphone, Plus, Send, Calendar, Users, TrendingUp, Eye } from "lucide-react";

const pastCampaigns = [
  { name: "Monsoon Special", audience: "All guests", sent: 1245, opened: 68, clicked: 42, date: "Jul 1, 2025" },
  { name: "Weekend Getaway", audience: "Heera Grand guests", sent: 580, opened: 72, clicked: 38, date: "Jun 15, 2025" },
  { name: "Biryani Festival", audience: "Cafe visitors", sent: 890, opened: 55, clicked: 31, date: "Jun 1, 2025" },
];

export default function CampaignsPage() {
  const [mode, setMode] = useState<"list" | "compose">("list");
  const [form, setForm] = useState({ title: "", audience: "all", message: "", schedule: "now" });

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Campaigns & Broadcasts</h1>
          <button onClick={() => setMode(mode === "list" ? "compose" : "list")}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            {mode === "compose" ? <Eye className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {mode === "compose" ? "View History" : "New Campaign"}
          </button>
        </div>

        {mode === "compose" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-5 flex items-center gap-2"><Megaphone className="w-4 h-4 text-purple-400" /> Compose Campaign</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1 block">Campaign Name</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Diwali Special Offer"
                    className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1 block">Audience</label>
                  <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500">
                    <option value="all">All Properties (1,890 contacts)</option>
                    <option value="heera">Heera Grand guests (680 contacts)</option>
                    <option value="riddhi">Riddhi Palace guests (420 contacts)</option>
                    <option value="cafe">Krystal Cafe visitors (790 contacts)</option>
                    <option value="vip">VIP tag only (145 contacts)</option>
                    <option value="repeat">Repeat guests only (510 contacts)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1 block">Message (WhatsApp / Email)</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hi {name}! We have an exclusive offer just for you..."
                    className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">Schedule</label>
                  <div className="flex gap-3">
                    {[["now", "Send Now"], ["later", "Schedule Later"]].map(([val, label]) => (
                      <label key={val} className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer flex-1 ${form.schedule === val ? "border-purple-500 bg-purple-500/10" : "border-gray-700"}`}>
                        <input type="radio" value={val} checked={form.schedule === val} onChange={() => setForm({ ...form, schedule: val })} className="accent-purple-500" />
                        <span className="text-sm text-gray-300">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> {form.schedule === "now" ? "Send Campaign" : "Schedule Campaign"}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 sticky top-6">
                <h4 className="text-white font-bold mb-4">Preview</h4>
                <div className="bg-gray-900 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">PI</div>
                    <div>
                      <div className="text-white text-xs font-bold">PurpleInc Hotels</div>
                      <div className="text-gray-500 text-xs">WhatsApp Business</div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 text-sm text-gray-300">
                    {form.message || "Your campaign message will appear here..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[["Total Campaigns", "24"], ["Avg Open Rate", "65%"], ["Total Reach", "12,400"]].map(([label, val]) => (
                <div key={label as string} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4">
                  <div className="text-gray-400 text-xs mb-1">{label as string}</div>
                  <div className="text-white font-bold text-xl">{val as string}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    {["Campaign", "Audience", "Sent", "Opened", "Clicked", "Date"].map((h) => (
                      <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {pastCampaigns.map((c) => (
                    <tr key={c.name} className="hover:bg-gray-700/20">
                      <td className="py-4 px-4 text-white font-medium text-sm">{c.name}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm flex items-center gap-1"><Users className="w-3 h-3" />{c.audience}</td>
                      <td className="py-4 px-4 text-gray-300 text-sm">{c.sent.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                          <TrendingUp className="w-3 h-3" />{c.opened}%
                        </div>
                      </td>
                      <td className="py-4 px-4 text-blue-400 text-sm">{c.clicked}%</td>
                      <td className="py-4 px-4 text-gray-500 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{c.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
