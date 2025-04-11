import Header from "@/components/Header"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import { Toaster } from "react-hot-toast"
import AuthPage from "./pages/AuthPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ForgetPasswordPage from "./pages/ForgetPasswordPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import { Loader } from "lucide-react"

function App() {
  const {checkAuth,user,isLoading}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[])

  if(!user && isLoading){
    return (
    <div className="flex items-center justify-center h-screen">
         <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
    </div>
    )
  }

  return (
    <div className="max-w-[600px] mx-auto py-4 px-2">
      <Header />
      <Routes>
        <Route path="/" element={user?<HomePage />:<Navigate to='/auth'/>} />
        <Route path="/auth" element={user?<Navigate to='/'/>:<AuthPage />} />
        <Route path="/:username" element={user?<UserPage/>:<Navigate to='/auth'/>} />
        <Route path="/:username/post/:id" element={<PostPage/>} />
        <Route path="/verify-email" element={<EmailVerificationPage/>}/>
        <Route path="/forget-password" element={<ForgetPasswordPage/>}/>
        <Route path="/reset-password/:token" element={<ResetPasswordPage />}/>
        <Route path="/updateProfile" element={<UpdateProfilePage user={user}/>}/>
      </Routes>
        <Toaster/>
    </div>
  )
}

export default App
