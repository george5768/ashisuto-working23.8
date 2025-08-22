import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdGlobe } from "react-icons/io";

export default function LanguageBtn () {
    return (
     <DropdownMenu>
  <DropdownMenuTrigger className="text-l font-medium"><div className="flex items-center gap-x-1"><IoMdGlobe /><h1>Language</h1></div></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Selection</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Global (English)</DropdownMenuItem>
    <DropdownMenuItem>Japanese (Coming Soon)</DropdownMenuItem>
    <DropdownMenuItem>Thai (Coming Soon)</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    )
}