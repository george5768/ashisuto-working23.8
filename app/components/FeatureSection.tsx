import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Handshake, Lightbulb } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section className="bg-gradient-to-br from-orange-100 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Column 1: Text */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Transform Your Idea Into Real World Impact
          </h2>
          <ul className="space-y-4 text-gray-700 pb-3">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-lg my-auto font-bold"><Handshake/></span>
              Work together with us to co-create transformative solutions that results in real world impact.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-lg my-auto font-bold"><Lightbulb/></span>
              From an idea to a real system and any stage in between with our innovative AI capability
              </li>
          </ul>
          <Link href={"/about"}> 
          <Button className="my-5 mx-5">About Us</Button>
          </Link>
          <Link href={"/contact"}>
          <Button className="my-5">Get in touch</Button></Link>
        </div>

        <div className="relative w-full h-96 flex justify-center items-center">
          {/* Modern image grid layout with clean spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {/* Main featured image */}
            <div className="md:col-span-2 md:row-span-2 relative group">
              <div className="absolute inset-0 bg-orange-100 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300" />
              <Image
                src="/images/mfg.png"
                alt="Featured manufacturing solution"
                width={400}
                height={300}
                className="relative z-10 w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            {/* Secondary images in a clean arrangement */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white rounded-xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300" />
              <Image
                src="/images/cleanroom.jpg"
                alt="Cleanroom technology"
                width={200}
                height={150}
                className="relative z-10 w-full h-full object-cover rounded-xl shadow-md"
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-white rounded-xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300" />
              <Image
                src="/images/construction-3.png"
                alt="Construction innovation"
                width={200}
                height={150}
                className="relative z-10 w-full h-full object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}