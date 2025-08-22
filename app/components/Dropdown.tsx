import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={"/about"}><DropdownMenuLabel>About</DropdownMenuLabel></Link>
        <Link href={"/partners"}><DropdownMenuLabel>Partners</DropdownMenuLabel></Link>
        <DropdownMenuLabel>Solutions</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <Link href={"/ai-prediction-optimization"}><DropdownMenuItem>AI Data Prediction & Optimization</DropdownMenuItem></Link>
        <Link href={"/docKITA"}><DropdownMenuItem>DocKITA® - Workflow Management System</DropdownMenuItem></Link>
        <Link href={"/manufacturing-operation"}><DropdownMenuItem>Manufacturing Operation</DropdownMenuItem></Link>
        <Link href={"/cyber-security"}><DropdownMenuItem>Cybersecurity – Secure Port Assess</DropdownMenuItem></Link>
        <DropdownMenuLabel>Services</DropdownMenuLabel>
         <DropdownMenuSeparator></DropdownMenuSeparator>
        
        <Link href={"/ai-applications-development"}><DropdownMenuItem>Ai Applications Development</DropdownMenuItem></Link>
        <Link href={"/robotics"}><DropdownMenuItem>Robotic Systems Development</DropdownMenuItem></Link>
        <Link href={"/industrial-design"}><DropdownMenuItem>Industrial Design & UI/UX Design</DropdownMenuItem></Link>
        <Link href={"/digitize-records"}><DropdownMenuItem>Digitize Past Records & Documents</DropdownMenuItem></Link>
        <Link href={"/contact"}><DropdownMenuLabel>Contact</DropdownMenuLabel></Link>
        <Link href={"/gallery"}><DropdownMenuLabel>News Gallery</DropdownMenuLabel></Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}