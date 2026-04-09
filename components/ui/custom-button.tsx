'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReactNode } from "react"
import { motion } from "framer-motion"

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
}

export default function CustomButton({
  children,
  onClick,
  href,
  className = "",
  size = "lg",
  disabled = false,
}: CustomButtonProps) {

  const baseClass = `
    inline-flex items-center gap-2 px-10 py-4
    bg-gradient-to-r from-orange-500 to-orange-600
    hover:from-orange-600 hover:to-orange-700
    text-white
    rounded-2xl font-bold text-sm uppercase tracking-wider
    transition-all duration-200 ease-out
    ${className}
  `;

  // Motion props (used for both link and normal button)
  const motionProps = {
    whileHover: { scale: 1.05, boxShadow: "0 10px 25px rgba(251,146,60,0.4)" },
    whileTap: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    initial: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    animate: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    transition: {
      scale: { type: "spring" as const, stiffness: 300, damping: 20 },
      boxShadow: { type: "tween" as const, duration: 0.2, ease: "easeOut" as const },
    },
  };

  const MotionButton = motion(Button);

  return (
    <motion.div>
      <MotionButton
        asChild={!!href} // Use Link if href exists
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClass} ${!href && !onClick ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        {...motionProps}
      >
        {href ? <Link href={href}>{children}</Link> : children}
      </MotionButton>
    </motion.div>
  )
}