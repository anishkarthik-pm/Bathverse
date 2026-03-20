import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatIndianCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getSLAColor(hoursLeft: number): string {
  if (hoursLeft < 4) return "text-red-600 bg-red-50";
  if (hoursLeft < 12) return "text-amber-DEFAULT bg-amber-light";
  return "text-teal bg-teal-light";
}
