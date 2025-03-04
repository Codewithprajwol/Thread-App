import Action from '@/components/Action'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Separator } from "@/components/ui/separator"

const PostPage = () => {
  const [liked,setLiked]=useState(false)
  return (
    <div className='w-full'>
         <div className='flex flex-col gap-2 items-start justify-center'>
         <div className='flex w-full items-center justify-between'>
                        <div className="flex items-center gap-2">
                        <div className='flex items-center justify-between w-8 h-8 rounded-full overflow-hidden'>
                <img src="/zuck-avatar.png" alt="zuckerberg" className='w-full h-full object-cover' />
                </div>
                         <h6 className='font-bold'>markzukerberg</h6>
                         <div className='w-7 h-7'><img src="/verified.png" alt="verified logo" /></div>
                        </div>
                        <div className="flex items-center gap-2">
                         <h6 className='font-bold text-[.8rem] text-[#dadada]'>1d</h6>
                         <BsThreeDots />
                        </div>
                         
         </div>
         <p className='text-[0.8rem]'>let talk about threads.</p>
            <div className='w-full max-h-auto overflow-hidden rounded-sm'>
            <img src={"/post1.png"} alt="post" />
        </div>
        <Action liked={liked} setLiked={setLiked}/>
        <div className='flex items-center justify-start pl-2 gap-2'>
            <p>{599+(liked?1:0)} likes</p>
            <div className='w-0.5 h-0.5 rounded-full bg-hello'></div>
            <p>{400} replies</p>
        </div>
        {/* seperator */}
        <Separator className="my-4" />

          {/* get app */}
          <div className="w-full flex items-center justify-between">
             <div className="flex items-center justify-start gap-2">
              <h6>👏</h6>
              <p className='text-gray-600'>Get the app to like, reply and post.</p>
             </div>
            <Button>Get</Button>
          </div>
            {/* seperator */}
        <Separator className="my-4" />

        {/* comment Section */}
        
         </div>
    </div>
  )
}

export default PostPage