import Conversation from "../model/Conversation.model.js";
import Message from "../model/Message.model.js";
import { io, recipientSocketId } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
    try{
        const {recipientId,text}=req.body;
        const user=req.user;
        if(!user){
            return res.status(401).json({error:"Unauthorized"})
        }
        if(!recipientId||!text){
            return res.status(400).json({error:"All fields are required"})
        }
        let conversation;
         conversation=await Conversation.findOne({participants:{$all: [recipientId,user._id]}});
        if(!conversation){
            conversation= new Conversation({
                participants:[recipientId,user._id],
                lastMesssage:{
                    sender:user._id,
                    text:text
                }
            })
            await conversation.save();
        }
            const newMessage= new Message({
                conversationId:conversation._id,
                sender:user._id,
                text:text
            })
            await Promise.all([
                newMessage.save(),
                conversation.updateOne({
                    lastMessage:{
                        sender:user._id,
                        text:text
                    }
                })
            ])
            const socketId=recipientSocketId(recipientId);
            if(socketId){
                io.to(socketId).emit("messageReceived", newMessage);
            }
            res.status(200).json({message:newMessage,conversation:conversation})

    }catch(error){
        console.error("Error in sendMessage:",error);
        res.status(500).json({error:error.message||"An error occured"})
    }

}

export const getMessages=async(req,res)=>{
    try{
        const {otherUserId}=req.params;
        const user=req.user;
        if(!user){
            return res.status(401).json({error:"Unauthorized"})
        }
        const conversation=await Conversation.findOne({
           participants:{$all:[user._id,otherUserId]}
        })
        if(!conversation){
            return res.status(404).json({error:"Conversation not found"})
        }
        const messages=await Message.find({conversationId:conversation._id}).sort({createdAt:1});
        if(!messages){
            return res.status(404).json({error:"Messages not found"})
        }
        res.status(200).json({messages:messages});

    }catch(error){
        console.error("Error in getMessages",error);
        res.status(500).json({error:error.message||"An error occured"})
    }

}

export const getConversation=async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            return res.status(401).json({error:"Unauthorized"})
        }
        const conversations=await Conversation.find({
            participants:{$in:[user._id]}
        }).populate({
            path:'participants',
            select:'name profilePic',
        }).sort({updatedAt: -1}).lean();
        if(!conversations){
            return res.status(404).json({error:"Conversations not found"})
        }
        const formattedConversations=conversations.map((conversation)=>{
            const finalConversationData={...conversation,participants:conversation.participants.filter((participant)=>participant._id.toString()!==user._id.toString())}
            return finalConversationData;
        })

        res.status(200).json({conversations: formattedConversations});

    }catch(error){
        console.error("Error in getConversation:",error);
        res.status(500).json({error:error.message||"An error occured"})
    }
}