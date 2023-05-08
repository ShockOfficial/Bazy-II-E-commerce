const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

// controller function
const { loginUser, signupUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);

router.put('/update', requireAuth, updateUser);

router.post('/signup', signupUser);

module.exports = router;
