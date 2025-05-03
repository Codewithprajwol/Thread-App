import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useMessageStore } from '@/store/useMessageStore';
import { useAuthStore } from '@/store/useAuthStore';
import { BsCheck2All } from 'react-icons/bs';

const Message = ({ownMessage,message,seen}) => {
      const selectedconversation = useMessageStore((state) => state.selectedConversation);
  const user = useAuthStore((state) => state.user);
  return (
    <>
    {ownMessage ?(<div className='flex gap-2 items-center justify-end pt-3'>
        <div className='max-w-[350px] bg-blue-400 px-2 py-1 rounded-md flex gap-1'><span>{message}</span><span className='flex items-end'><BsCheck2All className={seen ? `text-purple-950` : ''}/></span></div>
        <Avatar>
      <AvatarImage className='object-cover object-right-top' src={user.profilePic} alt={user.name} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>):(<div className='flex gap-2 items-center justify-start pt-3'>
        <Avatar>
      <AvatarImage className='object-cover object-right-top' src={selectedconversation.userprofilePic} alt={selectedconversation.userName} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <p className='max-w-[350px] bg-gray-400 px-2 py-1 rounded-md'>{message}
        </p>
    </div>)}
   
    </>
  )
}

export default Message