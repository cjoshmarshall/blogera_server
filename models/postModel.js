const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    username:{type:String,required:true},
    title:{type:String,required:true,unique:false},
    description:{type:String,required:true},
    image:{type:String,required:false},
    },
    { timestamps:true }
)

module.exports=mongoose.model("post",postSchema)