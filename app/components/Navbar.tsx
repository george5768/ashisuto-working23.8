"use client";

import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ImageAlt, Routes } from '@/app/enum/global';
import { useLanguageContext } from '@/app/context/LanguageContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LanguageBtn from "./LanguageBtn";
import { usePathname } from 'next/navigation';
import { LANG_OPTIONS, Languages } from '@/app/enum/global';

export default function Navbar() {
  const { currentLanguage, getCurrentLang } = useLanguageContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // e.g. '/en' or '/jp' — prefix for all nav hrefs
  const langRoute = LANG_OPTIONS.find(l => l.code === getCurrentLang())?.route ?? LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.route;

  const duration = 0.5;
  const navFontSize = "13px";

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Auto-close mobile menu when viewport widens to desktop (≥1024px) */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  /* Close mobile menu on outside click */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  /*
   * - On open: auto-expand the dropdown whose child matches the current route
   * - On close: collapse the dropdown UNLESS its child is the active route
   */
  useEffect(() => {
    if (mobileOpen) {
      setOpenDropdown(null);
      const activeItem = navItems.find(item =>
        item.dropdown?.some(sub => sub.href === pathname)
      );
      if (activeItem) setOpenDropdown(activeItem.label);
      return;
    }
    // Closing: keep dropdown open only if it contains the active route
    if (!openDropdown) return;
    const openItem = navItems.find((item) => item.label === openDropdown);
    const hasActiveChild = openItem?.dropdown?.some((sub) => sub.href === pathname);
    if (!hasActiveChild) setOpenDropdown(null);
    // navItems is recomputed each render; reading at transition-time is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  const navItems = [
    { href: `${langRoute}${Routes.ABOUT}`, label: currentLanguage.header_about },
    { href: `${langRoute}${Routes.AWS}`, label: 'AWS' },
    {
      label: currentLanguage.header_solutions,
      dropdown: [
        { href: `${langRoute}${Routes.AI_PREDICTION_OPTIMIZATION}`, label: currentLanguage.header_solutions_selection_1 },
        { href: `${langRoute}${Routes.DOC_KITA}`, label: currentLanguage.header_solutions_selection_2 },
        { href: `${langRoute}${Routes.AI_APPLICATION_CUSTOMIZE}`, label: currentLanguage.header_solutions_selection_3 },
        { href: `${langRoute}${Routes.CYBER_SECURITY}`, label: currentLanguage.header_solutions_selection_4 },
      ],
    },
    {
      label: currentLanguage.header_services,
      dropdown: [
        { href: `${langRoute}${Routes.ROBOTICS}`, label: currentLanguage.header_services_selection_1 },
        { href: `${langRoute}${Routes.DIGITIZE_RECORDS}`, label: currentLanguage.header_services_selection_2 },
        { href: `${langRoute}${Routes.MANUFACTURING_OPERATION}`, label: currentLanguage.header_services_selection_3 },
      ],
    },

     { href: 'https://www.ashisuto-tech.com/en/20260730-semiconductor-event', label: 'EVENT' },
    // { href: `${langRoute}${Routes.PARTNERS}`, label: currentLanguage.header_partners },
    { href: `${langRoute}${Routes.GALLERY}`, label: currentLanguage.header_gallery },
    { href: `${langRoute}${Routes.CONTACT}`, label: currentLanguage.header_contact },
  ];

  const menuVariants: Variants = {
    // 1. Starts as a tiny point at the top-right
    hidden: {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
      opacity: 0,
    },
    // 2. Expands to cover the whole area
    open: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      transition: { 
        duration, 
        ease: [0.4, 0, 0.2, 1] 
      },
    },
    // 3. RETRACTS back to that same top-right point
    exit: {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
      opacity: 0,
      transition: { 
        duration: duration * 1.5,
        ease: [0.4, 0, 0.2, 1] 
      },
    },
  };

  const MenuTransition = {
    duration,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  };

  const MenuLines = [
    mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
    mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
    mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
  ];

  /**
   * Shared spring-animated underline for top-level nav items.
   * Uses layoutId so the orange bar slides between active items.
   */
  const renderUnderline = (active: boolean | undefined, lineLength: number) => {
    if (!active) return null;
    // Full class names written out so Tailwind JIT can detect them
    const inset = lineLength === 4 ? 'left-4 right-4' : 'left-5 right-5';
    return (
      <motion.div
        layoutId="nav-underline"
        className={`absolute bottom-1 h-[2px] bg-orange-600 ${inset}`}
        initial={false}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    );
  };

  return (
    <header ref={headerRef} className="sticky top-0 left-0 right-0 z-[55] bg-white border-b border-gray-100 shadow-sm py-4">
      <div className="relative z-[2] max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo — dimmed + non-clickable when mobile menu is open */}
          <Link
            href={langRoute}
            onClick={(e) => {
              if (mobileOpen) e.preventDefault();
            }}
            aria-disabled={mobileOpen}
            tabIndex={mobileOpen ? -1 : 0}
            className={`flex-shrink-0 transition-opacity hover:opacity-80 ${
              mobileOpen
                ? 'pointer-events-none select-none opacity-40 lg:pointer-events-auto lg:select-auto lg:opacity-100'
                : ''
            }`}
          >
            <Image
              src="/logo orange.png"
              width={140}
              height={45}
              alt={ImageAlt.logo}
              className="h-8 lg:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* ─── Desktop Navigation ─── */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive =
                item.href === pathname ||
                item.dropdown?.some((sub) => sub.href === pathname);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                >
                  {item.dropdown ? (
                    <>
                      {/* Dropdown trigger */}
                      <button
                        className={`relative flex cursor-pointer items-center gap-1.5 text-[${navFontSize}] uppercase tracking-[0.12em] font-bold transition-colors px-4 py-2 outline-none ${
                          openDropdown === item.label || isActive
                            ? 'text-orange-600'
                            : 'text-slate-900 hover:text-orange-600'
                        }`}
                      >
                        {item.label}
                        {/* Spring underline when any child route is active */}
                        {renderUnderline(isActive, 4)}
                      </button>

                      {/* Dropdown panel */}
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mx-0 mt-[-1px] min-w-80 bg-gray-100 shadow-xl rounded-b-xl overflow-hidden z-10"
                          >
                            <div className="bg-gray-100 border-y border-gray-200 py-1">
                              {item.dropdown?.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`flex items-center pl-10 pr-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer border-l-4 ${
                                    pathname === sub.href
                                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                                      : 'border-gray-300 text-slate-500 hover:text-orange-600 hover:border-orange-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    /* Regular link */
                    <Link
                      href={item.href!}
                      className={`relative block cursor-pointer px-5 py-3 text-[${navFontSize}] uppercase tracking-[0.12em] font-bold transition-colors ${
                        isActive ? 'text-orange-600' : 'text-slate-900 hover:text-orange-600'
                      }`}
                    >
                      {item.label}
                      {renderUnderline(isActive, 5)}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop: Language button */}
          <div className="hidden lg:flex items-center gap-6 ml-4 pl-8">
            <LanguageBtn navFontSize={navFontSize} />
          </div>

          {/* Mobile: Language button + animated hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageBtn navFontSize={navFontSize} />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 text-slate-900 hover:text-orange-600 transition-colors cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-[22px] h-[16px] flex flex-col justify-between">
                {MenuLines.map((animate, i) => (
                  <motion.span
                    key={i}
                    animate={animate}
                    transition={MenuTransition}
                    className="block h-0.5 w-full bg-current rounded-full origin-center"
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Menu ─── full-page overlay, z-[1] within header stacking context (above chatbot z-50 outside) */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="open"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 z-[1] bg-white flex flex-col h-screen overflow-hidden"
          >
            {/* Spacer so content clears the visible header bar (~64px) — does NOT scroll */}
            <div className="flex-shrink-0 pt-[65px]" />

            {/* Scrollable nav area */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain scrollbar-bold touch-pan-y"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <nav className="py-2 border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)]">
                {navItems.map((item) => {
                  const isTabActive =
                    item.href === pathname ||
                    item.dropdown?.some((sub) => sub.href === pathname);
                  const isDropdownOpen = openDropdown === item.label;

                  return (
                    <div key={item.label}>
                      {item.href ? (
                        /* ── Regular link ── */
                        <Link
                          href={item.href}
                          onClick={() => {
                            setOpenDropdown(null);
                            setMobileOpen(false);
                          }}
                          className={`flex items-center px-6 py-3.5 text-[${navFontSize}] font-bold uppercase tracking-wider transition-colors cursor-pointer border-l-4 ${
                            isTabActive
                              ? 'border-orange-600 bg-orange-600 text-white'
                              : 'border-transparent text-slate-700 hover:text-orange-600 hover:bg-gray-50 hover:border-orange-200'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        /* ── Accordion dropdown ── */
                        <>
                          <button
                            onClick={() =>
                              setOpenDropdown(isDropdownOpen ? null : item.label)
                            }
                            className={`w-full flex items-center justify-between px-6 py-3.5 text-[${navFontSize}] font-bold uppercase tracking-wider transition-colors cursor-pointer border-l-4 ${
                              isTabActive
                                ? 'border-orange-600 bg-orange-600 text-white'
                                : isDropdownOpen
                                ? 'border-orange-400 text-orange-600 bg-orange-50'
                                : 'border-transparent text-slate-700 hover:text-orange-600 hover:bg-gray-50 hover:border-orange-200'
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown 
                              size={15} 
                              className={`transition-transform duration-300 ${openDropdown === item.label ? 'rotate-180' : ''}`} 
                            />
                          </button>

                          <AnimatePresence initial={false} mode="sync">
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="bg-gray-100 border-y border-gray-200 py-1">
                                  {item.dropdown?.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => {
                                        setOpenDropdown(null);
                                        setMobileOpen(false);
                                      }} 
                                      className={`flex items-center pl-10 pr-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer border-l-4 ml-4 ${
                                        pathname === sub.href
                                          ? 'border-orange-600 bg-orange-50 text-orange-700'
                                          : 'border-gray-200 text-slate-500 hover:text-orange-600 hover:border-orange-300 hover:bg-white'
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
