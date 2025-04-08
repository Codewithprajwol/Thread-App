import React from 'react'
import Signup from '@/components/Authentication/Signup'
import Login from '@/components/Authentication/Login'
import { useAuthStore } from '@/store/useAuthStore'

const AuthPage = () => {
         const {authScreenState,setAuthScreenState}=useAuthStore();
  return (
    <>
    {authScreenState==='login' ? <Login setAuthScreenState={setAuthScreenState}/> : <Signup setAuthScreenState={setAuthScreenState}/>}
    </>
  )
}

export default AuthPage