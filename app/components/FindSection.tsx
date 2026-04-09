'use client';

// https://builder.io/app/projects/b87d07c460e64b6ba235a1e3214e53bf/main
// /find-section-ideas

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Share2, UserCheck, Wifi } from 'lucide-react';

const FIND_URL = 'https://find.ashisuto-tech.com/';

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Optimized for iPhone & Android — share your card instantly from any device.',
  },
  {
    icon: Share2,
    title: 'One-Tap Sharing',
    description: 'Share your digital business card via link, QR code, or social platforms.',
  },
  {
    icon: UserCheck,
    title: 'Always Up-to-Date',
    description: 'Edit your info anytime — contacts always see your latest details.',
  },
  {
    icon: Wifi,
    title: 'No App Required',
    description: 'Recipients open it instantly in any browser. Zero installs needed.',
  },
];

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FindSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background accent blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-orange-100/60 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-amber-50/80 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-black uppercase tracking-widest mb-5">
              <Smartphone size={12} />
              Our App Product
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
              Digital Business Cards,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Reimagined
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              <strong className="text-gray-900">Ashisuto Find</strong> replaces paper cards with a smart, always-on digital profile. Share contacts, portfolios, and social links — all from a single tap on your iPhone.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-orange-50/70 border border-orange-100 hover:bg-orange-50 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 shadow-sm shadow-orange-200">
                    <feat.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{feat.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href={FIND_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:opacity-95 transition-all duration-300 group"
            >
              Try Ashisuto Find
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>

            {/* Trust note */}
            <p className="text-xs text-gray-400 mt-4">
              Opens in browser &nbsp;·&nbsp; No download required
            </p>
          </motion.div>

          {/* ── Right: Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">

              {/* Decorative glow ring behind phone */}
              <div className="absolute inset-0 -m-6 rounded-[3rem] bg-gradient-to-br from-orange-300/30 to-amber-300/20 blur-2xl" />

              {/* iPhone Frame */}
              <div className="relative w-[260px] sm:w-[280px]">
                {/* Phone shell */}
                <div className="relative rounded-[42px] bg-gray-900 p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
                  {/* Side button */}
                  <div className="absolute -right-[3px] top-[88px] w-[3px] h-10 rounded-r-full bg-gray-700" />
                  {/* Volume buttons */}
                  <div className="absolute -left-[3px] top-[76px] w-[3px] h-6 rounded-l-full bg-gray-700" />
                  <div className="absolute -left-[3px] top-[110px] w-[3px] h-6 rounded-l-full bg-gray-700" />

                  {/* Screen */}
                  <div className="rounded-[34px] overflow-hidden bg-white">
                    {/* Dynamic island */}
                    <div className="flex justify-center pt-3 pb-1 bg-gray-900">
                      <div className="w-[90px] h-[26px] rounded-full bg-black" />
                    </div>

                    {/* App content */}
                    <div className="bg-gradient-to-b from-orange-50 to-white min-h-[480px] px-5 pt-5 pb-6 flex flex-col">

                      {/* App header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[11px] font-black text-orange-600 tracking-widest uppercase">Ashisuto Find</span>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <Smartphone size={12} className="text-white" />
                        </div>
                      </div>

                      {/* Card mockup */}
                      <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 mb-5 shadow-lg shadow-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-white/30 border-2 border-white/60" />
                          <div>
                            <div className="h-2.5 w-20 rounded-full bg-white/80 mb-1.5" />
                            <div className="h-2 w-14 rounded-full bg-white/50" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-full rounded-full bg-white/30" />
                          <div className="h-1.5 w-3/4 rounded-full bg-white/30" />
                        </div>
                        {/* QR hint */}
                        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-lg bg-white/20 grid grid-cols-3 gap-[2px] p-1.5">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-[1px] ${[0,2,6,8,4].includes(i) ? 'bg-white' : 'bg-white/30'}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Social links row */}
                      <div className="flex gap-2 mb-5">
                        {['in', 'tw', 'gh', 'em'].map((s) => (
                          <div key={s} className="flex-1 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                            <span className="text-[9px] font-black text-orange-500">{s}</span>
                          </div>
                        ))}
                      </div>

                      {/* Share button */}
                      <div className="w-full h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center gap-1.5 shadow-md shadow-orange-200 mb-4">
                        <Share2 size={12} className="text-white" />
                        <span className="text-[11px] font-bold text-white">Share My Card</span>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2">
                        {[['24', 'Views'], ['8', 'Shares'], ['3', 'Saves']].map(([n, l]) => (
                          <div key={l} className="bg-orange-50 rounded-xl py-2 text-center border border-orange-100">
                            <p className="text-sm font-black text-orange-600">{n}</p>
                            <p className="text-[8px] text-gray-400 font-medium">{l}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Home bar */}
                    <div className="bg-white flex justify-center py-2">
                      <div className="w-24 h-1 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-6 bg-white rounded-2xl px-3 py-2 shadow-xl border border-orange-100 flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <UserCheck size={11} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-900 leading-none">Smart Card</p>
                    <p className="text-[8px] text-gray-400 mt-0.5">iPhone Ready</p>
                  </div>
                </motion.div>

                {/* "Free to try" badge */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -left-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
                >
                  <Share2 size={12} className="text-white" />
                  <p className="text-[10px] font-black text-white leading-none">Tap to Share</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
