const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: 'completed',
		enum: ['completed', 'failed']
	}
});

paymentSchema.statics.getAll = async () => {
	try {
		return await mongoose.model('Payment').find({});
	} catch (error) {
		throw new Error('An error occurred');
	}
};

paymentSchema.statics.getById = async (paymentId) => {
	try {
		const payment = await mongoose.model('Payment').findById(paymentId);
		if (!payment) {
			throw new Error('Payment not found');
		}
		return payment;
	} catch (error) {
		console.log(error);
		throw new Error('An error occurred');
	}
};

paymentSchema.statics.create = async (userId, amount) => {
	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const payment = new mongoose.model('Payment')({ userId, amount });

		await payment.save();

		user.money += amount;

		await user.save();

		return payment;
	} catch (error) {
		console.log(error);
		throw new Error('An error occurred');
	}
};

paymentSchema.statics.updateStatus = async (paymentId, status) => {
	try {
		const payment = await mongoose.model('Payment').findById(paymentId);
		if (!payment) {
			throw new Error('Payment not found');
		}
		payment.status = status;
		await payment.save();
		return payment;
	} catch (error) {
		throw new Error('An error occurred');
	}
};

paymentSchema.statics.delete = async (paymentId) => {
	try {
		const payment = await mongoose.model('Payment').findById(paymentId);
		if (!payment) {
			throw new Error('Payment not found');
		}
		await mongoose.model('Payment').findByIdAndDelete(paymentId);
	} catch (error) {
		throw new Error('An error occurred');
	}
};

module.exports = {
	Payment: mongoose.model('Payment', paymentSchema)
};
