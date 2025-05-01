import axios from '@/lib/axios';
import {create} from 'zustand';

export const useMessageStore=create((set,get)=>({
    messages:[],
    conversations:[],
    isUserConversationLoading:false,
    isUserConversationError:false,
    isUserConversationSuccess:false,

    getConversations:async()=>{
        set({isUserConversationLoading:true,isUserConversationError:false,isUserConversationSuccess:false})
        try{
            const response=await axios.get('/message/conversation');
            if(response.status===200){
                set({conversations:response.data.conversations,isUserConversationLoading:false,isUserConversationSuccess:true})
            }
        }catch(error){
            set({isUserConversationError:true})
            console.error("Error fetching conversations:", error);
        }
    }

 }))