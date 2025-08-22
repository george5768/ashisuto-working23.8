import React, { FC, ReactNode } from 'react';
import { BsTrophy } from "react-icons/bs";
import { FaGlobeAsia } from "react-icons/fa";
import { motion } from 'framer-motion';

// Component props
interface StatementBlockProps {
  icon: ReactNode;
  title: string;
  text: string;
}

// Animate on mount
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

// Reusable Statement Block with animation
const StatementBlock: FC<StatementBlockProps> = ({ icon, title, text }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 2, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className="flex items-start gap-6"
  >
    <div className="flex-shrink-0 w-12 h-12">
      <div className="w-full h-full flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg leading-relaxed text-gray-700">{text}</p>
    </div>
  </motion.div>
);

const VisionMission: FC = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision & Mission</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <StatementBlock
            icon={<BsTrophy className="w-10 h-10 text-primary" />}
            title="Our Vision"
            text="Become the leader in delivering technology solutions to innovate the future."
          />
          <StatementBlock
            icon={<FaGlobeAsia className="w-10 h-10 text-primary" />}
            title="Our Mission"
            text="Deliver pioneering technology solutions while fostering innovation and sustainable business growth."
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
