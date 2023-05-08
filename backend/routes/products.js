const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

// controller function
const {
	getProducts,
	getProduct,
	createProduct
} = require('../controllers/productsController');

const router = express.Router();

router.use(requireAuth);

router.get('/', getProducts);

router.get('/:_id', getProduct);

router.post('/', createProduct);

module.exports = router;
