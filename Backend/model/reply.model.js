import mongoose from 'mongoose'

const replySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    parentReplyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply",
        default:null,
    },
    username:{
        type:String,
    },
    text:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[],
    },
},
{
    timestamps:true,
}
)

const Reply=mongoose.model("Reply",replySchema);
export default Reply;
