import { useAuthStore } from '@/store/useAuthStore';
import { LogOut } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button';

const Logout = () => {
  const logOut=useAuthStore((state)=>state.logOut);
  return (
    <Button className='cursor-pointer' onClick={()=>{logOut()}}><LogOut className='size-4.5'/></Button>
  ) 
}

export default Logout