import axios from '@/lib/axios';
import toast from 'react-hot-toast';
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
    setMessageAsEmpty:()=>set({messages:[]}),
    setMessages:(message)=>set({messages:[...get().messages,message]}),
    setConversations:(message)=>{
      const updatedConversation=  get().conversations.map((conversation)=>{
            if(conversation._id===message.conversationId){
                return {
                    ...conversation,
                    lastMessage:{
                        sender:message.sender,
                        text:message.text
                    }
                }


            }
            return conversation;
        })
        set({conversations: updatedConversation});
    },
    setLastSeenMessages:(conversationId)=>{
        const updatedMessages=get().messages.map((message)=>{
            if(message.conversationId===conversationId){
                return {
                    ...message,
                    seen:true
                }
            }
            return message;
        })
        set({messages: updatedMessages});
    },
    setLastSeenConversationMessages:(conversationId)=>{
        const updatedConversations=get().conversations.map((conversation)=>{
            if(conversation._id===conversationId){
                return {
                    ...conversation,
                    lastMessage:{
                        ...conversation.lastMessage,
                        seen:true
                    }
                }
            }
            return conversation;
        })
        set({conversations: updatedConversations});
    },    
    setSelectedConversation:(conversation)=>set({selectedConversation:conversation}),
    isUserConversationLoading:false,
    isUserConversationError:false,
    isUserConversationSuccess:false,
    isUserMessageLoading:false,
    isUserMessageError:false,
    isUserMessageSuccess:false,
    isChatUserSearchLoading:false,
    isChatUserSearchError:false,
    isChatUserSearchSuccess:false,

    getConversations:async()=>{
        set({isUserConversationLoading:true,isUserConversationError:false,isUserConversationSuccess:false})
        try{
            const response=await axios.get('/message/conversation');
            if(response.status===200){
                
                set({conversations:response.data.conversations,isUserConversationLoading:false,isUserConversationSuccess:true})
            }
        }catch(error){
            set({isUserConversationError:true,isUserConversationLoading:false})
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
            set({isUserMessageError:true,isUserMessageLoading:false})
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
    chatUserSearch:async(searchText,user)=>{
        let updatedSearchText;
        if(!searchText.trim().startsWith('@')){
            toast.error("Please enter a valid username with @"); return;
        }else{
            updatedSearchText=searchText.trim().substring(1).toLowerCase()
        }
      set({isChatUserSearchLoading:true,isChatUserSearchError:false,isChatUserSearchSuccess:false})
        try{
            const response=await axios.get(`/user/profile/${updatedSearchText}`)
            if(response.status===200){
                set({isChatUserSearchLoading:false,isChatUserSearchSuccess:true})
                if(response.data.user._id===user._id){
                    toast.error("You cannot start a conversation with yourself")
                    return;
                }
                const isUserInConversation=get().conversations.find((conversation)=>conversation.participants[0]._id===response.data.user._id);
                
                if(isUserInConversation){
                    set({selectedConversation:{
                        _id:isUserInConversation._id,
                        userName:isUserInConversation.participants[0].name,
                        userprofilePic:isUserInConversation.participants[0].profilePic,
                        userId:isUserInConversation.participants[0]._id,
                    }})
                    return;
            }
            const mockUser={
                mock:true,
                participants:[
                    {
                        _id:response.data.user._id,
                        name:response.data.user.name,
                        profilePic:response.data.user.profilePic,
                    }
                ],
                lastMessage:{
                    sender:response.data.user._id,
                    text:""
                },
                _id:new Date().getTime().toString(),
            }
            set({conversations:[...get().conversations,mockUser]})

        }
        }catch(error){
            set({isChatUserSearchError:true,isChatUserSearchLoading:false})
            console.error("Error searching user profile:", error);
            toast.error(error.response.data.error||"An error occured")
        }
    }

 }))
