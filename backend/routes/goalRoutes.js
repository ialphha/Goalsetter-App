const express=require('express');
const router=express.Router()

router.get("/",(req, res)=>{
    // res.send("get goals called!!")
    res.status(200).json({message:"Get Goals"})
})
router.post("/",(req, res)=>{
    res.status(200).json({message:"create Goals"})
})
router.put("/:id",(req, res)=>{
    
    res.status(200).json({message:`Edit Goal ${req.params.id}`})
})
router.delete("/:id",(req, res)=>{
    // res.send("get goals called!!")
    res.status(200).json({message:`Delete Goal ${req.params.id}`})
})
module.exports=router