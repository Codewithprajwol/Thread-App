import mongoose from "mongoose";

const userSchema=new mongoose({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    confirmPassword:{
        type:String,
    },
    following:{
        type:[String]
    },
    follower:{
        type:[String]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    lastLogin:{
    type:Date,
    default:()=>Date.now()
    },
    passwordResetToken:String,
    PasswordResetTokenExpiresAt:Date,
    VerificationToken:String,
    verificationTokenExpiresAt:Date
},{
    timeStamp:true,
})

const User=mongoose.model('User',userSchema);
export default User;