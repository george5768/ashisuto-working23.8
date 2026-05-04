'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ImageAlt, Routes, LANG_OPTIONS, Languages } from '@/app/enum/global';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedinIn, FaInstagram, FaFacebook } from 'react-icons/fa';
import { PiWhatsappLogoBold } from 'react-icons/pi';
import { useLanguageContext } from '@/app/context/LanguageContext';

const socials = [
  { href: 'https://www.youtube.com/@ashisutoglobaltechnologies6942', icon: <BsYoutube className="w-4 h-4" />, label: 'YouTube' },
  { href: 'https://www.linkedin.com/company/ashisuto-global-technologies/', icon: <FaLinkedinIn className="w-4 h-4" />, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/ashisutoglobal/', icon: <FaInstagram className="w-4 h-4" />, label: 'Instagram' },
  { href: 'https://www.facebook.com/ashito.glo', icon: <FaFacebook className="w-4 h-4" />, label: 'Facebook' },
  { href: 'https://wa.link/7ka5zr', icon: <PiWhatsappLogoBold className="w-4 h-4" />, label: 'WhatsApp' },
];

export default function Footer() {
  const pathname = usePathname();
  const { currentLanguage } = useLanguageContext();
  // Extract lang segment from URL: '/en/about' → '/en'; fall back to English slug via enum
  const defaultSlug = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.slug;
  const langRoute = '/' + (pathname.split('/')[1] || defaultSlug);

  const solutions = [
    { href: Routes.AI_PREDICTION_OPTIMIZATION, label: currentLanguage.header_solutions_selection_1 },
    { href: Routes.DOC_KITA,                   label: currentLanguage.header_solutions_selection_2 },
    { href: Routes.AI_APPLICATION_CUSTOMIZE,   label: currentLanguage.header_solutions_selection_3 },
    { href: Routes.CYBER_SECURITY,             label: currentLanguage.header_solutions_selection_4 },
  ];

  const services = [
    { href: Routes.ROBOTICS,               label: currentLanguage.header_services_selection_1 },
    { href: Routes.DIGITIZE_RECORDS,       label: currentLanguage.header_services_selection_2 },
    { href: Routes.MANUFACTURING_OPERATION,label: currentLanguage.header_services_selection_3 },
  ];

  const company = [
    { href: Routes.ABOUT,   label: currentLanguage.header_about },
    { href: Routes.PARTNERS,label: currentLanguage.header_partners },
    { href: Routes.GALLERY, label: currentLanguage.header_gallery },
    { href: Routes.CONTACT, label: currentLanguage.header_contact },
  ];

  return (
    <footer className="bg-gray-950 text-white">
      {/* Orange accent top line */}
      <div className="h-1 bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column – 2 cols wide */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href={langRoute} className="inline-block mb-5 group">
              <Image
                src="/ashisuto-logo-white.png"
                alt={ImageAlt.logo}
                width={150}
                height={52}
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
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
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-orange-500 text-gray-400 hover:text-white border border-white/10 hover:border-orange-500 transition-all duration-300 hover:scale-110"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-5">{currentLanguage.header_solutions}</h4>
            <ul className="space-y-3">
              {solutions.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={langRoute + href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500/50 group-hover:bg-orange-400 transition-colors duration-200 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-5">{currentLanguage.header_services}</h4>
            <ul className="space-y-3">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={langRoute + href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500/50 group-hover:bg-orange-400 transition-colors duration-200 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-5">{currentLanguage.footer_company_heading}</h4>
            <ul className="space-y-3">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={langRoute + href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500/50 group-hover:bg-orange-400 transition-colors duration-200 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Ashisuto Global Technologies Sdn Bhd (1308692U). {currentLanguage.footer_all_rights_reserved}
          </p>
        </div>
      </div>
    </footer>
  );
}