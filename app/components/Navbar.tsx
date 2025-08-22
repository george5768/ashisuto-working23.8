"use client";

import Link from "next/link"
import Image from 'next/image'
import { PiWhatsappLogoBold } from "react-icons/pi";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import dynamic from 'next/dynamic';

console.log("Navbar component rendered on client side");

// Dynamically import client-only components
console.log("Starting dynamic imports...");
const LanguageBtn = dynamic(() => import("./LanguageBtn").then(mod => {
  console.log("LanguageBtn component loaded:", mod.default);
  return mod.default;
}), {
  ssr: false,
  loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
});

const Menu = dynamic(() => import("./menu").then(mod => {
  console.log("Menu component loaded:", mod.Menu);
  return mod.Menu;
}), {
  ssr: false,
  loading: () => <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
});

const Dropdown = dynamic(() => import("./Dropdown").then(mod => {
  console.log("Dropdown component loaded:", mod.default);
  return mod.default;
}), {
  ssr: false,
  loading: () => <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
});

export default function Navbar () {
    return (
        <nav className="relative flex items-center justify-between max-w-7xl mx-auto px-3 py-10">
           <div className="md:hidden lg:hidden pl-30"><Dropdown/></div>
            <div className="flex-col max-w-28 mx-auto md:min-w-35 lg:min-w-35">  
                <div className="flex justify-between items-center max-w-35 gap-1 py-1">
                        <Link href={"https://www.youtube.com/@ashisutoglobaltechnologies6942"}><BsYoutube className="text-red-600"/>
                        </Link>
                        <Link href={"https://www.linkedin.com/company/ashisuto-global-technologies/"}><FaLinkedinIn className="text-blue-700"/></Link>
                        <Link href={"https://www.instagram.com/ashisutoglobal/"}><FaInstagram className="text-red-400"/></Link>
                        <Link href={"https://www.facebook.com/ashito.glo"}><FaFacebook className="text-blue-600"/></Link>
                    </div>
                 <div> 
                    <Link href='/'>
                    <Image
                 src="/logo orange.png"
                 width={500}
                 height={300}
                 layout="responsive"
                 alt="Ashisuto Tech"
                    />          
                </Link>
                </div>  
            </div>  
        <div className="hidden md:flex mx-auto lg:mx-45"><Menu/></div> 
           <div className="hidden md:flex md:gap-5 md:mb-15 lg:flex overflow-constrain">
           <Link href="https://wa.link/7ka5zr" className="font-medium text-l text-primary"><div className="flex items-center gap-x-1"><PiWhatsappLogoBold /><h1>Whatsapp</h1></div>
           </Link>
           <LanguageBtn/>
           </div>
        </nav>
    )
}