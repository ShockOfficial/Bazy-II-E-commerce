const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const rolePermissions = require('../middlewares/rolePermissions');

const { addOrder } = require('../controllers/orders.controller');

const router = express.Router();

router.use(requireAuth);
router.use(rolePermissions(["user", "admin"]));
router.post('/', addOrder);

module.exports = router;