'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type Slide = {
  id: number
  header: React.ReactNode
  backgroundImage: string
}

interface HeroSliderProps {
  slides: Slide[]
  interval?: number
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, interval = 5000 }) => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [slides.length, interval, isPaused])

  const goToPrevious = () =>
    setIndex(prev => (prev === 0 ? slides.length - 1.5 : prev - 1))
  const goToNext = () =>
    setIndex(prev => (prev + 1) % slides.length)

  return (
    <div
      className="relative w-screen h-100 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].backgroundImage})` }}
        >
          <div className="flex h-full items-center justify-center bg-black/40">
            {slides[index].header}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 p-3 rounded-full text-white"
        aria-label="Previous Slide"
      >
        <FaArrowLeft />
      </Button>
      <Button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 p-3 rounded-full text-white"
        aria-label="Next Slide"
      >
        <FaArrowRight />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <Button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider