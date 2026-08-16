"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidbuttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-[transform,colors,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-paper hover:scale-[1.03]",
        outline:
          "border border-paper/25 bg-transparent text-paper hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-paper/70 hover:text-paper",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
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

function GlassFilter() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation="2"
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur
            in="displaced"
            stdDeviation="4"
            result="finalBlur"
          />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

const LiquidButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LiquidButtonProps
>(({ className, variant, size, href, children, ...props }, ref) => {
  const classes = cn(liquidbuttonVariants({ variant, size, className }))

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.12)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 isolate -z-10 overflow-hidden rounded-md"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <span className="relative z-10">{children}</span>
      <GlassFilter />
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {inner}
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
      {inner}
    </button>
  )
})

LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidbuttonVariants }
