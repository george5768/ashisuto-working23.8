'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, Variants, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import CustomButton from '@/components/ui/custom-button';
import { Routes } from '../enum/global';
import { useLanguageContext } from '../context/LanguageContext';

const BTN_COLOR = 'from-amber-500 to-orange-500';

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  link: string;
  features: string[];
  stats: string;
  isFeatured?: boolean;
};

const easeStandard: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeStandard, staggerChildren: 0.12 },
  },
};

// ── Responsive breakpoint hook ─────────────────────────────────────
function useIsLg() {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isLg;
}

// ── Typewriter hook ──────────────────────────────────────────────────
function useTypewriter(text: string, isActive: boolean, speed = 30, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    let intervalId: ReturnType<typeof setInterval>;
    let i = 0;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done };
}

// ── ServiceCard ───────────────────────────────────────────────────────
const ServiceCard: React.FC<{
  service: ServiceItem;
  isLg: boolean;
  gridInView: boolean;
  entryDelay: number;
}> = ({ service, isLg, gridInView, entryDelay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const selfInView = useInView(cardRef, { once: true, amount: 0.5 });

  const isTriggered = isLg ? gridInView : selfInView;
  const twBaseDelay = isLg ? entryDelay * 1000 + 560 : 80;

  const { displayed: titleText, done: titleDone } = useTypewriter(service.title, isTriggered, 38, twBaseDelay);
  const { displayed: descText, done: descDone } = useTypewriter(service.description, titleDone, 22, 80);

  const [labelVisible, setLabelVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(
    () => Array(service.features.length).fill(false)
  );
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    if (!descDone) return;

    const t = setTimeout(() => {
      setLabelVisible(true);

      service.features.forEach((_, i) => {
        setTimeout(() => {
          setItemsVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });

          if (i === service.features.length - 1) {
            setTimeout(() => {
              setBtnVisible(true);
            }, 250);
          }
        }, 150 + i * 200);
      });
    }, 120);

    return () => clearTimeout(t);
  }, [descDone]); // eslint-disable-line react-hooks/exhaustive-deps

  const { currentLanguage: t } = useLanguageContext();
  const isFeatured = !!service.isFeatured;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 44 }}
      animate={isTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: entryDelay }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col p-8 rounded-3xl transition-all duration-300 shadow-md hover:shadow-2xl ${
        isFeatured
          ? 'bg-gradient-to-br from-orange-500 via-orange-400 to-amber-500 hover:shadow-orange-300/50 ring-1 ring-orange-300/60'
          : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 hover:shadow-orange-100/70 hover:border-orange-200'
      }`}
    >
      <div className={`inline-block self-start px-3 py-1.5 rounded-full text-xs font-bold mb-6 ${
        isFeatured
          ? 'bg-white/25 backdrop-blur-sm text-white'
          : 'bg-white text-orange-600 shadow-sm'
      }`}>
        {service.stats}
      </div>

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
          isFeatured
            ? 'bg-white/20 backdrop-blur-sm'
            : 'bg-white shadow-md border border-orange-100'
        }`}
      >
        <Image
          src={service.icon}
          alt={service.title}
          width={38}
          height={38}
          className={`object-contain transition-all duration-300 ${
            isFeatured ? 'brightness-0 invert' : ''
          }`}
        />
      </div>

      <h3 className={`text-2xl font-bold mb-3 min-h-[3.5rem] leading-snug ${
        isFeatured ? 'text-white' : 'text-gray-900'
      }`}>
        {titleText}
        {isTriggered && !titleDone && (
          <span className={`inline-block w-[2px] h-[1em] ml-0.5 animate-pulse align-middle ${
            isFeatured ? 'bg-white/80' : 'bg-orange-500'
          }`} />
        )}
      </h3>

      <p className={`text-base mb-6 leading-relaxed min-h-[3.5rem] ${
        isFeatured ? 'text-white/90' : 'text-gray-600'
      }`}>
        {descText}
        {titleDone && !descDone && (
          <span className={`inline-block w-[2px] h-[1em] ml-0.5 animate-pulse align-middle ${
            isFeatured ? 'bg-white/70' : 'bg-orange-400'
          }`} />
        )}
      </p>

      <div className={`h-px mb-6 transition-opacity duration-300 ${
        descDone ? 'opacity-100' : 'opacity-0'
      } ${isFeatured ? 'bg-white/20' : 'bg-orange-200'}`} />

      <p className={`text-xs font-bold uppercase tracking-widest mb-4 transition-opacity duration-300 ${
        labelVisible ? 'opacity-100' : 'opacity-0'
      } ${isFeatured ? 'text-white/80' : 'text-orange-600'}`}>
        {t.dockita_whats_included}
      </p>

      <div className="space-y-3 flex-1">
        {service.features.map((feat, i) => (
          <motion.div
            key={feat}
            initial={{ opacity: 0, scale: 0.85, x: -10 }}
            animate={
              itemsVisible[i]
                ? { opacity: 1, scale: 1, x: 0 }
                : { opacity: 0, scale: 0.85, x: -10 }
            }
            transition={{ duration: 0.35, ease: easeStandard }}
            className={`flex items-center gap-2 text-sm ${
              isFeatured ? 'text-white' : 'text-gray-700'
            }`}
          >
            <CheckCircle2
              size={16}
              className={isFeatured ? 'text-white/70 shrink-0' : 'text-orange-500 shrink-0'}
            />
            {feat}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={btnVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: 0.4, ease: easeStandard }}
        className={`mt-8 ${btnVisible ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'}`}
      >
        <CustomButton
          href={service.link}
          compactPadding
          className={`group/btn flex items-center justify-center gap-2 w-full rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            isFeatured
              ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-md'
              : `bg-gradient-to-r ${BTN_COLOR} text-white shadow-md hover:shadow-orange-200`
          }`}
        >
          {t.dockita_explore_btn}
        </CustomButton>
      </motion.div>
    </motion.div>
  );
};

