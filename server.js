const express=require("express");
const app=express();
const cors=require("cors")
const dotenv=require("dotenv").config();
const dbconnection=require("./database")


app.use(express.json())
app.use(cors())


app.use(require("./routes/multerRoute"))

app.use("/api/auth",require("./routes/authRoute"))
app.use("/api/users",require("./routes/userRoute"))
app.use("/api/blogs",require("./routes/postRoute"))

app.get("/",(req,res)=>
    res.send("Connected")
)

app.listen(process.env.PORT || 3006,()=>{
    console.log("Connected")
})