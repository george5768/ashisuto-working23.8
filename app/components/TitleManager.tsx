'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Routes } from '@/app/enum/global';

const SITE_NAME = 'Ashisuto Global Technologies';

/** Page name for each route (falsy = use SITE_NAME as-is) */
const PAGE_NAMES: Record<string, string> = {
  [Routes.ABOUT]:                        'About Us',
  [Routes.PARTNERS]:                     'Our Partners',
  [Routes.GALLERY]:                      'Gallery',
  [Routes.CONTACT]:                      'Contact Us',
  [Routes.AI_PREDICTION_OPTIMIZATION]:   'AI Data Prediction & Optimization',
  [Routes.DOC_KITA]:                     'AI Workflow Management System',
  [Routes.AI_APPLICATION_CUSTOMIZE]:     'AI Application Customize',
  [Routes.CYBER_SECURITY]:               'Cybersecurity',
  [Routes.ROBOTICS]:                     'AI Cobots & AGV Robots',
  [Routes.DIGITIZE_RECORDS]:             'AI Digitize Past Records & Documents',
  [Routes.MANUFACTURING_OPERATION]:      'Manufacturing Operation',
  // [Routes.INDUSTRIAL_DESIGN]:         'Industrial Design',
};

/** Updates document.title instantly on every client-side navigation */
export default function TitleManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Strip the leading lang segment: '/en/about' → '/about', '/en' → '/'
    const segments = pathname.split('/');
    const langSegment = segments[1] ?? '';
    const pagePath = segments.length > 2 ? '/' + segments.slice(2).join('/') : '/';

    // Update <html lang> to reflect the current language
    if (langSegment) document.documentElement.lang = langSegment;

    const name = PAGE_NAMES[pagePath];
    document.title = name ? `${name} | ${SITE_NAME}` : SITE_NAME;
  }, [pathname]);

  return null;
}
