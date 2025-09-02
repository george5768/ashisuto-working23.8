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

        <div className="relative w-full h-72 md:h-96 flex justify-center items-center">
          {/* Back image - positioned at top-left */}
          <div className="absolute top-4 left-4 w-56 h-36 md:w-72 md:h-48 bg-orange-100 border border-orange-300 rounded-xl shadow-md" />
          
          <Image
            src="/images/mfg.png"
            alt="Back preview"
            width={280}
            height={180}
            className="absolute top-4 left-4 rounded-xl shadow-md object-cover w-56 h-36 md:w-72 md:h-48"
          />
          
          {/* Middle image - positioned diagonally down and right */}
          <div className="absolute top-16 left-32 w-56 h-36 md:w-72 md:h-48 bg-white border border-orange-200 rounded-xl shadow-lg overflow-hidden">
            <Image
              src="/images/cleanroom.jpg"
              alt="Middle preview"
              width={280}
              height={180}
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Front image - positioned further down and right */}
          <div className="absolute top-28 right-8 w-56 h-36 md:w-72 md:h-48 bg-white border border-orange-200 rounded-xl shadow-lg overflow-hidden">
            <Image
              src="/images/construction-3.png"
              alt="Front preview"
              width={280}
              height={180}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  )
}