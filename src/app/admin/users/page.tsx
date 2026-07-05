"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Plus, Edit2, Trash2, UserX } from "lucide-react";

const managers = [
  { name: "Arjun Verma", email: "arjun@purpleinc.in", property: "Heera Grand", role: "Full Admin", status: "active" },
  { name: "Kavita Sharma", email: "kavita@purpleinc.in", property: "Riddhi Palace", role: "Edit Rates", status: "active" },
  { name: "Suresh Patel", email: "suresh@purpleinc.in", property: "Krystal Cafe", role: "Full Admin", status: "active" },
  { name: "Meena Singh", email: "meena@purpleinc.in", property: "Heera Grand", role: "View Only", status: "inactive" },
];

const roleColors: Record<string, string> = {
  "Full Admin": "bg-purple-500/20 text-purple-400",
  "Edit Rates": "bg-blue-500/20 text-blue-400",
  "View Only": "bg-gray-600/50 text-gray-400",
};

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-purple-700">
            <Plus className="w-4 h-4" /> Invite Manager
          </button>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                {["Manager", "Property", "Permission", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {managers.map((m) => (
                <tr key={m.email} className="hover:bg-gray-700/20">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 text-xs font-bold">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{m.name}</div>
                        <div className="text-gray-500 text-xs">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300 text-sm">{m.property}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleColors[m.role]}`}>{m.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${m.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-600/50 text-gray-400"}`}>{m.status}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-amber-400 hover:underline flex items-center gap-1"><Edit2 className="w-3 h-3" /> Edit</button>
                      <button className="text-xs text-red-400 hover:underline flex items-center gap-1"><UserX className="w-3 h-3" /> Revoke</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-white font-bold mb-5">Invite Manager</h3>
              <div className="space-y-4">
                {[["Name", "text", "Full name"], ["Email", "email", "manager@example.com"]].map(([label, type, placeholder]) => (
                  <div key={label as string}>
                    <label className="text-sm font-semibold text-gray-400 mb-1 block">{label as string}</label>
                    <input type={type as string} placeholder={placeholder as string} className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1 block">Property</label>
                  <select className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none">
                    {["Heera Grand", "Riddhi Palace", "Krystal Cafe"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-1 block">Permission</label>
                  <select className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none">
                    {["View Only", "Edit Rates", "Full Admin"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-600 text-gray-300 py-2.5 rounded-xl hover:bg-gray-700 text-sm">Cancel</button>
                  <button onClick={() => setShowModal(false)} className="flex-1 bg-purple-600 text-white font-bold py-2.5 rounded-xl hover:bg-purple-700 text-sm">Send Invite</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
