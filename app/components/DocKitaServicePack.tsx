'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ServiceCategory = {
  title: string;
  items: string[];
  position: string; // Tailwind position classes
  mobilePosition: string; // Tailwind classes for mobile layout
};

const categories: ServiceCategory[] = [
  {
    title: 'AI Workflow Management System',
    items: [
      'High-speed AI scanning & character recognition',
      'MES',
      'AI Cobot & AGV',
      'Secure Port Access',
    ],
    position: 'md:top-0 md:left-1/2 md:-translate-x-1/2 md:absolute', // top center on desktop
    mobilePosition: 'mb-8', // spacing on mobile
  },
  {
    title: 'AI Data Prediction & Optimization',
    items: ['Big Data', 'Neural Network', 'Machine Learning Models'],
    position: 'md:top-48 md:left-0 md:absolute', // bottom left on desktop
    mobilePosition: 'mb-8', // spacing on mobile
  },
  {
    title: 'AI Application Customize',
    items: ['AI Agent', 'AI Chatbot', 'Edge LLM'],
    position: 'md:top-48 md:right-0 md:absolute', // bottom right on desktop
    mobilePosition: 'mb-8', // spacing on mobile
  },
];

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const DocKITABubbleChart: React.FC = () => {
  return (
    <section className="pt-28 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          DocKITA® AI Service Pack
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Comprehensive AI Solutions for Workflow, Data, and Custom Applications
        </p>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Mobile - Stacked layout */}
        <div className="md:hidden space-y-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              {/* Parent Card - Darker color for title */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={bubbleVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 text-white rounded-2xl shadow-lg border border-gray-700 h-32 flex items-center justify-center"
              >
                <h2 className="text-lg md:text-xl font-semibold text-center px-4">
                  {category.title}
                </h2>
              </motion.div>
              
              {/* Child Cards - Items */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="space-y-3 w-full"
              >
                {category.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="bg-charcoal text-gray-100 rounded-xl shadow-md border px-4 py-3 text-sm font-medium w-full text-center flex items-center justify-center"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Desktop - 3 Column Grid Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Parent Card - Darker color for title */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={bubbleVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 text-white rounded-2xl shadow-lg border border-gray-700 w-full h-32 flex items-center justify-center mb-6"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-center px-4">
                    {category.title}
                  </h2>
                </motion.div>
                
                {/* Child Cards - Items */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  className="space-y-3 w-full"
                >
                  {category.items.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="bg-charcoal text-gray-100 rounded-xl shadow-md px-4 py-3 text-sm font-medium w-full flex items-center justify-center min-h-[70px]"
                    >
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocKITABubbleChart;
