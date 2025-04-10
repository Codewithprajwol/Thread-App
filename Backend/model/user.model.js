import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Length should be greater than 2"],
        minLength:2,
    },
    username:{
        type:String,
        required:[true,"Length should be greater than 2"],
        minLength:2,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message:"Please enter a valid email address"
        }
    },
    password:{
        type:String,
        minLength:[6,"Password should be at least 6 characters long"],
        validate:{
            validator:function(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v);
            },
            message:"Password should contain at least one uppercase letter, one lowercase letter, and one number"
        }
    },
    following:{
        type:[String],
        default:[]
    },
    follower:{
        type:[String],
        default:[]
    },
    profilePic:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"",
        maxLength:[500,"Bio should be less than 200 characters"]
    },
    isFrozen:{
        type:Boolean,
        default:false
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