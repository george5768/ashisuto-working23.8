'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SolutionShowcaseProps {
  title: string;
  description: string;
  gifSrc: string;
  youtubeId: string;
}

export default function SolutionShowcase({
  title,
  description,
  gifSrc,
  youtubeId,
}: SolutionShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Video Embed with GIF Overlay */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-xl shadow-lg overflow-hidden"
        >
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 z-10 w-full h-full"
              aria-label="Play video"
            >
              <Image
                src={gifSrc}
                alt="Preview GIF"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-primary text-white px-4 py-2 rounded-md font-semibold shadow">
                  ▶ Watch
                </div>
              </div>
            </button>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title="Solution Demo"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </motion.div>

        {/* Right: Text Block */}
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
      </div>
    </section>
  );
}