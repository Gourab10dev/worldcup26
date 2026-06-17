const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Fantasy League Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>{
    console.log(err);
});

app.post("/register", async(req,res)=>{

    try{

        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            success:true,
            message:"Registration Successful"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
});