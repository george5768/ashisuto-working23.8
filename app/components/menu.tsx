"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguageContext } from "@/app/context/LanguageContext"
import { Routes } from "@/app/enum/global"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface MenuProps {
  scrolled?: boolean
}

export function Menu({ scrolled = false }: MenuProps) {
  const { currentLanguage } = useLanguageContext()
  
  const linkClass = cn(
    "px-4 py-2 font-semibold rounded-md transition-all duration-300 hover:bg-primary/10 hover:text-primary cursor-pointer",
    scrolled ? "text-base lg:text-lg" : "text-base lg:text-lg"
  )
  
  const triggerClass = cn(
    "px-4 py-2 font-semibold cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300",
    scrolled ? "text-base lg:text-lg" : "text-base lg:text-lg"
  )
  
  const dropdownLinkClass = cn(
    "block px-4 py-2.5 rounded-md transition-all duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer font-medium",
    scrolled ? "text-sm lg:text-base" : "text-sm lg:text-base"
  )

  return (
    <NavigationMenu viewport={false} className="z-50">
      <NavigationMenuList className="flex gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={Routes.HOME} className={linkClass}>
              {currentLanguage.header_home}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={Routes.ABOUT} className={linkClass}>
              {currentLanguage.header_about}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={Routes.PARTNERS} className={linkClass}>
              {currentLanguage.header_partners}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={triggerClass}
            onClick={(e) => e.preventDefault()}
          >
            {currentLanguage.header_solutions}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-top-2 data-[motion=from-start]:slide-in-from-top-2 data-[motion=to-end]:slide-out-to-top-2 data-[motion=to-start]:slide-out-to-top-2 left-1/2 -translate-x-1/2">
            <ul className="grid w-[280px] gap-2 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.AI_PREDICTION_OPTIMIZATION} className={dropdownLinkClass}>
                    {currentLanguage.header_solutions_selection_1}
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.DOC_KITA} className={dropdownLinkClass}>
                    {currentLanguage.header_solutions_selection_2}
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.AI_APPLICATION_CUSTOMIZE} className={dropdownLinkClass}>
                    {currentLanguage.header_solutions_selection_3}
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.CYBER_SECURITY} className={dropdownLinkClass}>
                    {currentLanguage.header_solutions_selection_4}
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={triggerClass}
            onClick={(e) => e.preventDefault()}
          >
            {currentLanguage.header_services}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-top-2 data-[motion=from-start]:slide-in-from-top-2 data-[motion=to-end]:slide-out-to-top-2 data-[motion=to-start]:slide-out-to-top-2 left-1/2 -translate-x-1/2">
            <ul className="grid w-[280px] gap-2 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.ROBOTICS} className={dropdownLinkClass}>
                    {currentLanguage.header_services_selection_1}
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.DIGITIZE_RECORDS} className={dropdownLinkClass}>
                    {currentLanguage.header_services_selection_2}
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href={Routes.MANUFACTURING_OPERATION} className={dropdownLinkClass}>
                    {currentLanguage.header_services_selection_3}
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={Routes.GALLERY} className={linkClass}>
              {currentLanguage.header_gallery}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={Routes.CONTACT} className={linkClass}>
              {currentLanguage.header_contact}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}