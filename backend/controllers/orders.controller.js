const Order = require('../models/orders.model');
const Payment = require('../models/payments.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find().populate('items.product');
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getOrder = async (req, res) => {
	const { _id } = req.params;
	const {
		user: { _id: userId, role }
	} = req;

	try {
		if (!(_id.toString() === userId.toString() || role === 'admin')) {
			return res.status(403).json({ error: 'Forbidden' });
		}

		const orders = await Order.find({ user: userId }).populate('items.product');
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const addOrder = async (req, res) => {
	const { user } = req;
	const { items } = req.body;

	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		// Sprawdzenie, czy użytkownik posiada uzupełnione dane
		const { street, city, postalCode, country } =
			user.orderInfo.shippingAddress;
		const { contactNumber } = user.orderInfo;
		if (!street || !city || !postalCode || !country || !contactNumber) {
			return res
				.status(400)
				.json({ error: 'User shipping information is incomplete' });
		}

		// Sprawdzenie, czy wszystkie przedmioty są dostępne w user.products
		const orderedProductIds = items.map((item) => item.productId.toString());
		for (let id of orderedProductIds) {
			const orderedItem = items.find(
				(item) => item.productId.toString() === id
			);
			const userProduct = user.products.find(
				(product) => product.productId.toString() === id
			);

			if (!userProduct) {
				await session.abortTransaction();
				session.endSession();
				return res
					.status(400)
					.json({ error: 'Some ordered products are not owned by the user' });
			}

			if (orderedItem.quantity > userProduct.quantity) {
				await session.abortTransaction();
				session.endSession();
				return res.status(400).json({
					error:
						'Some ordered products are not available in the requested quantity'
				});
			}
		}

		// Aktualizacja ilości zamówionych przedmiotów w user.products
		for (let orderedItem of items) {
			const productId = orderedItem.productId.toString();
			const quantity = orderedItem.quantity;

			const userProduct = user.products.find(
				(product) => product.productId.toString() === productId
			);

			if (quantity === userProduct.quantity) {
				user.products = user.products.filter(
					(product) => product.productId.toString() !== productId
				);
			} else {
				userProduct.quantity -= quantity;
			}
		}

		await user.save();

		const orderedItems = items.map((item) => {
			return {
				product: item.productId,
				quantity: item.quantity
			};
		});

		const order = new Order({
			user: user._id,
			items: orderedItems,
			shippingAddress: {
				street: street,
				city: city,
				postalCode: postalCode,
				country: country
			},
			contactNumber: contactNumber,
			status: 'pending'
		});

		await order.save();
		let totalPrice = 0;

		for (let item of items) {
			const product = await Product.findById(item.productId);
			totalPrice += product.price * item.quantity;
		}

		const payment = new mongoose.model('Payment')({
			userId: user._id,
			orderId: order._id,
			amount: totalPrice,
			status: 'pending'
		});

		await payment.save();

		// Commit transakcji
		await session.commitTransaction();
		session.endSession();

		// Zakładam że po 5 min jeśli nie opłacone to anuluję zamówienie
		setTimeout(async () => {
			const updatedPayment = await mongoose
				.model('Payment')
				.findById(payment._id);

			if (
				updatedPayment.status === 'pending' ||
				updatedPayment.status === 'canceled'
			) {
				// Anulowanie zamówienia i płatności
				const session = await mongoose.startSession();
				session.startTransaction();

				await mongoose
					.model('Order')
					.findByIdAndUpdate(order._id, { status: 'canceled' });
				await mongoose
					.model('Payment')
					.findByIdAndUpdate(payment._id, { status: 'canceled' });

				// Cofnięcie zmian w user.products
				for (let orderedItem of items) {
					const productId = orderedItem.productId.toString();
					const quantity = orderedItem.quantity;

					const userProduct = user.products.find(
						(product) => product.productId.toString() === productId
					);

					if (!userProduct) {
						await session.abortTransaction();
						session.endSession();
						return res.status(400).json({
							error: 'Some ordered products are not owned by the user'
						});
					}

					userProduct.quantity += quantity;
				}

				await user.save();

				await session.commitTransaction();
				session.endSession();
			}
		}, 5 * 60 * 1000);

		res
			.status(200)
			.json({ message: 'Order added successfully', orderId: order._id });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	addOrder,
	getOrders,
	getOrder
};
