"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, leftIcon, rightIcon, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#C04828] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-[8px]",
          {
            "bg-[#C04828] text-white hover:bg-[#712B13] active:bg-[#712B13]": variant === "primary",
            "bg-white text-[#C04828] border border-[#C04828] hover:bg-[#FAECE7]": variant === "secondary",
            "bg-transparent text-[#2C2C2A] border border-[#D3D1C7] hover:bg-[#F1EFE8]": variant === "outline",
            "bg-transparent text-[#5F5E5A] hover:bg-[#F1EFE8]": variant === "ghost",
            "bg-[#A32D2D] text-white hover:bg-[#7a2020]": variant === "danger",
            "h-8 px-3 text-[13px]": size === "sm",
            "h-11 px-5 text-[15px]": size === "md",
            "h-14 px-8 text-[17px]": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading…
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
