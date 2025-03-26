
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import User from "../model/user.model.js"
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import { sendForgetPasswordEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js';

export const createUser = async (req, res) => {
 try{
  const { email, name, password,username } = req.body;

  if (!email || !name || !password || !username) {
    res.status(400).json({ error: "All field are required " });
    return;
  }
  const existingUser=await User.findOne({email})
  if(existingUser){
      res.status(400).json({error:"User Already Exists"});
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

 }catch(err){
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
      res.cookie('jwt','');
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
    console.log(user)
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
          res.status(400).json({error:"user not found"});
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
    console.log("user validated successfully");
  }catch(error){
    console.log("error in validateUser controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}

export const followUnfollowUser=async(req,res)=>{
  try{
    const user=req.user;
    const {id}=req.params;
    const userToFollow=await User.findById(id);
    if(!userToFollow){
      res.status(400).json({error:"user not found"});
      return;
    }
    if(user._id.toString()===id){
      res.status(400).json({error:"you can't follow/unfollow yourself"});
      return;
    }

    if(user.following.includes(id)){
     //unfollow
     await User.findByIdAndUpdate(user._id,{$pull:{following:id}});
     await User.findByIdAndUpdate(id,{$pull:{follower:user._id}});
     res.status(200).json({message:"unfollowed successfully"});
    }else{
      //follow
      await User.findByIdAndUpdate(user._id,{$push:{following:id}});
      await User.findByIdAndUpdate(id,{$push:{follower:user._id}});
      res.status(200).json({message:"followed successfully"});
    }
    
  }catch(error){
    console.log("error in followUnfollowUser controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}

export const updateProfile=async(req,res)=>{
  try{
    const {id}=req.params;
    const {name,profilePic,bio,username}=req.body;
    const user=await User.findById(id);
    if(!user){
      res.status(400).json({error:"user not found"});
      return;
    }
    user.name=name;
    user.profile=profilePic;
    user.bio=bio;
    user.username=username;
    await user.save();
    res.status(200).json({message:"profile updated successfully"});

  }catch(error){
    console.log("error in updateProfile controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}