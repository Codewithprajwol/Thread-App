import { Instagram } from 'lucide-react'
import React from 'react'
import ThreeDotUserHeader from './_ThreeDotUserHeader'

const UserHeader = () => {
  return (
    <>
    <div className='w-full flex items-center justify-between mt-2'>
        <div className='flex items-start justify-center gap-1 flex-col'>
            <h1 className='text-2xl'>Prajwol Shrestha</h1>
            <div className='flex items-center justify-start gap-2'>
            <h6>jukerberg</h6>
            <h6 className='bg-gray-500/40 px-1 rounded-sm text-hello'>thread.net</h6>
            </div>
        </div>
    <img src='/zuck-avatar.png' alt='Profile' className='w-16 h-16 rounded-full'/>
    </div>
    <p className='mt-3'>Co-founder, executive chairman and CEO of Meta Platforms.</p>
    <div className='flex items-center justify-between mt-2'>
        <h6 className='text-blue-300'>3.2K followers . instagram.com</h6>
        <div className='flex items-center justify-start gap-2'>
            <Instagram/>
            <ThreeDotUserHeader/>
        </div>
    </div>
    </>
  )
}

export default UserHeader