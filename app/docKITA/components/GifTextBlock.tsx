'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GifTextBlockProps {
  gifSrc: string;
  title: string;
  description: string;
}

export default function GifTextBlock({ gifSrc, title, description }: GifTextBlockProps) {
  return (
    <section className="bg-background py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: text */}
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4 text-center md:text-left"
        >
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </motion.div>
        {/* Right: GIF */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={gifSrc}
            width={400}
            height={400}
            alt={title}
            className="w-full h-auto rounded-xl shadow-lg object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}