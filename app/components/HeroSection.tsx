'use client'

import HeroSlider from "./HeroSlider";
import CustomButton from "@/components/ui/custom-button";
import { useLanguageContext } from "@/app/context/LanguageContext";
import { usePathname } from 'next/navigation';
import { Routes, LANG_OPTIONS, Languages } from '@/app/enum/global';

const renderHeader = ({
  eyebrow,
  titleTop,
  titleHighlight,
  description,
  showButton = false,
  buttonText = "Visit Us",
  langRoute = '/en',
}: {
  eyebrow: string;
  titleTop: string;
  titleHighlight: string;
  description: string;
  showButton?: boolean;
  buttonText?: string;
  langRoute?: string;
}) => (
  <div className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
    {/* Eyebrow */}
    <div className="flex items-center justify-center sm:justify-start mb-3">
      <div className="inline-flex items-center gap-2">
        <span className="block w-5 h-px bg-orange-400" />
        <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.28em]">
          {eyebrow}
        </span>
        <span className="block w-1.5 h-1.5 rotate-45 bg-orange-400" />
      </div>
    </div>

    {/* Title */}
    <h1 className="text-xl sm:text-3xl lg:text-[2.4rem] font-extrabold text-white leading-[1.15] mb-3 drop-shadow-lg">
      {titleTop}
      <br />
      <span className="text-orange-400">{titleHighlight}</span>
    </h1>

    {/* Separator */}
    <div className="flex justify-center sm:justify-start mb-3">
      <div className="h-px w-12 bg-gradient-to-r from-orange-400 to-transparent" />
    </div>

    {/* Description */}
    <p className="text-xs sm:text-sm lg:text-base text-white/75 mb-5 max-w-xl mx-auto sm:mx-0 leading-relaxed">
      {description}
    </p>

    {/* Optional Button */}
    {showButton && (
      <CustomButton href={langRoute + Routes.CONTACT}>
        {buttonText}
      </CustomButton>
    )}
  </div>
);

export default function HeroSection() {
  const { currentLanguage } = useLanguageContext();
  const pathname = usePathname();
  const defaultSlug = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.slug;
  const langRoute = '/' + (pathname.split('/')[1] || defaultSlug);

  const slides = [
    {
      id: 1,
      backgroundImage: '/images/iot-tokyo.webp',
      alt: 'AI-Powered Workplace Transformation',
      header: renderHeader({
        eyebrow: currentLanguage.home_slider_1_eyebrow,
        titleTop: currentLanguage.home_slider_1_title_top,
        titleHighlight: currentLanguage.home_slider_1_title_highlight,
        description: currentLanguage.home_slider_1_description,
      }),
    },
    {
      id: 2,
      backgroundImage: '/images/cover_2.jpg',
      alt: 'ESG Driven Sustainable Business Growth',
      header: renderHeader({
        eyebrow: currentLanguage.home_slider_2_eyebrow,
        titleTop: currentLanguage.home_slider_2_title_top,
        titleHighlight: currentLanguage.home_slider_2_title_highlight,
        description: currentLanguage.home_slider_2_description,
      }),
    },
    {
      id: 3,
      backgroundImage: '/images/location-background.jpg',
      alt: 'Global Presence – Our Locations',
      header: renderHeader({
        eyebrow: currentLanguage.home_slider_3_eyebrow,
        titleTop: currentLanguage.home_slider_3_title_top,
        titleHighlight: currentLanguage.home_slider_3_title_highlight,
        description: currentLanguage.home_slider_3_description,
        showButton: true,
        buttonText: currentLanguage.home_slider_3_button,
        langRoute,
      }),
    },
  ]

  return <HeroSlider slides={slides} />
  // return <HeroSlider slides={slides} autoPlay={false} />
}