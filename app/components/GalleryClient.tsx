'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguageContext } from '@/app/context/LanguageContext';
import { simpleGalleryCard } from '../lib/interface';
import { urlFor } from '../lib/sanity';
import { DateFormatUtil } from '@/components/ui/DateFormatUtil';
import CustomButton from '@/components/ui/custom-button';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const revealUp = {
  initial: { opacity: 0, y: 48, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.22 },
};

interface GalleryClientProps {
  data: simpleGalleryCard[];
}

export default function GalleryClient({ data }: GalleryClientProps) {
  const { currentLanguage: t } = useLanguageContext();
  const tt = t as Record<string, string>;

  const displayDate = (date: string | number | Date) => {
    return date ? DateFormatUtil(new Date(date), 15) : '';
  };

  return (
    <section className="relative py-12 px-4 sm:px-5 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-orange-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-amber-500/8 blur-[90px] pointer-events-none" />
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            {...revealUp}
            transition={{ duration: 0.8, ease }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.08] tracking-[-0.03em]">
              {tt.gallery_latest}<span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {tt.gallery_events_news}
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-7 max-w-2xl mx-auto">
              {tt.gallery_description}
            </p>
          </motion.div>
        </div>

        {/* Gallery cards */}
        {data.length > 0 && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
            {data.slice(0, 3).map((post, idx) => (
              <motion.article
                key={idx}
                {...revealUp}
                transition={{ duration: 0.75, ease, delay: 0.04 + idx * 0.1 }}
                className={`group relative rounded-[1.35rem] overflow-hidden border border-white/10 shadow-[0_14px_40px_rgba(15,23,42,0.35)] ${idx === 0 ? 'sm:col-span-2 xl:col-span-1' : ''}`}
              >
                <div className="relative h-[250px] sm:h-[270px] lg:h-[300px]">
                  <Image
                    src={urlFor(post.titleImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-[35%] group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent transition-colors duration-400 group-hover:from-slate-950/80 group-hover:via-slate-950/45" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="mt-2 text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-orange-100/95">
                    {displayDate(post.date)}
                  </div>
                  <div className="overflow-hidden max-h-0 opacity-0 translate-y-2 transition-all duration-400 ease-out group-hover:max-h-40 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="mt-3 text-sm text-slate-100/90 leading-6 line-clamp-2">
                      {post.shortDescription}
                    </p>
                    <div className="mt-3 p-2">
                      <CustomButton 
                        href={`/gallery/${post.currentSlug}`} 
                        hoverShadow={false}
                        className="px-5 py-2.5 rounded-xl w-full sm:w-auto"
                      >
                        {tt.gallery_view_more}
                      </CustomButton>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-[1.35rem] ring-1 ring-white/10 group-hover:ring-orange-300/40 transition-all duration-400 pointer-events-none" />
              </motion.article>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          {...revealUp}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          className="flex justify-center mt-10"
        >
          <CustomButton href="/gallery">
            {tt.gallery_explore_all}
          </CustomButton>
        </motion.div>
      </div>
    </section>
  );
}
