import React, { useState } from 'react'
import DarkMode from '/DarkLogo.svg'
import LightMode from '/light-logo.svg'
import { useTheme } from './ThemeProvider'
import { Link } from 'react-router-dom'
import {  HomeIcon, User } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import Logout from './Logout'

const   Header = () => {
  const [darkMode, setDarkMode] = useState("dark")
  const { setTheme } = useTheme()
  const user=useAuthStore((state)=>state.user);

const uiSituation=localStorage.getItem('vite-ui-theme');
  const toggleDarkMode = () => {
    if (darkMode === "light") {
      setDarkMode("dark")
      setTheme("dark")
    } else {
      setDarkMode("light")
      setTheme("light")
    }
  }
  return (
    <div className='w-full flex items-center justify-between cursor-pointer'>
        {user && <Link to="/"><HomeIcon className='size-5'/></Link>} 
        <img onClick={toggleDarkMode} src={ darkMode=="dark"?uiSituation=="light"?DarkMode: LightMode:DarkMode} alt='Dark Mode' className='w-7 h-7 '/>
        <div className='flex items-center justify-between gap-3'>
         <Link to={`/${user?.username}`}><User className='size-5'/></Link>
         <Logout/>
        </div>
    </div>
  )
}

export default Header