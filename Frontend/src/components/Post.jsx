import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import Action from './Action'
import axiosInstance from "@/lib/axios"
import { timeAgo } from "@/utils/timeFinder"
import { useAuthStore } from "@/store/useAuthStore"
import { Loader2, Trash } from "lucide-react"
import { usePostStore } from "@/store/usePostStore"
import { useReplyStore } from "@/store/useReplyStore"
import { motion } from "framer-motion"

const Post = ({ post }) => {
    const navigate=useNavigate();
    const user = useAuthStore((state) => state.user);
    const [postUserProfile, setPostUserProfile] = useState(null)
    const deletePost = usePostStore((state) => state.deletePost);
    const { isPostDeleting, isPostDeletedSuccess, isPostDeletedError } = usePostStore();
    const replys = useReplyStore((state) => state.replys)
    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axiosInstance.get(`/user/profile/${post.postedBy}`)
                if (response.status === 200) {
                    setPostUserProfile(response.data.user);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error)
            }
        }
        fetchUserProfile();
    }, [post?.postedBy])

    const handleDeletePost = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        deletePost({ id: post?._id });
    }

    return (
        <div className='w-full mt-4 flex items-start gap-3 justify-between pb-12'>
            <div className='flex flex-col gap-2 items-center justify-start'>
                <Link to={`/${postUserProfile?.username}`} className='flex items-center justify-between w-8 h-8 rounded-full overflow-hidden cursor-pointer'>
                    <img src={postUserProfile?.profilePic} alt={postUserProfile?.name} className='w-full h-full object-cover' />
                </Link>

                {post.image ? <div className=' h-[250px] sm:h-[370px] md:[400px] w-[.1rem] bg-[#c0baba42]'></div> : <div className=' h-[100px] w-[.1rem] bg-[#c0baba42]'></div>}
                <div className='relative w-full'>
                    {replys?.length === 0 && (<motion.div
                        animate={{ y: [0, -4, 0] }} 
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute bottom-0 left-1 w-6 h-6 rounded-full overflow-hidden"
                    >
                        🤔
                    </motion.div>)}
                    {replys?.[1] && (
                        <motion.div
                            animate={{ y: [0, -4, 0] }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute top-0 -left-5 w-6 h-6 rounded-full overflow-hidden"
                        >
                            <Avatar className='w-full h-full' >

                                <AvatarImage className='w-full h-full object-cover object-top' src={replys?.[1].profilePic} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </motion.div>
                    )}

                    {replys?.[2] && (
                        <motion.div
                            animate={{ y: [0, -4, 0] }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute top-0 -right-5  w-6 h-6 rounded-full overflow-hidden"
                        >
                            <Avatar className="w-full h-full">
                                <AvatarImage className='w-full h-full object-cover object-top' src={replys?.[2].profilePic} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </motion.div>)}

                    {replys?.[0] && (
                        <motion.div
                            animate={{ y: [0, -4, 0] }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute bottom-0 left-1 w-6 h-6 rounded-full overflow-hidden"
                        >
                            <Avatar className="w-full h-full ">
                                <AvatarImage className='w-full h-full object-cover object-top' src={replys?.[0].profilePic} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </motion.div>)}

                </div>
            </div>
            <Link to={`/${postUserProfile?.username}/post/${post?._id}`} className='flex flex-1 flex-col gap-1'>
                <div className='flex  items-center justify-between'>
                    <div className="flex items-center gap-2">
                        <h6 onClick={(e)=>{e.stopPropagation(); e.preventDefault();  navigate(`/${postUserProfile?.username}`)}} className='font-bold'>{postUserProfile?.name}</h6>
                        <div className='w-7 h-7'><img src="/verified.png" alt="verified logo" /></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <h6 className='font-bold text-[.8rem] text-[#dadada]'>{timeAgo(post.createdAt)}</h6>
                        {user?._id === post?.postedBy ? isPostDeleting ? <Loader2 className="w-5 h-5 animate-spin " /> : <Trash onClick={handleDeletePost} size={20} /> : <BsThreeDots />}
                    </div>

                </div>
                <p className='text-[0.8rem]'>{post.text}</p>
                {post.image &&
                    <div className='w-full max-h-[300px] overflow-hidden rounded-sm'>
                        <img src={post.image} alt="post" />
                    </div>}
                <Action post={post} />
            </Link>

        </div>

    )
}

export default Post