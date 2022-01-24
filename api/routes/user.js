const express= require("express");
const router= express.Router();
const User= require("../model/user");
const mongoose= require("mongoose"); 
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const cookieParser= require("cookie-parser");
const app= express();
const check= require("../middle/check");
app.use(cookieParser());



router.post("/signup",(req,res,next)=>{ 
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user= new User({
                _id: new mongoose.Types.ObjectId,
                 username: req.body.username,
                 password: hash,
                 phone: req.body.phone,
                 email: req.body.email,
                 userType: req.body.userType
              })
            
              user.save()
              .then(result=>{
                  res.status(200).json({
                      new_user:result
                  })
              })
              .catch(err=>{
                  res.status(500).json({
                      error1:err
                  })
              })  
        }
    })
    
    
        

})

router.post("/login",(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)   // user will be in form of array
        {
           res.status(401).json({
               msg: "user doesn't exist"
           })
        }
        // password matching method
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    message:"password is incorrect"
                })
            }
            if(result)      // if password matches, we have to give jst i.e token
            {
               const token = jwt.sign({
                   username: user[0].username,
                   userType:user[0].userType,
                   email:user[0].email,
                   phone:user[0].phone
               },
               "I wont tell you,get lost" ,
               {
                   expiresIn:"24h"
               }      // to verify the token
               );
               
            return res
            .cookie("atoken", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ 
                message: "Logged in",
                username: user[0].username,
               userType:user[0].userType,
               email:user[0].email,
               phone:user[0].phone,
               token:token
        });  
               
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

router.get("/protected", check, (req, res) => {
    return res.json({ username: req.body.username,
        
         });
  });
  

router.get("/logout", check, (req, res) => {
    return res
      .clearCookie("atoken")
      .status(200)
      .json({ message: "Logged out Successfully" });
  });





module.exports = router;

