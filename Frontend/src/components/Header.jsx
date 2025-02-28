import React from 'react'
import DarkMode from '/DarkLogo.svg'

const Header = () => {
  return (
    <div className='w-full flex items-center justify-center cursor-pointer'>
        <img src={DarkMode} alt='Dark Mode' className='w-10 h-10' />
    </div>
  )
}

export default Header