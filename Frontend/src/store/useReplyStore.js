import axios from '@/lib/axios';
import { buildReplyTree } from '@/utils/buildReplyTree';
import { updateLikesRecursive } from '@/utils/updateLikesRecursive';
import toast from 'react-hot-toast';
import {create} from 'zustand'


export const useReplyStore=create((set,get)=>({
    replys:[],
    isReplying:false,
    replySuccess:false,
    replyError:null,
    createReply:async({userId,postId,parentReplyId,username,text,profilePic})=>{
        set({isReplying:true,replySuccess:false,replyError:null})
        try{
            const response=await axios.post('/reply/create',{userId,postId,parentReplyId,username,text,profilePic});
            if(response.status===200){
                set({isReplying:false,replySuccess:true,replys:[...get().replys,response.data.reply]});
                toast.success("Reply created successfully")
                return response.status;
            }
        }catch(err){
            console.error("Error in createReply:",err);
            set({isReplying:false,replySuccess:false,replyError:err.response.data.error})
            toast.error(err.response.data.error||"An error occured")
            return err.response.status;
        }
    },
    getReplys:async(postId)=>{
        set({isReplying:true,replySuccess:false,replyError:null})
        try{
            const response=await axios.get(`/reply/getReplies/${postId}`);
            if(response.status===200){
                const replies=buildReplyTree(response.data.reply);
                set({isReplying:false,replySuccess:true,replys:replies  });
            }

        }catch(error){
            console.error("Error in getReplys:",error);
            set({isReplying:false,replySuccess:false})
            toast.error(error.response.data.error||"An error occured")
            return error.response.status;
        }
    },
    //  
    likeUnlikeComment:async({id:replyId,liked,userId})=>{
        try{
            const response=await axios.post(`/reply/likeUnlike/${replyId}`);
            if(response.status===200){
                set({
                    replys: updateLikesRecursive(get().replys, replyId, userId, liked)
                  });
                  
            }
        }catch(error){
            console.error("Error in likeUnlikeComments :",error);
            toast.error(error.response.data.error||"An error occured")
        }
    },
}))
