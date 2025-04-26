import Reply from "../model/reply.model.js";


export const createReply=async(req,res)=>{
    const {userId,postId,parentReplyId,text,username,profilePic}=req.body;
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

export const getReplies=async(req,res)=>{
    const {postId}=req.params;
    try{
        const reply=await Reply.find({postId:postId});
        if(!reply){
            res.status(400).json({error:"no replies found"})
            return;
        }
        res.status(200).json({reply:reply});

    }catch(error){
        console.log("error in getReplies controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const likeUnlikeReply=async(req,res)=>{
    const {replyId}=req.params;
    try{
        const reply=await Reply.findById(replyId);
        if(!reply){
            res.status(400).json({error:"reply not found"})
            return;
        }
        if(reply.likes.includes(req.user._id)){
            //unlike
            await Reply.findByIdAndUpdate(replyId,{$pull:{likes:req.user._id}});
            res.status(200).json({message:"reply unliked successfully"})
        }else{
            //like
            await Reply.findByIdAndUpdate(replyId,{$push:{likes:req.user._id}});
            res.status(200).json({message:"reply liked successfully"});
        }


    }catch(error){
        console.log("error in likeUnlikeReply controller",error.message);
        res.status(500).json({error:"internal server error"});
    }

}