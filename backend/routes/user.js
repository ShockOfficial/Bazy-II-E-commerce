const express = require('express');

// controller function
const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

module.exports = router;
