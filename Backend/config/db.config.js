import mongoose from 'mongoose';

export const connectDb=async()=>{
   try {
    const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected successfully",conn.connection.host);
    
   } catch (error) {
    console.log('error while connecting database')
    process.exit(1);
   }
}