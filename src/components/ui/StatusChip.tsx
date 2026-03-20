import { cn } from "@/lib/utils";

type Status =
  | "success" | "warning" | "error" | "info" | "neutral"
  | "teal" | "purple" | "blue" | "amber"
  | "active" | "pending" | "inactive"
  | "qc_pass" | "qc_fail" | "in_execution";

interface StatusChipProps {
  status: Status | string;
  label: string;
  size?: "sm" | "md";
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  success: "bg-[#E1F5EE] text-[#0F6E56]",
  warning: "bg-[#FAEEDA] text-[#BA7517]",
  error: "bg-red-50 text-[#A32D2D]",
  info: "bg-[#E6F1FB] text-[#185FA5]",
  neutral: "bg-[#F1EFE8] text-[#5F5E5A]",
  teal: "bg-[#E1F5EE] text-[#0F6E56]",
  purple: "bg-[#EEEDFE] text-[#534AB7]",
  blue: "bg-[#E6F1FB] text-[#185FA5]",
  amber: "bg-[#FAEEDA] text-[#BA7517]",
  active: "bg-[#E1F5EE] text-[#0F6E56]",
  pending: "bg-[#FAEEDA] text-[#BA7517]",
  inactive: "bg-[#F1EFE8] text-[#5F5E5A]",
  qc_pass: "bg-[#E1F5EE] text-[#0F6E56]",
  qc_fail: "bg-red-50 text-[#A32D2D]",
  in_execution: "bg-[#FAECE7] text-[#C04828]",
};

export function StatusChip({ status, label, size = "md", className }: StatusChipProps) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.neutral;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] font-medium whitespace-nowrap",
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-[12px]",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
