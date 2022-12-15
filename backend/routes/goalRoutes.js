const express=require('express');
const router=express.Router()
const {getGoals, createGoals, editGoals, deleteGoals}= require('../controllers/goalController');
const {protect}=require('../middleware/authMiddleware');

router.get("/", protect, getGoals);
router.post("/", protect, createGoals);

router.put("/:id", protect, editGoals);
router.delete("/:id", protect, deleteGoals);

module.exports=router