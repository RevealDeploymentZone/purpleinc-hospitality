import Link from "next/link";
import { Gem, Phone, Mail, MapPin, Globe, Share2, AtSign } from "lucide-react";

export default function RiddhiFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center">
                <Gem className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none">Riddhi Palace</div>
                <div className="text-xs text-indigo-400 tracking-widest uppercase">Lucknow</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Royal comfort and modern luxury in the heart of Hazratganj, Lucknow's finest address.</p>
            <div className="flex gap-3 mt-5">
              {[Globe, Share2, AtSign].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[["Rooms & Rates", "/riddhi/rooms"], ["Gallery", "/riddhi/gallery"], ["Explore Lucknow", "/riddhi/explore"], ["About Us", "/riddhi/about"], ["Contact", "/riddhi/contact"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-indigo-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Guest Services</h4>
            <ul className="space-y-2 text-sm">
              {["Digital Check-In", "In-Room Directory", "Airport Pickup", "Early Check-In", "Late Checkout", "Concierge"].map((s) => (
                <li key={s} className="text-gray-400">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <span>Hazratganj, Lucknow, UP 226001</span>
              </div>
              <a href="tel:+919876511100" className="flex items-center gap-3 hover:text-indigo-400">
                <Phone className="w-4 h-4 text-indigo-400" /> +91 98765 11100
              </a>
              <a href="mailto:stay@riddhipalace.com" className="flex items-center gap-3 hover:text-indigo-400">
                <Mail className="w-4 h-4 text-indigo-400" /> stay@riddhipalace.com
              </a>
            </div>
            <div className="mt-5 bg-gray-800 rounded-xl overflow-hidden h-28">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d80.948!3d26.845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQyLjAiTiA4MMKwNTYnNTIuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="100%" loading="lazy" className="opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2025 Riddhi Palace, Lucknow. A PurpleInc Property. All rights reserved.
      </div>
    </footer>
  );
}
