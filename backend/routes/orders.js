const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const rolePermissions = require('../middlewares/rolePermissions');

const {
    addOrder,
    getOrders,
    getOrder
} = require('../controllers/orders.controller');

const router = express.Router();

router.use(requireAuth);
router.use(rolePermissions(["user", "admin"]));
router.post('/', addOrder);
router.get('/:_id', getOrder);

router.use(rolePermissions(["admin"]));
router.get('/', getOrders);

module.exports = router;