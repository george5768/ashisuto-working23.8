'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";
import DocKITAFeatures from "./DocKitaFeatures";
import DocKITAServicePack from "./DocKitaServicePack";

const solutions = [
  {
    title: 'Digitalize Past Records & Documents',
    description: 'Transform physical records into searchable digital files with high-speed scanning and AI-powered character recognition. Your data is safely stored in the cloud or storage device.',
    image: '/icons/digitise-past-records.png',
    link: '/digitize-records'
  },
  {
    title: 'Robtics & IoT System Development',
    description: 'We create AI-driven robotics and IoT solutions, including cobots and AGVs, to boost productivity, accuracy, and operational efficiency.',
    image: '/icons/robot-arm.svg',
    link: '/robotics'
  },
  {
    title: 'Manufacturing Operation',
    description: 'Our focus solution, Mfg Execution System (MES), Advance Planning Schedule & CMMS provides effective planning and maintenance.',
    image: '/icons/operation-management.png',
    link: '/manufacturing-operation'
  },
  {
    title: 'Cybersecurity – Secure Port Access',
    description: 'Secure Port Access technology prevents cyberattacks without requiring a global IP, ensuring safe and reliable operations.',
    image: '/icons/cyber-security.png',
    link: '/cyber-security'
  },
  {
    title: 'Industrial Design & UI/UX Design',
    description: 'With our Concept Convergence activities to turn ideas into reality using creativity design to create the real world impact.',
    image: '/icons/industrial-design.png',
    link: '/industrial-design'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SolutionsSection() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-16 px-4 md:px-8 lg:px-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div className="text-center mb-16">
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Our <span className="font-semibold text-orange-600">Solutions</span>
          </motion.h2>
          <motion.div
            variants={cardVariants}
            className="w-32 h-1 bg-orange-600 mx-auto mt-8 rounded-full"
          ></motion.div>
        </motion.div>

        <DocKITAFeatures/>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto auto-rows-fr"
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href={solution.link}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 h-full flex flex-col">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300 flex-shrink-0">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      width={64}
                      height={64}
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-10 text-gray-900 group-hover:text-orange-600 transition-colors duration-300 leading-tight flex-shrink-0 h-12">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow mb-6">
                    {solution.description}
                  </p>
                  <div className="mt-auto text-center">
                    <span className="inline-flex items-center text-orange-600 font-semibold group-hover:underline transition-all duration-300">
                      Learn more
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <DocKITAServicePack />
      </motion.div>
    </section>
  );
}
