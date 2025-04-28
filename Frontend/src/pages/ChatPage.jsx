import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const ChatPage = () => {
  return (
    <div className='pt-5 border-2 border-amber-600 absolute w-full sm:w-[100%] md:w-[80%] lg:w-[750px] left-[50%] -translate-x-[50%]'>
        <div className='flex w-full items-center justify-start flex-col mx-auto md:flex-row md:max-w-[100%] lg:max-w-[100%]'>
           <div className='w-[100%] md:w-[30%] px-2 flex flex-col justify-start gap-2'>
            <h1>your conversation</h1>
            <form className='flex w-full items-center gap-2' >
              <Input className='grow-1' placeholder="search for the user"/>
              <SearchIcon className='cursor-pointer'/>
            </form>
            <div className='w-full '></div>
           </div>
           <div className='w-[100%] md:w-[70%] '>message container</div>
        </div>
    </div>
  )
}

export default ChatPage