import { Button } from "@/components/ui/button"
import HeroSlider from "./HeroSlider"
import Link from "next/link"

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      backgroundImage: '/images/cover_1-1.jpg',
      header: (
        <div className="text-white text-center gap-4 sm:gap-5 px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight"><span className="text-primary">Reimagine and</span> <br />Co-Creation of your workplace</h1>
          <h2 className="text-lg sm:text-xl mt-2 sm:mt-4">INNOVATE THE FUTURE</h2>
          <p className="text-lg sm:text-xl mt-2 sm:mt-4">Designed for businesses of all sectors and industries </p>
        </div>
      )
    },
    {
      id: 2,
      backgroundImage: '/images/Industrial-Design.png',
      header: (
        <div className="text-black text-left max-w-2xl p-4 sm:p-10">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight"><span className="text-primary">Concept Convergence</span><br />Where Art & Design Collide</h1>
          <p className="text-base sm:text-lg mt-2 font-bold text-white">Industrial<span className="text-green-500"> Design</span> </p>
          <p className="text-base sm:text-lg mt-2 font-bold text-white pb-3 sm:pb-5">UI/UX<span className="text-green-500"> Design</span> </p>
          <Link href="/industrial-design"><Button className="font-bold text-lg sm:text-28 py-3 sm:py-5">Solutions</Button></Link>
        </div>
      )
    },
    {
      id: 3,
      backgroundImage: '/images/cover_2.jpg',
      header: (
        <div className="text-white text-right pr-4 sm:pr-10 px-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-white leading-tight">ESG Driven <span className="text-primary">Digital & Sustainable<br />Business Transformation</span></h1>
          <p className="mt-1 text-sm sm:text-base">Built with cutting edge technology to assist enterprises across industries to achieve <strong>Society 5.0</strong></p>
        </div>
      )
    },
    {
      id: 4,
      backgroundImage: '/images/location-background.jpg',
      header: (
        <div className="text-white text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-bold uppercase">Our Locations</h1>
          <Link href={"/contact"}><Button className="mt-4 sm:mt-5">Visit Us</Button></Link>
        </div>
      )
    }
  ]

  return <HeroSlider slides={slides} />
}