import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Action from './Action'
import { Link } from 'react-router-dom'
import axiosInstance from '@/lib/axios'

const Comments = ({reply,post}) => {
    const [replyUser,setReplyUser]=useState(null);     
    useEffect(()=>{
        const getReplyUser=async()=>{
            try{
                const response=await axiosInstance.get(`/user/profile/${reply?.userId}`)
                if(response.status===200){
                    setReplyUser(response.data.user);
                }
            }catch(error){
                console.error("Error fetching user profile:",error)
            }
        }
        getReplyUser();
    },[])
    console.log(replyUser);
  return (
    <div className='w-full mt-4 flex items-start gap-3 justfiy-between p-4 rounded-md border-2 border-gray-700/40'>
        <div className='flex flex-col gap-2 items-center justify-start'>
            <div className='flex items-center justify-between w-8 h-8 rounded-full overflow-hidden'>
                <Link to={`/${replyUser?.username}`}>
                <img src={reply?.profilePic} alt={reply?.username} className='w-full h-full object-cover' />
                </Link>
                </div>
        </div>
        <div  className='flex flex-1 flex-col gap-1'>
            <div className='flex  items-center justify-between'>
               <div className="flex items-center gap-2">
                <h6 className='font-bold'>{reply?.username}</h6>
                <div className='w-7 h-7'><img src="/verified.png" alt="verified logo" /></div>
               </div>
               <div className="flex items-center gap-2">
                <h6 className='font-bold text-[.8rem] text-[#dadada]'>{"1d"}</h6>
                <BsThreeDots />
               </div>
                
            </div>
            <p className='text-[0.8rem]'>{reply?.text}</p>
        <Action post={post}/>
        </div>                                                                 
        
    </div>
  )
}

export default Comments