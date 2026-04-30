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
    <section ref={sectionRef} className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Warm centre glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-100/30 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
            animate={headerReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, ease: easeStandard }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5"
          >
            {t.sectors_title_prefix}<span className="text-orange-500">{t.sectors_title_highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={headerReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, ease: easeStandard, delay: 0.18 }}
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
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={cardsReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, ease: easeStandard, delay: idx * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-lg border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-55">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  fill
                  className="object-fill group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {sector.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-orange-500 to-amber-400 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}