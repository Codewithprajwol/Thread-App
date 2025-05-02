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

io.on('connection',(socket)=>{
    console.log('A user connected',socket.id);

    socket.on('disconnect',()=>{
        console.log('A user disconnected');
    })
})

export {io,server,app};