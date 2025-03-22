
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import User from "../model/user.model.js"
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import { sendForgetPasswordEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js';

export const createUser = async (req, res) => {
 try{
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
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
    const {email, password}=req.body;
    if(!email || !password){
      res.status(400).json({error:"all field required"});
      return 
    }
    const user=await User.findOne({email:email});
    if(!user){
      res.status(400).json({error:"User not found"});
      return 
    }
    const validPassword= await bcrypt.compare(password,user.password);
    if(!validPassword){
      res.status(400).json({error:"Invalid Password"});
      return
    }
    generateTokenAndSetCookies(res,user._id)
    res.status(200).json({message:"user Logged in Successfully",user:user})

  }catch(err){
    console.log(err)
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
      await user.save();
      await sendPasswordResetSuccessEmail(user.email);
       res.status(200).json({message:"password reset successfully"});
  }catch(error){
    console.log("error in resetPassword controller",error.message);
    res.status(500).json({error:"internal server error"});
  }
}