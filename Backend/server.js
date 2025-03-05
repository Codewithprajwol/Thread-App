import express from 'express'
import 'dotenv/config'

import userRoute from './routes/user.routes.js'
import { connectDb } from './config/db.config.js';

const app=express();

const PORT=process.env.PORT || 3000;


app.use(express.json());

app.use('/api/user',userRoute);

app.listen(PORT,async()=>{
   await connectDb()
    console.log("server is listening at port",PORT);
})