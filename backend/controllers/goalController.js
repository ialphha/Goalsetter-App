const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@description : Get Goals
//@route       : GET api/goals
//@access      : Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

//@description : create/post/set Goals
//@route       : POST api/goals
//@access      : Private
const createGoals = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add a text field");
	}

	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});

//@description : edit/ update Goals
//@route       : PUT api/goals/:id
//@access      : Private
const editGoals = asyncHandler(async (req, res) => {
	// finding the goal requested in the req id via url params
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	// //checking if user is authentic
	// const user =User.findById(req.user.id);

	// // check for user existence
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// making sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

//@description : Delete Goals
//@route       : DELETE api/goals/:id
//@access      : Private
const deleteGoals = asyncHandler(async (req, res) => {
	// finding the goal requested in the req id via url params
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}
	//checking if user is authentic
	// const user = User.findById(req.user.id);

	// check for user existence
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// making sure the logged in user matches the goal user
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await goal.remove();
	console.log(req.params.id);

	// const goalId = {
	// 	id: req.params.id,
	// };
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	createGoals,
	editGoals,
	deleteGoals,
};
