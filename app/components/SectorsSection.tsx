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
    <section className="w-full bg-gray-50 py-5 px-4">      
    <div className="mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-800">Industries We Serve</h2>
        <p className="mt-3 text-lg text-gray-600">
          Tailored digital solutions across key economic sectors.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 justify-center mx-2">
        {sectors.map((sector, idx) => (
          isClient ? (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-white rounded-lg px-4 py-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition"
            >
              <div className="w-50 h-50 mb-6 bg-orange-300 rounded-lg flex items-center justify-center">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  width={300}
                  height={300}
                  className="w-49 h-49 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{sector.name}</h3>
              <p className="mt-3 text-sm text-gray-600">{sector.description}</p>
            </motion.div>
          ) : (
            <div
              key={idx}
              className="bg-white rounded-lg px-4 py-6 shadow-sm flex flex-col items-center text-center h-[200px] animate-pulse"
            >
              <div className="w-50 h-50 mb-6 bg-orange-300 rounded-lg flex items-center justify-center">
                <div className="w-49 h-49 bg-gray-200 rounded-lg animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{sector.name}</h3>
              <p className="mt-3 text-sm text-gray-600">{sector.description}</p>
            </div>
          )
        ))}
      </div>
    </section>
  )
}