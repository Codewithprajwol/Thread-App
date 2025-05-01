import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SendHorizontal } from 'lucide-react'
import { useMessageStore } from '@/store/useMessageStore'

const MessagingInput = () => {
  const [message,setMessage]=useState('');
  const selectedConversation=useMessageStore((state)=>state.selectedConversation);
  const sendMessage=useMessageStore((state)=>state.sendMessage);
   const handleSendClick=async(e)=>{
        e.preventDefault();
       await sendMessage(message, selectedConversation.userId);
        setMessage('');
   }


  return (
    <form onSubmit={handleSendClick} className='flex mt-2 px-2 pb-5 absolute w-full top-[99%]  items-center justify-between gap-2'>
        <Input className="grow-1 bg-gray-200 hover:ring-0 focus:border-none" placeholder="input you message" onChange={(e) => setMessage(e.target.value)} value={message}/>
        <Button className='cursor-pointer'>
            <SendHorizontal  />
        </Button>
    </form>
  )
}

export default MessagingInput