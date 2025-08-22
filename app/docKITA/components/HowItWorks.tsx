'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Step {
  imageSrc: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    imageSrc: '/images/step_1.png',
    title: '1. Scan Documents',
    description: 'Hard copy forms are digitized while retaining their original format and alignment using our proprietary Workflow Manager Software and know-how.',
  },
  {
    imageSrc: '/images/step_2.png',
    title: '2. Digital Form',
    description: 'Digitalized forms become fully functional as user interface on any internet browser and accessible across desktop, tablet and mobile devices.',
  },
  {
    imageSrc: '/images/step_3.png',
    title: '3. Real-Time Access',
    description: 'All data entered into the form is captured and stored in online or on-premise database systems ready to be analyzed in real time.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-background py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center space-y-12"
      >
        <h2 className="text-3xl font-bold text-primary">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={step.imageSrc}
                  alt={step.title}
                  fill
                  className="object-contain rounded-lg shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}