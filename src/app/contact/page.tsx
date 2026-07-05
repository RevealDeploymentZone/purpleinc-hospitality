"use client";
import { useState } from "react";
import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-16 px-4 text-center">
          <div className="text-sm font-semibold tracking-widest uppercase text-amber-200 mb-2">Get In Touch</div>
          <h1 className="text-3xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-3 text-amber-100">We&apos;re here for you — 24/7.</p>
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach Us Anytime</h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210", color: "amber" },
                  { icon: Mail, label: "Email", value: "info@heeragrand.com", href: "mailto:info@heeragrand.com", color: "blue" },
                  { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210 (Chat)", href: "https://wa.me/919876543210", color: "green" },
                  { icon: MapPin, label: "Address", value: "Near Charbagh Railway Station, Lucknow, UP 226004", href: "#map", color: "red" },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <a key={label} href={href} className={`flex items-start gap-4 p-4 bg-gray-50 hover:bg-${color}-50 rounded-xl border border-gray-100 hover:border-${color}-200 transition-all`}>
                    <div className={`w-10 h-10 bg-${color}-100 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 text-${color}-600`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</div>
                      <div className="font-medium text-gray-800 text-sm mt-0.5">{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div id="map" className="rounded-2xl overflow-hidden h-60 border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.4!2d80.944!3d26.849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzU2LjQiTiA4MMKwNTYnMzguNCJF!5e0!3m2!1sen!2sin!4v1234"
                  width="100%" height="100%" loading="lazy" className="w-full h-full"
                />
              </div>
            </div>

            {/* Right - Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">We&apos;ll get back to you within 2 hours. Check your email for a confirmation.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="space-y-4">
                    {[
                      { id: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                      { id: "email", label: "Email", placeholder: "you@email.com", type: "email" },
                      { id: "phone", label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
                    ].map(({ id, label, placeholder, type }) => (
                      <div key={id}>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">{label}</label>
                        <input type={type} placeholder={placeholder} value={form[id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400" />
                      </div>
                    ))}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Message</label>
                      <textarea rows={4} placeholder="How can we help you?" value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none" />
                    </div>
                    <button onClick={async () => { try { await fetch("/api/contacts", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({property:"heera", name:form.name, email:form.email, subject:"Contact Form", message:form.message}) }); } catch {} setSubmitted(true); }} disabled={!form.name || !form.email || !form.message}
                      className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
