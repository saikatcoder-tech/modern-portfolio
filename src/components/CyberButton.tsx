import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline";
  isLoading?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", isLoading, children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 font-display font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden group interactive";
    
    const variants = {
      primary: "bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]",
      accent: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_20px_hsl(var(--accent)/0.5)]",
      outline: "bg-transparent text-foreground border border-white/20 hover:border-white/50 hover:bg-white/5",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(baseStyles, variants[variant], className, (isLoading || props.disabled) && "opacity-50 cursor-not-allowed")}
        {...props}
      >
        {/* Glitch Overlay Effect */}
        <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
        
        {/* Top/Bottom Tech Accents */}
        <span className={cn("absolute top-0 left-0 w-2 h-0.5", variant === "accent" ? "bg-accent" : "bg-primary")} />
        <span className={cn("absolute bottom-0 right-0 w-2 h-0.5", variant === "accent" ? "bg-accent" : "bg-primary")} />
        
        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className={cn("w-4 h-4 border-2 border-t-transparent rounded-full", variant === "accent" ? "border-accent" : "border-primary")}
            />
          ) : null}
          {children}
        </span>
      </button>
    );
  }
);
CyberButton.displayName = "CyberButton";
