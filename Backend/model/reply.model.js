import mongoose from 'mongoose'

const replySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
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
    replies:[this],
},
{
    timestamps:true
}
)

replySchema.add({replies:[replySchema]});

const Reply=mongoose.model("Reply",replySchema);
export default Reply;
