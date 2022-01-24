const express= require("express");
const router= express.Router();
const Student= require("../model/studentdata");
const mongoose= require("mongoose"); 
const check= require("../middle/check");

// router.get("/", (req,res,next)=>{
//     res.status(200).json({
//         message:"Hello student",
//     })
// })

router.get('/',check,(req,res,next)=>{
    // res.status(200).json({
    //     msg: 'this is add data page get'
    // })
    Student.find().then(result=>{
        res.status(200).json({
            Student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})

router.post('/',check,(req,res,next)=>{
   const student=new Student({
       _id: new mongoose.Types.ObjectId,
       name: req.body.name,
       email:req.body.email,
       phone:req.body.phone
   })
   text.save().then(result=>{
       console.log(result);
       res.status(200).json({
           newText: result
       })
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       })
   })
})


module.exports = router;