"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "medium",
            fullWidth,
            ...props
        },
        ref,
    ) => {
        const variants = {
            primary:
                "bg-app-1 text-white hover:shadow-[0_8px_24px_rgba(168,85,247,0.3)]",
            secondary: "border-2 border-app-1 text-app-1 hover:bg-app-1/5",
            ghost: "text-app-1 hover:bg-app-1/5",
            danger: "bg-error text-white hover:bg-error/90",
        };

        const sizes = {
            small: "h-9 px-4 text-sm",
            medium: "h-12 px-6 text-base",
            large: "h-14 px-8 text-lg font-bold",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    fullWidth && "w-full",
                    className,
                )}
                {...props}
            />
        );
    },
);

Button.displayName = "Button";
