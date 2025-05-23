import express from 'express'
import 'dotenv/config'

import userRoute from './routes/user.routes.js'
import postRoute from './routes/post.routes.js'
import replyRoute from './routes/reply.routes.js'
import messageRoute from './routes/message.routes.js'

import { connectDb } from './config/db.config.js';
import cookieParser from 'cookie-parser';

import {app, server} from './socket/socket.js'


const PORT=process.env.PORT || 3000;

app.use(express.json({limit:'10mb'}));
app.use(cookieParser());

app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/reply',replyRoute)
app.use('/api/message',messageRoute);

server.listen(PORT,async()=>{
   await connectDb()
    console.log("server is listening at port",PORT);
})