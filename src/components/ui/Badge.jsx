import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-[#990006] text-white",
  secondary: "bg-[#f5f5f5] text-[#1d1d1d] border border-gray-200",
  outline: "text-[#1d1d1d] border border-gray-300",
  destructive: "bg-red-100 text-red-700 border border-red-200",
  success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  gold: "bg-amber-100 text-amber-900 border border-amber-300",
};

export function Badge({ className, variant = "default", children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#990006] focus:ring-offset-2",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Badge;
