"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const quickReplies = ["Check availability", "Recommend a dish", "Parking info", "Talk to staff"];
const botResponses: Record<string, string> = {
  "Check availability": "We have tables available! Would you like to reserve one? Visit /cafe/reserve or call +91 98765 43211.",
  "Recommend a dish": "For first-timers, I'd suggest our Lucknowi Biryani and Kulfi Falooda for dessert. Absolutely divine!",
  "Parking info": "Free parking is available for guests. We have space for both two-wheelers and four-wheelers.",
  "Talk to staff": "Connecting you to our team! You can also call directly at +91 98765 43211.",
};

export default function CafeChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I'm the Krystal Cafe assistant. Ask me anything — menu recommendations, reservations, parking!" }]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    setMessages((m) => [...m, { from: "user", text }]);
    setTimeout(() => {
      const reply = botResponses[text] || "Thanks! Our team will get back to you shortly.";
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 600);
    setInput("");
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-20 right-5 z-50 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      {open && (
        <div className="fixed bottom-36 right-5 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
          <div className="bg-emerald-600 text-white p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold">KC</div>
            <div><div className="font-semibold text-sm">Krystal Cafe</div><div className="text-xs text-emerald-100">Menu & Table Queries</div></div>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-56">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`text-sm px-3 py-2 rounded-xl max-w-[80%] ${m.from === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="px-3 pt-1 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {quickReplies.map((q) => (
              <button key={q} onClick={() => send(q)} className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 whitespace-nowrap">{q}</button>
            ))}
          </div>
          <div className="border-t p-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && input && send(input)}
              placeholder="Type a message..." className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-400" />
            <button onClick={() => input && send(input)} className="bg-emerald-600 text-white p-2 rounded-lg"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}
      <a href="https://wa.me/919876543211" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
