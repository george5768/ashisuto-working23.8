'use client';

import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguageContext } from '@/app/context/LanguageContext';

const APP_URL = 'https://find.ashisuto-tech.com';
const FIND_LOGO_URL = 'https://find.ashisuto-tech.com/assets/FindLogo-9THid9OH.svg';

export default function MobileAppBanner() {
  const { currentLanguage: t } = useLanguageContext();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-5 sm:px-6 lg:px-8">
      <motion.a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.mobile_app_banner_aria}
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="group relative mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 p-5 shadow-xl shadow-orange-900/15 ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-orange-400/25 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.55),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_18px)]" />
        <div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl lg:flex-1">
          <div className="mb-3 inline-flex items-center gap-3">
            <Image
              src="/images/FINDLogo.png"
              alt="FIND app icon"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            {/* <span className="h-8 w-px bg-white/20" aria-hidden="true" /> */}
            <Image
              src={FIND_LOGO_URL}
              alt="FIND app logo"
              width={130}
              height={35}
              unoptimized
              className="h-8 w-auto max-w-[130px] object-contain"
            />
          </div>

          <h2 className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl">
            {t.mobile_app_banner_title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
            {t.mobile_app_banner_body}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-colors duration-200 group-hover:bg-orange-400">
            {t.mobile_app_banner_cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 mt-5 flex items-center justify-center lg:mt-0 lg:min-w-[220px] xl:min-w-[260px]"
        >
          {/* Subtle background glow ring */}
          <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r from-orange-500/25 via-amber-500/20 to-orange-600/25 blur-lg transition-opacity duration-300 group-hover:opacity-100 opacity-70" />

          {/* Glassmorphic box container for the hands image */}
          <div className="relative flex w-full max-w-[220px] flex-col items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-white/15 via-slate-900/60 to-orange-950/40 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-300 group-hover:border-orange-400/50 group-hover:shadow-orange-500/20 sm:max-w-[250px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-sm">
              <Image
                src="/images/FINDHand.png"
                alt="FIND Mobile App - Connect & Share"
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
                priority
              />
            </div>

            {/* Glassmorphic URL badge pill placed cleanly below the picture */}
            <div className="mt-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-orange-200 shadow-lg backdrop-blur-md transition-colors group-hover:border-orange-400/60 group-hover:bg-orange-500/20">
              <ExternalLink className="h-3 w-3 text-orange-300" />
              <span className="truncate">find.ashisuto-tech.com</span>
            </div>
          </div>
        </motion.div>
      </motion.a>
    </section>
  );
}