import Header from "@/components/Header"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import { Toaster } from "@/components/ui/sonner"
import AuthPage from "./pages/AuthPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"

function App() {
  return (
    <div className="max-w-[600px] mx-auto py-4 px-2">
      <Header />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:username" element={<UserPage/>} />
        <Route path="/:username/post/:id" element={<PostPage/>} />
        <Route path="/verify-email" element={<EmailVerificationPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
