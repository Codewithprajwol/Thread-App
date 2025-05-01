import axios from '@/lib/axios';
import {create} from 'zustand';

export const useMessageStore=create((set,get)=>({
    messages:[],
    conversations:[],
    selectedConversation:{
        _id:"",
        userName:"",
        userprofilePic:"",
        userId:"",
    },
    setSelectedConversation:(conversation)=>set({selectedConversation:conversation}),
    isUserConversationLoading:false,
    isUserConversationError:false,
    isUserConversationSuccess:false,
    isUserMessageLoading:false,
    isUserMessageError:false,
    isUserMessageSuccess:false,

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
    },
    getMessages:async(otherUserId)=>{
        set({isUserMessageLoading:true,isUserMessageError:false,isUserMessageSuccess:false})
        try{
            const response=await axios.get(`/message/getMessage/${otherUserId}`);
            if(response.status===200){
                set({messages:response.data.messages,isUserMessageLoading:false,isUserMessageSuccess:true})
            }
        }catch(error){
            set({isUserMessageError:true})
            console.error("Error fetching messages:", error);
        }
    },
    sendMessage:async(text,recipientId,currentConversationId)=>{
        try{
            const response=await axios.post('/message',{text,recipientId })
            if(response.status===200){
                set({messages:[...get().messages,response.data.message]})
                const updatedConversation=get().conversations.map((conversation)=>{
                     if(conversation._id===currentConversationId){
                        return {
                            ...conversation,
                            lastMessage:{
                                sender:response.data.message.sender,
                                text:text
                            }
                        }
                     }
                     return conversation;
                })
                set({conversations: updatedConversation});
            }
        }catch(error){
            console.error("Error sending message:", error);
        }
    },

 }))