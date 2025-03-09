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
    following:{
        type:[String],
        default:[]
    },
    follower:{
        type:[String],
        default:[]
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
    verificationToken:String,
    verificationTokenExpiresAt:Date
},{
    timeStamp:true,
})

const User=mongoose.model('User',userSchema);
export default User;