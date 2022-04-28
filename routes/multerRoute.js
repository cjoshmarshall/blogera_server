const router=require("express").Router();

const fs=require("fs")
const util=require("util")
const unlinkFile=util.promisify(fs.unlink)

const multer=require("multer")
const upload=multer({dest:"uploads/"})
var type = upload.single('file'); 

const {uploadFile,getFileStream}=require("../s3")

router.get("/api/images/:key",(req,res)=>{
    const key=req.params.key
    const readStream=getFileStream(key)

    readStream.pipe(res)
})


router.post("/api/images",type,async (req,res)=>{
    const file=req.file
    const result=await uploadFile(file)
    await unlinkFile(file.path)
    const url={imagePath:`${result.Key}`}
    res.send(url)
})



module.exports=router