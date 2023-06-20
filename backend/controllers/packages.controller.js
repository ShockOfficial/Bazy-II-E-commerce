const Package = require('../models/package.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

const compareDates = (currentDate, comparedDate) => {
	const diffInMilliseconds = currentDate.getTime() - comparedDate.getTime();

	return Math.floor(diffInMilliseconds / 1000);
};

const getAllPackages = async (req, res) => {
	try {
		const package = await Package.find().populate('items.productId');

		if (!package) {
			res.status(400).json({ error: 'No such package' });
		}

		res.status(200).json(package);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPackage = async (req, res) => {
	const { _id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(404).json({ error: 'No such package' });
		}

		const package = await Package.findById(_id).populate('items.productId');
		if (!package) {
			res.status(400).json({ error: 'No such package' });
		}

		res.status(200).json(package);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createPackage = async (req, res) => {
	const { name, items, cost, cooldown } = req.body;

	for (item of items) {
		const { productId } = item;

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res
				.status(404)
				.json({ error: 'At least one products id is invalid' });
		}
	}

	try {
		const productsIds = items.map(
			(item) => new mongoose.Types.ObjectId(item.productId)
		);
		const existingProducts = await Product.aggregate([
			{
				$match: {
					_id: { $in: productsIds }
				}
			}
		]);

		if (existingProducts.length !== productsIds.length) {
			return res
				.status(400)
				.json({ error: 'At least one product does not exist' });
		}

		const packageData = {
			name,
			cost,
			cooldown,
			items: []
		};

		for (const product of items) {
			const existingProduct = existingProducts.find(
				(ex_product) => ex_product._id.toString() === product.productId
			);
			packageData.items.push({
				productId: existingProduct._id,
				probability: product.propability
			});
		}

		const newPackage = await Package.create(packageData);
		res.status(200).json(newPackage);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getRandomItem = async (req, res) => {
	const { _id } = req.body;
	const { user } = req;

	try {
		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(404).json({ error: 'No such package' });
		}

		const package = await Package.findById(_id).populate('items.productId');
		if (!package) {
			return res.status(400).json({ error: 'No such package' });
		}

		const openedPackageIndex = user.openedPackages.findIndex(
			(pkg) => pkg.packageId.toString() === _id.toString()
		);
		if (
			openedPackageIndex !== -1 &&
			compareDates(
				new Date(),
				user.openedPackages[openedPackageIndex].openedAt
			) < package.cooldown
		) {
			return res.status(400).json({
				error: `You have to wait ${package.cooldown} seconds between drawing the items`
			});
		}

		if (user.money < package.cost) {
			return res.status(400).json({ error: 'Insufficient funds' });
		}

		// Draw item
		const minProbability = package.items.reduce(
			(acc, item) => Math.min(acc, item.probability),
			Infinity
		);
		const scale = 1 / minProbability;

		const chances = package.items.reduce(
			(acc, item) => acc + item.probability * scale,
			0
		);
		const randomNumber = Math.random() * chances;

		let chancesSum = 0;
		let drawItem = null;

		for (const item of package.items) {
			chancesSum += item.probability * scale;

			if (randomNumber < chancesSum) {
				drawItem = item;
				break;
			}
		}

		// Modify information about the user drawing the item
		if (openedPackageIndex === -1) {
			user.openedPackages.push({ packageId: _id, openedAt: new Date() });
		} else {
			user.openedPackages[openedPackageIndex].openedAt = new Date();
		}

		const drawItemIndex = user.products.findIndex(
			(product) =>
				product.productId.toString() === drawItem.productId._id.toString()
		);
		if (drawItemIndex === -1) {
			user.products.push({ productId: drawItem.productId, quantity: 1 });
		} else {
			user.products[drawItemIndex].quantity += 1;
		}

		await user.save();

		res.status(200).json({ _id: drawItem.productId._id });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createPackage,
	getAllPackages,
	getPackage,
	getRandomItem
};
