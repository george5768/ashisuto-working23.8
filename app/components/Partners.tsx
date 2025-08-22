'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const partners = [
  {
    name: "Ricoh",
    logo: "/Ricoh_logo_2012.svg",
    description:
      "Ricoh has been at the forefront of helping businesses adopt innovative technologies. Together we are digitalizing entire workflows with our integrated solution.",
    link: "https://www.ricoh.co.th/en/products/workflow-and-automation/process-automation/dockita",
  },
  {
    name: "3drens",
    logo: "/images/3drens.png",
    description:
      "A global and trusted IT solutions provider to the logistics and  mobility industry. They help us distribute our solutions to the Taiwanese market.",
    link: "https://shorturl.at/FDQqW",
  },
  {
    name: "ZionTech Communications",
    logo: "/images/ziontech.png",
    description:
      "A Phillipines based software company that is collaborating with us to enable digital transformation within the Phillipines market.",
    link: "/partners",
  },
];

export default function PartnersFeature() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold">Our <span className="text-primary">Partners</span></h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-lg">
          We’re proud to collaborate with forward-thinking organizations and individuals that share our mission to assist digital transformation across all sectors.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center text-center md:text-left md:flex-row gap-6"
          >
            <Link href={partner.link} className="w-60 h-60 flex items-center justify-center bg-muted rounded-md hover:opacity-80 transition-opacity">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <div className="text-sm text-muted-foreground max-w-md">
              <h3 className="text-xl font-medium text-foreground mb-2">
                {partner.name}
              </h3>
              <p>{partner.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Carousel />
        <p className="text-center text-muted-foreground text-lg mt-4">
          Building together with our Tech-related partners within the digital transformation space.
        </p>
      </div>
    </section>
  );
}

function Carousel() {
  const images = [
    { src: "/images/3drens-partnership.avif", alt: "3drens partnership" },
    { src: "/images/ricoh-partnership.avif", alt: "Ricoh partnership" },
    { src: "/images/ziontech-partnership.jpeg", alt: "ZionTech Partnership" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-h-120 overflow-hidden rounded-xl shadow-sm">
      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={400}
              className="object-contain w-full h-auto overflow-clip"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}