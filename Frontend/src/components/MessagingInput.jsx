import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SendHorizontal } from 'lucide-react'

const MessagingInput = () => {
  return (
    <div className='flex mt-2 px-2  sticky bottom-1 left-[2%] items-center justify-between gap-2'>
        <Input className="grow-1 bg-gray-200 hover:ring-0 focus:border-none" placeholder="input you message"/>
        <Button className='cursor-pointer'>
            <SendHorizontal />
        </Button>
    </div>
  )
}

export default MessagingInput