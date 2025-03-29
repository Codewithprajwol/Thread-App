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
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[],
    },
    replies:{
        type:[
            {
                userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
                },
                text:{
                    type:String,
                    required:true,
                },
                profilePic:{
                    type:String,
                },
                username:{
                    type:String,
                }
            }
        
        ]
    }
},{
    timestamps:true
})

const Post=mongoose.model('post',postSchema)
export default Post;