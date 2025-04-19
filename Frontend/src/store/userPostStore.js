import toast from 'react-hot-toast';
import axios from '../lib/axios'
import {create} from 'zustand'

export const usePostStore=create((set,get)=>(
    {
        posts:[],
        isPosting:false,
        isPostingSuccess:false,
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

    }
))