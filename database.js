const mongoose=require("mongoose")

const dbConnection=mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("DBConnected"))
.catch((err)=>{
    console.log(err)
})

module.exports=mongoose