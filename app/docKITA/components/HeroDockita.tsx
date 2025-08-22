'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface LandingSectionProps {
  heading: string;
  tagline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  videoSrc: string;
  imageSrc: string;
  features: Feature[];
}

export default function HeroDockita ({
  heading,
  tagline,
  description,
  ctaPrimary,
  ctaSecondary,
  videoSrc,
  imageSrc,
  features,
}: LandingSectionProps) {
  return (
    <section className="bg-background text-foreground px-4 sm:px-6 lg:px-20 xl:px-60 mx-auto max-w-screen-4xl">

      {/* 🎯 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 py-10 gap-12 text-center md:text-left"
      >
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="max-w-xl space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-primary">{heading}</h1>
          <p className="text-base sm:text-lg text-muted-foreground font-medium">{tagline}</p>
          <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4 w-full sm:w-auto">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
              >
                {ctaPrimary}
              </motion.button>
            </Link>
            <Link href="https://www.youtube.com/watch?v=XqzgRntcqQE">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/10 transition"
              >
                {ctaSecondary}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <Image
            src={videoSrc}
            alt="video of DocKITA"
            width={500}
            height={500}
            className="rounded-xl shadow-xl w-full h-auto object-fill aspect-square"
          />
        </motion.div>
      </motion.div>

      {/* ✨ Features Section */}
      <div className="bg-muted py-10 px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Illustration */}
          
          <motion.div
           initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}> 
            <h1 className='font-bold text-center text-primary text-2xl pb-10'>Value Proposition</h1>
            <Image
            src={imageSrc}
            alt="Illustration"
            width={500}
            height={500}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
          </motion.div>
          
          
          {/* Right: Feature List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
