"use client";
import Link from "next/link";
import { ArrowRight, Star, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";

const STYLES = ["Minimal", "Natural", "Geometric", "Classic", "Japandi", "Maximalist"];
const TRUST = [
  { icon: Star, label: "4.9★ Rating", sub: "From 1,200+ customers" },
  { icon: Shield, label: "10-Year Warranty", sub: "On all workmanship" },
  { icon: Clock, label: "On-Time Delivery", sub: "96% milestone accuracy" },
  { icon: CheckCircle, label: "QC Verified", sub: "14-point inspection" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-warm-white/95 backdrop-blur border-b border-mid-gray/30">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-xl font-display font-medium text-slate">BathIQ</span>
          <Link href="/auth">
            <Button size="sm" variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pb-20">
        {/* Hero */}
        <section className="pt-10 pb-8">
          <p className="text-xs font-medium text-coral uppercase tracking-widest mb-3">Premium Renovation</p>
          <h1 className="text-3xl font-display font-medium text-slate leading-snug mb-4">
            Your dream bathroom,<br />delivered on time.
          </h1>
          <p className="text-gray text-sm leading-relaxed mb-6">
            BathIQ manages the entire renovation end-to-end — from style concept to QC-certified handover. No stress, no surprises.
          </p>
          <div className="flex gap-3">
            <Link href="/estimator" className="flex-1">
              <Button className="w-full" rightIcon={<ArrowRight size={16} />}>
                Get Instant Estimate
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button variant="outline">Browse Styles</Button>
            </Link>
          </div>
        </section>

        {/* Style Chips */}
        <section className="pb-8">
          <p className="text-xs text-gray uppercase tracking-wider mb-3">Renovation Styles</p>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <Link
                key={s}
                href={`/catalogue?style=${s.toLowerCase()}`}
                className="px-3 py-1.5 rounded-full border border-mid-gray text-sm text-slate hover:border-coral hover:text-coral transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="pb-8">
          <h2 className="font-display text-lg text-slate mb-4">How it works</h2>
          <div className="space-y-3">
            {[
              ["1", "Tell us your bathroom size & style", "Takes 2 minutes. Get a real price range instantly."],
              ["2", "Book a free consultation", "Our designer visits to finalise the brief."],
              ["3", "Approve design & quote", "3D renders + itemised quote before work starts."],
              ["4", "We build, you track", "Live milestone updates with photo QC at every stage."],
              ["5", "Certified handover", "Warranty card + before/after report delivered digitally."],
            ].map(([num, title, desc]) => (
              <div key={num} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-coral-light text-coral text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                  {num}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate">{title}</p>
                  <p className="text-xs text-gray mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust badges */}
        <section className="pb-8">
          <div className="grid grid-cols-2 gap-3">
            {TRUST.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-light-gray rounded-xl p-4 flex flex-col gap-1">
                <Icon size={18} className="text-coral" />
                <p className="text-sm font-medium text-slate">{label}</p>
                <p className="text-xs text-gray">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-coral rounded-2xl p-6 text-white text-center">
          <p className="font-display text-lg mb-1">Ready to start?</p>
          <p className="text-sm opacity-90 mb-4">Get your estimate in 2 minutes.</p>
          <Link href="/estimator">
            <Button variant="secondary" className="bg-white text-coral hover:bg-coral-light">
              Start Estimator →
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
