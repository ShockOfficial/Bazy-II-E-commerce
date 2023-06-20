const Payment = require('../models/payments.model').Payment;
const User = require('../models/user.model').User;
const Order = require('../models/orders.model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addPayment = async (req, res) => {
	try {
		const { amount } = req.body;
		const {
			user: { _id: userId }
		} = req;
		const payment = await Payment.create(userId, amount);
		res.status(201).json({ message: 'Payment added successfully', payment });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

exports.getAllPayments = async (req, res) => {
	try {
		const payments = await Payment.getAll();
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

exports.getPaymentsByUserId = async (req, res) => {
	try {
		const {
			user: { _id: userId }
		} = req;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const payments = await Payment.find({ userId });

		res.status(200).json({ payments });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

exports.getPaymentById = async (req, res) => {
	try {
		const payment = await Payment.getById(req.params._id);
		res.json(payment);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

exports.payForOrder = async (req, res) => {
	try {
		const { user } = req;
		const { _id: orderId } = req.params;

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}

		if (order.user.toString() !== user._id.toString()) {
			return res.status(403).json({ error: 'Unauthorized' });
		}

		const payment = await Payment.findOne({ orderId, status: 'pending' });

		if (!payment) {
			return res
				.status(404)
				.json({ error: 'Payment not found or already processed' });
		}

		payment.status = 'completed';
		order.status = 'completed';

		await payment.save();
		await order.save();

		res
			.status(200)
			.json({ message: 'Payment processed successfully', payment });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'An error occurred' });
	}
};

exports.updatePayment = async (req, res) => {
	try {
		const { status } = req.body;

		if (status !== 'failed' && status !== 'completed') {
			return res.status(400).json({ error: 'Invalid status' });
		}

		const payment = await Payment.updateStatus(req.params._id, status);
		res.json({ message: 'Payment updated successfully', payment });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

exports.deletePayment = async (req, res) => {
	try {
		await Payment.delete(req.params._id);
		res.json({ message: 'Payment deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};
