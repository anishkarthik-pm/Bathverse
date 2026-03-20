"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { TabBar } from "@/components/ui";
import { Home, Package, BookOpen, User } from "lucide-react";

const TABS = [
  { href: "/app/track", label: "My Project", icon: Home },
  { href: "/catalogue", label: "Catalogue", icon: Package },
  { href: "/estimator", label: "Estimate", icon: BookOpen },
  { href: "/app/account", label: "Account", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    if (!user) router.replace("/auth?next=/app/track");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-warm-white pb-20">
      {children}
      <TabBar tabs={TABS} />
    </div>
  );
}
