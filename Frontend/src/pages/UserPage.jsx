import UserHeader from '@/components/UserHeader'
import UserPost from '@/components/UserPost'
import { useAuthStore } from '@/store/useAuthStore'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UserPage = () => {
     const {getProfile,profileUser,isGetProfileLoading,hasFetchedProfile}=useAuthStore();
     const username=useParams();

     useEffect(()=>{
      getProfile(username);
     },[username.username,getProfile])


  if(isGetProfileLoading){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
      </div>
    )
  }
  if(!profileUser && hasFetchedProfile){
     return (<div>user not found </div>)
  }
  return (
    <>
    <UserHeader />
    <UserPost likes={238} replies={435} postImg="/post1.png" postTitle="let's talk about thread."/>
    <UserPost likes={200} replies={400} postImg="/post2.png" postTitle="nice toturial."/>
    <UserPost likes={234} replies={453} postImg="/post3.png" postTitle="I love this guy."/>
    <UserPost likes={234} replies={453}  postTitle="This is my first thread."/>
    </>
  )
}

export default UserPage