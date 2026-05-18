import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-[3px] text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Soft tinted pills (SURF default badge family)
        default: "border-transparent bg-[hsl(var(--primary-050))] text-[hsl(var(--primary-700))]",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-[hsl(var(--tint-red))] text-destructive",
        outline: "border-border-soft bg-card text-foreground",

        // SURF tinted color variants
        orange: "border-transparent bg-[hsl(var(--primary-050))] text-[hsl(var(--primary-700))]",
        blue: "border-transparent bg-[hsl(var(--tint-blue))] text-surf-blue",
        green: "border-transparent bg-[hsl(var(--tint-green))] text-surf-green-dark",
        red: "border-transparent bg-[hsl(var(--tint-red))] text-destructive",
        purple: "border-transparent bg-[hsl(var(--tint-purple))] text-surf-purple",
        black: "border-transparent bg-foreground text-background",

        // Square uppercase tag (SURF "NIEUW", "BETA", "TIP")
        tag: "rounded-[4px] border-transparent bg-primary text-primary-foreground uppercase tracking-[0.06em] text-xs px-2.5 py-1",
        "tag-dark": "rounded-[4px] border-transparent bg-foreground text-background uppercase tracking-[0.06em] text-xs px-2.5 py-1",
        "tag-outline": "rounded-[4px] border border-foreground bg-card text-foreground uppercase tracking-[0.06em] text-xs px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
