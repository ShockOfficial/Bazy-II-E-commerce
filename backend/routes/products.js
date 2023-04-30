const express = require('express');

// controller function
const { getProducts, createProduct } = require('../controllers/productsController');

const router = express.Router();

router.get('/', getProducts);

router.post('/', createProduct);

module.exports = router;
