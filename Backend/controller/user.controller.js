
import bcrypt from 'bcrypt'
import User from "../model/user.model.js"
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import { sendVerificationEmail } from '../mailtrap/email.js';

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
    const user=await User.find({'verificationToken':code,'verificationTokenExpiresAt':{$gt:new Date()}});
    if(!validToken) return res.status(400).json({error:'Token has be expired ..invalid'});
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