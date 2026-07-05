"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gem, Phone, ShieldCheck } from "lucide-react";

export default function RiddhiLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gem className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Guest Login</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your bookings at Riddhi Palace</p>
        </div>

        {step === "phone" ? (
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Mobile Number</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-400">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">+91</span>
                <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number" className="flex-1 text-sm outline-none" />
              </div>
            </div>
            <button onClick={() => phone.length === 10 && setStep("otp")} disabled={phone.length !== 10}
              className="w-full bg-indigo-700 hover:bg-indigo-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors">
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-gray-500 text-center">OTP sent to <span className="font-semibold text-gray-900">+91 {phone}</span></p>
            <div className="flex gap-2 justify-center">
              {otp.map((d, i) => (
                <input key={i} id={`otp-${i}`} type="tel" maxLength={1} value={d} onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-11 h-12 border-2 border-gray-200 rounded-xl text-center text-lg font-bold outline-none focus:border-indigo-400 transition-colors" />
              ))}
            </div>
            <button onClick={() => router.push("/riddhi/my-bookings")} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-xl transition-colors">
              Verify & Login
            </button>
            <button onClick={() => setStep("phone")} className="w-full text-sm text-gray-500 hover:text-indigo-600">Change number</button>
          </div>
        )}

        <div className="mt-6 flex items-center gap-2 justify-center text-xs text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Secured with 256-bit encryption
        </div>
      </div>
    </div>
  );
}
