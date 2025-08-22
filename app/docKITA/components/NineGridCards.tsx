'use client';

import Image from 'next/image';

interface Card {
  gifSrc: string;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    gifSrc: '/gifs/document.gif',
    title: 'Digitize Form Templates',
    description: 'Digitizing & retaining existing paper / Excel / PDF forms template into a digital system.  This transition streamlines data collection and retrieval processes, reducing paperwork, minimizing errors and facilitating faster access to information for improved efficiency.',
  },
  {
    gifSrc: '/gifs/business-process.gif',
    title: 'Digitalize Process Flow',
    description: 'All forms templates & workflow are managed in relational database systems efficiently, to support complex queries, leading to streamlined management, faster decision-making, and enhanced insights.',
  },
  {
    gifSrc: '/gifs/timer.gif',
    title: 'Zero Familiarization Time',
    description: 'Zero familiarization time means users can start using our system without prior training. This drastically reduces onboarding time, while ensuring high levels of user adoption.',
  },
  {
    gifSrc: '/gifs/database.gif',
    title: 'Relational Database System',
    description: 'Relational database systems organize data efficiently and support complex queries, leading to streamlined management, faster decision-making, and enhanced insights.',
  },
  {
    gifSrc: '/gifs/analytics.gif',
    title: 'Analytics Dashboard',
    description: 'Enable data visualization after consolidating all data from physical and digital storage.  Visualize data meaningfully with custom made dashboards and AI prediction systems. ',
  },
  {
    gifSrc: '/gifs/unplugged.gif',
    title: 'Integrate with Third Party Databases',
    description: 'Seamlessly integrate our solution with external Third Party Databases to leverage on IoT connectivity and secure your data with blockchain and embedded system solutions.',
  },
  {
    gifSrc: '/gifs/iot.gif',
    title: 'IoT Connectivity',
    description: 'Connects to IoT devices to support IoT systems and digital process workflows.',
  },
  {
    gifSrc: '/gifs/settings.gif',
    title: 'Highly Customizable',
    description: 'Our highly customizable solutions is designed to solve your specific pain points.',
  },
  {
    gifSrc: '/gifs/coding.gif',
    title: 'Zero Coding Required',
    description: 'Our SaaS solution offers zero code approach for our customer to build their own applications without any prior coding experience.',
  },
];

export default function NineGridCards() {
  return (
    <section className="bg-background py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-md bg-muted hover:shadow-lg transition"
          >
            <div className="relative w-full h-20">
              
              <Image
                src={card.gifSrc}
                alt={card.title}
                fill
                className="object-contain"
                style={{
                filter: 'sepia(1) hue-rotate(330deg) saturate(200%) brightness(1.1)',
              }}
              />
              <div className="absolute inset-0" />
            </div>
            <div className="p-4 space-y-2 text-center">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-muted-foreground text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}