"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Phone, ArrowRight, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-xl leading-none">Heera Grand</div>
              <div className="text-xs text-amber-600 tracking-widest uppercase">Lucknow</div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === "phone" ? "Welcome Back" : "Verify OTP"}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {step === "phone" ? "Sign in with your mobile number to access your bookings." : `Enter the 6-digit OTP sent to +91 ${phone}`}
          </p>

          {step === "phone" ? (
            <>
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> Mobile Number
                </label>
                <div className="flex">
                  <div className="bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl px-3 flex items-center text-sm text-gray-500 font-medium">+91</div>
                  <input type="tel" placeholder="98765 43210" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 border border-gray-200 rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" />
                </div>
              </div>
              <button onClick={() => phone.length === 10 && setStep("otp")} disabled={phone.length !== 10}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Send OTP <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">6-digit OTP</label>
                <input type="tel" placeholder="• • • • • •" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-amber-400" />
                <button className="text-xs text-amber-700 mt-2 hover:underline">Resend OTP</button>
              </div>
              <button onClick={() => router.push("/my-bookings")} disabled={otp.length !== 6}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Verify & Sign In <CheckCircle className="w-4 h-4" />
              </button>
              <button onClick={() => setStep("phone")} className="w-full text-sm text-gray-500 mt-3 hover:text-amber-700">← Change number</button>
            </>
          )}

          <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-400">
            By continuing, you agree to our{" "}
            <a href="#" className="text-amber-700 hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-amber-700">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
