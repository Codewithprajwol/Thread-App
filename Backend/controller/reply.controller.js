import Reply from "../model/reply.model.js";

export const createReply=async(req,res)=>{
    const {userId,postId,parentReplyId,text,username,profilePic}=req.body;
    console.log(userId,postId,parentReplyId,text,username,profilePic);
    try{
        if(!text || !profilePic || !username){
            res.status(400).json({error:"text,profilePic and username are required"});
            return;
        }
        const reply=new Reply({
            userId,
            postId,
            parentReplyId,
            text,
            username,
            profilePic,
        });
        await reply.save();
        res.status(200).json({message:"reply added successfully",reply:reply});
    }catch(error){
        console.log("error in createReply controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}