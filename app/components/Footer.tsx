'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImageAlt, Routes, LANG_OPTIONS, Languages } from '@/app/enum/global';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedinIn, FaInstagram, FaFacebook } from 'react-icons/fa';
import { PiWhatsappLogoBold } from 'react-icons/pi';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguageContext } from '@/app/context/LanguageContext';

// ─── Social links ────────────────────────────────────────────────────────────
const socials = [
  { href: 'https://www.youtube.com/@ashisutoglobaltechnologies6942', icon: <BsYoutube className="w-4 h-4" />, label: 'YouTube' },
  { href: 'https://www.linkedin.com/company/ashisuto-global-technologies/', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/ashisutoglobal/', icon: <FaInstagram className="w-4 h-4" />, label: 'Instagram' },
  { href: 'https://www.facebook.com/ashito.glo', icon: <FaFacebook className="w-4 h-4" />, label: 'Facebook' },
  { href: 'https://wa.link/7ka5zr', icon: <PiWhatsappLogoBold className="w-4 h-4" />, label: 'WhatsApp' },
];

// ─── Column heading with a small accent bar ──────────────────────────────────
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 text-xs font-bold text-orange-400 mb-5 uppercase tracking-widest">
      {children}
    </h4>
  );
}

// ─── Reusable link list ───────────────────────────────────────────────────────
function NavLinks({ links, langRoute }: { links: { href: string; label: string }[]; langRoute: string }) {
  return (
    <ul className="space-y-3">
      {links.map(({ href, label }) => (
        <li key={href} className="group cursor-pointer">
          <Link
            href={langRoute + href}
            className="text-sm text-gray-400 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-200 block w-full cursor-pointer"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ─── Mobile accordion section ─────────────────────────────────────────────────
function MobileSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group w-full flex items-center justify-between py-4 text-xs font-bold text-orange-400 hover:text-orange-300 text-start cursor-pointer tracking-widest transition-colors duration-200"
      >
        <span className="flex items-center gap-2 uppercase text-start">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 text-orange-400 group-hover:text-orange-300 transition-all duration-300',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-start">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const pathname = usePathname();
  const { currentLanguage } = useLanguageContext();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const defaultSlug = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.slug;
  const langRoute = '/' + (pathname.split('/')[1] || defaultSlug);

  const solutions = [
    { href: Routes.AI_PREDICTION_OPTIMIZATION, label: currentLanguage.header_solutions_selection_1 },
    { href: Routes.DOC_KITA,                   label: currentLanguage.header_solutions_selection_2 },
    { href: Routes.AI_APPLICATION_CUSTOMIZE,   label: currentLanguage.header_solutions_selection_3 },
    { href: Routes.CYBER_SECURITY,             label: currentLanguage.header_solutions_selection_4 },
  ];

  const services = [
    { href: Routes.ROBOTICS,                label: currentLanguage.header_services_selection_1 },
    { href: Routes.DIGITIZE_RECORDS,        label: currentLanguage.header_services_selection_2 },
    { href: Routes.MANUFACTURING_OPERATION, label: currentLanguage.header_services_selection_3 },
  ];

  const company = [
    { href: Routes.ABOUT,                   label: currentLanguage.header_about },
    { href: Routes.GALLERY,                 label: currentLanguage.header_gallery },
    { href: Routes.CONTACT,                 label: currentLanguage.header_contact },
  ];

  function toggleSection(key: string) {
    setOpenSection(prev => (prev === key ? null : key));
  }

  return (
    <footer className="bg-gray-950 text-white">
      {/* Thin solid accent line along the top edge */}
      <div className="h-1 bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600" />

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10">

        {/* Desktop grid: brand (left) + nav columns, all top-aligned */}
        <div className="hidden lg:grid grid-cols-12 gap-x-10">
          <div className="col-span-5">
            {/* Logo — unclickable */}
            <span aria-hidden="true" className="inline-block mb-5">
              <Image
                src="/ashisuto-logo-white.png"
                alt={ImageAlt.logo}
                width={150}
                height={52}
                className="h-10 w-auto select-none pointer-events-none"
                draggable={false}
              />
            </span>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              {currentLanguage.footer_tagline}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-colors duration-200"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-7 grid grid-cols-3 gap-x-8">
            <div>
              <ColumnHeading>{currentLanguage.header_solutions}</ColumnHeading>
              <NavLinks links={solutions} langRoute={langRoute} />
            </div>

            <div>
              <ColumnHeading>{currentLanguage.header_services}</ColumnHeading>
              <NavLinks links={services} langRoute={langRoute} />
            </div>

            <div>
              <ColumnHeading>{currentLanguage.footer_company_heading}</ColumnHeading>
              <NavLinks links={company} langRoute={langRoute} />
            </div>
          </div>
        </div>

        {/* Mobile / tablet: centred brand + accordion nav */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <span aria-hidden="true" className="inline-block mb-4">
            <Image
              src="/ashisuto-logo-white.png"
              alt={ImageAlt.logo}
              width={130}
              height={46}
              className="h-9 w-auto select-none pointer-events-none"
              draggable={false}
            />
          </span>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
            {currentLanguage.footer_tagline}
          </p>

          <div className="flex items-center gap-2.5 mb-8">
            {socials.map(({ href, icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/10 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-colors duration-200"
              >
                {icon}
              </Link>
            ))}
          </div>

          <div className="w-full border-t border-white/10">
            <MobileSection
              title={currentLanguage.header_solutions}
              open={openSection === 'solutions'}
              onToggle={() => toggleSection('solutions')}
            >
              <NavLinks links={solutions} langRoute={langRoute} />
            </MobileSection>
            <MobileSection
              title={currentLanguage.header_services}
              open={openSection === 'services'}
              onToggle={() => toggleSection('services')}
            >
              <NavLinks links={services} langRoute={langRoute} />
            </MobileSection>
            <MobileSection
              title={currentLanguage.footer_company_heading}
              open={openSection === 'company'}
              onToggle={() => toggleSection('company')}
            >
              <NavLinks links={company} langRoute={langRoute} />
            </MobileSection>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-center">
          <p className="text-gray-500 text-xs text-center tracking-wide">
            © {new Date().getFullYear()} Ashisuto Global Technologies Sdn Bhd (1308692U).{' '}
            {currentLanguage.footer_all_rights_reserved}
          </p>
        </div>
      </div>
    </footer>
  );
}