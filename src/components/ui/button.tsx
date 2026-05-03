"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-b from-[#2997ff] to-[#0077ed] text-white shadow-[0_4px_16px_rgba(0,119,237,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-[#3ba4ff] hover:to-[#1d85ff] hover:shadow-[0_6px_24px_rgba(0,119,237,0.4)]",
      secondary: "bg-gradient-to-b from-white/10 to-white/5 text-white border border-white/20 hover:from-white/15 hover:to-white/8 hover:border-white/30",
      outline: "border border-white/30 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/50",
      ghost: "text-white/70 hover:text-white hover:bg-white/10",
      danger: "bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/25",
      glass: "bg-gradient-to-b from-white/8 to-white/4 text-white border border-white/15 backdrop-blur-xl hover:from-white/12 hover:to-white/6 hover:border-white/25",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-7 py-3 text-base rounded-xl",
      icon: "p-2.5 rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-[#2997ff]/50 focus:ring-offset-2 focus:ring-offset-black",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98]",
          "hover-lift hover-glow",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };