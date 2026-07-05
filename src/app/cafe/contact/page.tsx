"use client";
import { useState } from "react";
import CafeNavbar from "@/components/cafe/CafeNavbar";
import CafeFooter from "@/components/cafe/CafeFooter";
import CafeChatWidget from "@/components/cafe/CafeChatWidget";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function CafeContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <CafeNavbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-12 px-4 text-center">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>
        <section className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: "+91 98765 43211", href: "tel:+919876543211" },
                { icon: Mail, label: "Email", value: "hello@krystalcafe.in", href: "mailto:hello@krystalcafe.in" },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919876543211" },
                { icon: MapPin, label: "Address", value: "Near Heera Grand, Charbagh, Lucknow", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-emerald-600" /></div>
                  <div><div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div><div className="font-medium text-sm text-gray-800">{value}</div></div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">Sent!</h3>
                <p className="text-gray-500 text-sm">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                {[["name", "Name", "text"], ["email", "Email", "email"]].map(([id, label, type]) => (
                  <div key={id}>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">{label}</label>
                    <input type={type} value={form[id as keyof typeof form]} onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 resize-none" />
                </div>
                <button onClick={() => setSubmitted(true)} disabled={!form.name || !form.email || !form.message}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <CafeFooter />
      <CafeChatWidget />
    </>
  );
}
