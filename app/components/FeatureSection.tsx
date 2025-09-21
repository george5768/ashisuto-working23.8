import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Handshake, Lightbulb } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section className="bg-gradient-to-br from-orange-100 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Desktop 2-column layout, mobile stacked layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Column 1: Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              Transform Efficiency Into Revenue Growth With AI
            </h2>
            <ul className="space-y-6 text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Handshake className="text-orange-500 text-lg" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Collaborative Innovation</h3>
                  <p className="text-gray-600">Work together with us to co-create transformative solutions that deliver real-world impact and measurable results.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="text-orange-500 text-lg" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">End-to-End AI Solutions</h3>
                  <p className="text-gray-600">From concept to implementation, we guide you through every stage with our cutting-edge AI capabilities and expertise.</p>
                </div>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={"/about"}>
                <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">About Us</Button>
              </Link>
              <Link href={"/contact"}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">Get in touch</Button>
              </Link>
            </div>
          </div>

          {/* Column 2: Images */}
          <div className="relative">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Professional image grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main featured image */}
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-90 transform rotate-3 group-hover:rotate-0 transition-all duration-500" />
                  <Image
                    src="/images/mfg.png"
                    alt="Featured manufacturing solution"
                    width={600}
                    height={450}
                    className="relative z-10 w-full h-full object-cover transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                {/* Secondary images */}
                <div className="relative group overflow-hidden rounded-xl shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-90 transform -rotate-2 group-hover:rotate-0 transition-all duration-500" />
                  <Image
                    src="/images/cleanroom.jpg"
                    alt="Cleanroom technology"
                    width={300}
                    height={225}
                    className="relative z-10 w-full h-full object-cover transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                <div className="relative group overflow-hidden rounded-xl shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-90 transform rotate-2 group-hover:rotate-0 transition-all duration-500" />
                  <Image
                    src="/images/construction-3.png"
                    alt="Construction innovation"
                    width={300}
                    height={225}
                    className="relative z-10 w-full h-full object-cover transform rotate-2 group-hover:rotate-0 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}