import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-[#990006] text-white hover:bg-[#7d0005] shadow-sm",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  outline: "border border-gray-200 bg-white hover:bg-gray-50 text-[#1d1d1d] hover:border-gray-300",
  secondary: "bg-[#f5f5f5] text-[#1d1d1d] hover:bg-gray-200",
  ghost: "hover:bg-gray-100 text-[#1d1d1d]",
  link: "text-[#990006] underline-offset-4 hover:underline p-0 h-auto",
  dark: "bg-[#1d1d1d] text-white hover:bg-black",
};

const buttonSizes = {
  default: "h-11 px-5 py-2 text-sm",
  sm: "h-9 px-3 text-xs rounded-md",
  lg: "h-12 px-8 text-base rounded-md",
  icon: "h-10 w-10 p-0",
};

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990006] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          buttonVariants[variant] || buttonVariants.default,
          buttonSizes[size] || buttonSizes.default,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
