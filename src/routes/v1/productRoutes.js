const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../../controllers/productController');
const { authenticate } = require('../../middleware/auth');
const { cacheMiddleware } = require('../../middleware/cache');

const router = express.Router();

router.get('/', cacheMiddleware('products'), getProducts);
router.get('/:id', cacheMiddleware('product'), getProduct);
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;