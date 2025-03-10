
import bcrypt from 'bcrypt'
import User from "../model/user.model.js"
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
export const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email,name,password)

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
      verificationTokenExpiresAt:Date.now()+24*60*60,
  })
  await user.save();
   generateTokenAndSetCookies(res,user._id)
  res.status(201).json({user:{...user._doc,password:undefined}})
  
};
