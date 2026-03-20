"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Tab {
  href: string;
  label: string;
  icon: LucideIcon;
  accent?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
}

export function TabBar({ tabs }: TabBarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#D3D1C7] safe-bottom max-w-md mx-auto lg:hidden">
      <div className="flex items-center justify-around h-14">
        {tabs.map(({ href, label, icon: Icon, accent }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-2 py-1 transition-colors relative",
                isActive ? "text-[#C04828]" : "text-[#5F5E5A]"
              )}
              aria-label={label}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#C04828] rounded-b" />
              )}
              <Icon size={accent ? 26 : 22} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
