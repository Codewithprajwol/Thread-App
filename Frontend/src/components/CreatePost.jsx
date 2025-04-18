import { Loader, PlusIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {motion} from 'framer-motion'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from './ui/textarea'
import { BsFillImageFill } from 'react-icons/bs'
import usePreviewImage from '@/Hooks/usePreviewImage'
import toast from 'react-hot-toast'
import { usePostStore } from '@/store/userPostStore'
import { useAuthStore } from '@/store/useAuthStore'


const CreatePost = () => {
  const MAX_CHAR=500;
  const [characterValue,setCharacterValue]=useState(0);
  const [open,setOpen]=useState(false);
  const [textData,setTextData]=useState("");
  const {createUserPost,isPosting}=usePostStore();
  const user=useAuthStore((state)=>state.user);
    const fileInputRef = React.useRef(null);
    const {handlePreviewImage,imageUrl,setImageUrl}=usePreviewImage();
    const handleInput=(e)=>{
       setTextData(e.target.value);
      if(textData.length>MAX_CHAR){
        e.target.value=textData.slice(0,MAX_CHAR);
          toast.error("Maximum character limit reached", {
            id: "max-char-error"
          });
          return;
      }
      setCharacterValue(textData.length);
    }

    const handlePostSubmit=(e)=>{
      e.preventDefault();
      const status=createUserPost({text:textData,image:imageUrl,postedBy:user._id})
      if(status===200){
      setTextData("");
      setImageUrl(""); 
      }
    }
    useEffect(()=>{
      console.log('he')
      if(!isPosting){
        setOpen(false)
      }
    },[isPosting])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
  <motion.div
      className='fixed bottom-1 right-5 cursor-pointer'
      animate={{
        y: [0, -5, 0], // levitating up and down
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Button className='flex items-center gap-1 cursor-pointer transition-all duration-200'>
        <PlusIcon size={14} /> Post
      </Button>
    </motion.div>
  </DialogTrigger>
  <DialogContent aria-describedby={undefined} className='max-h-[30rem] overflow-y-auto post-dialog'>
    <form onSubmit={handlePostSubmit} className='flex flex-col gap-3  w-full h-full  sm:px-2 '>
    <DialogHeader>
      <DialogTitle>Create Post</DialogTitle>
    </DialogHeader>
      <Textarea placeholder="What's on your mind?" onChange={handleInput} value={textData} className='w-full h-20 focus:border-0 post-dialog' />
      <h3 className='flex items-center justify-end text-[.8rem]'>{characterValue}/{MAX_CHAR}</h3>
      <input type="file" ref={fileInputRef} onChange={handlePreviewImage} hidden />
      <div><BsFillImageFill className='cursor-pointer' onClick={()=>{fileInputRef.current.click()}} /></div>
      
        {imageUrl &&<div className='w-full h-auto sm:h-auto rounded-xl overflow-hidden relative '>
            <X className='absolute top-2 right-2 cursor-pointer text-white mix-blend-difference' onClick={()=>setImageUrl(null)}/>
            <img src={imageUrl} alt="postImage" className='w-full h-full object-cover'/>
        </div>}
       <Button className="self-end cursor-pointer" title="post">
        {isPosting?(
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Posting...
						</>
					):"Post"}
        </Button>
      </form>
  </DialogContent>
</Dialog>

    
  )
}

export default CreatePost