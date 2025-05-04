import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import Message from '../model/Message.model.js';
import Conversation from '../model/Conversation.model.js';

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST'],
        credentials:true,
    }
});
 
const userSocketMap={};

export const recipientSocketId=(recipientId)=>{
    return userSocketMap[recipientId];
}

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log('A user connected',socket.id);
    userSocketMap[userId]=socket.id;
    io.emit('userOnlineStatus',Object.keys(userSocketMap));
     
    socket.on('markMessageAsSeen',async({conversationId,userId})=>{
        await Message.updateMany(
            {conversationId,seen:false},
            {$set:{seen:true}}
        )
        await Conversation.updateOne({_id:conversationId},{$set:{"lastMessage.seen":true}});
        socket.to(userSocketMap[userId]).emit('messageSeen',{conversationId});
    })

    socket.on("updateReceiverConversation",async({recieverId,senderId,conversationId,senderName,senderProfilePic})=>{
        console.log("i came here");
        console.log(userSocketMap[recieverId]);
        // const messages=await Message.find({recieverId}).sort({createdAt:-1}).limit(1);
        socket.to(userSocketMap[recieverId]).emit('ReceiverConversation',{senderId,conversationId,senderName,senderProfilePic});
    })
    
    socket.on('disconnect',()=>{
        delete userSocketMap[userId];
        io.emit('userOnlineStatus',Object.keys(userSocketMap));
        console.log('A user disconnected');
    })
})

export {io,server,app};