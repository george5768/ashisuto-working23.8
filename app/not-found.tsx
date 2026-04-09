'use client';

import { usePathname } from 'next/navigation';
import CustomButton from "@/components/ui/custom-button";
import { motion } from 'framer-motion';
import Image from "next/image";
import { LANG_OPTIONS, Languages } from '@/app/enum/global';
import languagesData from '@/app/enum/languages.json';

const defaultSlug = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.slug;

export default function NotFound() {
  const pathname = usePathname();
  // Preserve the current language when going back home
  const langSlug = pathname.split('/')[1] || defaultSlug;
  const langCode = LANG_OPTIONS.find(l => l.slug === langSlug)?.code || Languages.ENGLISH;
  const langData = languagesData[langCode] || languagesData[Languages.ENGLISH];
  const homeRoute = `/${langSlug}`;
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden">
      
      {/* Giant shadow "404" watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span className="text-[28vw] font-black leading-none text-gray-900/[0.04] drop-shadow-[0_8px_80px_rgba(0,0,0,0.08)]">
          404
        </span>
      </div>

      {/* Background Blobs */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-lg w-full"
      >
        {/* Error Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full"
        >
          {/* Waveform Icon SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-[0.15em] relative top-[0.5px] font-sans">
            {langData.error_404}
          </span>
        </motion.div>

        {/* Animated Broken Link */}
        <div className="flex justify-center mb-8 relative pointer-events-none select-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Image 
                    src="/images/broken_link.png"
                    alt="Broken Link"
                    width={200}
                    height={200}
                    className="object-contain drop-shadow-xl"
                />
            </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-[44px] font-extrabold text-[#1F2937] leading-tight mb-4 tracking-[-0.03em]"
        >
          {langData.page_not_found}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-[17px] font-medium text-[#4B5563] mb-4 tracking-[-0.01em]"
        >
          {langData.not_found_message_1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto mb-10"
        >
          {langData.not_found_message_2}
          <br />
          {langData.not_found_message_3}
        </motion.p>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="h-[3px] w-full max-w-xl mx-auto bg-[#F97316] rounded-full mb-12 origin-center"
        />

        <CustomButton href={homeRoute}>
          {langData.back_to_home}
        </CustomButton>
      </motion.div>
    </div>
  );
}