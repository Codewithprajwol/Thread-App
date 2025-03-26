import jwt from 'jsonwebtoken'
import User from '../model/user.model';
export const protectRoute=async(req,res,next)=>{
    try{

        const token=req.cookies;
        console.log(token);

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
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