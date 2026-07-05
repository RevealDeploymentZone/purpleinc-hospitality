"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "owner@purpleinc.in" && password === "admin123") {
      router.push("/admin/dashboard");
    } else if (email === "heera@purpleinc.in" && password === "manager123") {
      router.push("/admin/heera");
    } else if (email === "cafe@purpleinc.in" && password === "manager123") {
      router.push("/admin/cafe-dashboard");
    } else {
      setError("Invalid credentials. Try owner@purpleinc.in / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">PurpleInc Admin Hub</h1>
          <p className="text-purple-300 text-sm mt-1">Internal Management System</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-purple-200 mb-1 block">Email Address</label>
              <input type="email" placeholder="owner@purpleinc.in" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 text-sm focus:outline-none focus:border-white/50" />
            </div>
            <div>
              <label className="text-sm font-semibold text-purple-200 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 text-sm focus:outline-none focus:border-white/50 pr-10" />
                <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-300 text-xs bg-red-500/20 rounded-lg p-2">{error}</p>}
            <button onClick={handleLogin} className="w-full bg-white text-purple-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors mt-2">
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-purple-300 space-y-1">
            <div>👑 Owner: owner@purpleinc.in / admin123</div>
            <div>🏨 Hotel Manager: heera@purpleinc.in / manager123</div>
            <div>☕ Cafe Manager: cafe@purpleinc.in / manager123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
