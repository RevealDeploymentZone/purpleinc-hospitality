import Link from "next/link";
import { Crown, Phone, Mail, MapPin, Globe, Share2, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none">Heera Grand</div>
                <div className="text-xs text-amber-500 tracking-widest uppercase">Lucknow</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Luxury hospitality in the heart of the city of Nawabs. Your home away from home.</p>
            <div className="flex gap-3 mt-5">
              {[Globe, Share2, AtSign].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[["Rooms & Rates", "/rooms"], ["Gallery", "/gallery"], ["Explore Lucknow", "/explore"], ["About Us", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-amber-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Guest Services</h4>
            <ul className="space-y-2 text-sm">
              {["Digital Check-In", "In-Room Directory", "Airport Pickup", "Early Check-In", "Late Checkout", "Concierge"].map((s) => (
                <li key={s} className="text-gray-400">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>Near Charbagh Railway Station, Lucknow, UP 226004</span>
              </div>
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-amber-400">
                <Phone className="w-4 h-4 text-amber-500" /> +91 98765 43210
              </a>
              <a href="mailto:info@heeragrand.com" className="flex items-center gap-3 hover:text-amber-400">
                <Mail className="w-4 h-4 text-amber-500" /> info@heeragrand.com
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
        © 2025 Heera Grand, Lucknow. A PurpleInc Property. All rights reserved.
      </div>
    </footer>
  );
}
