"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AlertCircle, CheckCircle, Info, Clock, Hotel, Coffee } from "lucide-react";

const notifications = [
  { type: "error", property: "Riddhi Palace", title: "OTA Sync Failed", msg: "Booking.com sync failed. Last successful sync: 2 hours ago. Please check channel manager settings.", time: "2h ago", read: false },
  { type: "warning", property: "Heera Grand", title: "Review Needs Response", msg: "A new 3-star review was posted on Google for Heera Grand. Response recommended within 24 hours.", time: "4h ago", read: false },
  { type: "success", property: "Group", title: "Campaign Delivered", msg: "'Monsoon Special' campaign delivered to 1,245 contacts. Open rate: 68%.", time: "6h ago", read: true },
  { type: "info", property: "Krystal Cafe", title: "Menu Sync Complete", msg: "Zomato menu update pushed successfully. 4 items updated, 1 item marked as 86'd.", time: "8h ago", read: true },
  { type: "error", property: "Heera Grand", title: "Booking Cancellation", msg: "Booking HG240799 cancelled by guest. ₹7,000 refund processing.", time: "1d ago", read: true },
];

const iconMap: Record<string, React.ReactNode> = {
  error: <AlertCircle className="w-4 h-4 text-red-400" />,
  warning: <AlertCircle className="w-4 h-4 text-amber-400" />,
  success: <CheckCircle className="w-4 h-4 text-green-400" />,
  info: <Info className="w-4 h-4 text-blue-400" />,
};

const propertyIcons: Record<string, React.ReactNode> = {
  "Heera Grand": <Hotel className="w-3 h-3" />,
  "Riddhi Palace": <Hotel className="w-3 h-3" />,
  "Krystal Cafe": <Coffee className="w-3 h-3" />,
  "Group": <Clock className="w-3 h-3" />,
};

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <button onClick={() => setItems(items.map((n) => ({ ...n, read: true })))}
            className="text-sm text-purple-400 hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-3">
          {items.map((n, i) => (
            <div key={i} className={`bg-gray-800/60 border rounded-2xl p-4 ${n.read ? "border-gray-700/50" : "border-purple-500/30 bg-purple-500/5"}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{iconMap[n.type]}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{n.title}</span>
                      {!n.read && <span className="w-2 h-2 bg-purple-500 rounded-full" />}
                    </div>
                    <span className="text-gray-500 text-xs">{n.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{n.msg}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    {propertyIcons[n.property]}
                    <span>{n.property}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
