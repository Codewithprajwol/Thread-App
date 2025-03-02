import React from 'react'

const UserHeader = () => {
  return (
    <div className='w-full flex items-center justify-around'>
        <div className='flex items-center'>
            <img src='https://avatars.githubusercontent.com/u/7525670?v=4' alt='User' className='w-14 h-14 rounded-full' />
            <div className='ml-2'>
            <h1 className='text-lg font-semibold'>Username</h1>
            <p className='text-sm text-gray-500'>5 posts</p>
            </div>
        </div>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Follow</button>
    </div>
  )
}

export default UserHeader