import React, { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Accolade {
  id: number;
  logoSrc: string;
  logoAlt: string;
  title: string;
  description: string;
}

const accoladesData: Accolade[] = [
  {
    id: 1,
    logoSrc: '/images/md-logo.png',
    logoAlt: 'MD Logo',
    title: 'MD Status Company',
    description: 'Awarded Malaysia Digital Status by MDEC (Malaysia Digital Economy Corporation) as a recognized enabler in AI, Blockchain, and Big Data.',
  },
  {
    id: 2,
    logoSrc: '/images/IPAG.png',
    logoAlt: 'IPAG Logo',
    title: 'R & D Status Company',
    description: 'Innovasi Penyelidikan AG Sdn. Bhd., under Ashisuto Group, is MIDA (Malaysian Investment Development Authority) R&D Status certified company, offering clients double tax exemptions and innovative digital transformation solutions.',
  },
  {
    id: 3,
    logoSrc: '/images/MOF.jpeg',
    logoAlt: 'MOF logo',
    title: 'Ministry of Finance (Malaysia) Registered Company',
    description: 'We are a trusted provider for public sector and Government Links Companies, delivering secure solutions that drives digital transformation and innovation.',
  },
  {
    id: 4,
    logoSrc: '/images/hrd-logo.png',
    logoAlt: 'HRD Corp logo',
    title: 'HRD Corp. Registered Training Provider',
    description: 'We are certified by HRD (Human Resource Development) Corporation as a training provider, with accredited Train-the-Trainer (TTT) certification',
  },
  {
    id: 5,
    logoSrc: '/images/mpc-cert.png',
    logoAlt: 'MPC Certificate',
    title: 'Productivity Champion in LEADER Category',
    description: 'We are recognized as Productivity Champion in LEADER category by MPC (Malaysia Productivity Corporation).',
  },
  {
    id: 6,
    logoSrc: '/images/awscert1.png',
    logoAlt: 'AWS Certificate',
    title: 'Amazon Web Services (AWS) Partners',
    description: 'We are an AWS Partner, demonstrating our commitment to delivering reliable, secure, and scalable cloud solutions built on Amazon Web Services (AWS).',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const AccoladesGrid: FC = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {accoladesData.map(({ id, logoSrc, logoAlt, title, description }) => {
            const isLargeLogo = id === 4 || id === 6 || id === 5;

            return (
              <motion.div
                key={id}
                variants={itemVariants}
                className="flex flex-col items-center gap-6 bg-white border border-gray-200 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                
                <div className={`
                  flex-shrink-0 rounded-xl overflow-hidden bg-white 
                  flex items-center justify-center border border-gray-100
                  ${isLargeLogo
                    ? 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 p-3 md:p-4'
                    : 'w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 p-2 md:p-3'
                  }
                `}>
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={isLargeLogo ? 400 : 300}
                    height={isLargeLogo ? 400 : 300}
                    className="w-full h-full object-contain"
                    priority={isLargeLogo} 
                  />
                </div>

                <div className="text-center md:text-start w-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 min-h-[5rem] text-gray-800 text-center">
                    {id === 1 ? 'MD Status Company' : title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AccoladesGrid;