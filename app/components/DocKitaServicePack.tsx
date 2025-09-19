'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ServiceCategory = {
  title: string;
  items: string[];
  position: string; // Tailwind position classes
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
    position: 'top-0 left-1/2 -translate-x-1/2', // top center
  },
  {
    title: 'AI Data Prediction & Optimization',
    items: ['Big Data', 'Neural Network', 'Machine Learning Models'],
    position: 'top-48 left-0', // bottom left
  },
  {
    title: 'AI Application Customize',
    items: ['AI Agent', 'AI Chatbot', 'Edge LLM'],
    position: 'top-48 right-0', // bottom right
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
    <section className="pt-28 pb-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          DocKITA® AI Service Pack
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Comprehensive AI Solutions for Workflow, Data, and Custom Applications
        </p>
      </div>

      {/* Bubble Chart Container */}
      <div className="relative w-full max-w-4xl mx-auto h-[400px]">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={bubbleVariants}
            whileHover={{ scale: 1.05 }}
            className={`absolute ${category.position} bg-white rounded-full shadow-lg border border-gray-100 w-82 h-82 flex flex-col justify-center items-center p-6 text-center`}
          >
            <h2 className="text-lg font-semibold text-primary mb-4">
              {category.title}
            </h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="flex flex-wrap justify-center gap-2"
            >
              {category.items.map((item, i) => (
                <motion.span
                  key={i}
                  variants={itemVariants}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-medium shadow-sm border border-indigo-100"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DocKITABubbleChart;
