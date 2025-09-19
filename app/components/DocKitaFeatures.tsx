'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Feature = {
  title: string;
  points: string[];
  icon: string;
  link: string;
};

const features: Feature[] = [
  {
    title: 'AI Workflow Management System',
    points: [
      'Eliminates Excel and paper document dependency.',
      'Offers an AI-driven platform that delivers smarter decisions.',
    ],
    icon: '/icons/Workflow.png',
    link: '/docKITA'
  },
  {
    title: 'AI Data Prediction & Optimization',
    points: [
      'Reduces costs, improves performance.',
      'Enables smarter decisions with clear insights.',
    ],
    icon: '/icons/ai-prediction.png',
    link: '/ai-prediction-optimization'
  },
  {
    title: 'AI Application Customize',
    points: [
      'Built-in AI agents and AI chatbot.',
      'Automates tasks, saves cost and time.',
      'Offers customization per customer-specific usage.',
    ],
    icon: '/icons/AI-agent.png',
    link: '/ai-application-customize'
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as const, // Using proper easing type
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DocKITAFeatures: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <motion.div
          variants={cardVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6"
        >
          <motion.div
            className="flex-shrink-0"
          >
            <Image
              src="/icons/dockita_logo.png"
              width={250}
              height={250}
              alt="DocKITA Logo"
              className="object-contain"
            />
          </motion.div>
          <motion.p
            variants={cardVariants}
            className="text-xl md:text-2xl text-gray-700 max-w-3xl text-center md:text-left"
          >
            Assist Your Business To Achieve Real Revenue Growth With AI
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {features.map((feature, index) => (
          <Link href={feature.link} key={index}>
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 h-full flex flex-col cursor-pointer"
            >
            <div className="w-24 h-24 mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-md">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={96}
                height={96}
                className="object-contain p-3"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
              {feature.title}
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3 flex-grow">
              {feature.points.map((point, i) => (
                <li key={i} className="text-lg leading-relaxed">{point}</li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <span className="inline-flex items-center text-orange-600 font-semibold group-hover:underline transition-all duration-300">
                Learn more
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default DocKITAFeatures;
