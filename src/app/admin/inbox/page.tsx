"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Search, MessageSquare, RefreshCw, Clock, Hotel, Coffee } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Contact = { id: string; property: string; name: string; email: string; subject: string; message: string; status: string; created_at: string; };

const propLabel: Record<string, string> = { heera: "Heera Grand", riddhi: "Riddhi Palace", cafe: "Krystal Cafe" };
const propColor: Record<string, string> = { heera: "bg-amber-500/20 text-amber-400", riddhi: "bg-blue-500/20 text-blue-400", cafe: "bg-emerald-500/20 text-emerald-400" };

export default function UnifiedInboxPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    setContacts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = contacts.filter(c => {
    const matchSearch = c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.subject?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter || c.property === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar list */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold">Inbox</h2>
              <button onClick={load} className="text-gray-400 hover:text-white">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-purple-500" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {["all", "open", "heera", "riddhi", "cafe"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize transition-colors ${filter === f ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center py-10 text-gray-500 text-sm">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-sm px-4">
                <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40" />
                No messages yet. Contact form submissions appear here.
              </div>
            ) : (
              filtered.map(c => (
                <button key={c.id} onClick={() => setSelected(c)} className={`w-full text-left p-4 border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors ${selected?.id === c.id ? "bg-purple-600/10 border-l-2 border-l-purple-500" : ""}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-white text-sm truncate">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium shrink-0 ${propColor[c.property] || "bg-gray-700 text-gray-300"}`}>
                      {propLabel[c.property] || c.property}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs truncate mb-1">{c.subject || "(no subject)"}</div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "open" ? "bg-amber-500/20 text-amber-400" : "bg-gray-700 text-gray-400"}`}>{c.status}</span>
                    <span className="text-gray-600 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(c.created_at).toLocaleDateString("en-IN")}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message detail */}
        <div className="flex-1 p-6 overflow-auto">
          {selected ? (
            <div className="max-w-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{selected.subject || "(no subject)"}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>From: <span className="text-gray-200">{selected.name}</span></span>
                    {selected.email && <span>· {selected.email}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${propColor[selected.property] || "bg-gray-700 text-gray-300"}`}>
                      {selected.property === "heera" ? <Hotel className="w-3 h-3 inline mr-1" /> : <Coffee className="w-3 h-3 inline mr-1" />}
                      {propLabel[selected.property] || selected.property}
                    </span>
                    <span className="text-gray-500 text-xs">{new Date(selected.created_at).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5 mb-5">
                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide block mb-2">Reply (send via email/WhatsApp separately)</label>
                <textarea rows={4} placeholder="Draft your reply here..."
                  className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-xl p-4 focus:outline-none focus:border-purple-500 resize-none" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a message to read</p>
                <p className="text-xs mt-1 text-gray-600">{contacts.length} total messages</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
