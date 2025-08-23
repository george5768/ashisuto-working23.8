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
      <div className="mx-auto text-center mb-10 sm:mb-14 lg:mb-16 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Industries We Serve</h2>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
          Tailored digital solutions across key economic sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 justify-center mx-1 sm:mx-2 px-2 sm:px-0">
        {sectors.map((sector, idx) => (
          isClient ? (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-white rounded-lg px-3 sm:px-4 py-4 sm:py-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition min-h-[200px] sm:min-h-[220px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mb-4 sm:mb-6 bg-orange-300 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{sector.name}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2">{sector.description}</p>
            </motion.div>
          ) : (
            <div
              key={idx}
              className="bg-white rounded-lg px-3 sm:px-4 py-4 sm:py-6 shadow-sm flex flex-col items-center text-center h-[200px] animate-pulse min-h-[200px] sm:min-height-[220px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 mb-4 sm:mb-6 bg-orange-300 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{sector.name}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 animate-pulse">{sector.description}</p>
            </div>
          )
        ))}
      </div>
    </section>
  )
}