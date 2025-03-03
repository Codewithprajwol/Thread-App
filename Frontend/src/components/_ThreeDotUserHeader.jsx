import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

  
  const ThreeDotUserHeader = () => {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <div className="rounded-full h-7 w-7 text-center leading-none cursor-pointer text-background bg-hello flex items-start justify-center">
   ...
</div>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>copy link</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  export default ThreeDotUserHeader