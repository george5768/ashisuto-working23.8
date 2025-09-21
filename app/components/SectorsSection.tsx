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
    transition: { delay: i * 0.5, duration: 1, ease: 'easeOut' }
  })
}

export default function SectorsSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="w-full bg-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">Industries We Serve</h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">
          Tailored digital solutions across key economic sectors.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-center mx-1 sm:mx-2 px-2 sm:px-0">
        {sectors.map((sector, idx) => (
          isClient ? (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-white rounded-lg px-2 sm:px-3 py-3 sm:py-4 md:py-5 shadow-sm flex flex-col items-center text-center hover:shadow-md transition min-h-[160px] sm:min-h-[180px] md:min-h-[200px]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-3 sm:mb-4 bg-orange-300 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight px-1">{sector.name}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 px-1">{sector.description}</p>
            </motion.div>
          ) : (
            <div
              key={idx}
              className="bg-white rounded-lg px-2 sm:px-3 py-3 sm:py-4 md:py-5 shadow-sm flex flex-col items-center text-center h-[160px] animate-pulse min-h-[160px] sm:min-h-[180px] md:min-h-[200px]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-3 sm:mb-4 bg-orange-300 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight px-1">{sector.name}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 animate-pulse px-1">{sector.description}</p>
            </div>
          )
        ))}
      </div>
    </section>
  )
}