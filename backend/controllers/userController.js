const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET);
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
    	const {name,image, favourites, role} = user;
		const token = createToken(user._id);
    	const data = { email, token, name, favourites, role, avatar: image };
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const signupUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.signup(email, password);
    	const {name,image, favourites, role} = user;
		const token = createToken(user._id);
    	const data = { email, token, name, favourites, role, avatar: image };
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	const { email, data } = req.body;
	
	try {
		const user = await User.updateProfile(req.user, data);
    	const token = createToken(user._id);
    	const {name,image, favourites, role} = user;
    	const resData = { email, token, name, favourites, role, avatar: image };
		res.status(200).json(resData);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};


module.exports = {
	loginUser,
	signupUser,
  updateUser
};
