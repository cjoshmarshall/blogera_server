const router=require("express").Router();
const bcrypt=require("bcrypt");

const User=require("../models/userModel");
const Post=require("../models/postModel");

router.put("/:id",async (req,res)=>{

    if(req.body.userId===req.params.id){
        if(req.body.password){
        const salt=await bcrypt.genSalt();
        req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {new:true}
            )
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Incorrect Password")
    }
})


router.delete("/:id",async (req,res)=>{

    if(req.body.userId===req.params.id){
        if(req.body.password){
        const salt=await bcrypt.genSalt();
        req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try{
            const user=await User.findById(req.params.id)
            try{
                await Post.deleteMany({username:req.body.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("Account has been deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }catch(err){
            res.status(404).json("User not found")
        }
    }
    else{
        res.status(401).json("Incorrect Password")
    }
})


router.get('/:id',async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...others}=user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router