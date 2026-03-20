"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputPropsBase = Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix">;

interface InputProps extends InputPropsBase {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, suffix, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const left = leftIcon ?? prefix;
    const right = rightIcon ?? suffix;
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-[14px] font-medium text-[#2C2C2A] mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {left && (
            <span className="absolute left-3 text-[#5F5E5A] flex items-center">{left}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 px-3 bg-[#F1EFE8] border border-[#D3D1C7] rounded-[8px] text-[15px] text-[#2C2C2A] placeholder-[#5F5E5A] transition-all duration-150",
              "focus:outline-none focus:border-[#2C2C2A] focus:bg-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-[#A32D2D] bg-[#fff5f5]",
              left && "pl-9",
              right && "pr-10",
              className
            )}
            {...props}
          />
          {right && (
            <span className="absolute right-3 text-[#5F5E5A] flex items-center">{right}</span>
          )}
        </div>
        {error && <p className="mt-1 text-[12px] text-[#A32D2D]">{error}</p>}
        {hint && !error && <p className="mt-1 text-[12px] text-[#5F5E5A]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, maxLength, showCount = false, className, id, value, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const charCount = typeof value === "string" ? value.length : 0;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-[14px] font-medium text-[#2C2C2A] mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          maxLength={maxLength}
          value={value}
          className={cn(
            "w-full px-3 py-3 bg-[#F1EFE8] border border-[#D3D1C7] rounded-[8px] text-[16px] text-[#2C2C2A] placeholder-[#5F5E5A] transition-all duration-150 resize-none",
            "focus:outline-none focus:border-[#2C2C2A] focus:bg-white",
            error && "border-[#A32D2D]",
            className
          )}
          {...props}
        />
        <div className="flex justify-between mt-1">
          {error && <p className="text-[12px] text-[#A32D2D]">{error}</p>}
          {hint && !error && <p className="text-[12px] text-[#5F5E5A]">{hint}</p>}
          {showCount && maxLength && (
            <p className="text-[12px] text-[#5F5E5A] ml-auto">{charCount}/{maxLength}</p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