const DocKITAServices: React.FC = () => {
  const { currentLanguage: t, getCurrentLang } = useLanguageContext();
  const langSlugStr = getCurrentLang().toLowerCase();
  const featureSlides = ['/images/feature_1.png', '/images/feature_2.png', '/images/feature_3.png'];
  const [activeFeatureSlide, setActiveFeatureSlide] = useState(0);
  const [isFeatureHovered, setIsFeatureHovered] = useState(false);
  const [featureProgress, setFeatureProgress] = useState(0);
  const slideRafRef = useRef<number | null>(null);
  const slideStartAtRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef(0);
  const isLg = useIsLg();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.35 });

  useEffect(() => {
    const SLIDE_DURATION_MS = 6500;

    if (isFeatureHovered) {
      if (slideStartAtRef.current !== null) {
        pausedElapsedRef.current += performance.now() - slideStartAtRef.current;
      }
      slideStartAtRef.current = null;

      if (slideRafRef.current !== null) {
        cancelAnimationFrame(slideRafRef.current);
        slideRafRef.current = null;
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (slideStartAtRef.current === null) {
        slideStartAtRef.current = timestamp;
      }

      const elapsedMs = pausedElapsedRef.current + (timestamp - slideStartAtRef.current);
      const nextProgress = Math.min((elapsedMs / SLIDE_DURATION_MS) * 100, 100);

      setFeatureProgress(nextProgress);

      if (nextProgress >= 100) {
        setActiveFeatureSlide((slide) => (slide + 1) % featureSlides.length);
        pausedElapsedRef.current = 0;
        slideStartAtRef.current = timestamp;
        setFeatureProgress(0);
      }

      slideRafRef.current = requestAnimationFrame(animate);
    };

    slideRafRef.current = requestAnimationFrame(animate);

    return () => {
      if (slideRafRef.current !== null) {
        cancelAnimationFrame(slideRafRef.current);
        slideRafRef.current = null;
      }
    };
  }, [featureSlides.length, isFeatureHovered]);

  useEffect(() => {
    setFeatureProgress(0);
    pausedElapsedRef.current = 0;
    slideStartAtRef.current = null;
  }, [activeFeatureSlide]);

  const services: ServiceItem[] = [
    {
      title: t.dockita_service_1_title,
      description: t.dockita_service_1_description,
      icon: '/icons/Workflow.png',
      link: `/${langSlugStr}${Routes.DOC_KITA}`,
      features: [t.dockita_service_1_feature_1, t.dockita_service_1_feature_2, t.dockita_service_1_feature_3],
      stats: t.dockita_service_1_stats,
    },
    {
      title: t.dockita_service_2_title,
      description: t.dockita_service_2_description,
      icon: '/icons/ai-prediction.png',
      link: `/${langSlugStr}${Routes.AI_PREDICTION_OPTIMIZATION}`,
      features: [t.dockita_service_2_feature_1, t.dockita_service_2_feature_2, t.dockita_service_2_feature_3],
      stats: t.dockita_service_2_stats,
      isFeatured: true,
    },
    {
      title: t.dockita_service_3_title,
      description: t.dockita_service_3_description,
      icon: '/icons/AI-agent.png',
      link: `/${langSlugStr}${Routes.AI_APPLICATION_CUSTOMIZE}`,
      features: [t.dockita_service_3_feature_1, t.dockita_service_3_feature_2, t.dockita_service_3_feature_3],
      stats: t.dockita_service_3_stats,
    },
  ];

//   const HERO_BENTO_CARD = {
//     badge: t.dockita_hero_badge,
//     title: <>DocKITA<span className="text-amber-300 text-2xl md:text-4xl align-top ml-1">R</span></>,
//     subtitle: t.dockita_hero_subtitle,
//     description: t.dockita_hero_description,
//     cta: t.dockita_hero_cta,
//     productLabel: t.dockita_hero_product_label,
//     image: '/icons/dockita_logo.png',
//   };

//   const BOOK_CONSULTATION_BTN = (buttonText: string) => (
//     <CustomButton
//       href={`/${langSlugStr}${Routes.CONTACT}`}
//       className="px-8 py-3.5 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg flex items-center gap-2 group"
//     >
//       {buttonText}
//       <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//     </CustomButton>
//   );

  return (
    <section id="services" className="relative py-10 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-orange-100/60 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-amber-50/60 blur-[130px]" />
        <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-orange-50/50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-orange-400 via-amber-400 to-orange-600 shadow-2xl overflow-hidden mb-12 lg:hidden"
        >
          <div className="relative bg-gradient-to-br from-orange-500 via-[#FF6600] to-amber-400 p-8 md:p-12">
            <div className="flex flex-col items-center gap-8">
              <motion.div variants={itemReveal} className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white flex items-center justify-center p-3 shadow-2xl border border-gray-100 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <Image
                    src={HERO_BENTO_CARD.image}
                    alt="DocKITA logo"
                    width={140}
                    height={140}
                    className="object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="
                    absolute -top-3 left-1/2 -translate-x-1/2
                    md:left-auto md:translate-x-0 md:-right-3
                    bg-amber-300 text-orange-900 text-[10px] font-black
                    px-3 py-1 rounded-lg uppercase tracking-tighter shadow-xl z-20
                    whitespace-nowrap
                  "
                >
                  {HERO_BENTO_CARD.productLabel}
                </motion.div>
              </motion.div>
              <motion.div variants={itemReveal} className="text-center flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-white text-xs font-bold mb-4 tracking-widest uppercase">
                  <Zap size={12} className="fill-current" /> {HERO_BENTO_CARD.badge}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  {HERO_BENTO_CARD.title}
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-amber-100 mb-4 leading-tight">
                  {HERO_BENTO_CARD.subtitle}
                </h2>
                <p className="text-orange-50 text-base md:text-lg max-w-2xl font-medium leading-relaxed">
                  {HERO_BENTO_CARD.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  {BOOK_CONSULTATION_BTN(HERO_BENTO_CARD.cta)}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div> */}
{/* 
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-orange-400 via-amber-400 to-orange-600 shadow-2xl overflow-hidden mb-12 hidden lg:block"
        >
          <div className="relative bg-gradient-to-br from-orange-500 via-[#FF6600] to-amber-400 p-8 md:p-12 lg:p-16">
            <div className="flex flex-row-reverse items-center justify-between gap-8 lg:gap-12">
              <motion.div variants={itemReveal} className="relative shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-[2rem] bg-white flex items-center justify-center p-6 shadow-2xl border border-white/20 transition-transform duration-300 hover:scale-105">
                  <Image
                    src={HERO_BENTO_CARD.image}
                    alt="DocKITA logo"
                    width={160}
                    height={160}
                    className="object-contain"
                    priority
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="
                    absolute -top-3 left-1/2 -translate-x-1/2
                    lg:left-auto lg:right-[-10px] lg:translate-x-0
                    bg-amber-300 text-orange-900 text-[10px] lg:text-[11px] font-black
                    px-3 py-1 rounded-lg uppercase tracking-tight shadow-xl z-20
                    whitespace-nowrap
                  "
                >
                  {HERO_BENTO_CARD.productLabel}
                </motion.div>
              </motion.div>
              <motion.div variants={itemReveal} className="text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-white text-[10px] md:text-xs font-bold mb-6 tracking-widest uppercase">
                  <Zap size={14} className="fill-current" /> {HERO_BENTO_CARD.badge}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter">
                  {HERO_BENTO_CARD.title}
                </h1>
                <h2 className="text-xl md:text-3xl font-bold text-amber-100 mb-6 leading-tight">
                  {HERO_BENTO_CARD.subtitle}
                </h2>
                <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl font-medium leading-relaxed">
                  {HERO_BENTO_CARD.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-4 justify-start">
                  {BOOK_CONSULTATION_BTN(HERO_BENTO_CARD.cta)}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div> */}

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative rounded-[2rem] overflow-hidden mb-14"
        >
          <div className="relative p-4 rounded-[2rem] bg-gradient-to-br from-orange-200 via-white to-amber-100 shadow-xl">
            <div
              className="relative w-full aspect-[16/9] rounded-[1.4rem] overflow-hidden bg-white ring-1 ring-orange-100"
              onMouseEnter={() => setIsFeatureHovered(true)}
              onMouseLeave={() => setIsFeatureHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeatureSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={featureSlides[activeFeatureSlide]}
                    alt={`DocKITA feature ${activeFeatureSlide + 1}`}
                    fill
                    className="object-contain"
                    quality={100}
                    unoptimized={true}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                <motion.div
                  className="h-full bg-orange-500"
                  animate={{ width: `${featureProgress}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {featureSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveFeatureSlide(idx)}
                  aria-label={`Go to feature slide ${idx + 1}`}
                  className="group cursor-pointer focus:outline-none"
                >
                  <span
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeFeatureSlide
                        ? 'w-8 bg-orange-500'
                        : 'w-2.5 bg-orange-200 group-hover:bg-orange-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-black uppercase tracking-widest mb-5">
            {t.dockita_pillars_badge}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            {t.dockita_pillars_title_pre}{t.dockita_pillars_title_pre ? ' ' : ''}<span className="text-orange-500">{t.dockita_pillars_title_highlight}</span>{t.dockita_pillars_title_post ? ' ' : ''}{t.dockita_pillars_title_post}
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
          <p className="mt-5 max-w-3xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
            {t.dockita_hero_description}
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              service={service}
              isLg={isLg}
              gridInView={gridInView}
              entryDelay={idx * 0.22}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocKITAServices;
