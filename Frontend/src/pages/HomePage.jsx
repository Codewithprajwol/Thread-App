import Post from '@/components/Post';
import { usePostStore } from '@/store/usePostStore';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'

const HomePage = () => {
  const {isFeedPostFetched,feedPost,feedPosts,}=usePostStore();

  useEffect(()=>{
      feedPost()
    },[feedPost])

  return (
    <div className='h-screen w-full'>
       
        {isFeedPostFetched?feedPosts.length===0?<h1 className='text-center pt-4'>Follow SomeOne to see the feed Posts</h1>:feedPosts.map((post)=><Post key={post._id} post={post}/>):( <div className="flex items-center justify-center h-screen">
        <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
   </div>)}
      </div>
  )
}

export default HomePage