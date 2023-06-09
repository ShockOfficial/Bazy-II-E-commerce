const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

// controller function
const {
    createPackage,
    getPackage,
    getAllPackages,
    getRandomItem
} = require('../controllers/packages.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllPackages);

router.get('/:_id', getPackage);

router.post('/', createPackage);

router.post('/draw-item', getRandomItem);

module.exports = router;