"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { LayoutDashboard, Users, Briefcase, CheckSquare, Package, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/ops/leads", label: "Leads", icon: Users },
  { href: "/ops/jobs", label: "Jobs", icon: Briefcase },
  { href: "/ops/qc", label: "QC", icon: CheckSquare },
  { href: "/ops/vendors", label: "Vendors", icon: LayoutDashboard },
  { href: "/ops/pricing", label: "Pricing", icon: Package },
  { href: "/ops/analytics", label: "Analytics", icon: BarChart3 },
];

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    if (!user || user.role === "customer") router.replace("/auth?next=/ops/leads");
  }, [user, router]);

  if (!user || user.role === "customer") return null;

  return (
    <div className="flex min-h-screen bg-ops-canvas">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-black-ops min-h-screen px-3 py-5 shrink-0">
        <p className="font-display text-white text-lg px-2 mb-8">BathIQ Ops</p>
        <nav className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                pathname.startsWith(href)
                  ? "bg-coral text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link href="/ops/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Settings size={16} /> Settings
          </Link>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black-ops flex md:hidden z-40 safe-bottom">
        {NAV.slice(0, 5).map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center py-2 text-xs gap-1 transition-colors",
              pathname.startsWith(href) ? "text-coral" : "text-white/50"
            )}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
    </div>
  );
}
