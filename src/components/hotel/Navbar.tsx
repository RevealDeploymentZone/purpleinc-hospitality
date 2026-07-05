"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Crown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/rooms", label: "Rooms" },
    { href: "/gallery", label: "Gallery" },
    { href: "/explore", label: "Explore Lucknow" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg leading-none">Heera Grand</div>
              <div className="text-xs text-amber-600 tracking-widest uppercase">Lucknow</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-amber-700 font-medium transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+919876543210" className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-amber-700">
              <Phone className="w-4 h-4" /> +91 98765 43210
            </a>
            <Link href="/book" className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Book Now
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-700">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-gray-700 font-medium border-b border-gray-50 last:border-0">
              {l.label}
            </Link>
          ))}
          <a href="tel:+919876543210" className="flex items-center gap-2 py-2.5 text-sm text-amber-700 font-medium">
            <Phone className="w-4 h-4" /> +91 98765 43210
          </a>
        </div>
      )}
    </nav>
  );
}
