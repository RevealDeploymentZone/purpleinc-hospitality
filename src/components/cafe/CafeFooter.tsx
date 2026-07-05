import Link from "next/link";
import { Coffee, Phone, Mail, MapPin, Globe, Share2 } from "lucide-react";

export default function CafeFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none">Krystal Cafe</div>
                <div className="text-xs text-emerald-400 tracking-widest uppercase">Lucknow</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">Chinese & North Indian cuisine with a warm, welcoming ambience in the heart of Lucknow.</p>
            <div className="flex gap-3 mt-4">
              {[Globe, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[["Menu", "/cafe/menu"], ["Reserve Table", "/cafe/reserve"], ["Order Now", "/cafe/order"], ["Gallery", "/cafe/gallery"], ["Contact", "/cafe/contact"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="hover:text-emerald-400">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <div className="text-sm space-y-2 text-gray-400">
              <div><div className="text-white font-medium">Everyday</div>11:00 AM – 11:00 PM</div>
              <div className="mt-3 text-xs text-emerald-400">Last order: 10:30 PM</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><span>Near Heera Grand, Charbagh, Lucknow</span></div>
              <a href="tel:+919876543211" className="flex items-center gap-3 hover:text-emerald-400"><Phone className="w-4 h-4 text-emerald-500" />+91 98765 43211</a>
              <a href="mailto:hello@krystalcafe.in" className="flex items-center gap-3 hover:text-emerald-400"><Mail className="w-4 h-4 text-emerald-500" />hello@krystalcafe.in</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2025 Krystal Cafe, Lucknow. A PurpleInc Property. All rights reserved.
      </div>
    </footer>
  );
}
