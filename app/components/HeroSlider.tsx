'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = {
  id: number
  header: React.ReactNode
  backgroundImage: string
  alt?: string
}

interface HeroSliderProps {
  slides: Slide[]
  interval?: number
  autoPlay?: boolean
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  interval = 10000, // 10s
  autoPlay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
      }, interval)
    }
  }, [autoPlay, interval, slides.length])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    resetTimer()
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    resetTimer()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
    resetTimer()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const slideNumber = String(currentIndex + 1).padStart(2, '0')
  const totalNumber = String(slides.length).padStart(2, '0')

  return (
    <div
      className="relative w-full h-[65vh] sm:h-[73vh] lg:h-[82vh] min-h-[380px] sm:min-h-[500px] lg:min-h-[580px] max-h-[960px] overflow-hidden bg-gray-900"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero slider"
    >
      {/* Slides – crossfade */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reducedMotion ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Ken Burns background */}
          <motion.div
            key={`bg-${currentIndex}`}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentIndex].backgroundImage})` }}
            initial={{ scale: reducedMotion ? 1.0 : 1.06 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: reducedMotion ? 0 : (interval / 1000) + 1, ease: 'linear' }}
            role="img"
            aria-label={slides[currentIndex].alt || `Slide ${currentIndex + 1}`}
          />

          {/* Mobile: full dark overlay so centered text is always readable */}
          <div className="absolute inset-0 bg-black/55 sm:bg-transparent" />
          {/* Desktop: dark left panel fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />

          {/* Slide content – centred on mobile, left-aligned on desktop */}
          <div className="relative h-full flex items-center justify-center sm:justify-start px-20 sm:px-28 lg:px-36">
            <motion.div
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.25, duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
              className="w-full max-w-7xl"
            >
              {slides[currentIndex].header}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20
                  w-11 h-11 lg:w-13 lg:h-13 flex items-center justify-center
                  rounded-full bg-white/10 hover:bg-orange-500
                  border border-orange-500 hover:border-orange-400
                  text-orange-400 hover:text-white transition-all duration-300 hover:scale-110
                  backdrop-blur-sm cursor-pointer"
        aria-label="Previous slide"
        disabled={slides.length <= 1}
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20
                  w-11 h-11 lg:w-13 lg:h-13 flex items-center justify-center
                  rounded-full bg-white/10 hover:bg-orange-500
                  border border-orange-500 hover:border-orange-400
                  text-orange-400 hover:text-white transition-all duration-300 hover:scale-110
                  backdrop-blur-sm cursor-pointer"
        aria-label="Next slide"
        disabled={slides.length <= 1}
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Bottom bar: counter + dots + progress */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-7 pt-20 bg-gradient-to-t from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto flex items-end gap-5">

          {/* Slide counter */}
          <div className="flex items-baseline gap-1.5 text-white/70 font-mono tracking-widest flex-shrink-0 pb-1">
            <span className="text-orange-400 font-bold text-lg leading-none">{slideNumber}</span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-sm">{totalNumber}</span>
          </div>

          {/* Dots + progress */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                  className="cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-2.5 rounded-full transition-all duration-400 ${
                      index === currentIndex
                        ? 'w-8 bg-orange-400'
                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Auto-play fill bar */}
            {autoPlay && (
              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  key={`progress-${currentIndex}`}
                  className="h-full bg-orange-400 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: interval / 1000, ease: 'linear' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider