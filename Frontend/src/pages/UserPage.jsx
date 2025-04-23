import CreatePost from '@/components/CreatePost'
import Post from '@/components/Post'
import UserHeader from '@/components/UserHeader'
import { useAuthStore } from '@/store/useAuthStore'
import { usePostStore } from '@/store/usePostStore'
import { Loader } from 'lucide-react'
import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'

const UserPage = () => {
     const {getProfile,profileUser,isGetProfileLoading,hasFetchedProfile,user}=useAuthStore();
     const {getAllUserPost,allPostError,isAllPostFetched,posts}=usePostStore();
     const query=useParams();
     useEffect(()=>{
       getProfile({query:query.username});
      },[query.username])
      
      useEffect(()=>{
        if(profileUser?._id){
          getAllUserPost({id:profileUser?._id});
        }
      },[getAllUserPost,profileUser])
  if(isGetProfileLoading){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
      </div>
    )
  }
  if(!profileUser && hasFetchedProfile){
     return (<div>user not found</div>)
  }
  return (
    <>
    <UserHeader />
    {isAllPostFetched && !allPostError?posts.length===0?<div className='flex items-center justify-center mt-5'>No posts Yet</div>:posts.map((post)=><Post key={post._id} post={post}/>):<div className='flex items-center justify-center h-screen'>{allPostError}</div>}
    {user?._id===profileUser?._id && <CreatePost/>}
    </>
  )
}

export default UserPage