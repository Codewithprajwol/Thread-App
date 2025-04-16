import { PlusIcon } from 'lucide-react'
import React from 'react'
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


const CreatePost = () => {
    const fileInputRef = React.useRef(null);
    const {handlePreviewImage,imageUrl}=usePreviewImage()

  return (
    <Dialog>
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
  <DialogContent className='max-h-[30rem] overflow-hidden'>
    <div className='flex flex-col gap-3 overflow-y-auto w-full h-full post-dialog px-2'>
    <DialogHeader>
      <DialogTitle>Create Post</DialogTitle>
    </DialogHeader>
      <Textarea placeholder="What's on your mind?" className='w-full h-20 focus:border-0' />
      <h3 className='flex items-center justify-end text-[.8rem]'>500/500</h3>
      <input type="file" ref={fileInputRef} onChange={handlePreviewImage} hidden />
      <div><BsFillImageFill className='cursor-pointer' onClick={()=>{fileInputRef.current.click()}} /></div>
      
        {imageUrl &&<div className='w-full min-h-full rounded-xl overflow-hidden '>
            <img src={imageUrl} alt="postImage" className='w-full h-full'/>
        </div>}
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
      </div>
  </DialogContent>
</Dialog>

    
  )
}

export default CreatePost