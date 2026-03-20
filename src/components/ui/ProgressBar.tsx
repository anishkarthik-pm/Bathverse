import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "coral" | "teal" | "blue";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  size = "md",
  color = "coral",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn("w-full bg-[#F1EFE8] rounded-full overflow-hidden", {
          "h-1": size === "sm",
          "h-2": size === "md",
          "h-3": size === "lg",
        })}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", {
            "bg-[#C04828]": color === "coral",
            "bg-[#0F6E56]": color === "teal",
            "bg-[#185FA5]": color === "blue",
          })}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[12px] text-[#5F5E5A] mt-1">{Math.round(percent)}%</span>
      )}
    </div>
  );
}

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepProgress({ currentStep, totalSteps, labels }: StepProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 h-1 rounded-full transition-all duration-300",
              i < currentStep ? "bg-[#C04828]" : "bg-[#D3D1C7]"
            )}
          />
        ))}
      </div>
      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px]",
                i < currentStep ? "text-[#C04828]" : "text-[#5F5E5A]"
              )}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
