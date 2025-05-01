import { useAuthStore } from '@/store/useAuthStore';
import { LogOut } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button';
import { useMessageStore } from '@/store/useMessageStore';

const Logout = () => {
  const logOut=useAuthStore((state)=>state.logOut);
  const setSelectedConversation=useMessageStore((state)=>state.setSelectedConversation);
  return (
    <LogOut className='cursor-pointer size-5' onClick={()=>{logOut(); setSelectedConversation({_id:'',userName:'',userprofilePic:'',userId:''});}}/>
  ) 
}

export default Logout