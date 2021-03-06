const router=require("express").Router();

const User=require("../models/userModel");
const Post=require("../models/postModel");



router.post("/",async (req,res)=>{
    const newPost=new Post(req.body)
    try{
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})


router.put('/:id',async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },
                {new:true})
                res.status(200).json(updatedPost)
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("Error")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


router.delete("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
            
        if(post.username===req.body.username){
            try{
                await post.delete()
                res.status(200).json("Post has been deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
        res.status(401).json("Error")
        }
    }catch(err){
        res.status(505).json(err)
    }    
})


router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get("/",async (req,res)=>{
    const username=req.query.user;
    try{
        let post
        if(username){
            post=await Post.find({username})
            .populate("user")
        }else{
            post=await Post.find()
        }
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router