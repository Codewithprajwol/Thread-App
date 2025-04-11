import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState} from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { Loader } from "lucide-react"


export default function UpdateProfilePage({user}) {
  const {updateProfile,isUpdating}=useAuthStore()
  const [newProfile, setNewProfile] = useState({
    name:user?.name,
    username: user?.username,
    email:  user?.email,
    bio: user?.bio,
    password:'' ,
    newPassword: '',
    confirmPassword:'',
    profilePic: user?.profilePic
  })
  const changeProfilePictureRef=useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    await updateProfile({...newProfile,id:user._id});
  }


  const imageInputHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProfile((prev) => ({ ...prev, profilePic: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profilePic || "/placeholder.svg"}
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            <div className="space-y-1 flex-1 ">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <input type="file" ref={changeProfilePictureRef} onChange={imageInputHandler} size="sm" hidden/>
              <Button type="button" className="place-self-end mt-2 cursor-pointer" onClick={()=>{changeProfilePictureRef.current.click()}}>Change photo</Button>      
              <span className="pl-5">{newProfile.profilePic?"Image Uploaded":""}</span>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" onChange={(e)=>(setNewProfile((prev)=>({...prev,name:e.target.value})))} name="name" value={newProfile.name} placeholder="E.g. Jane Doe"   />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">Nick Name</Label>
                <Input id="nickname" onChange={(e)=>(setNewProfile((prev)=>({...prev,username:e.target.value})))} value={newProfile.username} name="username" placeholder="E.g. Jonu"  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" onChange={(e)=>(setNewProfile((prev)=>({...prev,email:e.target.value})))} value={newProfile.email} name="email" placeholder="E.g. jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Biography</Label>
                <Textarea id="bio" name="bio" onChange={(e)=>(setNewProfile((prev)=>({...prev,bio:e.target.value})))} value={newProfile.bio} placeholder="Enter your bio" className="mt-1" style={{ minHeight: "100px" }} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>Change Password</div>
              <div>For your security, please do not share your password with others.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" onChange={(e)=>(setNewProfile((prev)=>({...prev,password:e.target.value})))} value={newProfile.password} name="password" id="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" onChange={(e)=>(setNewProfile((prev)=>({...prev,newPassword:e.target.value})))} value={newProfile.newPassword} name="newPassword" id="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" onChange={(e)=>(setNewProfile((prev)=>({...prev,confirmPassword:e.target.value})))} value={newProfile.confirmPassword} name="confirmPassword" id="confirm-password" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button type="submit">{isUpdating ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					):"update"}</Button>
        </div>
      </div>
    </form>
  )
}