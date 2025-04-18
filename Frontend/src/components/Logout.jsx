import { useAuthStore } from '@/store/useAuthStore';
import { LogOut } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button';

const Logout = () => {
  const logOut=useAuthStore((state)=>state.logOut);
  return (
    <LogOut className='cursor-pointer size-5' onClick={()=>{logOut()}}/>
  ) 
}

export default Logout