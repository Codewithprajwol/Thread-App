import Post from "../model/post.model.js";
import User from "../model/user.model.js";

export const createPost=async(req,res)=>{
    const {text,image,postedBy}=req.body;
    try{
        if(!postedBy || !text){
            res.status(400).json({error:"postedBy and text is required"})
            return
        }
        const user=await User.findById(postedBy);
        if(!user){
            res.status(400).json({error:"user not found"})
            return;
        }

        if(user._id.toString()!==req.user._id.toString()){
            res.status(400).json({error:"you are not authorized to create this post"})
            return;
        }
        if(text.length>500){
            res.status(400).json({error:"text should be less than 500 characters"})
            return;
        }
        const post= new Post({
            postedBy:postedBy,
            text:text,
            image:image, 
        })

        await post.save();
        res.status(200).json({message:"post created successfully",post:post});
    }catch(error){
        console.log("error in createPost controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}