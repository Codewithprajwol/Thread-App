import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import cloudinary from "../utils/Cloudinary.js";

export const createPost=async(req,res)=>{
    const {text,image,postedBy}=req.body;
    try{
        if(!text){
            res.status(400).json({error:"text is required"})
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

        let cloudinaryResponse=null;
        if(image){
            try{
                cloudinaryResponse=await cloudinary.uploader.upload(image,{folder:'postImages'})
            }catch(err){
                console.log('errror checking image in cloudinary',err.message);
            }
        }
        const post= new Post({
            postedBy:postedBy,
            text:text,
            image:cloudinaryResponse?.secure_url || "", 
        })

        await post.save();
        res.status(200).json({message:"post created successfully",post:post});
    }catch(error){
        console.log("error in createPost controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}


export const getAllPost=async(req,res)=>{
    try{
        const posts=await Post.find({postedBy:req.user._id});
        if(!posts){
            res.status(400).json({error:"no posts found"})
            return;
        }
        res.status(200).json({posts:posts});

    }catch(error){
        console.log("error in getPost controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const getPostById=async(req,res)=>{
    try{

            const {id}=req.params;
            const post=await Post.findById(id);
            console.log(post)
            if(!post){
              res.status(400).json({error:"post not found"});
              return;
            }
            res.status(200).json({post:post});

    }catch(error){
        console.log("error in getPostById controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const deletePost=async(req,res)=>{
     try{
          const {id}=req.params;
          const post=await Post.findById(id);
          if(!post){
                res.status(400).json({error:"post not found"});
                return;
          }
          if(post.postedBy.toString()!==req.user._id.toString()){
                res.status(400).json({error:"you are not authorized to delete this post"})
                return;
          }
          await Post.findByIdAndDelete(id);
          res.status(200).json({message:"post deleted successfully"});
     }catch(error){
          console.log("error in deletePost controller",error.message);
          res.status(500).json({error:"internal server error"});
     }    
}

export const likeUnlikePost=async(req,res)=>{
    const {id}=req.params;
    try{
         const post=await Post.findById(id);
         if(!post){
                res.status(400).json({error:"post not found"});
                return;
         }
         if(post.likes.includes(req.user._id)){
           //unlike
           await Post.findByIdAndUpdate(id,{$pull:{likes:req.user._id}});
           res.status(200).json({message:"post unliked successfully"});
         }
         else{
            //like
            await Post.findByIdAndUpdate(id,{$push:{likes:req.user._id}});
            res.status(200).json({message:"post liked successfully"});
         }
     
    }catch(error){
        console.log("error in likeUnlikePost controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const replypost=async(req,res)=>{
      const {id}=req.params;
      const {text,profilePic,username}=req.body;
      try{
        if(!text || !profilePic || !username){
            res.status(400).json({error:"text,profilePic and username are required"});
            return;
        }
        const post=await Post.findById(id);
        if(!post){
            res.status(400).json({error:"post not found"});
            return;
        }
        const reply={
            userId:req.user._id,
            text:text,
            profilePic:profilePic,
            username:username,
        }
        await Post.findByIdAndUpdate(id,{$push:{replies:reply}});
        res.status(200).json({message:"reply added successfully"});
      }catch(error){
            console.log("error in replypost controller",error.message);
            res.status(500).json({error:"internal server error"});
      }
}

export const feedPosts=async(req,res)=>{
    try{
        const user=req.user;
        const posts=await Post.find({postedBy:{$in:user.following}}).sort({createdAt:-1});
        if(!posts){
            res.status(400).json({error:"no posts found"})
            return;
        }
        res.status(200).json({posts:posts});
    }catch(error){
        console.log("error in feetPost controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}