'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
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
            className="absolute right-0 w-48 bg-gray-50 shadow-2xl border border-gray-200 rounded-xl overflow-hidden z-[60]"
          >
            <div className="py-1">
              {LANG_OPTIONS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold uppercase tracking-wide transition-all cursor-pointer border-b border-gray-100 last:border-0 ${
                    currentLang === lang.code
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <span>{lang.label}</span>
                  <span className={`text-xs tracking-[0.12em] ${currentLang === lang.code ? 'text-orange-200' : 'text-slate-400'}`}>
                    {lang.slug}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageBtn