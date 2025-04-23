import toast from 'react-hot-toast';
import axios from '../lib/axios'
import {create} from 'zustand'

export const usePostStore=create((set,get)=>(
    {
        posts:[],
        post:null,
        postUserProfile:null,
        isPosting:false,
        isFeedPostFetched:false,
        isPostingSuccess:false,
        isAllPostFetched:false,
        allPostError:null,
        replySuccess:false,
        replyError:null,
        isReplying:false,
        isUserpostFetched:false,
        isUserPostError:null,
        isUserPostLoading:false,
        createUserPost:async({text,image,postedBy})=>{
            set({isPosting:true})
            try{
                const response=await axios.post('/post/create',{text,image,postedBy});
                if(response.status===200){
                    set({posts:[...get().posts,response.data.post],isPosting:false,isPostingSuccess:true})
                    toast.success("Post created successfully")
                    return response.status;
                }
            }catch(err){
                console.error("Error in createUserPost:",err);
                set({isPosting:false,isPostingSuccess:false})
                toast.error(err.response.data.error||"An error occured")
                return err.response.status;
            }
        },
        feedPost:async()=>{
            set({isFeedPostFetched:false})
            try{
                const response=await axios.get('/post/feedPosts');
                if(response.status===200){
                    set({posts:response.data.posts,isFeedPostFetched:true})
                }
            }catch(error){
                console.error("Error in feedPost:",error);
                set({isFeedPostFetched:false})
                toast.error(error.response.data.error||"An error occured")
            }
        },
        getAllUserPost:async({id})=>{
            set({isAllPostFetched:false,allPostError:null})
            try{
                const response=await axios.get(`/post/getAllUserPost/${id}`);
                if(response.status===200){
                    set({posts:response.data.posts,isAllPostFetched:true})
                }
            }catch(error){
                console.error("Error in getAllPost:",error);
                set({isAllPostFetched:false,allPostError:error.response.data.error||"An error occured"})
                toast.error(error.response.data.error||"An error occured")
            }
        },
        likeUnlikeUser:async({id,liked,userId})=>{
            try{
                const response=await axios.post(`/post/like/${id}`);
                if(response.status===200){
                    if(!liked){
                        set({posts:get().posts.map((post)=>(post._id===id?{...post,likes:[...post.likes,userId]}:post))})
                    }else{
                        set({posts:get().posts.map((post)=>(post._id===id?{...post,likes:post.likes.filter((id)=>id!==userId)}:post))})
                    }
                }
            }catch(error){
                console.error("Error in followUnfollowUser:",error);
                toast.error(error.response.data.error||"An error occured")
            }
        },
        replyPost:async({id,text,profilePic,username})=>{
            set({replySuccess:false,replyError:null,isReplying:true})
            try{
                const response=await axios.post(`/post/replies/${id}`,{text,profilePic,username});
                if(response.status===200){
                    set({replySuccess:true,replyError:null,isReplying:false})
                    set({posts:get().posts.map((post)=>(post._id===id?{...post,replies:[...post.replies,response.data.reply]}:post))})
                    toast.success("Reply added successfully")
                }
            }catch(error){
                console.error("Error in replypost:",error);
                set({replySuccess:false,isReplying:false,replyError:error.response.data.error||"An error occured"})
                toast.error(error.response.data.error||"An error occured")
            }
        },
        getPostByusernameAndId:async({username,id})=>{
            set({  isUserpostFetched:false,
                isUserPostError:null,
                isUserPostLoading:true})
            try{
                const response=await axios.post(`post/${username}/post/${id}`);
                if(response.status===200){
                    set(({post:response.data.post,postUserProfile:response.data.user,isUserpostFetched:true,isUserPostLoading:false}))
                }
            }catch(error){
                console.error("Error in getPostByusernameAndId:",error);
                toast.error(error.response.data.error||"An error occured")
                set({isUserPostLoading:false,isUserpostFetched:false,isUserPostError:error.response.data.error||"An error occured"})
            }
        }

    }
))