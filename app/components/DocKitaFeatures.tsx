'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Service = {
  title: string;
  description: string;
  icon: string;
  link: string;
  features: string[];
  isFlagship?: boolean;
  stats?: string;
};

const ServiceIcon: React.FC<{ src: string; alt: string; size?: number; className?: string }> = ({ src, alt, size = 56, className }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={"flex items-center justify-center " + (className ?? "")} aria-label={`${alt} icon (fallback)`}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm-2 4h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v1h2v2H9v-2h2v-1H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" fill="currentColor" className="text-orange-600" />
        </svg>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={"object-contain " + (className ?? "")}
      priority
      onError={() => setError(true)}
    />
  );
};

const services: Service[] = [
  {
    title: 'AI Workflow Management System',
    description: 'Eliminate Excel and paper document dependency with an AI-driven platform that delivers smarter decisions',
    icon: '/icons/Workflow.png',
    link: '/docKITA',
    features: ['Signature Workflow', 'Process Workflow', 'Secure Port Access (KUROKO)'],
    stats: 'Smarter. Faster. Traceable. '
  },
  {
    title: 'AI Data Prediction & Optimization',
    description: 'Reduce costs, improve performance, and make smarter decisions with clear insights',
    icon: '/icons/ai-prediction.png',
    link: '/ai-prediction-optimization',
    features: ['Non-Code Machine Learning', 'AI Studio', 'AI Lifecycle Management'],
    isFlagship: true,
    stats: 'Most Popular Service'
  },
  {
    title: 'AI Application Customize',
    description: 'Built in AI agents & AI chatbot that automate tasks, save cost and time as per customer specific usage',
    icon: '/icons/AI-agent.png',
    link: '/ai-application-customize',
    features: ['Accelerated Agentic AI', 'AI Chatbot', 'Edge LLM'],
    stats: 'Automate. Personalize. Scale.'
  },
];

