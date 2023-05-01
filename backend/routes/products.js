const express = require('express');

// controller function
const {
	getProducts,
	getProduct,
	createProduct
} = require('../controllers/productsController');

const router = express.Router();

router.get('/', getProducts);

router.get('/:_id', getProduct);

router.post('/', createProduct);

module.exports = router;
