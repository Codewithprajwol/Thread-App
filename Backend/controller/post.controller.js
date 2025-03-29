export const createPost=async(req,res)=>{
    const {text,image}=req.body;

    try{
        if(!text)

    }catch(error){
        console.log("error in createPost controller",error.message);
        res.status(500).json({error:"internal server error"});
    }
}