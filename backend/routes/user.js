const express = require('express');

// controller function
const { loginUser, signupUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);

router.put('/update', updateUser);

router.post('/signup', signupUser);

module.exports = router;
