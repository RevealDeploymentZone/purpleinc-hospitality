"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Search, Hotel, Coffee, MessageSquare } from "lucide-react";

const conversations = [
  { id: 1, guest: "Rahul Sharma", property: "Heera Grand", lastMsg: "Hi, is early check-in possible tomorrow?", time: "2m", status: "open", unread: 2 },
  { id: 2, guest: "Neha Gupta", property: "Krystal Cafe", lastMsg: "I'd like to change my reservation to 8 PM", time: "15m", status: "open", unread: 1 },
  { id: 3, guest: "Amit Verma", property: "Riddhi Palace", lastMsg: "Thank you for the wonderful stay!", time: "1h", status: "resolved", unread: 0 },
  { id: 4, guest: "Sunita Jain", property: "Heera Grand", lastMsg: "Is there parking available for an SUV?", time: "2h", status: "open", unread: 0 },
  { id: 5, guest: "Rohit Mehta", property: "Krystal Cafe", lastMsg: "Can I get the Jain menu?", time: "3h", status: "resolved", unread: 0 },
];

const propertyBadgeColors: Record<string, string> = {
  "Heera Grand": "bg-amber-500/20 text-amber-400",
  "Riddhi Palace": "bg-blue-500/20 text-blue-400",
  "Krystal Cafe": "bg-emerald-500/20 text-emerald-400",
};

const mockThread = [
  { from: "guest", text: "Hi, is early check-in possible tomorrow?", time: "2:10 PM" },
  { from: "staff", text: "Hi Rahul! Yes, early check-in from 10 AM is available for ₹500. Would you like to add this to your booking?", time: "2:12 PM" },
  { from: "guest", text: "Yes please! That would be great.", time: "2:13 PM" },
];

export default function UnifiedInboxPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");

  const filtered = conversations.filter((c) => filter === "all" || c.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 flex overflow-hidden">
        {/* Conversations list */}
        <div className="w-80 bg-gray-900 border-r border-gray-700/50 flex flex-col">
          <div className="p-4 border-b border-gray-700/50">
            <h2 className="text-white font-bold mb-3">Unified Inbox</h2>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input placeholder="Search..." className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-purple-500" />
            </div>
            <div className="flex gap-1">
              {["all", "open", "resolved"].map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all capitalize ${filter === f ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((c) => (
              <button key={c.id} onClick={() => setSelected(c)}
                className={`w-full text-left px-4 py-3 border-b border-gray-700/30 hover:bg-gray-800/50 transition-all ${selected.id === c.id ? "bg-purple-600/10 border-l-2 border-l-purple-500" : ""}`}>
                <div className="flex items-start justify-between mb-1">
                  <span className="text-white text-sm font-medium">{c.guest}</span>
                  <span className="text-gray-500 text-xs">{c.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${propertyBadgeColors[c.property]}`}>
                    {c.property === "Krystal Cafe" ? <Coffee className="w-3 h-3 inline mr-1" /> : <Hotel className="w-3 h-3 inline mr-1" />}{c.property}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs truncate">{c.lastMsg}</span>
                  {c.unread > 0 && <span className="bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 ml-1">{c.unread}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat thread */}
        <div className="flex-1 flex flex-col">
          {/* Thread header */}
          <div className="bg-gray-900 border-b border-gray-700/50 px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-white font-bold">{selected.guest}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${propertyBadgeColors[selected.property]}`}>{selected.property}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${selected.status === "open" ? "bg-green-500/20 text-green-400" : "bg-gray-600/50 text-gray-400"}`}>{selected.status}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs text-gray-400 border border-gray-600 px-3 py-1.5 rounded-lg hover:text-white hover:border-gray-500">Assign</button>
              <button className="text-xs text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1.5 rounded-lg hover:bg-green-500/20">Mark Resolved</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {mockThread.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "staff" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-md px-4 py-3 rounded-2xl ${msg.from === "staff" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-200"}`}>
                  <div className="text-sm">{msg.text}</div>
                  <div className={`text-xs mt-1 ${msg.from === "staff" ? "text-purple-200" : "text-gray-500"}`}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply box */}
          <div className="bg-gray-900 border-t border-gray-700/50 p-4 flex gap-3">
            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type a reply..."
              className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500" />
            <button onClick={() => setReply("")} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
