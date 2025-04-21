import toast from 'react-hot-toast';
import axios from '../lib/axios'
import {create} from 'zustand'

export const usePostStore=create((set,get)=>(
    {
        posts:[],
        feedPosts:[],
        isPosting:false,
        isFeedPostFetched:false,
        isPostingSuccess:false,
        isAllPostFetched:false,
        allPostError:null,
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
                    set({feedPosts:response.data.posts,isFeedPostFetched:true})
                }
            }catch(error){
                console.error("Error in feedPost:",error);
                set({isFeedPostFetched:false})
                toast.error(error.response.data.error||"An error occured")
            }
        },
        getAllPost:async()=>{
            set({isAllPostFetched:false,allPostError:null})
            try{
                const response=await axios.get('/post/getAllPost');
                if(response.status===200){
                    set({posts:response.data.posts,isAllPostFetched:true})
                }
            }catch(error){
                console.error("Error in getAllPost:",error);
                set({isAllPostFetched:false,allPostError:error.response.data.error||"An error occured"})
                toast.error(error.response.data.error||"An error occured")
            }
        }

    }
))