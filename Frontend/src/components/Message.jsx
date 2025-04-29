import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Message = ({ownMessage}) => {
  return (
    <>
    {ownMessage || false ?(<div className='flex gap-2 items-center justify-end pt-3'>
        <p className='max-w-[350px] bg-blue-400 px-2 py-1 rounded-md'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente maxime deserunt, in nemo illum nam voluptates dolorum eius saepe eum?
        </p>
        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>):(<div className='flex gap-2 items-center justify-start pt-3'>
        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <p className='max-w-[350px] bg-gray-400 px-2 py-1 rounded-md'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente maxime deserunt, in nemo illum nam voluptates dolorum eius saepe eum?
        </p>
    </div>)}
    {ownMessage || true ?(<div className='flex gap-2 items-center justify-end pt-3'>
        <p className='max-w-[350px] bg-blue-400 px-2 py-1 rounded-md'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente maxime deserunt, in nemo illum nam voluptates dolorum eius saepe eum?
        </p>
        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </div>):(<div className='flex gap-2 items-center justify-start pt-3'>
        <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <p className='max-w-[350px] bg-gray-400 px-2 py-1 rounded-md'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente maxime deserunt, in nemo illum nam voluptates dolorum eius saepe eum?
        </p>
    </div>)}
    </>
  )
}

export default Message