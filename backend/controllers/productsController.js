const Product = require('../models/product.model');
const User = require('../models/user.model');
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

const removeFromSale = async (req, res) => {
	const { user } = req;
	const { productId } = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(404).json({ error: 'There is no such product' });
		}
		
		const product = await Product.findOne({ _id: productId });
		// Could use findOneAndDelete() instead, but if we want give access for admin to delete users sales there must be if statement to check if we are the user who created the sale or if we are an admin.
		
		if (!product) {
			return res.status(400).json({ error: 'There is no such product' });
		}

		if (!product.userId.toString() === user._id.toString()) {
			return res.status(404).json({ error: 'There is no such product created by the user' });
		}

		const deletedDocument = await Product.deleteOne({ _id: productId });

		res.status(200).json({ product: deletedDocument });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

const sellProducts = async (req, res) => {
	const { user } = req;
	const { productId, quantity, price } = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(404).json({ error: 'There is no such product' });
		}

		const alreadyExist = await Product.findOne({ userProductId: productId }) == null ? false : true;
		if (alreadyExist) {
			return res.status(409).json({ error: 'Product already exists' });
		}

		const index = user.products.findIndex((product) => product._id.toString() === productId);
		if (index === -1) {
			return res.status(404).json({ error: 'There is no such product in user inventory' });
		}

		if (user.products[index].quantity < quantity) {
			return res.status(400).json({ error: 'There is no enough quantity' });
		}

		const product = await Product.findById(user.products[index].productId);
		const newProduct = await Product.create({ ...product._doc, unitsInStock: quantity, price: price, userId: user._id, userProductId: user.products[index]._id, _id: new mongoose.Types.ObjectId() });

		res.status(200).json({ product: newProduct });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

const updateSaleParameters = async (req, res) => {
	const { user } = req;
	const { _id, price, quantity } = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(404).json({ error: 'There is no such product' });
		}
		
		const product = await Product.findOne({ _id: _id });

		const index = user.products.findIndex((prod) => prod._id.toString() === product.userProductId.toString());
		if (index === -1) {
			return res.status(404).json({ error: 'There is no such product in user inventory' });
		}

		if (user.products[index].quantity < quantity) {
			return res.status(400).json({ error: 'There is no enough quantity' });
		}

		if (price != null && price > 0) product.price = price;

		if (quantity != null && quantity > 0) product.unitsInStock = quantity;

		await product.save();

		res.status(200).json({ product: product });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

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
	const buyer = req.user;

	try {
		const productsIds = products.map((product) => product.product._id);
		const foundProducts = await Product.find({ _id: { $in: productsIds } }).session(session);

		const totalPrice = foundProducts.reduce((total, product) => {
			const boughtProduct = products.find((prod) => prod.product._id.toString() === product._id.toString());
			if (product.unitsInStock < boughtProduct.quantity) {
				throw new Error(`Not enough quantity of the product: ${product.name}`);
			}

			return total + product.price * boughtProduct.quantity;
		}, 0);

		if (buyer.money < totalPrice) {
			throw new Error('Insufficient funds');
		}

		const updates = foundProducts.map(async (product) => {
			const boughtProduct = products.find((prod) => prod.product._id.toString() === product._id.toString());
			let id = product._id;

			if (product.userId != null) {
				const seller = await User.findById(product.userId).session(session);
				const soldItem = seller.products.find((item) => item._id.toString() === product.userProductId.toString());
				id = soldItem.productId;

				if (soldItem) {
					soldItem.quantity -= boughtProduct.quantity;
					if (soldItem.quantity === 0) {
						seller.products.pull(soldItem._id);
					}
				}

				seller.money += product.price * boughtProduct.quantity;
				await seller.save();
			}

			const existingItem = buyer.products.find((item) => item.productId.toString() === id.toString());
			if (existingItem) {
				existingItem.quantity += boughtProduct.quantity;
			}
			else {
				buyer.products.push({ productId: id, quantity: boughtProduct.quantity });
			}

			product.unitsInStock -= boughtProduct.quantity;
			if (product.unitsInStock === 0 && product.userId) {
				return Product.deleteOne({ _id: product._id }).session(session);
			}

			return product.save();
		});

		await Promise.all(updates);
		buyer.money -= totalPrice;
		await buyer.save();

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
	buyProducts,
	sellProducts,
	removeFromSale,
	updateSaleParameters
};
