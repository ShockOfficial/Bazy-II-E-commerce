const Product = require('../models/productModel');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json(products);
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create({ ...req.body });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getProducts,
    createProduct
}