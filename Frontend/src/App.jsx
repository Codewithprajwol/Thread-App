import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"

function App() {
  return (
    <div className="max-w-[600px] mx-auto py-4">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage/>} />
        <Route path="/:username/post/:id" element={<PostPage/>} />
      </Routes>
    </div>
  )
}

export default App
