const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

// controller function
const {
	loginUser,
	signupUser,
	updateUser
} = require('../controllers/userController');

const {
	getFavourites,
	addToFavourites,
	removeFromFavourites
} = require('../controllers/favouritesProducts.controller');

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

// Protected routes
router.put('/update', requireAuth, updateUser);
router.get('/favourites', requireAuth, getFavourites);
router.post('/favourites/add', requireAuth, addToFavourites);
router.post('/favourites/remove', requireAuth, removeFromFavourites);
module.exports = router;
