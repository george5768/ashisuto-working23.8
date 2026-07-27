'use client'

import Link from "next/link"
import { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Example usage:
{/* 

<CustomButton href="/">
    Href with url/file path navigation
</CustomButton>

<CustomButton onClick={() => null} >
    OnClick with function
</CustomButton>

<CustomButton>
    Disabled button but clickable
</CustomButton>

<CustomButton disabled>
    Disabled with unclickable
</CustomButton> 

*/}

interface CustomButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  hoverShadow?: boolean
  /** Use `py-2.5` instead of the size's default vertical padding. */
  compactPadding?: boolean
}

// Same length/padding as the previous shadcn `Button` sizes so existing
// call sites keep their current dimensions unless overridden via `className`.
const sizeClasses: Record<NonNullable<CustomButtonProps["size"]>, string> = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 py-1.5 text-xs",
  lg: "px-10 py-4 text-sm",
  icon: "size-9 p-0",
}

const MotionLink = motion.create(Link)

export default function CustomButton({
  children,
  onClick,
  href,
  className = "",
  size = "lg",
  disabled = false,
  hoverShadow = true,
  compactPadding = false,
}: CustomButtonProps) {
  const isInteractive = !disabled && (!!href || !!onClick)

  // A single, non-nested element (no Slot/asChild merging) is used for both
  // the link and button variants so framer-motion's hover/tap transforms are
  // applied directly to the rendered node — this is what previously caused
  // the text to jump/shift on hover.
  const baseClass = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "bg-gradient-to-r from-orange-500 to-orange-600",
    "hover:from-orange-600 hover:to-orange-700",
    "text-white rounded-2xl font-bold uppercase tracking-wider",
    "transition-colors duration-200 ease-out",
    "will-change-transform",
    sizeClasses[size],
    compactPadding && "py-2.5",
    disabled && "opacity-50 pointer-events-none",
    isInteractive ? "cursor-pointer" : "cursor-not-allowed",
    className
  )

  const motionProps = {
    whileHover: isInteractive
      ? {
          scale: 1.05,
          boxShadow: hoverShadow ? "0 10px 25px rgba(251,146,60,0.4)" : "0 0 0 rgba(0,0,0,0)",
        }
      : undefined,
    whileTap: isInteractive ? { scale: 0.98 } : undefined,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  }

  if (href) {
    return (
      <MotionLink href={href} className={baseClass} aria-disabled={disabled} {...motionProps}>
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}