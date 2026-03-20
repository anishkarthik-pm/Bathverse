import { cn } from "@/lib/utils";
import { Button } from "./Button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
  icon?: LucideIcon | React.ReactNode;
}

export function EmptyState({ title, description, ctaLabel, onCta, className, icon }: EmptyStateProps) {
  const isComponent = typeof icon === "function";
  const IconComponent = isComponent ? (icon as LucideIcon) : null;

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      {IconComponent ? (
        <div className="mb-4 w-16 h-16 rounded-full bg-[#F1EFE8] flex items-center justify-center">
          <IconComponent size={28} className="text-[#D3D1C7]" />
        </div>
      ) : icon ? (
        <div className="mb-4 text-[#D3D1C7]">{icon as React.ReactNode}</div>
      ) : (
        <div className="mb-4 w-16 h-16 rounded-full bg-[#F1EFE8] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="8" width="24" height="24" rx="4" stroke="#D3D1C7" strokeWidth="1.5" />
          </svg>
        </div>
      )}
      <h3 className="text-[18px] font-medium text-[#2C2C2A] mb-2">{title}</h3>
      {description && <p className="text-[14px] text-[#5F5E5A] mb-6 max-w-xs">{description}</p>}
      {ctaLabel && onCta && (
        <Button onClick={onCta} className="min-w-[160px]">
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
