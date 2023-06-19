const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const rolePermissions = require('../middlewares/rolePermissions');

// controller function
const {
    createPackage,
    getPackage,
    getAllPackages,
    getRandomItem
} = require('../controllers/packages.controller');

const router = express.Router();

router.use(requireAuth);

router.use(rolePermissions(["user", "admin"]));
router.get('/', getAllPackages);
router.get('/:_id', getPackage);
router.post('/draw-item', getRandomItem);

router.use(rolePermissions(["admin"]));
router.post('/', createPackage);

module.exports = router;