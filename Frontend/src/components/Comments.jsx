import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Action from './Action'

const Comments = ({comment,createdAt,userAvatar,userName,likes}) => {
    const [liked,setLiked]=useState(false)
  return (
    <div className='w-full mt-4 flex items-start gap-3 justfiy-between p-4 rounded-md border-2 border-gray-700/40'>
        <div className='flex flex-col gap-2 items-center justify-start'>
            <div className='flex items-center justify-between w-8 h-8 rounded-full overflow-hidden'>
                <img src={userAvatar} alt="zuckerberg" className='w-full h-full object-cover' />
                </div>
        </div>
        <div to="/prajwol/post/1" className='flex flex-1 flex-col gap-1'>
            <div className='flex  items-center justify-between'>
               <div className="flex items-center gap-2">
                <h6 className='font-bold'>{userName}</h6>
                <div className='w-7 h-7'><img src="/verified.png" alt="verified logo" /></div>
               </div>
               <div className="flex items-center gap-2">
                <h6 className='font-bold text-[.8rem] text-[#dadada]'>{createdAt}</h6>
                <BsThreeDots />
               </div>
                
            </div>
            <p className='text-[0.8rem]'>{comment}</p>
        <Action liked={liked} setLiked={setLiked}/>
            <p>{likes+(liked?1:0)} likes</p>
        </div>                                                                 
        
    </div>
  )
}

export default Comments