const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const rolePermissions = require('../middlewares/rolePermissions');

// controller function
const {
	getProducts,
	getProduct,
	createProduct,
	buyProducts,
	sellProducts,
	updateProduct,
	removeFromSale,
	updateSaleParameters
} = require('../controllers/productsController');

const router = express.Router();

router.use(requireAuth);

router.use(rolePermissions(["user", "admin"]));
router.get('/', getProducts);
router.get('/:_id', getProduct);
router.post('/buy-products', buyProducts);
router.post('/sell-products', sellProducts);
router.patch('/sell-products', updateSaleParameters);
router.post('/remove-from-sale', removeFromSale);

router.use(rolePermissions(["admin"]));
router.post('/', createProduct);
router.patch('/:_id', updateProduct);

module.exports = router;
