'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Routes } from '@/app/enum/global';
import { useLanguageContext } from '@/app/context/LanguageContext';

const SITE_NAME = 'Ashisuto Global Technologies';

/** Updates document.title instantly on every client-side navigation or language change */
export default function TitleManager() {
  const pathname = usePathname();
  const { currentLanguage } = useLanguageContext();

  useEffect(() => {
    // Strip the leading lang segment: '/en/about' → '/about', '/en' → '/'
    const segments = pathname.split('/');
    const langSegment = segments[1] ?? '';
    const pagePath = segments.length > 2 ? '/' + segments.slice(2).join('/') : '/';

    // Update <html lang> to reflect the current language
    if (langSegment) document.documentElement.lang = langSegment;

    const PAGE_NAMES: Record<string, string> = {
      [Routes.ABOUT]:                       currentLanguage.page_tab_title_about,
      [Routes.PARTNERS]:                    currentLanguage.page_tab_title_partners,
      [Routes.GALLERY]:                     currentLanguage.page_tab_title_gallery,
      [Routes.CONTACT]:                     currentLanguage.page_tab_title_contact,
      [Routes.AI_PREDICTION_OPTIMIZATION]:  currentLanguage.page_tab_title_ai_prediction_optimization,
      [Routes.DOC_KITA]:                    currentLanguage.page_tab_title_doc_kita,
      [Routes.AI_APPLICATION_CUSTOMIZE]:    currentLanguage.page_tab_title_ai_application_customize,
      [Routes.CYBER_SECURITY]:              currentLanguage.page_tab_title_cyber_security,
      [Routes.ROBOTICS]:                    currentLanguage.page_tab_title_robotics,
      [Routes.DIGITIZE_RECORDS]:            currentLanguage.page_tab_title_digitize_records,
      [Routes.MANUFACTURING_OPERATION]:     currentLanguage.page_tab_title_manufacturing_operation,
    };

    const name = PAGE_NAMES[pagePath];
    document.title = name ? `${name} | ${SITE_NAME}` : SITE_NAME;
  }, [pathname, currentLanguage]);

  return null;
}
