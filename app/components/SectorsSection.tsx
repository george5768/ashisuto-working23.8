'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const sectors = [
  {
    name: 'Finance',
    icon: '/images/financial.jpg',
    description: 'Empowering digital transformation in financial services.'
  },
  {
    name: 'Construction',
    icon: '/images/construction.jpg',
    description: 'Building smarter with connected tools and analytics.'
  },
  {
    name: 'Manufacturing',
    icon: '/images/manufacturing.jpg',
    description: 'Streamlining production with smart automation.'
  },
  {
    name: 'Semiconductor',
    icon: '/images/semiconductor.jpg',
    description: 'Optimizing precision and supply in chip design.'
  },
  {
    name: 'Healthcare',
    icon: '/images/healthcare.jpg',
    description: 'Innovating patient care with secure data solutions.'
  },
  {
    name: 'Public Sector',
    icon: '/images/public-sector.jpg',
    description: 'Modernizing services for greater citizen impact.'
  }
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: 'easeOut' }
  })
}

export default function SectorsSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="w-full bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mb-10 sm:mb-12 md:mb-16 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-3 sm:mb-4">
          Industries We Serve
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Tailored digital solutions across key economic sectors.
        </p>
      </div>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
        {sectors.map((sector, idx) => (
          isClient ? (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:scale-[1.02] min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
            >
          
              <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] h-32 sm:h-40 md:h-48 mb-5 sm:mb-7 rounded-lg sm:rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
          
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                {sector.name}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2 sm:px-4">
                {sector.description}
              </p>
            </motion.div>
          ) : (
            <div
              key={idx}
              className="bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow-lg flex flex-col items-center text-center min-h-[280px] sm:min-h-[320px] md:min-h-[360px] animate-pulse"
            >
              <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] h-32 sm:h-40 md:h-48 mb-5 sm:mb-7 rounded-lg sm:rounded-xl bg-gray-200" />

              <div className="h-6 sm:h-7 md:h-8 w-24 sm:w-28 bg-gray-200 rounded mb-2 sm:mb-3" />
              <div className="h-12 sm:h-14 w-full max-w-xs bg-gray-200 rounded px-2 sm:px-4" />
            </div>
          )
        ))}
      </div>
    </section>
  )
}