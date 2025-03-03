import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Action from './Action';


const UserPost = () => {
  return (
    <div className='w-full mt-4 flex items-start gap-3 justfiy-between pb-7'>
        <div className='flex flex-col gap-2 items-center justify-start'>
            <div className='flex items-center justify-between w-8 h-8 rounded-full overflow-hidden'>
                <img src="/zuck-avatar.png" alt="zuckerberg" className='w-full h-full object-cover' />
                </div>
                <div className=' h-[250px] sm:h-[370px] md:[400px] w-[.1rem] bg-[#c0baba42]'></div>
                <div className='relative w-full'>
                <Avatar className="absolute top-0 -left-5 size-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
                <Avatar className="absolute top-0 -right-5 size-6">
            <AvatarImage src="https://github.com/mojombo.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
                <Avatar className="absolute bottom-0 left-1 size-6">
            <AvatarImage src="https://github.com/octocat.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>

                </div>
        </div>
        <Link to="/prajwol/post/1" className='flex flex-1 flex-col gap-1'>
            <div className='flex  items-center justify-between'>
               <div className="flex items-center gap-2">
                <h6 className='font-bold'>markzukerberg</h6>
                <div className='w-7 h-7'><img src="/verified.png" alt="verified logo" /></div>
               </div>
               <div className="flex items-center gap-2">
                <h6 className='font-bold text-[.8rem] text-[#dadada]'>1d</h6>
                <BsThreeDots />
               </div>
                
            </div>
            <p className='text-[0.8rem]'>let's talk about threads</p>
            <div className='w-full max-h-[300px] overflow-hidden rounded-sm'>
            <img src="/post1.png" alt="post" />
        </div>
        <Action/>
        </Link>
        
    </div> 
  )
}

export default UserPost