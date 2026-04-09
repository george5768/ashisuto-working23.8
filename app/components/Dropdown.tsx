'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, ChevronRight, Home, Users, Briefcase, Mail, Cpu, Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageContext } from "@/app/context/LanguageContext";
import { Routes } from "@/app/enum/global";

export default function Dropdown() {
  const { currentLanguage } = useLanguageContext();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative group cursor-pointer border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300"
        >
          <Menu className="h-5 w-5 text-orange-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 max-h-[80vh] overflow-y-auto bg-white border border-orange-100 shadow-2xl shadow-orange-100/40 rounded-2xl p-2">
        {/* Header accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 rounded-full mb-2" />

        {/* Main Navigation */}
        <Link href={Routes.HOME} className="cursor-pointer">
          <DropdownMenuLabel className="cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group">
            <Home className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{currentLanguage.header_home}</span>
          </DropdownMenuLabel>
        </Link>
        <Link href={Routes.ABOUT} className="cursor-pointer">
          <DropdownMenuLabel className="cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group">
            <Users className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{currentLanguage.header_about}</span>
          </DropdownMenuLabel>
        </Link>
        <Link href={Routes.PARTNERS} className="cursor-pointer">
          <DropdownMenuLabel className="cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group">
            <Briefcase className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{currentLanguage.header_partners}</span>
          </DropdownMenuLabel>
        </Link>
        
        <DropdownMenuSeparator className="my-1.5 bg-orange-100" />
        
        {/* Solutions Section */}
        <DropdownMenuLabel className="text-orange-600 font-bold px-4 py-1.5 flex items-center gap-2 text-xs uppercase tracking-widest">
          <Cpu className="h-3.5 w-3.5" />
          {currentLanguage.header_solutions}
        </DropdownMenuLabel>
        
        {[
          { href: Routes.AI_PREDICTION_OPTIMIZATION, label: currentLanguage.header_solutions_selection_1 },
          { href: Routes.DOC_KITA,                   label: currentLanguage.header_solutions_selection_2 },
          { href: Routes.AI_APPLICATION_CUSTOMIZE,   label: currentLanguage.header_solutions_selection_3 },
          { href: Routes.CYBER_SECURITY,             label: currentLanguage.header_solutions_selection_4 },
        ].map(({ href, label }) => (
          <Link key={href} href={href} className="cursor-pointer">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-5 py-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group">
              <ChevronRight className="h-3 w-3 text-orange-300 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              <span className="text-sm">{label}</span>
            </DropdownMenuItem>
          </Link>
        ))}
        
        <DropdownMenuSeparator className="my-1.5 bg-orange-100" />
        
        {/* Services Section */}
        <DropdownMenuLabel className="text-orange-600 font-bold px-4 py-1.5 flex items-center gap-2 text-xs uppercase tracking-widest">
          <Bot className="h-3.5 w-3.5" />
          {currentLanguage.header_services}
        </DropdownMenuLabel>
        
        {[
          { href: Routes.ROBOTICS,               label: currentLanguage.header_services_selection_1 },
          { href: Routes.DIGITIZE_RECORDS,       label: currentLanguage.header_services_selection_2 },
          { href: Routes.MANUFACTURING_OPERATION,label: currentLanguage.header_services_selection_3 },
        ].map(({ href, label }) => (
          <Link key={href} href={href} className="cursor-pointer">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 px-5 py-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group">
              <ChevronRight className="h-3 w-3 text-orange-300 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              <span className="text-sm">{label}</span>
            </DropdownMenuItem>
          </Link>
        ))}
        
        <DropdownMenuSeparator className="my-1.5 bg-orange-100" />
        
        <Link href={Routes.GALLERY} className="cursor-pointer">
          <DropdownMenuLabel className="cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200">
            <span className="font-semibold">{currentLanguage.header_gallery}</span>
          </DropdownMenuLabel>
        </Link>
        <Link href={Routes.CONTACT} className="cursor-pointer">
          <DropdownMenuLabel className="cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group">
            <Mail className="h-4 w-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">{currentLanguage.header_contact}</span>
          </DropdownMenuLabel>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}