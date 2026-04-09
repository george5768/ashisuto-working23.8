import React, { FC } from 'react';
import Link from 'next/link';
import { BsYoutube } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

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
              Ashisuto Global Technologies empowers industries in their digital transformation journey through AI driven innovation, helping organizations unlock business value using cutting edge technologies particularly Artificial Intelligence, Machine Learning, and Agentic AI.  Our solutions are designed to be scalable, cost-efficient, and rapidly deployable, enabling faster adoption and measurable outcomes.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 text-justify">
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
            The name Ashisuto, derived from the Japanese phrase meaning &quot;Assist You&quot;, reflects our core philosophy. With a strong customer-first mindset, we deliver tailored digital solutions that address real-world digitalization challenges, enabling businesses to adopt best practices in document management, records management, and intelligent process automation.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 text-justify">
            As a trusted digital transformation partner, Ashisuto Global Technologies helps organizations unify business processes into a secure, global digital ecosystem accessible anytime and anywhere. Recognized as business consultants and digital transformation specialists, we provide comprehensive support to international and local organizations across both the public and private sectors.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8 text-justify">
            We are committed to building secure, future-ready business environments through innovative, flexible, and customizable AI-powered solutions.
          </p>
        </div>

        {/* <div className="flex justify-center my-8">
          <Link href={"/docKITA"}>
            <Button className="px-6 md:px-8 py-3 text-base md:text-lg font-medium hover:bg-primary/90 transition-colors">
              Explore Solutions
            </Button>
          </Link>
        </div> */} 
      </div> 
    </section>
  );
};

export default AboutUs;
