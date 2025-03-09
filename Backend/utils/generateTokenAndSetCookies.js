import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})
    console.log(token)

    res.cookie('jwt',token,{
        sameSite:'strict',
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV==="production"
    })
}