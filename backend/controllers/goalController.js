const asyncHandler=require('express-async-handler');

//@description : Get Goals
//@route       : GET api/goals
//@access      : Private
const getGoals=asyncHandler(async(req, res)=>{
    res.status(200).json({message:"Get Goal"})
})
//@description : create/post Goals
//@route       : POST api/goals
//@access      : Private
const createGoals=asyncHandler(async(req, res)=>{
    if (!req.body.text){
        res.status(400);
        throw new Error ("Please add a text field");
    }
    res.status(200).json({message:"Create Goal"})
})
//@description : edit/ update Goals
//@route       : PUT api/goals/:id
//@access      : Private
const editGoals=asyncHandler(async(req, res)=>{
    res.status(200).json({message:`Edit Goals ${req.params.id}`})
})
//@description : Delete Goals
//@route       : DELETE api/goals/:id
//@access      : Private
const deleteGoals=asyncHandler(async(req, res)=>{
    res.status(200).json({message:`Delete Goals ${req.params.id}`})
})


module.exports={
    getGoals,
    createGoals,
    editGoals,
    deleteGoals
}