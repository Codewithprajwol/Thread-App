import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookies=(res,userId)=>{
   try{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})

    res.cookie('jwt',token,{
        sameSite:'strict',
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV==="production"
    })
   }catch(err){
    console.log(err.message)
   }
}