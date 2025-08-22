'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-12 px-6">
      {/* Grid Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo at bottom left */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="inline-block">
              <Image
                src="/ashisuto-logo-white.png" // Place your logo file in
                alt="Ashisuto Tech"
                width={120}
                height={40}
                className="h-auto"
              />
            </Link>
          </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2">
            <li><Link href="/docKITA" className="hover:underline">DocKITA® - Workflow Management System</Link></li>
            <li><Link href="/ai-prediction-optimization" className="hover:underline">AI Prediction</Link></li>
            <li><Link href="/manufacturing-operation" className="hover:underline">Manufacturing Operation</Link></li>
            <li><Link href="/cyber-security" className="hover:underline">Cyber Security - Secure Port Access</Link> </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><Link href="/robotics" className="hover:underline">Robotic Systems Development</Link></li>
            <li><Link href="/ai-agent-development" className="hover:underline">AI Agentic Development</Link></li>
            <li><Link href="/industrial-design" className="hover:underline">Industrial Design</Link></li>
            <li><Link href="/digitize-records" className="hover:underline">Digitize Records</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Other</h4>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/gallery" className="hover:underline">News Gallery</Link></li>
            <li><Link href="/partners" className="hover:underline">Partners</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom Bar */}
      <div className="mt-10 border-t border-orange-300 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-2">
          {/* Copyright */}
          <p className="text-sm text-orange-100 text-center md:text-right">
            © {new Date().getFullYear()} Ashisuto Global Technologies Sdn Bhd (1308692U). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}