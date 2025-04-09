import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='text-center bg-pink-200 min-h-32 text-bold'>
        <h1 className='mb-2'>HomePage</h1>
        <Link to="/prajwolShrestha" className='border-1 bg-gray-500 border-black text-white py-1 px-3 rounded-md'>View Profile Page</Link>
    </div>
  )
}

export default HomePage