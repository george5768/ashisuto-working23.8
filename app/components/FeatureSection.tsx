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
              From an idea to the physical device and any stage in between with our embedded system and IC design capabilities
            </li>
          </ul>
          <Link href={"/about"}> 
          <Button className="my-5 mx-5">About Us</Button>
          </Link>
          <Link href={"/contact"}>
          <Button className="my-5">Get in touch</Button></Link>
        </div>

        <div className="relative w-full h-72 md:h-96 flex justify-center items-center">
  {"/"}
  <div className="absolute top-6 left-6 w-64 h-40 md:w-80 md:h-52 bg-orange-100 border border-orange-300 rounded-xl shadow-md" />
  
  {<Image
  src="/images/EmbeddedSystem.png"
  alt="Back preview"
  width={320}
  height={208}
  className="absolute top-6 left-6 rounded-xl shadow-md object-cover w-64 h-40 md:w-80 md:h-52"
/>}
  <div className="relative z-10 w-64 h-40 md:w-80 md:h-52 bg-white border border-orange-200 rounded-xl shadow-lg flex items-center justify-center">
    {<Image
  src="/images/cleanroom.jpg"
  alt="Front preview"
  width={320}
  height={208}
  className="relative z-10 rounded-xl shadow-lg object-cover w-64 h-40 md:w-80 md:h-52"
/>
}
  </div>
</div>

      </div>
    </section>
  )
}