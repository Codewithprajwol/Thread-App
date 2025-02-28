import React, { useState } from 'react'
import DarkMode from '/DarkLogo.svg'
import { useTheme } from './ThemeProvider'

const Header = () => {
  const [darkMode, setDarkMode] = useState("light")
  const { setTheme } = useTheme()

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
    <div className='w-full flex items-center justify-center cursor-pointer'>
        <img onClick={toggleDarkMode} src={DarkMode} alt='Dark Mode' className='w-7 h-7' />
    </div>
  )
}

export default Header