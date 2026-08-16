"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidbuttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-paper text-canvas hover:bg-accent hover:text-canvas",
        outline:
          "border border-paper/25 bg-transparent text-paper hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-paper/70 hover:text-paper",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        xl: "h-14 px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  href?: string
}

const LiquidButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LiquidButtonProps
>(({ className, variant, size, href, children, ...props }, ref) => {
  const classes = cn(liquidbuttonVariants({ variant, size, className }))

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...props}
    >
      {children}
    </button>
  )
})

LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidbuttonVariants }
