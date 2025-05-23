import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
	DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Textarea } from './ui/textarea'
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useReplyStore } from "@/store/useReplyStore";

const Action = ({post}) => {
	const user=useAuthStore((state)=>state.user);
	const [liked,setLiked]=useState(post?.likes?.includes(user._id));
	const likeUnlikeUser=usePostStore((state)=>state.likeUnlikeUser);
	const [replyText,setReplyText]=useState("");
	const [open,setOpen]=useState(false);
	const {createReply,getReplys,replySuccess,replyError,isReplying}=useReplyStore();
    const replys=useReplyStore((state)=>state.replys)
	const handleLikeUnlikePost=async()=>{
		if(!user){
			return toast.error("Please login to like the post")
		}
		await likeUnlikeUser({ id:post._id,liked:liked,userId:user._id})
		setLiked(!liked);
	}
	 useEffect(()=>{
		if(post?._id){
		  getReplys(post?._id);
		}
		},[post?._id])


	useEffect(()=>{
     if(replySuccess && !replyError){
			setOpen(false)
	 }
	},[replySuccess,replyError])

	const handleReplySubmit=async()=>{
		await createReply({userId:user._id,postId:post._id,profilePic:user?.profilePic,username:user?.name,text:replyText})
		setReplyText("");
	}
	return (
		<div className="flex flex-col gap-2" >
<div className="flex p-2 items-center justify-between w-[100px]" onClick={(e)=>{e.stopPropagation();e.preventDefault()}} >
				<svg
					aria-label='Like'
					color={liked ? "rgb(237, 73, 86)" : ""}
					fill={liked ? "rgb(237, 73, 86)" : "transparent"}
					height='19'
					role='img'
					viewBox='0 0 24 22'
					width='20'
					onClick={handleLikeUnlikePost}
				>
					<path
						d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
						stroke='currentColor'
						strokeWidth='2'
					></path> 
				</svg>

				<Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
	  			<svg
					aria-label='Comment'
					color=''
					fill=''
					height='20'
					role='img'
					viewBox='0 0 24 24'
					width='20'
				>
					<title>Comment</title>
					<path
						d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
						fill='none'
						stroke='currentColor'
						strokeLinejoin='round'
						strokeWidth='2'
					></path>
				</svg>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}  className="sm:max-w-[425px] px-2 sm:px-4">
        <DialogHeader>
          <DialogTitle>Reply</DialogTitle>
        </DialogHeader>
        <div className="px-0 flex items-end justify-center gap-4 flex-col">
			<Textarea placeholder="reply for the post" onChange={(e)=>setReplyText(e.target.value)} value={replyText}/>
          <Button type="button" onClick={handleReplySubmit} className='cursor-pointer'>{isReplying?(
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							replying...
						</>
					):'reply'}</Button>
        </div>
      </DialogContent>
    </Dialog>

				{/* <RepostSVG /> */}
				<ShareSVG />
                </div>
				<div className='flex items-center justify-start pl-2 gap-2'>
              <p>{post?.likes?.length} likes</p>
              <div className='w-0.5 h-0.5 rounded-full bg-hello'></div>
              <p>{replys?.length} replies</p>
          </div>
				</div>
)
};

export default Action;

const RepostSVG = () => {
	return (
		<svg
			aria-label='Repost'
			color='currentColor'
			fill='currentColor'
			height='20'
			role='img'
			viewBox='0 0 24 24'
			width='20'
		>
			<title>Repost</title>
			<path
				fill=''
				d='M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z'
			></path>
		</svg>
	);
};

const ShareSVG = () => {
	return (
		<svg
			aria-label='Share'
			color=''
			fill='rgb(243, 245, 247)'
			height='20'
			role='img'
			viewBox='0 0 24 24'
			width='20'
		>
			<title>Share</title>
			<line
				fill='none'
				stroke='currentColor'
				strokeLinejoin='round'
				strokeWidth='2'
				x1='22'
				x2='9.218'
				y1='3'
				y2='10.083'
			></line>
			<polygon
				fill='none'
				points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
				stroke='currentColor'
				strokeLinejoin='round'
				strokeWidth='2'
			></polygon>
		</svg>
	);
};