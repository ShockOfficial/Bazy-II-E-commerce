const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

// controller function
const {
	getAllPayments,
	getPaymentById,
	addPayment,
	updatePayment,
	deletePayment,
	payForOrder
} = require('../controllers/payments.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllPayments);

router.get('/:_id', getPaymentById);

router.post('/', addPayment);

router.patch('/:_id', payForOrder);

router.put('/:_id', updatePayment);

router.delete('/:_id', deletePayment);

module.exports = router;
