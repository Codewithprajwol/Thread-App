import Header from "@/components/Header"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="max-w-[600px] mx-auto py-4">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage/>} />
        <Route path="/:username/post/:id" element={<PostPage/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
