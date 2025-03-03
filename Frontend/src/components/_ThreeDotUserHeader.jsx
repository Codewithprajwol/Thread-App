import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import { toast } from "sonner"
 
  
  const ThreeDotUserHeader = () => {

    const clickHandler = () => {
       const url= window.location.href;
        toast("link copied successfully", "success")
        navigator.clipboard.writeText(url);
    }
    
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <div className="rounded-full h-7 w-7 text-center leading-none cursor-pointer text-background bg-hello flex items-start justify-center">
   ...
</div>

        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuItem onClick={clickHandler} >copy link</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> 
    )
  }
  
  export default ThreeDotUserHeader