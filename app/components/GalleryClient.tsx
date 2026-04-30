'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MoveRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { simpleGalleryCard } from '../lib/interface';
import { urlFor } from '../lib/sanity';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface GalleryClientProps {
  data: simpleGalleryCard[];
}

export default function GalleryClient({ data }: GalleryClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [cardsReady, setCardsReady] = useState(false);

  const [featured, ...rest] = data;

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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

      <div ref={sectionRef} className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Latest Updates
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
          >
            Events &amp;{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              News
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, ease, delay: 0.22 }}
            className="mt-4 text-slate-400 text-lg max-w-xl leading-relaxed mx-auto"
          >
            Stay ahead of the curve — explore our latest milestones, strategic partnerships,
            and industry-shaping announcements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.36 }}
            onAnimationComplete={() => setCardsReady(true)}
            className="flex justify-center mt-6"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              View all
              <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── Featured card (large) + 2 side cards layout ── */}
        {data.length > 0 && (
          <div className="grid lg:grid-cols-5 gap-6">

            {/* Featured — spans 3 cols */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 44, filter: 'blur(6px)' }}
                animate={cardsReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, ease, delay: 0.05 }}
                className="lg:col-span-3 group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[420px] overflow-hidden">
                  <Image
                    src={urlFor(featured.titleImage).url()}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-8">
                  {/* Date badge */}
                  <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
                    <CalendarDays size={11} />
                    {featured.date}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3 line-clamp-2 group-hover:text-orange-200 transition-colors duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-5">
                    {featured.shortDescription}
                  </p>
                  <Link
                    href={`/gallery/${featured.currentSlug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors group/link"
                  >
                    Read full story
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/5 group-hover:ring-orange-500/30 transition-all duration-500 pointer-events-none" />
              </motion.div>
            )}

            {/* 2 smaller cards — spans 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {rest.slice(0, 2).map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 44, filter: 'blur(5px)' }}
                  animate={cardsReady ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.7, ease, delay: 0.1 + idx * 0.14 }}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-orange-500/30 shadow-lg hover:shadow-orange-900/20 hover:-translate-y-0.5 transition-all duration-300 flex-1 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(post.titleImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-400 text-[10px] font-semibold mb-3">
                      <CalendarDays size={9} />
                      {post.date}
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug line-clamp-2 mb-2 group-hover:text-orange-300 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
                      {post.shortDescription}
                    </p>
                    <Link
                      href={`/gallery/${post.currentSlug}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-bold text-orange-400 hover:text-orange-300 transition-colors group/link"
                    >
                      Read article
                      <ArrowRight size={11} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={cardsReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore All Events &amp; News
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
