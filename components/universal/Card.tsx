import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "elevated";
}

export const Card = ({ className, variant = "standard", ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-subtle bg-bg-secondary p-6 transition-colors duration-200 hover:border-border-strong",
        variant === "elevated" && "shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
        className
      )}
      {...props}
    />
  );
};
