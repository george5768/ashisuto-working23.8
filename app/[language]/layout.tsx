import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { LANG_OPTIONS, Languages } from '@/app/enum/global';
import { LanguageProvider } from '@/app/context/LanguageContext';
import SmoothScrollProvider from '@/app/components/SmoothScrollProvider';
import TitleManager from '@/app/components/TitleManager';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ChatbotWidget from '@/app/components/ChatbotWidget';
import { Analytics } from '@vercel/analytics/next';

/** Map a URL slug like 'en' to a Languages enum value using LANG_OPTIONS as the source */
function getLangCode(slug: string): Languages | null {
  const option = LANG_OPTIONS.find(l => l.slug === slug);
  return option ? option.code : null;
}

const defaultSlug = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.slug;

/** Pre-render all supported language routes at build time */
export async function generateStaticParams() {
  return LANG_OPTIONS.map(l => ({ language: l.slug }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const langCode = getLangCode(language);

  // Unknown lang slug → redirect to default language
  if (!langCode) redirect(`/${defaultSlug}`);

  return (
    <SmoothScrollProvider>
      <LanguageProvider initialLang={langCode}>
        <TitleManager />
        <Navbar />
        {children}
        <Footer />
        <ChatbotWidget />
        <Analytics />
      </LanguageProvider>
    </SmoothScrollProvider>
  );
}
