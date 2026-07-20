'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useLanguageContext } from '@/app/context/LanguageContext'

const easeStandard: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SectorsSection() {
  const { currentLanguage: t } = useLanguageContext()
  const sectionRef = useRef<HTMLElement>(null)
  const headerReady = useInView(sectionRef, { once: true, amount: 0.25 })
  const [cardsReady, setCardsReady] = useState(false)

  const sectors = [
    {
      name: t.sectors_finance_name,
      icon: '/images/financial.jpg',
      description: t.sectors_finance_desc,
    },
    {
      name: t.sectors_construction_name,
      icon: '/images/construction.jpg',
      description: t.sectors_construction_desc,
    },
    {
      name: t.sectors_manufacturing_name,
      icon: '/images/manufacturing.jpg',
      description: t.sectors_manufacturing_desc,
    },
    {
      name: t.sectors_semiconductor_name,
      icon: '/images/semiconductor.jpg',
      description: t.sectors_semiconductor_desc,
    },
    {
      name: t.sectors_healthcare_name,
      icon: '/images/healthcare.jpg',
      description: t.sectors_healthcare_desc,
    },
    {
      name: t.sectors_public_name,
      icon: '/images/public-sector.jpg',
      description: t.sectors_public_desc,
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Warm centre glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-orange-100/25 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={headerReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: easeStandard }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5"
          >
            {t.sectors_title_prefix}<span className="text-orange-500">{t.sectors_title_highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: easeStandard, delay: 0.15 }}
            onAnimationComplete={() => setCardsReady(true)}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {t.sectors_description}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 32 }}
              animate={cardsReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: easeStandard, delay: idx * 0.07 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark gradient over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Sector name badge over image */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-white font-bold text-base drop-shadow-md">{sector.name}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-500 to-amber-400 group-hover:w-full transition-all duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}