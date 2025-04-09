import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState} from "react"
import { useAuthStore } from "@/store/useAuthStore"

export default function UpdateProfilePage({user}) {
  const {updateProfile,isLoading}=useAuthStore()

  const [newProfile, setNewProfile] = useState({
    name:'',
    username:'',
    email:'',
    bio:'',
    password:'',
    newPassword:'',
    confirmPassword:'',
    profilePic:''
  })
  const changeProfilePictureRef=useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    await updateProfile({...newProfile,id:user._id});
    setNewProfile({
      name:'',
      username:'',
      email:'',
      bio:'',
      password:'',
      newPassword:'',
      confirmPassword:'',
      profilePic:''

    })
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
   console.log(newProfile)

  return (
    <form onSubmit={submitHandler}>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <img
              src="/placeholder.svg"
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
            />
            <div className="space-y-1 flex-1 ">
              <h1 className="text-2xl font-bold">Prajwol Shrestha</h1>
              <input type="file" ref={changeProfilePictureRef} onChange={imageInputHandler} size="sm" hidden/><Button type="button" className="place-self-end mt-2 cursor-pointer" onClick={()=>{changeProfilePictureRef.current.click()}}>Change photo</Button>      
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
          <Button type="submit">{isLoading? "updating...":"update"}</Button>
        </div>
      </div>
    </form>
  )
}