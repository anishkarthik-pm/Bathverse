"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAppStore } from "@/lib/store";

type Step = "phone" | "otp" | "name";

function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/app/track";
  const { setUser } = useAppStore();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (phone.length < 10) { setError("Enter a valid 10-digit mobile number"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); setError(""); }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) { setError("Enter the OTP"); return; }
    setLoading(true);
    // Simulate: if new user, ask name
    setTimeout(() => {
      setLoading(false);
      setStep("name");
      setError("");
    }, 800);
  };

  const handleComplete = () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    setUser({ id: "u1", name, phone, role: "customer" }, "mock-token");
    router.replace(next);
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col max-w-md mx-auto px-4">
      <header className="pt-4 pb-2 flex items-center gap-2">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-light-gray">
          <ArrowLeft size={20} className="text-slate" />
        </button>
        <span className="font-display text-slate text-lg">Sign In</span>
      </header>

      <div className="flex-1 pt-8">
        {step === "phone" && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">Your mobile number</h2>
            <p className="text-sm text-gray mb-6">We'll send a one-time password to verify.</p>
            <Input
              label="Mobile Number"
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              type="tel"
              leftIcon={<span className="text-sm text-gray">+91</span>}
              error={error}
            />
            <Button className="w-full mt-4" onClick={handleSendOtp} loading={loading}>
              Send OTP
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">Enter OTP</h2>
            <p className="text-sm text-gray mb-6">Sent to +91 {phone}</p>
            <Input
              label="OTP"
              placeholder="------"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              type="number"
              className="text-center tracking-widest text-xl"
              error={error}
            />
            <Button className="w-full mt-4" onClick={handleVerifyOtp} loading={loading}>
              Verify OTP
            </Button>
            <button onClick={() => { setStep("phone"); setOtp(""); }} className="w-full mt-3 text-sm text-gray text-center">
              Change number
            </button>
          </div>
        )}

        {step === "name" && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">What's your name?</h2>
            <p className="text-sm text-gray mb-6">We'll use this on your project account.</p>
            <Input
              label="Full Name"
              placeholder="Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error}
            />
            <Button className="w-full mt-4" onClick={handleComplete}>
              Continue →
            </Button>
          </div>
        )}

        <p className="text-xs text-gray text-center mt-6">
          By continuing, you agree to BathIQ's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm-white" />}>
      <AuthForm />
    </Suspense>
  );
}
