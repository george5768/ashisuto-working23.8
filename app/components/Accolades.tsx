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
    title: 'Top Innovation Award 2025',
    description: 'We are recognized by the Malaysian government as an enabler for Artificial Intelligence, Blockchain and BigData by obtaining MD Status (MALAYSIA DIGITAL COMPANY STATUS) from MDEC (Malaysia Digital Economy Corporation).',
  },
  {
    id: 2,
    logoSrc: '/images/IPAG.png',
    logoAlt: 'IPAG Logo',
    title: 'R & D Status Company by MIDA',
    description: 'Innovasi Penyelidikan AG Sdn. Bhd., a company under Ashisuto Group of Companies was awarded R&D Status by the Malaysia Investment Development Authority. Our clients are able to enjoy double tax exemption when they engage us to simplify digital transformation with our extensive suite of innovative solutions. ',
  },
  {
    id: 3,
    logoSrc: '/images/MOF.jpeg',
    logoAlt: 'MOF logo',
    title: 'Registered Company with Ministry of Finance, Malaysia',
    description: 'We are recognized as a competent and trust-worthy solutions provider. We serve public sector and government linked companies, with our secure solutions that continuously help drive nations towards adopting IR 4.0 best practices for digital transformation. ',
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
          {accoladesData.map(({ id, logoSrc, logoAlt, title, description }) => (
            <motion.div
              key={id}
              variants={itemVariants}
              className="flex flex-col items-center gap-6 bg-white border border-gray-200 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-gray-100">
                <Image src={logoSrc} alt={logoAlt} width={200} height={200} className="w-full h-full object-contain" />
              </div>
              <div className="text-center md:text-start w-full">
                <h3 className="text-xl md:text-2xl font-bold mb-3 min-h-[5rem] text-gray-800">
                  {id === 1 ? 'Top Innovation Award\n2025' : title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AccoladesGrid;
