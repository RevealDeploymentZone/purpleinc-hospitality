"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ShoppingCart, Coffee } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CafeNavbar({ cartCount = 0 }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/cafe/menu", label: "Menu" },
    { href: "/cafe/reserve", label: "Reserve" },
    { href: "/cafe/gallery", label: "Gallery" },
    { href: "/cafe/about", label: "About" },
    { href: "/cafe/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/cafe" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg leading-none">Krystal Cafe</div>
              <div className="text-xs text-emerald-600 tracking-widest uppercase">Lucknow</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors ${pathname === l.href ? "text-emerald-700" : "text-gray-600 hover:text-emerald-700"}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cafe/order" className="relative p-2 text-gray-600 hover:text-emerald-700">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
            <Link href="/cafe/reserve" className="hidden md:block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Reserve Table
            </Link>
            <Link href="/cafe/menu" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Order Now
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-700">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-gray-700 font-medium border-b border-gray-50 last:border-0">
              {l.label}
            </Link>
          ))}
          <a href="tel:+919876543211" className="flex items-center gap-2 py-2.5 text-sm text-emerald-700 font-medium">
            <Phone className="w-4 h-4" /> +91 98765 43211
          </a>
        </div>
      )}
    </nav>
  );
}
