"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";

export default function RiddhiContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 py-16 px-4 text-center text-white">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-indigo-200 mt-3">We&apos;re here to help. Reach out any time.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            {[
              { icon: MapPin, label: "Address", value: "Hazratganj, Lucknow, UP 226001" },
              { icon: Phone, label: "Phone", value: "+91 98765 11100", href: "tel:+919876511100" },
              { icon: Mail, label: "Email", value: "stay@riddhipalace.com", href: "mailto:stay@riddhipalace.com" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us on WhatsApp", href: "https://wa.me/919876511100" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 py-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors">{value}</a>
                  ) : (
                    <div className="text-sm font-semibold text-gray-900">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-200 rounded-2xl h-52 overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d80.948!3d26.845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQyLjAiTiA4MMKwNTYnNTIuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" loading="lazy" className="opacity-80" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {sent ? (
            <div className="text-center py-16 space-y-4">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
              <p className="text-gray-500 text-sm">We&apos;ll get back to you within 2 hours.</p>
              <button onClick={() => setSent(false)} className="text-indigo-600 font-semibold text-sm">Send another message</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Send a Message</h2>
              {[["Full Name", "name", "text"], ["Email Address", "email", "email"], ["Subject", "subject", "text"]].map(([label, key, type]) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
                  <input type={type} required value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Message</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none" />
              </div>
              <button type="button" onClick={async (e) => { e.preventDefault(); try { await fetch("/api/contacts", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({property:"riddhi", name:form.name, email:form.email, subject:form.subject, message:form.message}) }); } catch {} setSent(true); }} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
