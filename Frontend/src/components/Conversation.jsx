import React from 'react'

const Conversation = () => {
  return (
    <div className="w-full flex items-center justify-around pt-1 space-x-2 px-2">
      <div className='h-12 w-12 rounded-full shrink-0 overflow-hidden'>
        <img src="https://github.com/shadcn.png" alt="@shadcn" className='w-full h-full object-cover' />
      </div>
      <div className="space-y-2 w-full flex flex-col justify-start leading-none">
        <div className="w-[100%]" >prajwol</div>
        <div className=" w-[100%]" >hello how are you?</div>
      </div>
    </div>
  )
}

export default Conversation