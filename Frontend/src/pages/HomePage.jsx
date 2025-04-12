import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({user}) => {
  console.log(user);
  const logOut=useAuthStore((state)=>state.logOut);
  return (
    <div className='text-center min-h-32 text-bold'>
        <h1 className='mb-2'>HomePage</h1>
        <Link to={`/${user.name}`} className='border-1 bg-gray-500 border-black text-white py-1 px-3 rounded-md'>View Profile Page</Link>
         <button onClick={()=>{logOut()}}>logOut</button>
      </div>
  )
}

export default HomePage