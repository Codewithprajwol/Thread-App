import Action from "@/components/Action";
import { Button } from "@/components/ui/button";
import React, { useEffect} from "react";
import { BsThreeDots } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import Comments from "@/components/Comments";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import { Loader } from "lucide-react";
import { timeAgo } from "@/utils/timeFinder";
import toast from "react-hot-toast";
import { useReplyStore } from "@/store/useReplyStore";

const PostPage = () => {
  const paramsData=useParams()
  const {post,postUserProfile, getPostByusernameAndId,isUserPostFetched,isUserPostError,isUserPostLoading}=usePostStore();
    const {replys,getReplys,isReplying}=useReplyStore();
  
  useEffect(()=>{
     getPostByusernameAndId({username:paramsData.username,id:paramsData.id})
    if(isUserPostError){
      toast.error("Error fetching post");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getPostByusernameAndId])
  
  useEffect(()=>{
    if(isUserPostFetched && post?._id){
      getReplys(post?._id);
    }
    },[getReplys,post?._id,isUserPostFetched])
   if(isUserPostLoading  ){
    return (
      <div className="flex items-center justify-center h-screen ">
           <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
      </div>
      )
   }
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 items-start justify-center pt-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-between w-8 h-8 rounded-full overflow-hidden">
              <img
                src={postUserProfile?.profilePic}
                alt={postUserProfile?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h6 className="font-bold">{postUserProfile?.name}</h6>
            <div className="w-7 h-7">
              <img src="/verified.png" alt="verified logo" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h6 className="font-bold text-[.8rem] text-[#dadada]">{timeAgo(post?.createdAt)}</h6>
            <BsThreeDots />
          </div>
        </div>
        <p className="text-[0.8rem]">{post?.text}</p>
        {post?.image && <div className="w-full max-h-auto overflow-hidden rounded-sm">
          <img src={post?.image} alt="post image" />
        </div>}
        <Action post={post} />
        
        <Separator className="my-4" />

        {/* get app */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <h6>👏</h6>
            <p className="text-gray-600 text-sm">
              Get the app to like, reply and post.
            </p>
          </div>
          <Button className="cursor-pointer">Get</Button>
        </div>
        {/* seperator */}
        <Separator className="my-4" />

     {replys?.length!==0?replys?.map((reply)=>(<Comments
          key={reply._id}
          post={post}
          reply={reply}/>)):<div className="text-center w-full text-bold">No Comments Yet</div>}
      </div>
    </div>
  );
};

export default PostPage;
