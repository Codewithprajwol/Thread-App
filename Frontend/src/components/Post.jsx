import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import Action from './Action'
import axiosInstance from "@/lib/axios"
import {timeAgo} from "@/utils/timeFinder"

const Post = ({post}) => {

    const [postUserProfile,setPostUserProgfile]=useState(null)
    useEffect(()=>{
        async function fetchUserProfile(){
            try{
             const response=await axiosInstance.get(`/user/profile/${post.postedBy}`)
             if(response.status===200){
                setPostUserProgfile(response.data.user);
             }
            }catch(error){
                console.error("Error fetching user profile:",error)
            }
        }
        fetchUserProfile(); 
    },[post.postedBy])

    return (
      <div className='w-full mt-4 flex items-start gap-3 justfiy-between pb-12'>
          <div className='flex flex-col gap-2 items-center justify-start'>
              <div className='flex items-center justify-between w-8 h-8 rounded-full overflow-hidden'>
                  <img src={postUserProfile?.profilePic} alt={postUserProfile?.name} className='w-full h-full object-cover' />
                  </div>
                  
                  {post.image?<div className=' h-[250px] sm:h-[370px] md:[400px] w-[.1rem] bg-[#c0baba42]'></div>:<div className=' h-[100px] w-[.1rem] bg-[#c0baba42]'></div>}
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
                  <h6 className='font-bold'>{postUserProfile?.name}</h6>
                  <div className='w-7 h-7'><img src="/verified.png" alt="verified logo" /></div>
                 </div>
                 <div className="flex items-center gap-2">
                  <h6 className='font-bold text-[.8rem] text-[#dadada]'>{timeAgo(post.createdAt)}</h6>
                  <BsThreeDots />
                 </div>
                  
              </div>
              <p className='text-[0.8rem]'>{post.text}</p>
              {post.image &&
              <div className='w-full max-h-[300px] overflow-hidden rounded-sm'>
              <img src={post.image} alt="post" />
          </div>}
          <Action post={post}/>
          </Link>                                                                 
          
      </div> 
  
  )
}

export default Post