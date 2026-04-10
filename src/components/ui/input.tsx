"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/[0.7] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/[0.3]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white",
              "placeholder:text-white/[0.25] focus:outline-none focus:ring-2 focus:ring-[#2997ff]/50",
              "focus:border-[#2997ff] transition-all duration-300",
              icon && "pl-10",
              error && "border-rose-500 focus:ring-rose-500/50 focus:border-rose-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-rose-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };