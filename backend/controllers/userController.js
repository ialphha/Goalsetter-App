const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//@description : Register User
//@route       : POST api/users
//@access      : Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, phone } = req.body;

	if (!name || !email || !password || !phone) {
		res.status(400);
		throw new Error("Please add all the required fields");
	}

	//check if userexists:
	const userExists = await User.findOne({
		$or: [{ email: email }, { phone: phone }],
	});

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	//hash the password:
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user:
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		phone,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

//@description : Login User
//@route       : POST api/users/login
//@access      : Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

//@description : Get User data
//@route       : GET api/users/me
//@access      : Private
const getMe = asyncHandler(async (req, res) => {
	// const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json(req.user);
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "3d",
	});
};

module.exports = { registerUser, loginUser, getMe };
