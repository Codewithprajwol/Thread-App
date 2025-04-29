import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare, SearchIcon } from 'lucide-react'
import React from 'react'

const ChatPage = () => {
  return (
    <div className='pt-5 absolute w-full sm:w-[100%] md:w-[80%] lg:w-[750px] left-[50%] -translate-x-[50%]'>
        <div className='flex w-full  justify-start flex-col mx-auto md:flex-row md:max-w-[100%] lg:max-w-[100%]'>
          {/* conversation area */}
           <div className='w-[100%] md:w-[30%] flex flex-col justify-start gap-2 '>
            <h1>Conversation</h1>
            <form className='flex w-full items-center gap-2' >
              <Input className='grow-1' placeholder="search for the user"/>
              <SearchIcon className='cursor-pointer'/>
            </form>
            {false &&  [1,3,4,5].map((_,index)=>( <div className="w-full flex items-center justify-around space-x-2 px-2">
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>))}
    {true && [1,3,4].map((_,index)=>(
     ( <div className="w-full flex items-center justify-around pt-1 space-x-2 px-2">
      <div className='h-12 w-12 rounded-full shrink-0 overflow-hidden'>
        <img src="https://github.com/shadcn.png" alt="@shadcn" className='w-full h-full object-cover' />
      </div>
      <div className="space-y-2 w-full flex flex-col justify-start leading-none">
        <div className="w-[100%]" >prajwol</div>
        <div className=" w-[100%]" >hello how are you?</div>
      </div>
    </div>)
    ))}
           </div>
           {/* message area */}
           <div className='w-[100%] md:w-[70%] h-[400px] overflow-y-auto '>
            {true && (<div className='h-full w-full flex items-center justify-center flex-col gap-2 '>
              <MessageSquare size={100}/>
              <p>Please Start the Conversation With SomeOne</p>
            </div>)}
           </div>
        </div>
    </div>
  )
}

export default ChatPage