const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

// controller function
const {
	getProducts,
	getProduct,
	createProduct,
	buyProducts,
	updateProduct
} = require('../controllers/productsController');

const router = express.Router();

router.use(requireAuth);

router.get('/', getProducts);

router.get('/:_id', getProduct);

router.post('/', createProduct);

router.post('/buy-products', buyProducts);

router.patch('/:_id', updateProduct);

module.exports = router;
