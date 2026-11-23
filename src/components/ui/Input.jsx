import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-[#1d1d1d] placeholder:text-gray-400 focus:border-[#990006] focus:outline-none focus:ring-2 focus:ring-[#990006]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;