const DocKITAServices: React.FC = () => {
  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-2xl ring-2 ring-orange-400/50"
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 2.5%)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-10">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-white to-amber-50 shadow-2xl ring-4 ring-white/50 flex items-center justify-center p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Image
                        src="/icons/dockita_logo.png"
                        alt="DocKITA logo"
                        width={80}
                        height={80}
                        className="object-contain drop-shadow-md"
                        priority
                      />
                    </div>

                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-orange-900 text-xs font-bold rounded-full border border-amber-300 shadow-lg">
                      ★ Our Product
                    </div>
                  </div>


                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <span className="text-xs font-semibold">YOUR AI PARTNER</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      DocKITA<span className="align-super text-xl">®</span>
                      <span className="block text-xl md:text-2xl font-semibold text-amber-100 mt-2">
                        Assist Your Business Achieve Real Revenue Growth With AI
                      </span>
                    </h1>
                    <p className="mt-4 text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">
                      Transform your operations with our intelligent AI solutions. We deliver measurable results through innovative technology designed for your business growth.
                    </p>


                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-orange-700 font-bold shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <span className="text-lg">Book a Free Consultation</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      {/* <div className="text-white/80 text-sm">
                        <span className="font-semibold">Our 3 Main Pillars:</span>
                        <span className="ml-2">Workflow Management • Data Prediction • Application Customize</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        <div className="relative mb-20">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"></span>
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Our Core Solutions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-orange-600">3 Main Pillars</span> of DocKITA®
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our comprehensive AI solutions designed to drive your business forward
            </p>
          </div>

          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 -translate-y-1/2 z-0"></div>
          <div className="hidden lg:block absolute top-1/2 left-1/3 w-1 h-24 bg-gradient-to-b from-orange-300 to-transparent -translate-x-1/2 -translate-y-12 z-0"></div>
          <div className="hidden lg:block absolute top-1/2 left-2/3 w-1 h-24 bg-gradient-to-b from-orange-300 to-transparent -translate-x-1/2 -translate-y-12 z-0"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className={`h-full rounded-2xl border-2 ${service.isFlagship ? 'border-orange-400 shadow-2xl' : 'border-orange-200'} bg-white overflow-hidden hover:shadow-xl transition-all duration-300`}>

                  <div className={`p-6 ${service.isFlagship ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-gradient-to-r from-orange-50 to-amber-50'} border-b ${service.isFlagship ? 'border-orange-400' : 'border-orange-200'}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl ${service.isFlagship ? 'bg-white' : 'bg-gradient-to-br from-orange-100 to-amber-100'} border ${service.isFlagship ? 'border-orange-300' : 'border-orange-200'} flex items-center justify-center`}>
                        <ServiceIcon
                          src={service.icon}
                          alt={service.title}
                          size={32}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-bold ${service.isFlagship ? 'text-white' : 'text-gray-900'}`}>
                            {service.title}
                          </h3>
                          {/* {service.isFlagship && (
                            <span className="px-2 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold">
                              ⭐ 
                            </span>
                          )} */}
                        </div>
                        {service.stats && (
                          <div className={`text-sm ${service.isFlagship ? 'text-white/90' : 'text-orange-600'} font-medium mt-1`}>
                            {service.stats}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${service.isFlagship ? 'text-white/90' : 'text-gray-700'}`}>
                      {service.description}
                    </p>
                  </div>

                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">What This Pillar Delivers:</h4>
                    <div className="space-y-3">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 border border-orange-200 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <Link
                        href={service.link}
                        className={`inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold transition-all duration-300 ${service.isFlagship
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border border-orange-200 hover:bg-orange-100'}`}
                      >
                        <span>{service.isFlagship ? 'Learn More' : 'Learn More'}</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>


                <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 border-2 border-white shadow-lg"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          {/* Connecting Line to DocKITA */}
          <div className="mb-10 relative">
            <div className="h-1 bg-gradient-to-r from-orange-300 to-orange-300 w-full max-w-2xl mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-white"></div>
            </div>
          </div>

          {/* Growth Summary */}
          {/* <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-white to-orange-50 border-2 border-orange-100 shadow-lg">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl">
                  <Image src="/icons/dockita_logo.png" alt="DocKITA" width={48} height={48} className="object-contain" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-orange-600">↗</span>
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Driving Business Growth Through <span className="text-orange-600">AI Innovation</span>
                </h2>
                <p className="text-gray-600 mt-1">3 Pillars, One Goal: Your Success</p>
              </div>
            </div>

            <p className="text-gray-700 mb-8 text-lg">
              Each of our 3 main pillars is designed to work independently or together, providing flexible AI solutions that 
              directly contribute to your business growth, efficiency, and competitive advantage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-b from-white to-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">1</div>
                <div className="font-semibold text-gray-800 mb-2">Workflow Efficiency</div>
                <div className="text-sm text-gray-600">Streamline operations, reduce manual work</div>
              </div>
              <div className="bg-gradient-to-b from-white to-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
                <div className="font-semibold text-gray-800 mb-2">Data Intelligence</div>
                <div className="text-sm text-gray-600">Make smarter, data-driven decisions</div>
              </div>
              <div className="bg-gradient-to-b from-white to-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">3</div>
                <div className="font-semibold text-gray-800 mb-2">Custom Automation</div>
                <div className="text-sm text-gray-600">Tailor AI solutions to your needs</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Growth Journey
              </Link>
              <Link 
                href="/case-studies" 
                className="px-8 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg border-2 border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-300"
              >
                View Success Stories
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-orange-100">
              <div className="text-sm text-gray-600 font-medium">
                <span className="text-orange-600 font-bold">✓</span> Each pillar delivers measurable ROI
                <span className="mx-4">•</span>
                <span className="text-orange-600 font-bold">✓</span> Implementation support included
                <span className="mx-4">•</span>
                <span className="text-orange-600 font-bold">✓</span> Scalable solutions for any business size
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default DocKITAServices;