import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-primary-600 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-950 focus:ring-offset-2 dark:border-primary-800 dark:focus:ring-primary-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-primary-50 hover:bg-primary-600/80 dark:bg-primary-50 dark:text-primary-600 dark:hover:bg-primary-50/80",
        subtle:
          "border-transparent bg-primary-100 text-primary-600 hover:bg-primary-100/80 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-800/80",
        danger:
          "border-transparent bg-red-500 text-primary-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-primary-50 dark:hover:bg-red-900/80",
        warning:
          "border-transparent bg-amber-500 text-primary-50 hover:bg-amber-500/80 dark:bg-amber-900 dark:text-primary-50 dark:hover:bg-amber-900/80",
        success:
          "border-transparent bg-emerald-600 text-primary-50 hover:bg-emerald-600/80 dark:bg-emerald-900 dark:text-primary-50 dark:hover:bg-emerald-900/80",
        outline: "text-primary-600 dark:text-primary-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
