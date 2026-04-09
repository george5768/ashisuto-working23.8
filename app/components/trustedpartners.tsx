'use client'

import Image from "next/image";
import { motion } from 'framer-motion';
import { useLanguageContext } from '../context/LanguageContext';

const partners = [
  { src: '/images/3drens.png', width: 220, height: 90, alt: '3drens' },
  { src: '/Ricoh_logo_2012.svg', width: 180, height: 60, alt: 'Ricoh' },
  { src: '/images/ziontech.png', width: 240, height: 110, alt: 'Ziontech', isLarge: true },
];

const loopPartners = [...partners, ...partners, ...partners];

export default function TrustedPartners() {
  const { currentLanguage: t } = useLanguageContext();

  return (
    <section className="w-full bg-muted/30 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-4">
            {t.trusted_partners_title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full origin-center"
          />
        </motion.div>

        {/* Tablet & Mobile: auto-scrolling row */}
        <div className="lg:hidden overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <motion.div
              animate={{ x: ['0%', '-33.333%'] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-12 w-max px-4"
            >
              {loopPartners.map((partner, i) => (
                <motion.div
                  key={`${partner.alt}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.07 }}
                  className="group flex items-center justify-center"
                >
                  <div className={`relative flex items-center justify-center h-20 sm:h-24 px-3 transition-all duration-300 ${partner.isLarge ? 'scale-125 sm:scale-[1.35]' : 'scale-100'}`}>
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={partner.width}
                      height={partner.height}
                      className="w-auto h-full object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop: static row */}
        <div className="hidden lg:flex items-center justify-center gap-16">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="group flex items-center justify-center"
            >
              <div className={`relative flex items-center justify-center h-24 md:h-32 px-4 transition-all duration-300 ${partner.isLarge ? 'scale-125 md:scale-[1.4]' : 'scale-100'}`}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className="w-auto h-full object-contain"
                  priority
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}