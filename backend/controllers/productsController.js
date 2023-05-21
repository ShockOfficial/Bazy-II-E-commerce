const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
	const products = await Product.find({}).sort({ createdAt: -1 });

	res.status(200).json(products);
};

const getProduct = async (req, res) => {
	const { _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).json({ error: 'No such product' });
	}

	const product = await Product.findById(_id);

	if (!product) {
		res.status(400).json({ error: 'No such product' });
	}

	res.status(200).json(product);
};

const createProduct = async (req, res) => {
	try {
		const product = await Product.create({ ...req.body });
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateProduct = async (req, res) => {
	const { _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).json({ error: 'There is no such product' });
	}

	const product = await Product.findOneAndUpdate({ _id: _id }, {
		...req.body
	});

	if (!product) {
		res.status(400).json({ error: 'Thre is no such product' });
	}

	res.status(200).json(product);
};

const buyProducts = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	const products = req.body.products;

	try {
		const productsIds = products.map((product) => product.product._id);
		const foundProducts = await Product.find({ _id: { $in: productsIds } }).session(session);

		const updates = foundProducts.map((product) => {
			const boughtProduct = products.find((prod) => {
				return prod.product._id.toString() === product._id.toString();
			});

			if (product.unitsInStock < boughtProduct.quantity) {
				throw new Error(`Not enough quantity of the product: ${product.name}`);
			}

			return Product.updateOne(
				{ _id: product._id },
				{ $inc: { unitsInStock: -boughtProduct.quantity } }
			).session(session);
		});

		await Promise.all(updates);
		await session.commitTransaction();

		res.status(200).json(products);
	} catch (error) {
		await session.abortTransaction();
		res.status(400).json({ error: error.message });
	} finally {
		session.endSession();
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	buyProducts
};
