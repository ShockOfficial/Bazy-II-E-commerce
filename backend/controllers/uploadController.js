const multer = require('multer');
const User = require('../models/user.model');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + '-' + Date.now());
	}
});

const upload = multer({ storage });

const uploadImage = async (req, res) => {
	const { userId, image } = req.body;
	try {
		await User.updateProfile(userId, image);
		res.status(200).json({ message: 'Image uploaded successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	upload,
	uploadImage
};
