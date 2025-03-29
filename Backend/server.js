import express from 'express'
import 'dotenv/config'

import userRoute from './routes/user.routes.js'
import postRoute from './routes/post.route.js'

import { connectDb } from './config/db.config.js';
import cookieParser from 'cookie-parser';

const app=express();

const PORT=process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRoute);
app.use('/api/post',postRoute);

app.listen(PORT,async()=>{
   await connectDb()
    console.log("server is listening at port",PORT);
})