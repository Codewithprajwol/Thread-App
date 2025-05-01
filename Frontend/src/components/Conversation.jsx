import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

const Conversation = ({conversation}) => {
  const user=useAuthStore((state)=>state.user);
  const [otherUser]=conversation?.participants.filter((participant)=>participant._id!==user._id);
  console.log(otherUser)
  return (
    <div className="w-full flex items-center justify-around pt-1 space-x-2 px-2">
      <div className='h-12 w-12 rounded-full shrink-0 overflow-hidden'>
        <img src={otherUser.profilePic} alt="@shadcn" className='w-full h-full object-cover' />
      </div>
      <div className="space-y-2 w-full flex flex-col justify-start leading-none">
        <div className="w-[100%] flex items-center justfiy-start gap-2" >{otherUser.name} <img src='./verified.png' alt="Verified" className='h-5' /></div>
        <div className=" w-[100%]" >{conversation?.lastMessage?.text}</div>
      </div>
    </div>
  )
}

export default Conversation