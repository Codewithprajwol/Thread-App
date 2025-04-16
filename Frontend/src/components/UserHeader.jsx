import { Instagram } from 'lucide-react'
import React from 'react'
import ThreeDotUserHeader from './_ThreeDotUserHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from './ui/button'
import {  useNavigate} from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'


const UserHeader = () => {
  const user=useAuthStore((state)=>state.profileUser);
  const currentUser=useAuthStore((state)=>state.user);  

     const navigate=useNavigate() 
     const {followUnfollow}=useAuthStore()

     const handleFollowUnfollow=()=>{
      followUnfollow({id:user?._id});
     }
     
  return (
    <>
    <div className='w-full flex items-center justify-between mt-2'>
        <div className='flex items-start justify-center gap-1 flex-col'>
            <h1 className='text-3xl font-bold'>{user?.name}</h1>
            <div className='flex items-center justify-start gap-2'>
            <h6 className='text-[.9rem] text-pink-200'>{user?.username}</h6>
            <h6 className='bg-gray-500/40 px-1 rounded-sm text-hello text-[.9rem]'>thread.net</h6>
            </div>
        </div>
    <img src={user?.profilePic || "/placeholder.svg"} alt='Profile' className='w-16 h-16 rounded-full'/>
    </div>
    <p className='mt-3 text-sm'>{user?.bio}</p>
    <div className='flex items-center justify-between mt-2'>
      <div className='flex items-center jusgify-between gap-2'>
        <h6 className='text-blue-300'>{user?.follower?.length}{user?.follower?.length>=1000?Math.round(user.follower.count/1000)+"k" :""} followers . instagram.com</h6>
          {user?._id!==currentUser?._id?<Button onClick={handleFollowUnfollow} className="cursor-pointer bg-blue-400 hover: transition-all duration-200">{user?.follower.includes(currentUser?._id)?"Unfollow":"Follow"}</Button>:<Button className="cursor-pointer" onClick={()=>{navigate('/updateProfile')}}>Update Profile</Button>}
          </div>
        <div className='flex items-center justify-start gap-2'>
            <Instagram/>
            <ThreeDotUserHeader/>
        </div>
    </div>
    <Tabs defaultValue="account" className="w-[600px] mx-auto mt-6 bg">
  <TabsList className="flex items-center justify-between w-full">
    <TabsTrigger value="account">Threads</TabsTrigger>
    <TabsTrigger value="password">Replies</TabsTrigger>
  </TabsList>
</Tabs>

    </>
  )
}

export default UserHeader