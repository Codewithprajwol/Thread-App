import mongoose from 'mongoose'

const postSchema=new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        maxlength:500,
    },
    image:{
        type:String,
        default:"",
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[],
    },
},{
    timestamps:true
})

const Post=mongoose.model('post',postSchema)
export default Post;