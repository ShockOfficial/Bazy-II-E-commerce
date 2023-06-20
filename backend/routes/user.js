const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const rolePermissions = require('../middlewares/rolePermissions');

// controller function
const {
	loginUser,
	signupUser,
	updateUser,
	changeRole,
	updateOrderInfo
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
router.use(requireAuth);
router.use(rolePermissions(["user", "admin"]));
router.put('/update', updateUser);
router.get('/favourites', getFavourites);
router.post('/favourites/add', addToFavourites);
router.post('/favourites/remove', removeFromFavourites);
router.patch('/update-order-info', updateOrderInfo);

router.use(rolePermissions(["admin"]));
router.patch('/change-role', changeRole);

module.exports = router;
