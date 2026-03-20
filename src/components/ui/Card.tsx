import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg" | "none";
  hover?: boolean;
}

export function Card({ padding = "md", hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px] border border-[#D3D1C7] border-[0.5px]",
        {
          "p-3": padding === "sm",
          "p-4": padding === "md",
          "p-6": padding === "lg",
          "p-0": padding === "none",
          "transition-all duration-150 hover:border-[#C04828]": hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardSection({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4 py-3 border-t border-[#D3D1C7] border-[0.5px]", className)} {...props}>
      {children}
    </div>
  );
}
