import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import {create} from 'zustand'

export const useReplyStore=create((set,get)=>({
    isReplying:false,
    replySuccess:false,
    replyError:null,
    createReply:async({userId,postId,parentReplyId,username,text,profilePic})=>{
        console.log(userId,postId,parentReplyId,username,text,profilePic);
        set({isReplying:true})
        try{
            const response=await axios.post('/reply/create',{userId,postId,parentReplyId,username,text,profilePic});
            if(response.status===200){
                set({isReplying:false,replySuccess:true})
                toast.success("Reply created successfully")
                return response.status;
            }
        }catch(err){
            console.error("Error in createReply:",err);
            set({isReplying:false,replySuccess:false})
            toast.error(err.response.data.error||"An error occured")
            return err.response.status;
        }
    },
}))
