"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Hotel, Coffee, BarChart3, Users, MessageSquare,
  Megaphone, Settings, LogOut, Shield, ChevronRight, Bell
} from "lucide-react";

const ownerNav = [
  { section: "Overview", items: [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Group Dashboard" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/admin/finance", icon: BarChart3, label: "Revenue / Finance" },
  ]},
  { section: "Communication", items: [
    { href: "/admin/inbox", icon: MessageSquare, label: "Unified Inbox" },
    { href: "/admin/crm", icon: Users, label: "Group CRM" },
    { href: "/admin/campaigns", icon: Megaphone, label: "Campaigns" },
  ]},
  { section: "Properties", items: [
    { href: "/admin/heera", icon: Hotel, label: "Heera Grand" },
    { href: "/admin/riddhi", icon: Hotel, label: "Riddhi Palace" },
    { href: "/admin/cafe-dashboard", icon: Coffee, label: "Krystal Cafe" },
  ]},
  { section: "System", items: [
    { href: "/admin/users", icon: Users, label: "User Management" },
    { href: "/admin/audit", icon: Shield, label: "Audit Log" },
    { href: "/admin/notifications", icon: Bell, label: "Notifications" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ]},
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">PurpleInc</div>
            <div className="text-purple-400 text-xs">Admin Hub</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {ownerNav.map((section) => (
          <div key={section.section} className="mb-5">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">{section.section}</div>
            {section.items.map(({ href, icon: Icon, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all group ${active ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                  <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300"}`} />
                  {label}
                  {active && <ChevronRight className="w-3 h-3 ml-auto text-purple-400" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-gray-700/50">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">OV</div>
          <div>
            <div className="text-white text-xs font-semibold">Owner Verma</div>
            <div className="text-gray-500 text-xs">Super Admin</div>
          </div>
        </div>
        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 font-medium">
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </Link>
      </div>
    </aside>
  );
}
