import UserHeader from '@/components/UserHeader'
import UserPost from '@/components/UserPost'
import React from 'react'

const UserPage = () => {
  
  return (
    <>
    <UserHeader user={user}/>
    <UserPost likes={238} replies={435} postImg="/post1.png" postTitle="let's talk about thread."/>
    <UserPost likes={200} replies={400} postImg="/post2.png" postTitle="nice toturial."/>
    <UserPost likes={234} replies={453} postImg="/post3.png" postTitle="I love this guy."/>
    <UserPost likes={234} replies={453}  postTitle="This is my first thread."/>
    </>
  )
}

export default UserPage