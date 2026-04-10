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
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white",
              "placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
              "focus:border-emerald-500 transition-all duration-200",
              icon && "pl-10",
              error && "border-rose-500 focus:ring-rose-500/50 focus:border-rose-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-rose-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };