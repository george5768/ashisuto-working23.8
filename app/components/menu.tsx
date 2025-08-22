"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Menu() {
  return (
    <NavigationMenu viewport={false} className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className="text-xl">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about" className="text-xl">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/partners" className="text-xl">Partners</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/ai-prediction-optimization" >AI Data Prediction & Optimization</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/docKITA">DocKITA® - Workflow Management System</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/manufacturing-operation">Manufacturing Operation</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/cyber-security">Cybersecurity – Secure Port Assess</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/ai-applications-development">AI Applications Development</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/robotics">Robotic System Development</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/industrial-design">Industrial Design & UI/UX Design</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/digitize-records">Digitize Past Records & Documents</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/gallery" className="text-xl">Gallery</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact" className="text-xl">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

