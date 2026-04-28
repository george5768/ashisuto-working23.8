'use client';

import Image from 'next/image';
import { Handshake, Lightbulb } from 'lucide-react';
import CustomButton from '@/components/ui/custom-button';
import { motion } from 'framer-motion';

/* ── Easing ─────────────────────────────────────────────────────── */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/*
 * All three variant factories accept `custom` = delay in seconds.
 * The parent motion.div carries `whileInView="visible"` once;
 * children just read their custom delay and animate accordingly.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

const fromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease, delay },
  }),
};

/* ── Feature data ───────────────────────────────────────────────── */
const features = [
  {
    Icon: Handshake,
    title: 'Collaborative Innovation',
    body: 'Co-creation of transformative solutions focused on delivering measurable outcomes and real-world business impact.',
    accent: 'from-orange-500 to-amber-500',
    cardBg: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    iconRing: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    Icon: Lightbulb,
    title: 'End-to-End AI Solutions',
    body: 'Comprehensive guidance from concept to implementation, powered by advanced AI capabilities and deep technical expertise.',
    accent: 'from-amber-500 to-orange-500',
    cardBg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    iconRing: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
];

const gallery = [
  { src: '/images/mfg.png',            alt: 'Manufacturing solution'  },
  { src: '/images/cleanroom.jpg',      alt: 'Cleanroom technology'    },
  { src: '/images/construction-3.png', alt: 'Construction innovation' },
];

/* ── Component ──────────────────────────────────────────────────── */
export default function FeatureSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 py-20 px-4 sm:px-6 lg:px-8">
      {/* Tablet and Desktop and higher */}
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="hidden md:block"
        >
          {/* ── Header block (bottom-to-top) ── */}
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight max-w-4xl mx-auto"
            >
              Transform  <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                Efficiency
              </span> Into Revenue Growth With AI
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.18}
              className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              Advanced AI expertise combined with precision engineering and intelligent design enables optimized operations, enhanced efficiency, and scalable long-term business growth.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.34}
              className="flex justify-center gap-4 mt-10"
            >
              <CustomButton href="/about" className="w-44 justify-center">
                About Us
              </CustomButton>
              <CustomButton
                href="/contact"
                className="w-44 justify-center from-transparent to-transparent bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-md"
              >
                Get in Touch
              </CustomButton>
            </motion.div>
          </div>

          {/* ── Two-column: tabs (left) + images (right) ── */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-stretch">

            {/* Left: tabs slide left → right, after header */}
            <div className="flex flex-col gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={fromLeft}
                  custom={0.85 + i * 0.22}
                  className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${f.cardBg} ${f.border} p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r ${f.accent}`} />
                  <div className="flex items-center gap-4 mt-2 mb-3">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${f.iconRing} flex items-center justify-center shadow-sm`}>
                      <f.Icon className={`w-6 h-6 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{f.body}</p>
                </motion.div>
              ))}
            </div>

            {/* Right: images slide right → left, after tabs */}
            <div className="flex flex-col gap-4 h-full">
              {/* Row 1: 1 wide image */}
              <motion.div
                variants={fromRight}
                custom={1.5}
                className="flex-[3] min-h-0 relative overflow-hidden rounded-2xl shadow-xl group"
              >
                <Image src={gallery[0].src} alt={gallery[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Row 2: 2 images side by side */}
              <div className="flex-[2] min-h-0 grid grid-cols-2 gap-4">
                <motion.div
                  variants={fromRight}
                  custom={1.68}
                  className="relative overflow-hidden rounded-2xl shadow-xl group h-full"
                >
                  <Image src={gallery[1].src} alt={gallery[1].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                </motion.div>
                <motion.div
                  variants={fromRight}
                  custom={1.84}
                  className="relative overflow-hidden rounded-2xl shadow-xl group h-full"
                >
                  <Image src={gallery[2].src} alt={gallery[2].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="md:hidden flex flex-col gap-6"
        >
          {/* Header */}
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl font-black text-gray-900 leading-tight text-center"
          >
            Transform  <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Efficiency
            </span> Into Revenue Growth With AI
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.18}
            className="text-base text-gray-500 leading-relaxed text-center"
          >
            Advanced AI expertise combined with precision engineering and intelligent design enables optimized operations, enhanced efficiency, and scalable long-term business growth.
          </motion.p>

          {/* Tabs */}
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={0.42 + i * 0.2}
              className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${f.cardBg} ${f.border} p-6 shadow-sm`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${f.accent}`} />
              <div className="flex items-center gap-3 mt-1 mb-3">
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${f.iconRing} flex items-center justify-center`}>
                  <f.Icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}

          {/* Buttons — 2 col */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={fadeUp} custom={0.9}>
              <CustomButton href="/about" className="w-full justify-center">About Us</CustomButton>
            </motion.div>
            <motion.div variants={fadeUp} custom={1.06}>
              <CustomButton
                href="/contact"
                className="w-full justify-center from-transparent to-transparent bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-md"
              >
                Get in Touch
              </CustomButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}