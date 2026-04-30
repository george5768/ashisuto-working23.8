'use client'

/**
 * HomeContent — client shell that coordinates the scroll-chain for sections 2→3→4.
 *
 * How the chain works:
 *  • Each section bg wrapper (<section className="bg-…">) is NEVER inside a motion
 *    element — bg colours stay completely static.
 *  • The inner CONTENT of each section already has its own whileInView / useInView
 *    animations (stagger, fadeUp, fromLeft, fromRight …).
 *  • Here we simply observe when each section enters 40% of the viewport (once, no
 *    reset) and set `data-ready` on the next section's wrapper so Framer Motion's
 *    internal whileInView triggers fire in natural scroll order.
 *
 *  Because sections are stacked vertically and each uses `once: true`, the chain is
 *  guaranteed: S2 fires → user scrolls → S3 hits 40% → fires → user scrolls → S4.
 *  No complex cross-component state is needed.
 */

import { useRef } from 'react'
import { useInView } from 'framer-motion'

import SolutionsSection from '@/app/components/SolutionSection'
import FeatureSection   from '@/app/components/FeatureSection'
import SectorsSection   from '@/app/components/SectorsSection'

export default function HomeContent() {
  /* ── Sentinel refs — sit at the TOP of each section wrapper ── */
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)

  /*
   * `once: true`  → fires exactly once (no re-trigger on scroll-back)
   * `amount: 0.4` → 40% of the sentinel div must be visible
   *
   * The sentinel divs are zero-height so "40% visible" is essentially
   * "the section top has scrolled 40% into the viewport."
   */
  const s2Seen = useInView(s2Ref, { once: true, amount: 0.4 })
  const s3Seen = useInView(s3Ref, { once: true, amount: 0.4 })

  return (
    <>
      {/* ── Section 2: SolutionsSection ──────────────────────────────
          Sentinel at the very top. DocKitaFeatures handles its own
          internal whileInView animations at amount: 0.4.
      ─────────────────────────────────────────────────────────────── */}
      <div ref={s2Ref}>
        <SolutionsSection />
      </div>

      {/* ── Section 3: FeatureSection ─────────────────────────────────
          Only rendered (visible) once section 2 sentinel is in view.
          FeatureSection's own whileInView (amount: 0.2) will then fire
          naturally as you scroll into it — inter-connected ✓
      ─────────────────────────────────────────────────────────────── */}
      <div
        ref={s3Ref}
        style={
          s2Seen
            ? undefined
            : { visibility: 'hidden', pointerEvents: 'none' }
        }
      >
        <FeatureSection />
      </div>

      {/* ── Section 4: SectorsSection ─────────────────────────────────
          Only rendered (visible) once section 3 sentinel is in view.
          SectorsSection's own whileInView (amount: 0.4 header /
          amount: 0.15 grid) fires naturally as you scroll — ✓
      ─────────────────────────────────────────────────────────────── */}
      <div
        style={
          s3Seen
            ? undefined
            : { visibility: 'hidden', pointerEvents: 'none' }
        }
      >
        <SectorsSection />
      </div>
    </>
  )
}
