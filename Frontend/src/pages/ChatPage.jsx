import Conversation from '@/components/Conversation'
import MessageContainer from '@/components/MessageContainer'
import { Input } from '@/components/ui/input'
// import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useSocket } from '@/context/SocketContext'
import { useAuthStore } from '@/store/useAuthStore'
import { useMessageStore } from '@/store/useMessageStore'
import { Loader2, MessageSquare, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ChatPage = () => {
    const { conversations, isUserConversationLoading,selectedConversation, isUserConversationError, isUserConversationSuccess,getConversations } = useMessageStore()
    const [searchUserText,setSearchUserText]=useState('');
    const {chatUserSearch,isChatUserSearchLoading,isChatUserSearchError,isChatUserSearchSuccess,setSelectedConversation}=useMessageStore()
    const {
      onlineUsers}=useSocket()
    const user=useAuthStore((state=>state.user))
  
    useEffect(() => {
        getConversations();
    }, [getConversations])



    const handleChatUserSearch=async(e)=>{
       e.preventDefault();
      await chatUserSearch(searchUserText,user);
      setSearchUserText('');
    }

  return (
    <div className='pt-5 absolute w-full sm:w-[100%] md:w-[80%] lg:w-[750px] left-[50%] -translate-x-[50%]'>
        <div className='flex w-full gap-5 justify-start flex-col mx-auto md:flex-row md:max-w-[100%] lg:max-w-[100%]'>
          {/* conversation area */}
           <div className='w-[100%] md:w-[30%] flex flex-col justify-start gap-2 '>
            <form onSubmit={handleChatUserSearch} className='flex w-full items-center gap-2 p-3' >
              <Input className='grow-1 placeholder:text-[13px]' placeholder="search user with @" value={searchUserText} onChange={(e) => setSearchUserText(e.target.value)} />
              {isChatUserSearchLoading?<Loader2 className="w-5 h-5 animate-spin " /> :<SearchIcon  className='cursor-pointer'/>}
            </form>
            {isUserConversationLoading &&  [1,3,4,5].map((_,index)=>( <div key={index} className="w-full flex items-center justify-around space-x-2 px-2">
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>))}
    {isUserConversationSuccess && conversations?.map((conversation)=><Conversation key={conversation._id} isOnline={onlineUsers.includes(conversation.participants[0]._id)} conversation={conversation}/>)}
     
   
           </div>
           {/* <Separator /> */}
           {/* message area */}
           <div className='w-[100%] md:w-[70%]  p-4 '>
            {!selectedConversation._id && (<div className='h-full w-full flex items-center justify-center flex-col gap-2 '>
              <MessageSquare size={100}/>
              <p>Please Start the Conversation With Someone</p>
            </div>)}

            {selectedConversation._id && <MessageContainer/>}
           </div>
        </div>
    </div>
  )
}

export default ChatPage