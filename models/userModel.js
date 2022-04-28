const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    bio:{type:String,default:""},
    dp:{type:String,default:""}
    },
    { timestamps:true }
)

module.exports=mongoose.model("User",userSchema)