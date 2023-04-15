const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    res.json({ msg: "Login post request" });
});

router.post('/signup', (req, res) => {
    res.json({ msg: "Signup post request" });
});

module.exports = router;