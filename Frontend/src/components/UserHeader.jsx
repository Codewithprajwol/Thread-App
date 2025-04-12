import { Instagram } from 'lucide-react'
import React from 'react'
import ThreeDotUserHeader from './_ThreeDotUserHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const UserHeader = ({user}) => {
  console.log(user.follower.length)
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
    <img src={user?.profilePic} alt='Profile' className='w-16 h-16 rounded-full'/>
    </div>
    <p className='mt-3 text-sm'>{user.bio}</p>
    <div className='flex items-center justify-between mt-2'>
        <h6 className='text-blue-300'>{user?.follower.length}{user.follower.length>=1000?Math.round(user.follower.count/1000)+"  k" :""} followers . instagram.com</h6>
        <div className='flex items-center justify-start gap-2'>
            <Instagram/>
            <ThreeDotUserHeader/>
        </div>
    </div>
    <Tabs defaultValue="account" className="w-[600px] mx-auto mt-6 bg">
  <TabsList className="flex items-center justify-between w-full">
    <TabsTrigger value="account"  >Threads</TabsTrigger>
    <TabsTrigger value="password" >Replies</TabsTrigger>
  </TabsList>
  {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent> */}
</Tabs>

    </>
  )
}

export default UserHeader