'use client'

/**
 * SectionReveal — thin client wrapper used in the server-side page.
 *
 * Usage (in page.tsx or any server component):
 *   <SectionReveal order={1}>
 *     <SomeSection />
 *   </SectionReveal>
 *
 * - The children's outer element (bg section / wrapper) is NEVER wrapped in
 *   a motion element — bg colours stay static.
 * - Only the inner content (`data-reveal="content"`) receives the fade-up
 *   entrance animation.
 * - `order` is used to stagger the entrance delay across sibling sections
 *   (0 ms, 60 ms, 120 ms …) so they feel inter-connected as you scroll.
 * - Each section arms itself once it is ≥40 % visible; subsequent sections
 *   fire independently on scroll so the chain always feels natural.
 */

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  /** Zero-based position index used for a subtle cross-section delay (0, 1, 2 …) */
  order?: number
  /** Fraction of the section that must be visible before animation fires (default 0.4) */
  amount?: number
  className?: string
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function SectionReveal({
  children,
  order = 0,
  amount = 0.4,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // `once: true` — fires exactly once per scroll-into-view (no reset on scroll-out)
  const isInView = useInView(ref, { once: true, amount })

  return (
    /*
     * This div is TRANSPARENT — no bg, no padding, no layout impact.
     * It only serves as the IntersectionObserver target.
     */
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 36 }
        }
        transition={{
          duration: 0.72,
          ease,
          // Subtle cross-section stagger: 0ms / 60ms / 120ms
          delay: order * 0.06,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
