import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

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

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log('A user connected',socket.id);
    userSocketMap[userId]=socket.id;
    io.emit('userOnlineStatus',Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        delete userSocketMap[userId];
        io.emit('userOnlineStatus',Object.keys(userSocketMap));
        console.log('A user disconnected');
    })
})

export {io,server,app};