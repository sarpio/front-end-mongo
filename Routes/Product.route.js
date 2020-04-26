const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');

// GET list of all products
router.get('/', ProductController.getAllProducts);

// Create new product
router.post('/', ProductController.createProduct);

// GET product by id
router.get('/:id', ProductController.getProductById);

// UPDATE product by id
router.patch('/:id', ProductController.updateProduct);

// DELETE Product by id
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;