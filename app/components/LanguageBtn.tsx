'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageContext } from '@/app/context/LanguageContext';
import { LANG_OPTIONS, langSlug, Languages } from '../enum/global';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageBtnProps {
  navFontSize?: string; // font size, e.g. "13px"
}

const LanguageBtn: React.FC<LanguageBtnProps> = ({
  navFontSize = "12px",
}) => {
  const { getCurrentLang } = useLanguageContext();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = getCurrentLang();

  /**
   * Replace the lang segment in the current URL path and navigate.
   * pathname = '/en/about' → segments[1] = 'en' → replace with e.g. 'jp'
   * result = '/jp/about'
   */
  const handleLangSelect = (option: (typeof LANG_OPTIONS)[number]) => {
    const segments = pathname.split('/'); // ['', 'en', 'about'] or ['', 'en']
    segments[1] = option.slug;           // replace lang segment
    router.push(segments.join('/') || '/');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close dropdown whenever the viewport crosses the lg (1024px) breakpoint
  useEffect(() => {
    let prevIsDesktop = window.innerWidth >= 1024;
    const handler = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop !== prevIsDesktop) {
        prevIsDesktop = isDesktop;
        setOpen(false);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        // Added dynamic cursor class here
        className={`flex items-center gap-2 px-2 py-1 text-[13px] font-bold tracking-tighter transition-all duration-300 outline-none ${
          open 
            ? 'text-orange-600 cursor-default' 
            : 'text-slate-700 hover:text-orange-600 cursor-pointer'
        }`}
      >
        <Globe size={16} strokeWidth={2.5} />
        <span className={`uppercase tracking-[0.12em] text-[${navFontSize}]`}>
          {LANG_OPTIONS.find((l) => l.code === currentLang)?.slug ?? langSlug(Languages.ENGLISH)}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Language Button Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 w-55 bg-gray-50 shadow-2xl border border-gray-200 rounded-t-none rounded-b-xl overflow-hidden z-[60]"
          >
            <div className="py-1">
              {/* Enabled Language */}
              {LANG_OPTIONS.map((lang, i) => {
                const isSelected = currentLang === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleLangSelect(lang)}
                    className={`group w-full flex items-center justify-between pl-5 pr-7 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-l-4 cursor-pointer
                      ${isSelected 
                          ? 'border-orange-500 text-orange-600 bg-orange-50' 
                          : 'border-gray-300 text-slate-500 hover:text-orange-600 hover:border-orange-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="transition-colors">
                        {lang.label}
                      </span>
                    </div>

                    <span className={`text-xs tracking-[0.15em] opacity-60 group-hover:opacity-100 transition-opacity
                      ${isSelected ? 'text-orange-600' : 'text-slate-400'}
                    `}>
                      {lang.slug}
                    </span>
                  </motion.button>
                );
              })}

              {/* Disabled Languages */} {/* Temporary */}
              {/* {LANG_OPTIONS.map((lang, i) => {
                const isEnglish = lang.code === Languages.ENGLISH;
                const isSelected = currentLang === lang.code;
                const isDisabled = !isEnglish;
                return (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => isEnglish && handleLangSelect(lang)}
                    disabled={isDisabled}
                    className={`group w-full flex items-center justify-between pl-5 pr-7 py-4 text-sm font-bold uppercase tracking-wider transition-colors border-l-4 
                      ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                      ${
                        isDisabled 
                        ? 'border-gray-200 bg-gray-50 opacity-60' 
                        : 
                        isSelected 
                          ? 'border-orange-500 text-orange-600 bg-orange-50' 
                          : 'border-gray-300 text-slate-500 hover:text-orange-600 hover:border-orange-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="transition-colors">
                        {lang.label}
                      </span>
                      
                      {isDisabled && (
                        <div className="flex items-center gap-1 opacity-80">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                          <span className="text-[8px] font-black uppercase tracking-tighter text-amber-600">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs tracking-[0.15em] opacity-60 group-hover:opacity-100 transition-opacity
                      ${isSelected ? 'text-orange-600' : 'text-slate-400'}
                    `}>
                      {lang.slug}
                    </span>
                  </motion.button>
                );
              })} */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageBtn