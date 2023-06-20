const User = require('../models/user.model');

const addToFavourites = async (req, res) => {
	const { productId } = req.body;
	const { user } = req;
	try {
		const updatedUser = await User.addToFavourites(user._id, productId);
		res.status(200).json(updatedUser.favouritesProducts.items);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const removeFromFavourites = async (req, res) => {
	const { user } = req;
	const { _id: productId } = req.params;

	try {
		const updatedUser = await User.removeFromFavourites(user._id, productId);
		res.status(200).json(updatedUser.favouritesProducts.items);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getFavourites = async (req, res) => {
	const { user } = req;
	try {
		const favourites = await User.getFavourites(user._id);
		res.status(200).json(favourites);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	addToFavourites,
	removeFromFavourites,
	getFavourites
};
