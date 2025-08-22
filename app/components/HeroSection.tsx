import { Button } from "@/components/ui/button"
import HeroSlider from "./HeroSlider"
import Link from "next/link"

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      backgroundImage: '/images/cover_1-1.jpg',
      header: (
        <div className="text-white text-center gap-5">
          <h1 className="text-5xl font-extrabold"><span className="text-primary">Reimagine and</span> Co-Creation of your workplace</h1>
          <h2 className="text-xl mt-4">INNOVATE THE FUTURE</h2>
          <p className="text-xl mt-4">Designed for businesses of all sectors and industries </p>
        </div>
      )
    },
    {
      id: 2,
      backgroundImage: '/images/Industrial-Design.png',
      header: (
        <div className="text-black text-left max-w-2xl p-10">
          <h1 className="text-4xl lg:text-6xl font-black"><span className="text-primary">Concept Convergence</span> Where Art & Design Collide</h1>
          <p className="text-lg mt-2 font-bold text-white">Industrial<span className="text-green-500"> Design</span> </p>
          <p className="text-lg mt-2 font-bold text-white pb-5">UI/UX<span className="text-green-500"> Design</span> </p>
          <Link href="/industrial-design"><Button className="font-bold text-28 py-5">Solutions</Button></Link> 
        </div>
      )
    },
    {
      id: 3,
      backgroundImage: '/images/cover_2.jpg',
      header: (
        <div className="text-white text-right pr-10">
          <h1 className="text-4xl font-extrabold tracking-wide text-white">ESG Driven <span className="text-primary">Digital & Sustainable Business Transformation</span></h1>
          <p className="mt-1 text-base">Built with cutting edge technology to assist enterprises across industries to achieve <strong>Society 5.0</strong></p>
        </div>
      )
    },
    {
      id: 4,
      backgroundImage: '/images/location-background.jpg',
      header: (
        <div className="text-white text-center px-6">
          <h1 className="text-5xl font-bold uppercase">Our Locations</h1>
          <Link href={"/contact"}><Button className="mt-5">Visit Us</Button></Link>
        </div>
      )
    }
  ]

  return <HeroSlider slides={slides} />
}