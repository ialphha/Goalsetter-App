const express=require('express');
const router=express.Router()
const {getGoals, createGoals, editGoals, deleteGoals}= require('../controllers/goalController');

router.get("/",getGoals);
router.post("/", createGoals);

router.put("/:id",editGoals);
router.delete("/:id",deleteGoals);

module.exports=router