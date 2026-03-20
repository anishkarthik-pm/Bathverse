"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button, ProgressBar } from "@/components/ui";
import { useAppStore } from "@/lib/store";

const STEPS = ["Size", "Scope", "Style", "Budget", "Result"];

const SCOPE_OPTIONS = [
  { id: "waterproofing", label: "Waterproofing", desc: "Tanking & membrane" },
  { id: "tiling", label: "Tiling", desc: "Floor & wall tiles" },
  { id: "plumbing", label: "Plumbing", desc: "Pipes, shower, basin" },
  { id: "electrical", label: "Electrical", desc: "Lighting & exhaust" },
  { id: "vanity", label: "Vanity & Mirror", desc: "Cabinet & mirror" },
  { id: "accessories", label: "Accessories", desc: "Towel rails, hooks" },
  { id: "toilet", label: "Toilet", desc: "WC replacement" },
  { id: "bathtub", label: "Bathtub", desc: "Freestanding or built-in" },
];

const STYLES = [
  { id: "minimal", label: "Minimal", emoji: "◻️" },
  { id: "natural", label: "Natural", emoji: "🪵" },
  { id: "geometric", label: "Geometric", emoji: "◈" },
  { id: "classic", label: "Classic", emoji: "🏛" },
  { id: "japandi", label: "Japandi", emoji: "⛩" },
  { id: "maximalist", label: "Maximalist", emoji: "✦" },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

function estimateRange(size: string, scope: string[], budget: number) {
  const base = size === "small" ? 120000 : size === "medium" ? 200000 : 340000;
  const scopeMultiplier = 1 + scope.length * 0.04;
  const min = Math.round(base * scopeMultiplier * 0.9);
  const max = Math.round(base * scopeMultiplier * 1.25);
  return { min, max };
}

export default function EstimatorPage() {
  const router = useRouter();
  const { quoteEstimate, setQuoteEstimate } = useAppStore();
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const { size, scope, style, budget } = quoteEstimate;
  const estimate = size && scope.length ? estimateRange(size, scope, budget) : null;

  return (
    <div className="min-h-screen bg-warm-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 flex items-center gap-3">
        <button onClick={() => (step === 0 ? router.back() : back())} className="p-2 -ml-2 rounded-full hover:bg-light-gray">
          <ArrowLeft size={20} className="text-slate" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray">Step {step + 1} of {STEPS.length}</p>
          <p className="text-sm font-medium text-slate">{STEPS[step]}</p>
        </div>
      </header>

      <ProgressBar value={(step / (STEPS.length - 1)) * 100} className="mx-4" />

      <div className="flex-1 px-4 pt-6 pb-24">
        {/* Step 0: Size */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">Bathroom size</h2>
            <p className="text-sm text-gray mb-6">Helps us estimate materials and labour.</p>
            <div className="space-y-3">
              {[
                { id: "small", label: "Small", desc: "Up to 35 sq ft (3.3 m²)" },
                { id: "medium", label: "Medium", desc: "36–60 sq ft (3.4–5.6 m²)" },
                { id: "large", label: "Large", desc: "60+ sq ft (5.6+ m²)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuoteEstimate({ size: opt.id as "small" | "medium" | "large" })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                    size === opt.id ? "border-coral bg-coral-light" : "border-mid-gray bg-white"
                  }`}
                >
                  <p className="font-medium text-slate">{opt.label}</p>
                  <p className="text-xs text-gray mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Scope */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">What needs doing?</h2>
            <p className="text-sm text-gray mb-6">Select everything you want included.</p>
            <div className="grid grid-cols-2 gap-2">
              {SCOPE_OPTIONS.map((opt) => {
                const active = scope.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setQuoteEstimate({
                        scope: active ? scope.filter((x) => x !== opt.id) : [...scope, opt.id],
                      })
                    }
                    className={`text-left p-3 rounded-xl border-2 transition-colors ${
                      active ? "border-coral bg-coral-light" : "border-mid-gray bg-white"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate">{opt.label}</p>
                    <p className="text-xs text-gray mt-0.5">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Style */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">Choose your style</h2>
            <p className="text-sm text-gray mb-6">We&apos;ll tailor material recommendations to match.</p>
            <div className="grid grid-cols-3 gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setQuoteEstimate({ style: s.id })}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-colors ${
                    style === s.id ? "border-coral bg-coral-light" : "border-mid-gray bg-white"
                  }`}
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-xs font-medium text-slate">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">Approximate budget</h2>
            <p className="text-sm text-gray mb-6">Helps us match material tiers.</p>
            <div className="space-y-3">
              {[
                { label: "Economy", desc: "Up to ₹2 Lakh", value: 180000 },
                { label: "Standard", desc: "₹2–4 Lakh", value: 300000 },
                { label: "Premium", desc: "₹4–7 Lakh", value: 550000 },
                { label: "Luxury", desc: "₹7 Lakh+", value: 900000 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setQuoteEstimate({ budget: opt.value })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                    budget === opt.value ? "border-coral bg-coral-light" : "border-mid-gray bg-white"
                  }`}
                >
                  <p className="font-medium text-slate">{opt.label}</p>
                  <p className="text-xs text-gray mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div>
            <h2 className="font-display text-xl text-slate mb-1">Your estimate</h2>
            <p className="text-sm text-gray mb-6">Based on your inputs. Final quote after site visit.</p>
            {estimate ? (
              <>
                <div className="bg-coral-light rounded-2xl p-6 text-center mb-6">
                  <p className="text-xs text-coral uppercase tracking-wider mb-1">Estimated Range</p>
                  <p className="font-display text-3xl text-coral font-medium">
                    {formatCurrency(estimate.min)} – {formatCurrency(estimate.max)}
                  </p>
                  <p className="text-xs text-gray mt-2">Indicative. Subject to site assessment.</p>
                </div>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-light-gray">
                    <span className="text-gray">Size</span>
                    <span className="text-slate capitalize">{size}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-light-gray">
                    <span className="text-gray">Scope items</span>
                    <span className="text-slate">{scope.length} selected</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-light-gray">
                    <span className="text-gray">Style</span>
                    <span className="text-slate capitalize">{style || "Any"}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => router.push("/auth?next=/app/track")}>
                  Book Free Consultation →
                </Button>
              </>
            ) : (
              <p className="text-gray text-sm">Please go back and fill in all steps.</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-8 pt-4 bg-warm-white border-t border-light-gray">
          <Button
            className="w-full"
            onClick={next}
            disabled={(step === 0 && !size) || (step === 1 && scope.length === 0)}
            rightIcon={<ArrowRight size={16} />}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
