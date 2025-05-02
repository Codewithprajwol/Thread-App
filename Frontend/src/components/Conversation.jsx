import { useAuthStore } from '@/store/useAuthStore'
import { useMessageStore } from '@/store/useMessageStore';
import React from 'react'
import { BsCheck2All } from 'react-icons/bs';

const Conversation = ({ conversation,isOnline }) => {
  const user = useAuthStore((state) => state.user);
  const otherUser = conversation?.participants?.[0];
  const selectedconversation = useMessageStore((state) => state.selectedConversation);
  const setSelectedConversation = useMessageStore((state) => state.setSelectedConversation);


  const handleSelectedConversation = () => {
    setSelectedConversation({
      _id: conversation._id,
      userName: otherUser.name,
      userprofilePic: otherUser.profilePic,
      userId: otherUser._id,
      mock: conversation.mock,
    });
  };
  return (
    <div onClick={handleSelectedConversation} className={`w-full flex  items-start justify-around  space-x-2 p-2 ${selectedconversation?._id===conversation?._id?'bg-gray-500/50':''} hover:bg-gray-500/50 cursor-pointer rounded-md transition-all duration-200 ease-in-out`}>
      <div className={`h-12 w-12 rounded-full shrink-0 box-content overflow-hidden ${isOnline? 'border-3 border-green-600' : ''} `}>
      
        <img src={otherUser.profilePic} alt="@shadcn" className='w-full h-full object-cover object-left-top' />
      </div>
      <div className="space-y-2 w-full flex flex-col justify-start leading-none">
        <div className="w-[100%] text-[1rem] flex items-center justify-start gap-2 whitespace-nowrap" >{otherUser.name} <img src='./verified.png' alt="Verified" className='h-5' /></div>
        <div className=" text-sm w-[100%] flex items-center justify-start gap-2" >{conversation?.lastMessage?.sender === user._id ? <BsCheck2All /> : null}{<span>{conversation?.lastMessage?.text.length > 10 ? conversation?.lastMessage?.text.substring(0, 10) + '...' : conversation?.lastMessage?.text}</span>}</div>
      </div>
    </div>
  )
}

export default Conversation