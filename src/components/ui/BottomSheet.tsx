"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[90vh] overflow-y-auto",
          "animate-in slide-in-from-bottom duration-300",
          className
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-0">
          <div className="w-8 h-1 bg-[#D3D1C7] rounded-full" />
        </div>
        {title && (
          <div className="px-4 py-3 border-b border-[#D3D1C7]">
            <h2 className="text-[18px] font-medium text-[#2C2C2A]">{title}</h2>
          </div>
        )}
        <div className="pb-safe">{children}</div>
      </div>
    </div>
  );
}
