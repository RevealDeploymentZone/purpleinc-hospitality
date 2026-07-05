import AdminSidebar from "@/components/admin/AdminSidebar";
import { Shield } from "lucide-react";

const logs = [
  { user: "Arjun Verma", action: "Updated room rate — Deluxe Room: ₹3,499 → ₹3,699", property: "Heera Grand", time: "Today 3:45 PM" },
  { user: "Kavita Sharma", action: "Modified booking HRP240765 — extended checkout to Jul 8", property: "Riddhi Palace", time: "Today 2:10 PM" },
  { user: "Owner Verma", action: "Created new campaign 'Monsoon Special' — sent to 1,245 contacts", property: "Group", time: "Today 11:00 AM" },
  { user: "Suresh Patel", action: "Marked menu item 'Veg Fried Rice' as 86'd", property: "Krystal Cafe", time: "Yesterday 7:30 PM" },
  { user: "Arjun Verma", action: "Resolved guest request REQ-304 (Extra Towels)", property: "Heera Grand", time: "Yesterday 5:00 PM" },
  { user: "Owner Verma", action: "Invited new manager: meena@purpleinc.in (View Only)", property: "Group", time: "Jul 4, 2025 9:00 AM" },
];

const propertyColors: Record<string, string> = {
  "Heera Grand": "bg-amber-500/20 text-amber-400",
  "Riddhi Palace": "bg-blue-500/20 text-blue-400",
  "Krystal Cafe": "bg-emerald-500/20 text-emerald-400",
  "Group": "bg-purple-500/20 text-purple-400",
};

export default function AuditLogPage() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-purple-400" />
          <h1 className="text-2xl font-bold text-white">Audit Log</h1>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="border-b border-gray-700/50 px-4 py-3 flex gap-3">
            <input placeholder="Search audit log..." className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 w-64" />
            <select className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none">
              <option>All Properties</option>
              <option>Heera Grand</option>
              <option>Riddhi Palace</option>
              <option>Krystal Cafe</option>
            </select>
          </div>
          <div className="divide-y divide-gray-700/30">
            {logs.map((log, i) => (
              <div key={i} className="px-4 py-4 hover:bg-gray-700/20">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">
                        {log.user.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-white text-sm font-medium">{log.user}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${propertyColors[log.property]}`}>{log.property}</span>
                    </div>
                    <div className="text-gray-400 text-sm">{log.action}</div>
                  </div>
                  <div className="text-gray-500 text-xs whitespace-nowrap ml-4">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
