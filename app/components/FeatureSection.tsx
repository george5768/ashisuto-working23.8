'use client';

import Image from 'next/image';
import { Handshake, Lightbulb } from 'lucide-react';
import CustomButton from '@/components/ui/custom-button';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguageContext } from '@/app/context/LanguageContext';

/* ── Easing ─────────────────────────────────────────────────────── */
// Smooth expo-out curve — feels natural and never abrupt
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease, delay },
  }),
};

const fromLeft = {
  hidden: { opacity: 0, x: -72, filter: 'blur(3px)' },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease, delay },
  }),
};

const fromRight = {
  hidden: { opacity: 0, x: 72, filter: 'blur(3px)' },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease, delay },
  }),
};

/* ── Feature data ───────────────────────────────────────────────── */
const featureStyles = [
  {
    Icon: Handshake,
    accent: 'from-orange-500 to-amber-500',
    cardBg: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    iconRing: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    Icon: Lightbulb,
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
  const { currentLanguage: t } = useLanguageContext();

  const features = [
    { ...featureStyles[0], title: t.feature_section_card1_title, body: t.feature_section_card1_body },
    { ...featureStyles[1], title: t.feature_section_card2_title, body: t.feature_section_card2_body },
  ];

  /*
   * Three scroll thresholds on the same section ref:
   *   40% visible → header + subtitle + buttons appear
   *   50% visible → 2 tabs slide in from the left
   *   tabs done   → images slide in from the right (via onAnimationComplete)
   */
  const sectionRef  = useRef<HTMLElement>(null);
  const headerReady = useInView(sectionRef, { once: true, amount: 0.40 });
  const tabsReady   = useInView(sectionRef, { once: true, amount: 0.50 });
  const [imagesReady, setImagesReady] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      {/* Subtle left-side warm accent */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-amber-50/60 blur-[90px] pointer-events-none" />
      {/* Subtle bottom-right glow */}
      <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-orange-50/50 blur-[80px] pointer-events-none" />
      {/* ── Desktop / Tablet ─────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto hidden lg:block">

        {/* 1 ── HEADER (fires at 40%) */}
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            animate={headerReady ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight max-w-4xl mx-auto"
          >
            {t.feature_section_title_prefix}
            <span className="text-orange-500">
              {t.feature_section_title_highlight}
            </span>
            {t.feature_section_title_suffix}
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={headerReady ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.22}
            className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            {t.feature_section_description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate={headerReady ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.44}
            className="flex justify-center gap-4 mt-10"
          >
            <CustomButton href="/about" className="w-44 justify-center">
              {t.feature_section_btn_about}
            </CustomButton>
            <CustomButton
              href="/contact"
              className="w-44 justify-center from-transparent to-transparent bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-md"
            >
              {t.feature_section_btn_contact}
            </CustomButton>
          </motion.div>
        </div>

        {/* ── Two-column: tabs (left) + images (right) ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* 2 ── TABS (fire at 50%) — slide from left */}
          <div className="flex flex-col gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate={tabsReady ? 'visible' : 'hidden'}
                variants={fromLeft}
                custom={i * 0.32}
                /* Last tab finishing → unlock images */
                onAnimationComplete={() => {
                  if (i === features.length - 1) setImagesReady(true);
                }}
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

          {/* 3 ── IMAGES (fire after last tab's animation completes) — slide from right */}
          <div className="flex flex-col gap-4 h-full">
            {/* Row 1: 1 wide image */}
            <motion.div
              initial="hidden"
              animate={imagesReady ? 'visible' : 'hidden'}
              variants={fromRight}
              custom={0.05}
              className="flex-[3] min-h-0 relative overflow-hidden rounded-2xl shadow-xl group"
            >
              <Image src={gallery[0].src} alt={gallery[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" quality={95} sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Row 2: 2 images side by side */}
            <div className="flex-[2] min-h-0 grid grid-cols-2 gap-4">
              <motion.div
                initial="hidden"
                animate={imagesReady ? 'visible' : 'hidden'}
                variants={fromRight}
                custom={0.26}
                className="relative overflow-hidden rounded-2xl shadow-xl group h-full"
              >
                <Image src={gallery[1].src} alt={gallery[1].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" quality={95} sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={imagesReady ? 'visible' : 'hidden'}
                variants={fromRight}
                custom={0.46}
                className="relative overflow-hidden rounded-2xl shadow-xl group h-full"
              >
                <Image src={gallery[2].src} alt={gallery[2].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" quality={95} sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ───────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto lg:hidden flex flex-col gap-6">

        {/* Header at 40% */}
        <motion.h2
          initial="hidden"
          animate={headerReady ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-3xl font-black text-gray-900 leading-tight text-center"
        >
          {t.feature_section_title_prefix}
          <span className="text-orange-500">
            {t.feature_section_title_highlight}
          </span>
          {t.feature_section_title_suffix}
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={headerReady ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0.22}
          className="text-base text-gray-500 leading-relaxed text-center"
        >
          {t.feature_section_description}
        </motion.p>

        {/* Tabs at 50% */}
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate={tabsReady ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={i * 0.32}
            onAnimationComplete={() => {
              if (i === features.length - 1) setImagesReady(true);
            }}
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

        {/* Images after tabs */}
        {gallery.map((img, i) => (
          <motion.div
            key={img.src}
            initial="hidden"
            animate={imagesReady ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={i * 0.28}
            className="relative h-48 overflow-hidden rounded-2xl shadow-xl group"
            hidden
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        ))}

        {/* Buttons */}
        <motion.div
          initial="hidden"
          animate={imagesReady ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0.72}
          className="grid grid-cols-2 gap-4"
        >
          <CustomButton href="/about" className="w-full justify-center">
            {t.feature_section_btn_about}
          </CustomButton>
          <CustomButton
            href="/contact"
            className="w-full justify-center from-transparent to-transparent bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-md"
          >
            {t.feature_section_btn_contact}
          </CustomButton>
        </motion.div>
      </div>
    </section>
  );
}