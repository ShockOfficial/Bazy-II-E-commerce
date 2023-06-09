const Package = require('../models/package.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

const getAllPackages = async (req, res) => {
    try {
        const package = await Package.find().populate('items.productId');

        if (!package) {
            res.status(400).json({ error: 'No such package' });
        }

        res.status(200).json(package);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

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
        res.status(400).json({ error: error.message });
    }
}

const createPackage = async (req, res) => {
    const { name, items } = req.body;

    for (item of items) {
        const { productId} = item;
        
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({ error: "At least one products id is invalid" });
        }
    }

    try {
        const productsIds = items.map((item) => new mongoose.Types.ObjectId(item.productId));
        const existingProducts = await Product.aggregate([
            {
                $match: {
                    _id: { $in: productsIds }
                }
            }
        ]);

        if (existingProducts.length !== productsIds.length) {
            return res.status(400).json({ error: "At least one product does not exist" });
        }

        const packageData = {
            name,
            items: []
        };

        for (const product of items) {
            const existingProduct = existingProducts.find((ex_product) => ex_product._id.toString() === product.productId);
            packageData.items.push({
                productId: existingProduct._id,
                probability: product.propability
            });
        }

        const newPackage = await Package.create(packageData);
        res.status(200).json(newPackage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRandomItem = async (req, res) => {
    const { _id } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
		    return res.status(404).json({ error: 'No such package' });
	    }

        const package = await Package.findById(_id).populate('items.productId');
        if (!package) {
            res.status(400).json({ error: 'No such package' });
        }

        const minProbability = package.items.reduce((acc, item) => Math.min(acc, item.probability), Infinity);
        const scale = 1 / minProbability;

        const chances = package.items.reduce((acc, item) => acc + (item.probability * scale), 0);
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

        res.status(200).json({ _id: drawItem.productId._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createPackage,
    getAllPackages,
    getPackage,
    getRandomItem
};