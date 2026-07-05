"use client";
import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const quick = ["Check availability", "Room prices", "Parking info", "Talk to staff"];

export default function RiddhiChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Namaste! Welcome to Riddhi Palace. How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    setMsgs((m) => [...m, { from: "user", text }, { from: "bot", text: "Thank you for your message! Our team will get back to you shortly. For urgent queries, call +91 98765 11100." }]);
    setInput("");
  };

  return (
    <>
      {/* WhatsApp */}
      <a href="https://wa.me/919876511100" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-24 right-5 z-50 w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Chat bubble */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-indigo-700 hover:bg-indigo-800 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110">
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          <div className="bg-indigo-700 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Riddhi Palace</div>
              <div className="text-indigo-200 text-xs">Typically replies instantly</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.from === "bot" ? "bg-indigo-100" : "bg-gray-100"}`}>
                  {m.from === "bot" ? <Bot className="w-3 h-3 text-indigo-700" /> : <User className="w-3 h-3 text-gray-600" />}
                </div>
                <div className={`text-xs px-3 py-2 rounded-xl max-w-[80%] ${m.from === "bot" ? "bg-gray-100 text-gray-800" : "bg-indigo-700 text-white"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {quick.map((q) => (
              <button key={q} onClick={() => send(q)} className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200 transition-colors">
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 pb-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && input.trim() && send(input)}
              placeholder="Type a message..." className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-400" />
            <button onClick={() => input.trim() && send(input)} className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
