import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';
export const protectRoute=async(req,res,next)=>{
    try{

        const token=req.cookies.jwt;
            if(!token){
                res.status(401).json({error:"unauthorized access"});
                return;
            }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.userId);
        if(!user){
            res.status(400).json({error:"user not found"});
            return;
        }
        req.user=user;
        next();
    }catch(error){
        console.log("error in protectRoute middleware",error.message)
        res.status(500).json({error:"internal server error"})
    }
}