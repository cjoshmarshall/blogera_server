const router=require("express").Router();
const bcrypt=require("bcrypt");

const User=require("../models/userModel");

router.post("/signup",async (req,res)=>{
        const salt=await bcrypt.genSalt();
        req.body.password=await bcrypt.hash(req.body.password,salt)

    const newUser= await new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })

    try{
        await newUser.save()
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err)
    }
})


router.post("/login",async (req,res)=>{

    try{
        const user=await User.findOne({username:req.body.username})
        const match=await bcrypt.compare(req.body.password,user.password)
        const { password,...others }=user._doc;
        if(!user || !match){
            res.status(400).json("Incorrect Email or Password")
        }else{
            res.status(200).json(others)
        }

    }catch(err){
        res.status(500).json(err)
    }
})




module.exports=router