
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import User from "../model/user.model.js"
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import { sendForgetPasswordEmail, sendPasswordResetSuccessEmail, sendPasswordUpdateSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js';
import cloudinary from '../utils/Cloudinary.js';
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
 try{
  const { email, name, password,username } = req.body;

  if (!email || !name || !password || !username) {
    res.status(400).json({ error: "All field are required " });
    return;
  }
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)===false){
    res.status(400).json({error:"Invalid Email"});
    return
  }
  if(password.length<6 && password.length>12){
    res.status(400).json({error:"Password should be between 6 to 20 characters"});
    return
  }
  if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)===false){
    res.status(400).json({error:"Password should contain atleast one uppercase letter,one lowercase letter,one special character and one number"});
    return
  }
  const existingNickName=await User.findOne({username:{$regex:`^${username}$`,$options:'i'}});
  if(existingNickName){
      res.status(400).json({error:"nick name Already Exists"});
      return
  }
  const existingUser=await User.findOne({email})
  if(existingUser){
      res.status(400).json({error:"Email Already Exists"});
      return 
  }
  const salt=await bcrypt.genSalt(10)
  const hashPassword=await bcrypt.hash(password,salt)

  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

  const user=new User({
      name,
      username,
      email,
      password:hashPassword,
      verificationToken:verificationToken,
      verificationTokenExpiresAt:Date.now()+24*60*60*1000,
  })
  await user.save();
   generateTokenAndSetCookies(res,user._id);
   await sendVerificationEmail(user.email,verificationToken);
  res.status(201).json({user:{...user._doc,password:undefined}})

 }catch(error){
  if (error.name === 'ValidationError') {
    const errorMessages = Object.values(error.errors).map(val => val.message);
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  console.log("error in signup controller",err.message);
  res.status(500).json({error:"internal Server Error"});
 }
  
};


export const loginUser=async(req,res)=>{
  try{
    const {emailOrUsername, password}=req.body;
    if(!emailOrUsername || !password){
      res.status(400).json({error:"all field required"});
      return 
    }
    const user=await User.findOne({$or:[{email:emailOrUsername},{username:emailOrUsername}]});
    if(!user){
      res.status(400).json({error:"User not found"});
      return 
    }
    const validPassword= bcrypt.compare(password,user.password);
    if(!validPassword){
      res.status(400).json({error:"Invalid Password"});
      return
    }
    generateTokenAndSetCookies(res,user._id)
    const data=user._doc;
    delete data.password;
    res.status(200).json({message:"user Logged in Successfully",user:data});

  }catch(err){
    console.log('error in login user controller',err)
    res.status(500).json({error:"internal server error"})
  }
}


export const logoutUser=async(req,res)=>{

  try{
      res.clearCookie('jwt');
      res.status(200).json({messge:"user loggedout successfully"});
  }catch(error){
    console.log("error in logoutUserController",error.message)
    res.status(500).json({error:"internal server error"})
  }
}


export const verifyEmail=async(req,res)=>{
  try{
    const {code}=req.body;
    const user=await User.findOne({'verificationToken':code,'verificationTokenExpiresAt':{$gt:new Date()}});
    if(!user) return res.status(400).json({error:'Token has be expired ..invalid'});
    user.isVerified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;
    await user.save()
    await sendWelcomeEmail(user.email,user.name);
    res.status(200).json({message:"user verified successfully"})
  }catch(err){
    console.log('error in verifyEmail controller',err.message);
    res.status(500).json({error:"Internal Server Error"});
  }
}


export const forgetPassword=async(req,res)=>{
      try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
          res.status(400).json({error:"Email not found"});
          return;
        }
        const resetToken=crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt=Date.now()+24*60*60*1000;

        user.passwordResetToken=resetToken;
        user.PasswordResetTokenExpiresAt=resetTokenExpiresAt;
        await user.save();
        await sendForgetPasswordEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({message:"reset password link sent to your email"});
      }catch(error){
        console.log("error in forgetPassword controller",error.message);
        res.status(500).json({error:"internal server"});
      }
}

