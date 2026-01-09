'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Feature = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

const features: Feature[] = [
  {
    title: 'AI Workflow Management System',
    description: 'Eliminate Excel and paper document dependency with an AI-driven platform that delivers smarter decisions',
    icon: '/icons/Workflow.png',
    link: '/docKITA'
  },
  {
    title: 'AI Data Prediction & Optimization',
    description: 'Reduce costs, improve performance, and make smarter decisions with clear insights',
    icon: '/icons/ai-prediction.png',
    link: '/ai-prediction-optimization'
  },
  {
    title: 'AI Application Customize',
    description: 'Built in AI agents & AI chatbot that automate tasks, save cost and time as per customer specific usage',
    icon: '/icons/AI-agent.png',
    link: '/ai-application-customize'
  },
];
const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
const DocKITAFeatures: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
           <div className="mb-8">
            <Image
              src="/icons/dockitaR.png"
              width={300}
              height={150}
              alt="DocKITA"
              className="object-contain mx-auto"
              priority
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
        

        <div className="relative max-w-3xl mx-auto mb-4">
          <svg className="absolute -top-2 -left-2 w-8 h-8 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-lg md:text-xl text-gray-800 text-center italic px-8 py-4 bg-gradient-to-r from-orange-50/50 to-amber-50/50 rounded-lg border-l-4 border-orange-500">
            <span className="not-italic font-bold text-orange-700">DocKITA®</span> Assist Your Business <span className="not-italic font-bold text-orange-700">Achieve Real Revenue Growth</span> with our AI-powered solutions
          </p>
          <svg className="absolute -bottom-2 -right-2 w-8 h-8 text-orange-300 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
           
          </div>
          
        </div>

    
      <motion.div
            initial="hidden"
            animate="visible"
            
            variants={titleVariants}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              3 Main Pillars of <span className="text-orange-600">DocKITA<span className="align-super text-lg">®</span></span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
          </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >

                <div className="p-6 h-full flex flex-col border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-700 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow mb-4">
                    {feature.description}
                  </p>

                  <Link href={feature.link} className="inline-flex items-center text-orange-600 text-sm font-medium mt-auto">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocKITAFeatures;