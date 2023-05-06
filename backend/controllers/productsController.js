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

module.exports = {
	getProducts,
	getProduct,
	createProduct
};
