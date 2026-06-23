'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ScanSearch, LineChart } from 'lucide-react'
import { useLanguageContext } from '@/app/context/LanguageContext'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function FeatureSection2() {
  const { currentLanguage: t } = useLanguageContext()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [cardsReady, setCardsReady] = useState(false)

  const features = [
    {
      Icon: ScanSearch,
      title: t.feature2_card1_title,
      description: t.feature2_card1_body,
      ring: 'ring-orange-100',
      iconWrap: 'bg-gradient-to-br from-orange-500 to-amber-400',
    },
    {
      Icon: LineChart,
      title: t.feature2_card2_title,
      description: t.feature2_card2_body,
      ring: 'ring-amber-100',
      iconWrap: 'bg-gradient-to-br from-amber-500 to-orange-500',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
    >
      {/* Ambient bg layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-orange-50/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-gradient-to-tr from-amber-50/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Top headline — centred ────────────────────────────── */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, ease }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-[1.1] tracking-tight"
          >
            {t.feature2_title_prefix}<span className="text-orange-500">
              {t.feature2_title_highlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, ease, delay: 0.16 }}
            onAnimationComplete={() => setCardsReady(true)}
            className="mt-5 text-lg text-gray-500 leading-relaxed"
          >
            {t.feature2_description}
          </motion.p>
        </div>

        {/* ── Two-column body ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -52, filter: 'blur(5px)' }}
            animate={cardsReady ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.88, ease, delay: 0.05 }}
            className="relative hidden lg:block"
          >
            {/* Decorative offset square */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-orange-100/50 -z-10" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src="/images/Construction-2.png"
                alt="Data-driven operations"
                width={1000}
                height={800}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
                priority={false}
              />
              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* RIGHT — Feature rows */}
          <div className="flex flex-col gap-7 mt-6 lg:mt-0">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                animate={cardsReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.72, ease, delay: i * 0.17 }}
                className={`group relative flex items-start gap-5 p-6 rounded-2xl bg-white ring-1 ${f.ring} shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:bg-orange-50/30 transition-all duration-300 overflow-hidden`}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${f.iconWrap} flex items-center justify-center shadow-lg`}>
                  <f.Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-[1.75]">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
