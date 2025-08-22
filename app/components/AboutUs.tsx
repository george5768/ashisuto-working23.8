import React, { FC } from 'react';
import Link from 'next/link';
import { BsYoutube } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const AboutUs: FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white text-gray-900 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-[-0.02em]">
              About <span className="text-primary">Us</span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-normal text-gray-600 mb-6">
              Assisting Digital Transformation
            </h2>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-gray-700 text-justify">
              Assisting industries in their Digital Transformation Journey and helping them benefit from our cost efficient and customized solutions that are quick to deploy.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 text-justify">
              Ashisuto is translated from Japanese to &quot;Assist You&quot;, our solutions are designed with this core belief. Our customer first attitude is represented by the way we develop tailored solutions designed to overcome digitalization challenges helping business to adopt the best practices for document management and record keeping.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-center items-center gap-4 lg:gap-6 my-6">
              <Link href={"https://www.youtube.com/@ashisutoglobaltechnologies6942"} className="text-red-600 hover:text-red-700 transition-colors">
                <BsYoutube className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <Link href={"https://www.linkedin.com/company/ashisuto-global-technologies/"} className="text-blue-700 hover:text-blue-800 transition-colors">
                <FaLinkedinIn className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <Link href={"https://www.instagram.com/ashisutoglobal/"} className="text-red-400 hover:text-red-500 transition-colors">
                <FaInstagram className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <Link href={"https://www.facebook.com/ashito.glo"} className="text-blue-600 hover:text-blue-700 transition-colors">
                <FaFacebook className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 text-justify">
            We are a digital transformation (DX) company providing digitalization solutions to industries based on cutting edge technology including AI, Machine Learning, Deep Learning, Blockchain and IoT technology for developing both application and embedded systems.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8 text-justify">
            Ashisuto Global Technologies is the key to helping companies bring business processes onto one global and digital ecosystem platform. A system that can be used whenever and wherever, with this vision we help companies achieve a digital reality.
            Being recognized as business consultants and digital transformation specialists, we provide extensive and comprehensive support to both international and local, private and public corporations. Helping to build a secure business environment for our clients. We are committed to serving you with our range of innovative and customizable solutions.
          </p>
        </div>
        
        <div className="flex justify-center my-8">
          <Link href={"/docKITA"}>
            <Button className="px-6 md:px-8 py-3 text-base md:text-lg font-medium hover:bg-primary/90 transition-colors">
              Explore Solutions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