export const resetPassword=async(req,res)=>{
  try{
    const {newPassword}=req.body;
    const {token}=req.params;
    const user=await User.findOne({passwordResetToken:token});
    if(!user){
      res.status(400).json({error:"user not found"});
      return;
    }
    if(user.PasswordResetTokenExpiresAt<Date.now()){
      res.status(400).json({error:"reset token expired"});
      return;
      }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(newPassword,salt);
      user.password=hashPassword;
      await sendPasswordResetSuccessEmail(user.email);
      user.passwordResetToken=undefined;
      user.PasswordResetTokenExpiresAt=undefined;
      await user.save();
       res.status(200).json({message:"password reset successfully"});
  }catch(error){
    console.log("error in resetPassword controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}


export const validateUser=async(req,res)=>{
  try{
    const user=req.user;
    res.status(200).json({user:user});
  }catch(error){
    console.log("error in validateUser controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}

export const followUnfollowUser=async(req,res)=>{
  try{
    const user=req.user;
    const {id}=req.params;
    const userToFollow=await User.findById(id).select("-password");
    if(!userToFollow){
      res.status(400).json({error:"user not found"});
      return;
    }
    if(user._id.toString()===id){
      res.status(400).json({error:"you can't follow/unfollow yourself"});
      return;
    }
   const isFollowing=user.following.includes(id);
    if(isFollowing){
     //unfollow
     await User.findByIdAndUpdate(user._id,{$pull:{following:id}});
     await User.findByIdAndUpdate(id,{$pull:{follower:user._id}});
    }else{
      //follow
      await User.findByIdAndUpdate(user._id,{$push:{following:id}});
      await User.findByIdAndUpdate(id,{$push:{follower:user._id}});
    }
    const updatedUser = await User.findById(user._id).select("-password");
    const updatedUserToFollow = await User.findById(id).select("-password");

    res.status(200).json({
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
      user: updatedUser,
      userToFollow: updatedUserToFollow,
    });    
  }catch(error){
    console.log("error in followUnfollowUser controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}

export const updateProfile=async(req,res)=>{
  try{
    const {id}=req.params;
    const {name,profilePic,bio,username,password,newPassword,email}=req.body;
    console.log(password)
    if(!name && !profilePic && !bio && !username && !password && !newPassword  &&!email){
      res.status(400).json({error:"atleast one field required"});
      return;
    }
    let cloudinaryResponse=null;
    const user=await User.findById(id);
    if(!user){
      res.status(400).json({error:"user not found"});
      return;
    }
    if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)===false){
      res.status(400).json({error:"Invalid Email"});
      return
    }
    if(newPassword && newPassword.length<6 && newPassword.length>12){
      res.status(400).json({error:"Password should be between 6 to 20 characters"});
      return
    }
    if(newPassword && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)===false){
      res.status(400).json({error:"Password should contain atleast one uppercase letter,one lowercase letter,one special character and one number"});
      return
    }
    if(password || newPassword){
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
          res.status(400).json({error:"Invalid Password"});
          return;
        }
        const salt=await bcrypt.genSalt(10);
        const newHashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=newHashedPassword;
        await sendPasswordUpdateSuccessEmail(user.email);
      }
      if(profilePic){
        try{
          if(user.profilePic){
          const publicId=user.profilePic.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`ProfilePictures/${publicId}`);
          }
            cloudinaryResponse= await cloudinary.uploader.upload(profilePic,{folder:'ProfilePictures'});
        }catch(err){
            console.log('errror checking image in cloudinary',err.message);
        }
      }
   
    user.name=name || user.name;
    user.profilePic=cloudinaryResponse?.secure_url || user.profilePic;
    user.bio=bio || user.bio;
    user.username=username || user.username;
    user.email=email || user.email;
    await user.save();
    const data=user._doc;
    delete data.password;
    res.status(200).json({message:"profile updated successfully",user:data});

  }catch(error){
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }
    console.log("error in updateProfile controller",error);
    res.status(500).json({error:"internal server error"});
  }
}

export const getUserProfile=async(req,res)=>{
      const {query}=req.params;
     try{
      let user;
      if(mongoose.Types.ObjectId.isValid(query)){
        user=await User.findOne({_id:query}).select("-password");
      }else{
       user=await User.findOne({username:{$regex:`^${query}$`,$options:'i'}}).select("-password");
      }
      if(!user){
        res.status(400).json({error:"user not found"});
        return;
      }
      res.status(200).json({user:user});

     }catch(error){
      console.log("error in getUserProfile controller",error.message);
      res.status(500).json({error:"internal server error"});
     }
}