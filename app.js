const express=require("express");

const app= express();
const mongoose = require("mongoose");
const bodyParser= require("body-parser");

const studentRouter= require("./api/routes/student");
const userRouter= require("./api/routes/user");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://shivamrestapi:ShivamPandey@cluster0.rtpyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoose.connection.on("error", err=>{
    console.log("failed connection");
});

mongoose.connection.on("connected", connected=>{
    console.log("connected with database successfully");
})

app.use("/student",studentRouter);

app.use("/user",userRouter);

app.use((req,res,next)=>{
    res.status(200).json({
        message: "app is good running",
    })
});





module.exports= app;